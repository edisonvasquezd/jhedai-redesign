import { JsonLd } from 'react-schemaorg';
import type { Organization } from 'schema-dts';

/**
 * Organization Schema component for JhedAI
 * Provides structured data for search engines about the company
 * Use on homepage
 */
export const OrganizationSchema = () => {
    return (
        <JsonLd<Organization>
            item={{
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'JhedAI',
                url: 'https://jhedai.com',
                logo: 'https://jhedai.com/logo-jhedai.png',
                description: 'Consultora de Inteligencia Artificial en Chile especializada en diagnóstico, implementación y capacitación para la industria y gobierno.',
                contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'Customer Service',
                    email: 'contacto@jhedai.com',
                    areaServed: 'CL',
                    availableLanguage: ['es', 'en'],
                },
                address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'CL',
                    addressRegion: 'Región Metropolitana',
                },
                sameAs: [
                    'https://www.linkedin.com/company/jhedai/',
                    'https://www.instagram.com/jhedai/',
                    'https://www.youtube.com/@jhedai',
                ],
                foundingDate: '2023',
                areaServed: {
                    '@type': 'Country',
                    name: 'Chile',
                },
            }}
        />
    );
};
