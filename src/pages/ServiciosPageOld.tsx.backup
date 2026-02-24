import { motion } from 'framer-motion';
import {
    BarChart3,
    Brain,
    PieChart,
    MessageSquare,
    Eye,
    Workflow,
    FlaskConical,
    ShoppingCart,
    GraduationCap,
    ExternalLink,
    ArrowRight,
    CheckCircle,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';

interface Service {
    icon: React.ReactNode;
    title: string;
    desc: string;
    benefits: string[];
    gradient: string;
    pattern: string;
}

const services: Service[] = [
    {
        icon: <BarChart3 size={32} strokeWidth={1.5} />,
        title: 'Análisis de Datos',
        desc: 'Transformación de datos brutos en insights accionables mediante análisis estadístico, minería de datos y modelado predictivo.',
        benefits: [
            'Dashboards en tiempo real',
            'Detección de patrones',
            'Modelado estadístico',
            'Insights predictivos',
        ],
        gradient: 'from-jhedai-primary to-jhedai-secondary',
        pattern:
            'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.05) 0%, transparent 40%)',
    },
    {
        icon: <Brain size={32} strokeWidth={1.5} />,
        title: 'Machine Learning',
        desc: 'Modelos de ML personalizados para clasificación, regresión, clustering y forecasting con aprendizaje supervisado y no supervisado.',
        benefits: [
            'Modelos predictivos',
            'Sistemas de clasificación',
            'Detección de anomalías',
            'Auto-optimización',
        ],
        gradient: 'from-jhedai-secondary to-jhedai-accent',
        pattern:
            'radial-gradient(circle at 60% 30%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(255,255,255,0.05) 0%, transparent 40%)',
    },
    {
        icon: <PieChart size={32} strokeWidth={1.5} />,
        title: 'Business Intelligence',
        desc: 'Soluciones empresariales de BI con reporting interactivo, seguimiento de KPIs y analítica estratégica para liderazgo basado en datos.',
        benefits: [
            'Dashboards de KPIs',
            'Reporting ejecutivo',
            'Data warehousing',
            'Analítica visual',
        ],
        gradient: 'from-jhedai-primary to-jhedai-accent',
        pattern:
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 0%, transparent 40%)',
    },
    {
        icon: <MessageSquare size={32} strokeWidth={1.5} />,
        title: 'Procesamiento de Lenguaje Natural',
        desc: 'Análisis avanzado de texto, detección de sentimiento, extracción de entidades y IA conversacional usando modelos transformer.',
        benefits: [
            'Clasificación de texto',
            'Análisis de sentimiento',
            'Extracción de entidades',
            'Desarrollo de chatbots',
        ],
        gradient: 'from-jhedai-secondary to-jhedai-primary',
        pattern:
            'radial-gradient(circle at 40% 60%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(255,255,255,0.05) 0%, transparent 40%)',
    },
    {
        icon: <Eye size={32} strokeWidth={1.5} />,
        title: 'Computer Vision',
        desc: 'Reconocimiento de imágenes, detección de objetos, control de calidad visual y sistemas de inspección automatizada.',
        benefits: [
            'Detección de objetos',
            'Clasificación de imágenes',
            'Inspección de calidad',
            'Monitoreo en tiempo real',
        ],
        gradient: 'from-jhedai-accent to-jhedai-secondary',
        pattern:
            'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 50% 70%, rgba(255,255,255,0.05) 0%, transparent 40%)',
    },
    {
        icon: <Workflow size={32} strokeWidth={1.5} />,
        title: 'Automatizaciones y Agentes',
        desc: 'Agentes autónomos de IA y automatización de workflows para optimización de procesos de negocio y orquestación inteligente de tareas.',
        benefits: [
            'Automatización de procesos',
            'Agentes autónomos',
            'Optimización de workflows',
            'Integración de sistemas',
        ],
        gradient: 'from-jhedai-primary to-jhedai-secondary',
        pattern:
            'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(255,255,255,0.05) 0%, transparent 40%)',
    },
    {
        icon: <FlaskConical size={32} strokeWidth={1.5} />,
        title: 'Data Science',
        desc: 'Ciclo completo de data science desde hipótesis hasta deployment, incluyendo experimentación y validación de modelos.',
        benefits: [
            'Testing de hipótesis',
            'Feature engineering',
            'Experimentación de modelos',
            'Deployment a producción',
        ],
        gradient: 'from-jhedai-secondary to-jhedai-accent',
        pattern:
            'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 60% 60%, rgba(255,255,255,0.05) 0%, transparent 40%)',
    },
];

const externalPlatforms = [
    {
        name: 'Marketplace de Agentes',
        desc: 'Catálogo de agentes autónomos listos para implementar',
        icon: <ShoppingCart size={24} />,
        url: '#',
        badge: 'Ecosistema',
    },
    {
        name: 'Academia JhedAI',
        desc: 'Capacitaciones certificadas ChileValora',
        icon: <GraduationCap size={24} />,
        url: '#',
        badge: 'Formación',
    },
    {
        name: 'Visión Industrial',
        desc: 'Soluciones de computer vision para industria',
        icon: <Eye size={24} />,
        url: '#',
        badge: 'Ecosistema',
    },
];

