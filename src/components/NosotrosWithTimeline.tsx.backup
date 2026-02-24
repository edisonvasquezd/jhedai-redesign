import { motion } from 'framer-motion';
import { Crosshair, Lightbulb, TrendingUp, Rocket, GraduationCap, Award, Cpu } from 'lucide-react';

const valores = [
    {
        icon: <Crosshair size={20} />,
        title: "Precisión Técnica",
        desc: "Cada solución está diseñada con rigor ingenieril para la complejidad industrial real del mercado chileno.",
    },
    {
        icon: <Lightbulb size={20} />,
        title: "Innovación Aplicada",
        desc: "No perseguimos tendencias, resolvemos problemas reales con tecnología de vanguardia y metodología propietaria.",
    },
    {
        icon: <TrendingUp size={20} />,
        title: "Impacto Medible",
        desc: "Nos comprometemos con resultados cuantificables. Generación de valor tangible y ROI demostrable en cada proyecto.",
    },
];

interface Milestone {
    date: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    category: string;
    position: 'left' | 'right';
}

const milestones: Milestone[] = [
    {
        date: '2022',
        title: 'Fundación de JhedAI',
        description: 'Inicio de operaciones como consultora especializada en IA aplicada para industria y gobierno en Chile.',
        icon: <Rocket size={20} />,
        category: 'Inicio',
        position: 'right',
    },
    {
        date: '2023',
        title: 'Lanzamiento DeepLab',
        description: 'Creación del programa DeepLab para diagnóstico, capacitación y soluciones integrales de IA.',
        icon: <Lightbulb size={20} />,
        category: 'Producto',
        position: 'left',
    },
    {
        date: '2024',
        title: 'Academia JhedAI',
        description: 'Inicio de programas de capacitación certificados por ChileValora en ML, NLP y Computer Vision.',
        icon: <GraduationCap size={20} />,
        category: 'Formación',
        position: 'right',
    },
    {
        date: 'Febrero 2025',
        title: 'Cámara Chilena de Inteligencia Artificial (CCHIA)',
        description: 'Participación protagonista en la fundación de CCHIA, impulsando la regulación y desarrollo de IA en Chile.',
        icon: <Award size={20} />,
        category: 'Hito',
        position: 'left',
    },
    {
        date: 'Diciembre 2025',
        title: 'Centro de Supercómputo e IA Aplicada (CSIIA)',
        description: 'Protagonistas en la creación del CSIIA, fortaleciendo la investigación y capacidad computacional para IA en Chile.',
        icon: <Cpu size={20} />,
        category: 'Hito',
        position: 'right',
    },
];

