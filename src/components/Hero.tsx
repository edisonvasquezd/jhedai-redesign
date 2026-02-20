import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import HeroTorus from './HeroTorus';

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 bg-white">
            {/* Ambient background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
                    <div className="w-full h-full rounded-full bg-jhedai-primary/5 blur-[120px]" />
                </div>
                <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px]">
                    <div className="w-full h-full rounded-full bg-jhedai-secondary/10 blur-[100px]" />
                </div>
            </div>

            <div className="container relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
                    {/* Left - Text */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-jhedai-primary/5 border border-jhedai-primary/10 text-[14px] font-medium text-jhedai-primary mb-8"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute h-full w-full rounded-full bg-jhedai-secondary opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-jhedai-secondary" />
                            </span>
                            Especialistas en IA Industrial
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-4xl sm:text-5xl lg:text-[64px] xl:text-[72px] font-bold leading-[1.1] tracking-tight mb-8"
                        >
                            <span className="text-jhedai-primary">Infraestructura</span>
                            <br />
                            <span className="text-gradient">Cognitiva</span>
                            <br />
                            <span className="text-jhedai-secondary">Precisión Industrial.</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-base sm:text-lg text-jhedai-primary/60 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
                        >
                            Desarrollamos soluciones de IA que integran visión computacional avanzada
                            y agentes autónomos en el núcleo de tu operación industrial.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-4"
                        >
                            <button className="boton-principal inline-flex items-center gap-2">
                                Empieza ahora
                                <ChevronRight size={16} />
                            </button>
                            <button className="boton-secundario">
                                Ver casos de éxito
                            </button>
                        </motion.div>
                    </div>

                    {/* Right - Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:w-1/2 h-[450px] sm:h-[550px] lg:h-[650px] relative"
                    >
                        <HeroTorus />
                    </motion.div>
                </div>

                {/* Trust bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 1 }}
                    className="mt-12 lg:mt-0 pt-12 border-t border-jhedai-neutral/30"
                >
                    <p className="text-[14px] font-semibold text-jhedai-primary/40 mb-6 tracking-wide text-center lg:text-left">
                        Empresas que potencian su operación con JhedAi
                    </p>
                    <div className="flex justify-center lg:justify-start items-center gap-10 flex-wrap opacity-40 grayscale">
                        {['MINING CO.', 'ENERDEX', 'GOB DIGITAL', 'LOGITEC', 'FUNDACION IA'].map((name, i) => (
                            <span key={i} className="text-xs font-bold tracking-[0.2em] text-jhedai-primary">{name}</span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
