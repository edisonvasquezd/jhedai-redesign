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
import ParticleSphere from '../components/ParticleSphere';
import Analytics from '../components/Analytics';
import { OrganizationSchema } from '../components/schemas/OrganizationSchema';

const HomePage = () => {
    return (
        <>
            <SEOHead
                title="Consultora de Inteligencia Artificial en Chile"
                description="Diagnóstico, implementación y capacitación en inteligencia artificial para la industria y gobierno en Chile."
                canonical="/"
            />
            <Analytics />
            <OrganizationSchema />
            <main className="bg-abstract">
                <Hero />
                <ServiceGrid />

                {/* Ecosistema — with giant particle sphere */}
                <div className="relative bg-jhedai-primary">
                    <ParticleSphere />
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
