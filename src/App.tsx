import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceGrid from './components/ServiceGrid';
import MarketplaceSection from './components/MarketplaceSection';
import Methodology from './components/Methodology';
import Assessment from './components/Assessment';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  return (
    <div className="relative min-h-screen bg-white">
      <Navbar />
      <AnimatePresence>
        <motion.main
          className="bg-abstract"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Hero />
          <ServiceGrid />

          {/* Marketplaces */}
          <MarketplaceSection
            title="Agent Marketplace"
            description="Encuentra y despliega agentes de IA especializados para automatizar tus procesos de negocio en minutos."
            items={[
              { name: "Customer Service Agent", desc: "Soporte 24/7 con integración multicanal." },
              { name: "Lead Gen Agent", desc: "Calificación automática de prospectos." },
              { name: "Doc Analysis Agent", desc: "Extracción de datos críticos de documentos legales." },
            ]}
          />

          {/* Section divider */}
          <div className="container"><div className="h-px bg-jhedai-neutral/20" /></div>

          <MarketplaceSection
            title="CV Models Marketplace"
            description="Modelos de visión computacional pre-entrenados para la industria, listos para implementar."
            items={[
              { name: "Defect Detector", desc: "Identificación de fallas en líneas de producción." },
              { name: "Safety Watcher", desc: "Monitoreo de EPP y seguridad industrial." },
              { name: "Stock Tracker", desc: "Control de inventario por reconocimiento visual." },
            ]}
          />

          {/* Section divider */}
          <div className="container"><div className="h-px bg-jhedai-neutral/20" /></div>

          <MarketplaceSection
            title="Academy Marketplace"
            description="Capacitación especializada en IA para equipos de alto desempeño."
            items={[
              { name: "AI Strategy for C-Level", desc: "Liderazgo en la era de la inteligencia artificial." },
              { name: "Prompt Engineering Workshop", desc: "Optimización de flujo de trabajo con LLMs." },
              { name: "Applied Machine Learning", desc: "Desarrollo de soluciones prácticas." },
            ]}
          />

          <Methodology />
          <Assessment />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
