import { Helmet } from "react-helmet-async";

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://jhedai.com/#website",
    name: "JhedAI",
    url: "https://jhedai.com",
    description: "Consultora de inteligencia artificial en Chile — diagnóstico, implementación y capacitación.",
    inLanguage: "es-CL",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://jhedai.com/blog?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
