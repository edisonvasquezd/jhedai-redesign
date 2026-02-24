#!/bin/bash

# Script de Validación SEO Automatizado
# Ejecutar: bash scripts/test-seo.sh

echo "🔍 JhedAI SEO Validation Script"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

SITE_URL="https://jhedai-redesign.vercel.app"

# Function to check status
check_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
    else
        echo -e "${RED}✗${NC} $2"
    fi
}

echo "📋 Testing Site: $SITE_URL"
echo ""

# 1. Check if site is accessible
echo "1️⃣  Checking site accessibility..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $SITE_URL)
if [ "$HTTP_CODE" = "200" ]; then
    check_status 0 "Site is accessible (HTTP 200)"
else
    check_status 1 "Site returned HTTP $HTTP_CODE"
fi
echo ""

# 2. Check robots.txt
echo "2️⃣  Checking robots.txt..."
ROBOTS_CODE=$(curl -s -o /dev/null -w "%{http_code}" $SITE_URL/robots.txt)
if [ "$ROBOTS_CODE" = "200" ]; then
    check_status 0 "robots.txt exists"

    # Check for AI crawlers
    ROBOTS_CONTENT=$(curl -s $SITE_URL/robots.txt)

    if echo "$ROBOTS_CONTENT" | grep -q "GPTBot"; then
        check_status 0 "GPTBot configured"
    else
        check_status 1 "GPTBot not found"
    fi

    if echo "$ROBOTS_CONTENT" | grep -q "Claude-Web"; then
        check_status 0 "Claude-Web configured"
    else
        check_status 1 "Claude-Web not found"
    fi

    if echo "$ROBOTS_CONTENT" | grep -q "Google-Extended"; then
        check_status 0 "Google-Extended configured"
    else
        check_status 1 "Google-Extended not found"
    fi

    if echo "$ROBOTS_CONTENT" | grep -q "Sitemap:"; then
        check_status 0 "Sitemap URL present"
    else
        check_status 1 "Sitemap URL missing"
    fi
else
    check_status 1 "robots.txt not found"
fi
echo ""

# 3. Check sitemap.xml
echo "3️⃣  Checking sitemap.xml..."
SITEMAP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $SITE_URL/sitemap.xml)
if [ "$SITEMAP_CODE" = "200" ]; then
    check_status 0 "sitemap.xml exists"

    SITEMAP_CONTENT=$(curl -s $SITE_URL/sitemap.xml)
    URL_COUNT=$(echo "$SITEMAP_CONTENT" | grep -o "<loc>" | wc -l)
    echo "   Found $URL_COUNT URLs in sitemap"

    if [ $URL_COUNT -ge 5 ]; then
        check_status 0 "Sitemap has $URL_COUNT URLs (expected ≥5)"
    else
        check_status 1 "Sitemap has only $URL_COUNT URLs"
    fi
else
    check_status 1 "sitemap.xml not found"
fi
echo ""

# 4. Check Schema.org JSON-LD
echo "4️⃣  Checking Schema.org structured data..."
HTML_CONTENT=$(curl -s $SITE_URL/)

if echo "$HTML_CONTENT" | grep -q "application/ld+json"; then
    check_status 0 "JSON-LD schema found"

    if echo "$HTML_CONTENT" | grep -q "\"@type\":\"Organization\""; then
        check_status 0 "Organization schema detected"
    else
        check_status 1 "Organization schema not found"
    fi
else
    check_status 1 "No JSON-LD schema found"
fi
echo ""

# 5. Check Meta Tags
echo "5️⃣  Checking essential meta tags..."

if echo "$HTML_CONTENT" | grep -q "<title>"; then
    check_status 0 "Title tag present"
else
    check_status 1 "Title tag missing"
fi

if echo "$HTML_CONTENT" | grep -q "og:title"; then
    check_status 0 "OG title present"
else
    check_status 1 "OG title missing"
fi

if echo "$HTML_CONTENT" | grep -q "og:description"; then
    check_status 0 "OG description present"
else
    check_status 1 "OG description missing"
fi

if echo "$HTML_CONTENT" | grep -q "og:image"; then
    check_status 0 "OG image present"
else
    check_status 1 "OG image missing"
fi

if echo "$HTML_CONTENT" | grep -q "twitter:card"; then
    check_status 0 "Twitter card present"
else
    check_status 1 "Twitter card missing"
fi

if echo "$HTML_CONTENT" | grep -q "canonical"; then
    check_status 0 "Canonical URL present"
else
    check_status 1 "Canonical URL missing"
fi
echo ""

# 6. Check Compression
echo "6️⃣  Checking compression..."

# Check Gzip
GZIP_HEADER=$(curl -s -I -H "Accept-Encoding: gzip" $SITE_URL | grep -i "content-encoding")
if echo "$GZIP_HEADER" | grep -q "gzip"; then
    check_status 0 "Gzip compression enabled"
else
    check_status 1 "Gzip compression not detected"
fi

# Check Brotli (better than gzip)
BROTLI_HEADER=$(curl -s -I -H "Accept-Encoding: br" $SITE_URL | grep -i "content-encoding")
if echo "$BROTLI_HEADER" | grep -q "br"; then
    check_status 0 "Brotli compression enabled (optimal)"
else
    echo -e "${YELLOW}⚠${NC} Brotli not detected (Gzip is still good)"
fi
echo ""

# 7. Check Security Headers
echo "7️⃣  Checking security headers..."
HEADERS=$(curl -s -I $SITE_URL)

if echo "$HEADERS" | grep -qi "x-frame-options"; then
    check_status 0 "X-Frame-Options header present"
else
    echo -e "${YELLOW}⚠${NC} X-Frame-Options header missing (recommended)"
fi

if echo "$HEADERS" | grep -qi "x-content-type-options"; then
    check_status 0 "X-Content-Type-Options present"
else
    echo -e "${YELLOW}⚠${NC} X-Content-Type-Options missing (recommended)"
fi
echo ""

# 8. Simulate Crawlers
echo "8️⃣  Simulating crawler requests..."

# Googlebot
GOOGLE_RESPONSE=$(curl -s -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" $SITE_URL)
if echo "$GOOGLE_RESPONSE" | grep -q "<html"; then
    check_status 0 "Googlebot receives HTML"
else
    check_status 1 "Googlebot doesn't receive HTML"
fi

# GPTBot
GPT_RESPONSE=$(curl -s -A "GPTBot/1.0 (+https://openai.com/gptbot)" $SITE_URL)
if echo "$GPT_RESPONSE" | grep -q "<html"; then
    check_status 0 "GPTBot receives HTML"
else
    check_status 1 "GPTBot doesn't receive HTML"
fi

# Claude-Web
CLAUDE_RESPONSE=$(curl -s -A "Claude-Web/1.0" $SITE_URL)
if echo "$CLAUDE_RESPONSE" | grep -q "<html"; then
    check_status 0 "Claude-Web receives HTML"
else
    check_status 1 "Claude-Web doesn't receive HTML"
fi
echo ""

# Summary
echo "================================"
echo "✅ SEO Validation Complete!"
echo ""
echo "📊 Next Steps:"
echo "1. Test in Google Rich Results: https://search.google.com/test/rich-results?url=$SITE_URL"
echo "2. Test PageSpeed: https://pagespeed.web.dev/?url=$SITE_URL"
echo "3. Validate Schema: https://validator.schema.org/#url=$SITE_URL"
echo ""
echo "📖 Full validation guide: SEO_VALIDATION.md"
