import { JsonLd } from 'react-schemaorg';
import type { BlogPosting } from 'schema-dts';
import { SITE_URL } from '../SEOHead';

interface BlogPostingSchemaProps {
    title: string;
    description: string;
    slug: string;
    publishedAt: string;
    modifiedAt?: string;
    featuredImage?: string;
    author?: string;
    category?: string;
}

const BlogPostingSchema = ({
    title,
    description,
    slug,
    publishedAt,
    modifiedAt,
    featuredImage,
    author = 'JhedAI',
    category,
}: BlogPostingSchemaProps) => {
    return (
        <JsonLd<BlogPosting>
            item={{
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: title,
                description: description,
                url: `${SITE_URL}/blog/${slug}`,
                datePublished: publishedAt,
                dateModified: modifiedAt || publishedAt,
                author: {
                    '@type': 'Organization',
                    name: author,
                    url: SITE_URL,
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'JhedAI',
                    url: SITE_URL,
                    logo: {
                        '@type': 'ImageObject',
                        url: `${SITE_URL}/logo-jhedai.png`,
                    },
                },
                image: featuredImage ? {
                    '@type': 'ImageObject',
                    url: featuredImage,
                } : undefined,
                articleSection: category,
                inLanguage: 'es-CL',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': `${SITE_URL}/blog/${slug}`,
                },
            }}
        />
    );
};

export default BlogPostingSchema;