const ServiciosPage = () => {
    return (
        <>
            <SEOHead
                title="Servicios de IA | Machine Learning, NLP, Computer Vision"
                description="Soluciones tecnológicas de inteligencia artificial: análisis de datos, machine learning, business intelligence, NLP, computer vision, automatización y data science."
                canonical="/servicios"
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'Service',
                    name: 'Servicios de Inteligencia Artificial',
                    provider: {
                        '@type': 'Organization',
                        name: 'JhedAi',
                    },
                }}
            />

            <div className="pt-28 pb-24 bg-white">
                <div className="container">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-20"
                    >
                        <p className="text-[14px] text-jhedai-secondary font-bold tracking-widest mb-4">
                            SERVICIOS
                        </p>
                        <h1 className="text-3xl lg:text-5xl font-bold text-jhedai-primary mb-6">
                            Soluciones de Inteligencia Artificial
                        </h1>
                        <p className="text-jhedai-primary/60 text-lg max-w-3xl mx-auto leading-relaxed">
                            Tecnologías avanzadas de IA para transformar datos en valor. Desde análisis
                            hasta deployment, soluciones diseñadas para la complejidad industrial real.
                        </p>
                    </motion.div>

                    {/* Services Grid */}
                    <div className="space-y-6 mb-24">
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="group bg-white border border-jhedai-neutral/30 rounded-2xl overflow-hidden hover:border-jhedai-secondary/50 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row"
                            >
                                {/* Visual area */}
                                <div
                                    className={`relative w-full md:w-64 h-48 md:h-auto shrink-0 bg-gradient-to-br ${service.gradient} overflow-hidden flex items-center justify-center`}
                                >
                                    {/* Soft radial pattern */}
                                    <div
                                        className="absolute inset-0"
                                        style={{ background: service.pattern }}
                                    />
                                    {/* Grid overlay */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
                                    {/* Scanning corners */}
                                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-md" />
                                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-md" />
                                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-md" />
                                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-md" />
                                    {/* Central icon */}
                                    <div className="relative z-10 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                                        {service.icon}
                                    </div>
                                    {/* Pulse ring */}
                                    <div
                                        className="absolute w-20 h-20 rounded-full border border-white/10 animate-ping"
                                        style={{ animationDuration: '3s' }}
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-8 flex-1 flex flex-col justify-center">
                                    <h3 className="font-bold text-xl text-jhedai-primary mb-3 group-hover:text-jhedai-secondary transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-[15px] text-jhedai-primary/60 leading-relaxed mb-4">
                                        {service.desc}
                                    </p>
                                    {/* Benefits */}
                                    <ul className="space-y-2 mb-6">
                                        {service.benefits.map((benefit, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-start gap-2 text-[14px] text-jhedai-primary/70"
                                            >
                                                <CheckCircle
                                                    size={16}
                                                    className="text-jhedai-secondary shrink-0 mt-0.5"
                                                />
                                                <span>{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex items-center gap-2 text-[14px] font-semibold text-jhedai-primary/40 group-hover:text-jhedai-secondary transition-colors">
                                        Saber más{' '}
                                        <ArrowRight
                                            size={16}
                                            className="group-hover:translate-x-1 transition-transform"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* External Platforms Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <p className="text-[14px] text-jhedai-secondary font-bold tracking-widest mb-4">
                            ECOSISTEMA
                        </p>
                        <h2 className="text-3xl lg:text-4xl font-bold text-jhedai-primary mb-4">
                            Explora nuestras plataformas
                        </h2>
                        <p className="text-jhedai-primary/60 text-[16px] max-w-2xl mx-auto leading-relaxed">
                            Accede a nuestro ecosistema de productos especializados y capacitaciones
                            certificadas.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {externalPlatforms.map((platform, i) => (
                            <motion.a
                                key={i}
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="group glass-card p-8 relative overflow-hidden hover:border-jhedai-secondary/50 hover:shadow-xl transition-all duration-300 block"
                            >
                                {/* Badge */}
                                <div className="absolute top-4 right-4">
                                    <span className="text-xs bg-jhedai-secondary/10 text-jhedai-secondary px-3 py-1 rounded-full font-semibold">
                                        {platform.badge}
                                    </span>
                                </div>

                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl bg-jhedai-secondary/10 flex items-center justify-center text-jhedai-secondary mb-6 group-hover:bg-jhedai-secondary group-hover:text-white transition-all duration-300">
                                    {platform.icon}
                                </div>

                                {/* Content */}
                                <h3 className="font-bold text-lg text-jhedai-primary mb-3 group-hover:text-jhedai-secondary transition-colors">
                                    {platform.name}
                                </h3>
                                <p className="text-[15px] text-jhedai-primary/60 leading-relaxed mb-4">
                                    {platform.desc}
                                </p>

                                {/* External link indicator */}
                                <div className="flex items-center gap-2 text-[14px] font-semibold text-jhedai-primary/40 group-hover:text-jhedai-secondary transition-colors">
                                    Visitar plataforma{' '}
                                    <ExternalLink
                                        size={16}
                                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                    />
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiciosPage;
