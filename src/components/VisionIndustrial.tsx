import { motion } from 'framer-motion';
import { ArrowRight, ScanSearch, ShieldCheck, Container } from 'lucide-react';

const items = [
    {
        icon: <ScanSearch size={32} strokeWidth={1.5} />,
        name: "Inspección y Control de Calidad",
        desc: "Detección de defectos y anomalías en líneas de producción y ensamblaje en tiempo real. Precisión superior a la inspección humana con análisis visual automatizado.",
        gradient: "from-jhedai-primary to-jhedai-secondary",
        pattern: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.05) 0%, transparent 40%)",
    },
    {
        icon: <ShieldCheck size={32} strokeWidth={1.5} />,
        name: "Seguridad y Cumplimiento Industrial",
        desc: "Monitoreo continuo de EPP, detección de zonas de riesgo y verificación de cumplimiento de protocolos de seguridad en operaciones industriales y portuarias.",
        gradient: "from-jhedai-secondary to-jhedai-accent",
        pattern: "radial-gradient(circle at 60% 30%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(255,255,255,0.05) 0%, transparent 40%)",
    },
    {
        icon: <Container size={32} strokeWidth={1.5} />,
        name: "Monitoreo y Logística Inteligente",
        desc: "Gestión automatizada de inventario mediante reconocimiento visual, análisis de flujos de carga en terminales portuarios y optimización logística en tiempo real.",
        gradient: "from-jhedai-primary to-jhedai-accent",
        pattern: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 0%, transparent 40%)",
    },
];

const VisionIndustrial = () => {
    return (
        <section className="py-24 relative">
            <div className="container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-[14px] text-jhedai-secondary font-bold tracking-widest mb-4">VISIÓN INDUSTRIAL</p>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                        Visión computacional aplicada a la industria
                    </h2>
                    <p className="text-white/60 text-[16px] max-w-2xl mx-auto leading-relaxed">
                        Convertimos imágenes en información accionable en tiempo real. Soluciones de visión por computador que eliminan errores humanos y aumentan la precisión operativa.
                    </p>
                </motion.div>

                {/* Cards - horizontal stacked */}
                <div className="space-y-6">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="group bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:bg-white/[0.12] hover:shadow-lg hover:shadow-jhedai-secondary/10 transition-all duration-300 flex flex-col md:flex-row"
                        >
                            {/* Visual area - icon based */}
                            <div className={`relative w-full md:w-64 h-48 md:h-auto shrink-0 bg-gradient-to-br ${item.gradient} overflow-hidden flex items-center justify-center`}>
                                {/* Soft radial pattern */}
                                <div className="absolute inset-0" style={{ background: item.pattern }} />
                                {/* Grid overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
                                {/* Scanning corners */}
                                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-md" />
                                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-md" />
                                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-md" />
                                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-md" />
                                {/* Central icon */}
                                <div className="relative z-10 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                                    {item.icon}
                                </div>
                                {/* Pulse ring */}
                                <div className="absolute w-20 h-20 rounded-full border border-white/10 animate-ping" style={{ animationDuration: '3s' }} />
                            </div>

                            {/* Content */}
                            <div className="p-8 flex-1 flex flex-col justify-center">
                                <h3 className="font-bold text-xl text-white mb-3 group-hover:text-jhedai-secondary transition-colors">
                                    {item.name}
                                </h3>
                                <p className="text-[15px] text-white/50 leading-relaxed mb-4">
                                    {item.desc}
                                </p>
                                <div className="flex items-center gap-2 text-[14px] font-semibold text-white/40 group-hover:text-jhedai-secondary transition-colors">
                                    Ver solución <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VisionIndustrial;
