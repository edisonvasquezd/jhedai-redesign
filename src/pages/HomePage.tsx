import Hero from '../components/Hero';
import ServiceGrid from '../components/ServiceGrid';
import AgentesAutonomos from '../components/AgentesAutonomos';
import VisionIndustrial from '../components/VisionIndustrial';
import AcademiaJhedai from '../components/AcademiaJhedai';
import DeepLab from '../components/DeepLab';
import Methodology from '../components/Methodology';
import NosotrosSimple from '../components/NosotrosSimple';
import Blog from '../components/Blog';
import Assessment from '../components/Assessment';
import SEOHead from '../components/SEOHead';
import ParticleBackground from '../components/ParticleBackground';

const HomePage = () => {
    return (
        <>
            <SEOHead
                title="Consultora de Inteligencia Artificial en Chile"
                description="Diagnóstico, implementación y capacitación en inteligencia artificial para la industria y gobierno en Chile."
                canonical="/"
                jsonLd={[
                    {
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "JhedAi",
                        "url": "https://jhedai.com",
                        "description": "Consultora de inteligencia artificial aplicada a la industria y gobierno en Chile.",
                        "sameAs": [
                            "https://www.linkedin.com/company/jhedai/",
                            "https://www.instagram.com/jhedai/",
                            "https://www.youtube.com/@jhedai"
                        ]
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "JhedAi",
                        "url": "https://jhedai.com"
                    }
                ]}
            />
            <main className="bg-abstract">
                <Hero />
                <ServiceGrid />

                {/* Ecosistema — with particle background */}
                <div className="relative bg-jhedai-primary">
                    <ParticleBackground />
                    <div className="relative z-10">
                        <AgentesAutonomos />
                        <div className="container"><div className="h-px bg-white/10" /></div>
                        <VisionIndustrial />
                        <div className="container"><div className="h-px bg-white/10" /></div>
                        <AcademiaJhedai />
                        <div className="container"><div className="h-px bg-white/10" /></div>
                        <DeepLab />
                    </div>
                </div>

                <Methodology />
                <NosotrosSimple />
                <Blog />
                <Assessment />
            </main>
        </>
    );
};

export default HomePage;
