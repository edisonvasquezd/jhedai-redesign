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
    Zap,
    Target,
    TrendingUp,
    Shield,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

interface Service {
    icon: React.ReactNode;
    title: string;
    desc: string;
    benefits: string[];
    gradient: string;
    category: string;
    featured?: boolean;
}

const services: Service[] = [
    {
        icon: <BarChart3 size={40} strokeWidth={1.5} />,
        title: 'Análisis de Datos',
        desc: 'Transformamos datos brutos en insights accionables mediante análisis estadístico avanzado, minería de datos y modelado predictivo que impulsa decisiones estratégicas.',
        benefits: [
            'Dashboards interactivos en tiempo real',
            'Detección automática de patrones y tendencias',
            'Modelado estadístico y forecasting',
            'Visualización avanzada de datos complejos',
        ],
        gradient: 'from-blue-500 via-cyan-500 to-blue-600',
        category: 'Data',
        featured: true,
    },
    {
        icon: <Brain size={40} strokeWidth={1.5} />,
        title: 'Machine Learning',
        desc: 'Desarrollo de modelos de ML personalizados para clasificación, regresión, clustering y forecasting con aprendizaje supervisado y no supervisado de última generación.',
        benefits: [
            'Modelos predictivos de alta precisión',
            'Sistemas de recomendación inteligentes',
            'Detección de anomalías en tiempo real',
            'AutoML y optimización de hiperparámetros',
        ],
        gradient: 'from-purple-500 via-pink-500 to-red-500',
        category: 'AI',
        featured: true,
    },
    {
        icon: <PieChart size={40} strokeWidth={1.5} />,
        title: 'Business Intelligence',
        desc: 'Soluciones empresariales de BI con reporting interactivo, seguimiento de KPIs en tiempo real y analítica estratégica para liderazgo basado en datos.',
        benefits: [
            'Dashboards ejecutivos personalizados',
            'Reporting automatizado y alertas',
            'Data warehousing y ETL',
            'Analítica self-service para equipos',
        ],
        gradient: 'from-green-500 via-emerald-500 to-teal-500',
        category: 'Data',
    },
    {
        icon: <MessageSquare size={40} strokeWidth={1.5} />,
        title: 'Procesamiento de Lenguaje Natural',
        desc: 'Análisis avanzado de texto, detección de sentimiento, extracción de entidades y desarrollo de IA conversacional usando transformers y LLMs de última generación.',
        benefits: [
            'Clasificación de texto multilingüe',
            'Análisis de sentimiento y emociones',
            'Extracción de información y entidades',
            'Chatbots y asistentes virtuales',
        ],
        gradient: 'from-orange-500 via-amber-500 to-yellow-500',
        category: 'AI',
    },
    {
        icon: <Eye size={40} strokeWidth={1.5} />,
        title: 'Computer Vision',
        desc: 'Reconocimiento de imágenes, detección de objetos, control de calidad visual y sistemas de inspección automatizada para industria y retail.',
        benefits: [
            'Detección y tracking de objetos',
            'Clasificación de imágenes con CNNs',
            'Inspección de calidad automatizada',
            'Reconocimiento facial y biométrico',
        ],
        gradient: 'from-indigo-500 via-purple-500 to-pink-500',
        category: 'AI',
        featured: true,
    },
    {
        icon: <Workflow size={40} strokeWidth={1.5} />,
        title: 'Automatizaciones y Agentes',
        desc: 'Desarrollo de agentes autónomos de IA y automatización de workflows para optimización de procesos de negocio y orquestación inteligente de tareas complejas.',
        benefits: [
            'RPA con inteligencia artificial',
            'Agentes autónomos multi-objetivo',
            'Optimización de procesos end-to-end',
            'Integración con sistemas legacy',
        ],
        gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
        category: 'Automation',
    },
    {
        icon: <FlaskConical size={40} strokeWidth={1.5} />,
        title: 'Data Science',
        desc: 'Ciclo completo de data science desde formulación de hipótesis hasta deployment en producción, incluyendo experimentación rigurosa y validación de modelos.',
        benefits: [
            'Testing estadístico de hipótesis',
            'Feature engineering automatizado',
            'Experimentación y A/B testing',
            'MLOps y deployment continuo',
        ],
        gradient: 'from-rose-500 via-red-500 to-orange-500',
        category: 'Data',
    },
];

const externalPlatforms = [
    {
        name: 'Marketplace de Agentes',
        desc: 'Explora nuestro catálogo de agentes autónomos listos para implementar en tu empresa',
        icon: <ShoppingCart size={28} />,
        url: '#',
        badge: 'Ecosistema',
        gradient: 'from-blue-600 to-cyan-600',
    },
    {
        name: 'Academia JhedAI',
        desc: 'Certificaciones ChileValora y capacitaciones técnicas especializadas',
        icon: <GraduationCap size={28} />,
        url: '#',
        badge: 'Formación',
        gradient: 'from-purple-600 to-pink-600',
    },
    {
        name: 'Visión Industrial',
        desc: 'Soluciones completas de computer vision para la industria chilena',
        icon: <Eye size={28} />,
        url: '#',
        badge: 'Ecosistema',
        gradient: 'from-orange-600 to-red-600',
    },
];