const Nosotros = () => {
    return (
        <section id="nosotros" className="py-24 relative bg-white">
            <div className="container">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    {/* Left - Story */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-1/2"
                    >
                        <p className="text-[14px] text-jhedai-secondary font-bold tracking-widest mb-4">NOSOTROS</p>
                        <h2 className="text-3xl lg:text-4xl font-bold text-jhedai-primary mb-6">
                            Consultora IA en Chile
                        </h2>
                        <p className="text-jhedai-primary/60 text-[16px] leading-relaxed mb-4">
                            Somos expertos en inteligencia artificial aplicada a la industria y el gobierno.
                            Integramos progresivamente soluciones inteligentes en las empresas, asegurando una
                            evolución sostenible alineada con sus objetivos estratégicos.
                        </p>
                        <p className="text-jhedai-primary/60 text-[16px] leading-relaxed mb-8">
                            Con profundo contexto del mercado nacional y una metodología propietaria integral,
                            garantizamos la adopción exitosa de cada proyecto. No solo ofrecemos soluciones de IA —
                            entregamos la ventaja estratégica que tu empresa necesita para liderar en su sector.
                        </p>
                    </motion.div>

                    {/* Right - Values */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:w-1/2 space-y-4"
                    >
                        {valores.map((valor, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 + 0.3 }}
                                className="group glass-card p-6 flex items-start gap-4 hover:bg-jhedai-primary/[0.02] transition-all duration-300"
                            >
                                <div className="w-10 h-10 rounded-xl bg-jhedai-secondary/10 flex items-center justify-center text-jhedai-secondary shrink-0 group-hover:bg-jhedai-secondary group-hover:text-white transition-all duration-300">
                                    {valor.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-jhedai-primary mb-1 group-hover:text-jhedai-secondary transition-colors">
                                        {valor.title}
                                    </h3>
                                    <p className="text-[15px] text-jhedai-primary/60 leading-relaxed">
                                        {valor.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Timeline Section */}
                <div className="mt-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <p className="text-[14px] text-jhedai-secondary font-bold tracking-widest mb-4">TRAYECTORIA</p>
                        <h2 className="text-3xl lg:text-4xl font-bold text-jhedai-primary mb-4">
                            Nuestro Recorrido
                        </h2>
                        <p className="text-jhedai-primary/60 text-[16px] max-w-2xl mx-auto leading-relaxed">
                            Hitos clave que definen nuestra evolución como líderes en inteligencia artificial aplicada en Chile.
                        </p>
                    </motion.div>

                    {/* Timeline Container */}
                    <div className="max-w-4xl mx-auto relative">
                        {/* Vertical Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-jhedai-secondary/20 transform -translate-x-1/2 hidden lg:block" />

                        {/* Milestones */}
                        <div className="space-y-12">
                            {milestones.map((milestone, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: milestone.position === 'left' ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15, duration: 0.5 }}
                                    className={`relative flex items-center gap-8 ${
                                        milestone.position === 'left'
                                            ? 'lg:flex-row-reverse lg:text-right'
                                            : 'lg:flex-row'
                                    } flex-col lg:flex-row`}
                                >
                                    {/* Timeline Dot (center) */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex items-center justify-center z-10">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.15 + 0.2, type: 'spring', stiffness: 200 }}
                                            className="w-3 h-3 rounded-full bg-jhedai-secondary ring-4 ring-white"
                                        />
                                    </div>

                                    {/* Spacer (to create equal spacing on both sides) */}
                                    <div className="hidden lg:block lg:w-[calc(50%-2rem)]" />

                                    {/* Card */}
                                    <div className={`lg:w-[calc(50%-2rem)] w-full ${milestone.position === 'left' ? 'lg:pr-8' : 'lg:pl-8'}`}>
                                        <div className="group glass-card p-6 hover:border-jhedai-secondary/50 hover:shadow-xl transition-all duration-300">
                                            {/* Category Badge */}
                                            <div className={`inline-block mb-3 ${milestone.position === 'left' ? 'lg:ml-auto lg:block' : ''}`}>
                                                <span className="text-xs bg-jhedai-secondary/10 text-jhedai-secondary px-3 py-1 rounded-full font-semibold">
                                                    {milestone.category}
                                                </span>
                                            </div>

                                            {/* Date */}
                                            <p className="text-sm font-bold text-jhedai-secondary mb-3">
                                                {milestone.date}
                                            </p>

                                            {/* Icon + Title */}
                                            <div className={`flex items-center gap-3 mb-3 ${milestone.position === 'left' ? 'lg:flex-row-reverse lg:justify-end' : ''}`}>
                                                <div className="w-10 h-10 rounded-xl bg-jhedai-secondary/10 flex items-center justify-center text-jhedai-secondary shrink-0 group-hover:bg-jhedai-secondary group-hover:text-white transition-all duration-300">
                                                    {milestone.icon}
                                                </div>
                                                <h3 className="font-bold text-lg text-jhedai-primary group-hover:text-jhedai-secondary transition-colors">
                                                    {milestone.title}
                                                </h3>
                                            </div>

                                            {/* Description */}
                                            <p className="text-[15px] text-jhedai-primary/60 leading-relaxed">
                                                {milestone.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Nosotros;
