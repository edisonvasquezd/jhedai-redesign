import { motion } from 'framer-motion';
import { Eye, MessageSquare, BrainCircuit, Bot, ArrowRight } from 'lucide-react';

const services = [
    {
        icon: <Eye size={22} />,
        title: "Visión Computacional",
        desc: "Detección de defectos por IA y monitoreo de seguridad industrial con precisión superior a la humana en tiempo real.",
        color: "from-jhedai-primary/5 to-jhedai-secondary/5",
    },
    {
        icon: <BrainCircuit size={22} />,
        title: "Mantenimiento Predictivo",
        desc: "Modelos avanzados de Machine Learning que anticipan fallas críticas basándose en el historial operativo y sensores IoT.",
        color: "from-jhedai-secondary/10 to-transparent",
    },
    {
        icon: <MessageSquare size={22} />,
        title: "Agentes Cognitivos",
        desc: "Asistentes de IA soberanos para gestionar bases de conocimiento industrial y automatizar decisiones técnicas 24/7.",
        color: "from-jhedai-primary/10 to-transparent",
    },
    {
        icon: <Bot size={22} />,
        title: "Automatización Autónoma",
        desc: "Orquestación de flujos de trabajo críticos mediante agentes que interactúan con tus sistemas internos y ERP legacy.",
        color: "from-jhedai-accent/5 to-jhedai-secondary/5",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }),
};

const ServiceGrid = () => {
    return (
        <section id="services" className="py-32 relative bg-white">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <p className="text-[14px] text-jhedai-secondary font-bold tracking-widest mb-4">CAPACIDADES</p>
                    <h2 className="text-4xl lg:text-5xl font-bold text-jhedai-primary mb-6">
                        Ingeniería de IA de clase mundial
                    </h2>
                    <p className="text-jhedai-primary/60 text-lg max-w-2xl mx-auto">
                        Cada solución está diseñada para la complejidad industrial real, no para demos.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={fadeUp}
                            className="group glass-card p-10 rounded-2xl relative overflow-hidden cursor-pointer"
                        >
                            {/* Hover gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-jhedai-primary/5 border border-jhedai-primary/10 flex items-center justify-center text-jhedai-secondary group-hover:bg-jhedai-secondary group-hover:text-white transition-all duration-300">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-jhedai-primary">{service.title}</h3>
                                </div>
                                <p className="text-jhedai-primary/60 text-[16px] leading-relaxed mb-6">{service.desc}</p>
                                <div className="flex items-center gap-2 text-[14px] font-semibold text-jhedai-primary/40 group-hover:text-jhedai-secondary transition-colors">
                                    Saber más <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceGrid;