const benefits = [
    {
        icon: <Zap size={24} />,
        title: 'Implementación Rápida',
        desc: 'Metodología ágil que garantiza resultados en semanas, no meses.',
    },
    {
        icon: <Target size={24} />,
        title: 'ROI Demostrable',
        desc: 'Métricas claras y KPIs medibles desde el día uno.',
    },
    {
        icon: <TrendingUp size={24} />,
        title: 'Escalabilidad',
        desc: 'Soluciones diseñadas para crecer con tu negocio.',
    },
    {
        icon: <Shield size={24} />,
        title: 'Soporte Continuo',
        desc: 'Acompañamiento técnico durante y después de la implementación.',
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
                {/* Hero Section */}
                <div className="relative bg-gradient-to-br from-jhedai-primary via-jhedai-primary to-jhedai-secondary py-32 overflow-hidden mb-24">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px]" />
                    </div>

                    <div className="container relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <p className="text-[14px] text-white/80 font-bold tracking-widest mb-4">
                                SERVICIOS
                            </p>
                            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                                Soluciones de Inteligencia Artificial
                            </h1>
                            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                                Tecnologías avanzadas de IA para transformar datos en valor estratégico. Desde
                                análisis hasta deployment, soluciones diseñadas para la complejidad industrial
                                real.
                            </p>
                        </motion.div>
                    </div>
                </div>

                <div className="container">
                    {/* Benefits Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
                    >
                        {benefits.map((benefit, i) => (
                            <div
                                key={i}
                                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50/30 border border-jhedai-neutral/20"
                            >
                                <div className="w-12 h-12 rounded-xl bg-jhedai-secondary/10 flex items-center justify-center text-jhedai-secondary mx-auto mb-3">
                                    {benefit.icon}
                                </div>
                                <h3 className="font-bold text-jhedai-primary mb-1 text-sm">
                                    {benefit.title}
                                </h3>
                                <p className="text-xs text-jhedai-primary/60">{benefit.desc}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Services Grid */}
                    <div className="mb-24">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <p className="text-[14px] text-jhedai-secondary font-bold tracking-widest mb-4">
                                TECNOLOGÍAS
                            </p>
                            <h2 className="text-3xl lg:text-4xl font-bold text-jhedai-primary mb-4">
                                Nuestras Especialidades
                            </h2>
                            <p className="text-jhedai-primary/60 text-lg max-w-2xl mx-auto">
                                Servicios diseñados para generar impacto medible en tu negocio
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className={`group relative bg-white rounded-2xl overflow-hidden border border-jhedai-neutral/20 hover:border-jhedai-secondary/30 hover:shadow-2xl transition-all duration-300 ${
                                        service.featured ? 'md:col-span-2 lg:col-span-1' : ''
                                    }`}
                                >
                                    {/* Gradient header */}
                                    <div
                                        className={`relative h-40 bg-gradient-to-br ${service.gradient} overflow-hidden`}
                                    >
                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-white group-hover:scale-110 transition-transform duration-300">
                                                {service.icon}
                                            </div>
                                        </div>
                                        {/* Category badge */}
                                        <div className="absolute top-4 right-4">
                                            <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full font-bold">
                                                {service.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-jhedai-primary mb-3 group-hover:text-jhedai-secondary transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-[15px] text-jhedai-primary/70 leading-relaxed mb-4">
                                            {service.desc}
                                        </p>

                                        {/* Benefits */}
                                        <ul className="space-y-2">
                                            {service.benefits.slice(0, 3).map((benefit, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-start gap-2 text-[13px] text-jhedai-primary/60"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-jhedai-secondary mt-1.5 shrink-0" />
                                                    <span>{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* External Platforms Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <p className="text-[14px] text-jhedai-secondary font-bold tracking-widest mb-4">
                            ECOSISTEMA
                        </p>
                        <h2 className="text-3xl lg:text-4xl font-bold text-jhedai-primary mb-4">
                            Explora Nuestras Plataformas
                        </h2>
                        <p className="text-jhedai-primary/60 text-lg max-w-2xl mx-auto leading-relaxed">
                            Accede a nuestro ecosistema de productos especializados y capacitaciones certificadas
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 mb-24">
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
                                className="group relative bg-white rounded-2xl overflow-hidden border border-jhedai-neutral/20 hover:border-jhedai-secondary/30 hover:shadow-2xl transition-all duration-300 block"
                            >
                                <div
                                    className={`h-32 bg-gradient-to-br ${platform.gradient} relative overflow-hidden`}
                                >
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:16px_16px]" />
                                    <div className="absolute top-4 right-4">
                                        <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full font-bold">
                                            {platform.badge}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                                        {platform.icon}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="font-bold text-lg text-jhedai-primary mb-2 group-hover:text-jhedai-secondary transition-colors">
                                        {platform.name}
                                    </h3>
                                    <p className="text-[14px] text-jhedai-primary/60 leading-relaxed mb-4">
                                        {platform.desc}
                                    </p>

                                    <div className="flex items-center gap-2 text-[13px] font-semibold text-jhedai-secondary">
                                        Visitar plataforma
                                        <ExternalLink
                                            size={14}
                                            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                        />
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative bg-gradient-to-br from-jhedai-primary to-jhedai-secondary rounded-3xl p-12 lg:p-16 text-center overflow-hidden"
                    >
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                                ¿Listo para Transformar tu Empresa?
                            </h2>
                            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                                Agenda una consulta gratuita y descubre cómo nuestras soluciones de IA pueden
                                impulsar tu negocio.
                            </p>
                            <Link
                                to="/contacto"
                                className="inline-block bg-white text-jhedai-primary px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                            >
                                Agendar Consulta Gratuita
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default ServiciosPage;
