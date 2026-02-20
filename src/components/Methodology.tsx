import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, ShieldCheck, Rocket } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const steps = [
    { num: "01", title: "Diagnóstico Exhaustivo", desc: "Analizamos profundamente tus procesos para identificar dónde la IA generará el mayor ROI.", icon: <Target size={18} /> },
    { num: "02", title: "Estrategia Personalizada", desc: "Diseñamos un roadmap de implementación alineado con tus objetivos de negocio.", icon: <Zap size={18} /> },
    { num: "03", title: "Desarrollo e Implementación", desc: "Desplegamos soluciones con soporte continuo y escalabilidad industrial garantizada.", icon: <ShieldCheck size={18} /> },
    { num: "04", title: "Impacto y Evolución", desc: "Monitoreamos resultados y refinamos modelos para asegurar un valor sostenible.", icon: <Rocket size={18} /> },
];

const MethodologyNode = ({ position, color, speed, distort }: { position: [number, number, number], color: string, speed: number, distort: number }) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (!groupRef.current) return;
        // Subtle follow - move Y based on scroll
        const scroll = window.scrollY;
        const targetY = position[1] + (scroll * 0.005);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.1);
    });

    return (
        <group ref={groupRef}>
            <Float speed={speed} rotationIntensity={2} floatIntensity={2}>
                <Sphere args={[1.2, 64, 64]} position={position}>
                    <MeshDistortMaterial
                        color={color}
                        speed={speed}
                        distort={distort}
                        radius={1}
                        transparent
                        opacity={0.4}
                    />
                </Sphere>
            </Float>
        </group>
    );
};

const Methodology = () => {
    return (
        <section id="methodology" className="py-32 relative overflow-hidden bg-white">
            {/* 3D Background Flow */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 12]} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <MethodologyNode position={[-9, 4, -5]} color="#003865" speed={2} distort={0.4} />
                    <MethodologyNode position={[-3, -5, -2]} color="#00A9E0" speed={1.5} distort={0.5} />
                    <MethodologyNode position={[5, 6, -4]} color="#FF585D" speed={2.5} distort={0.3} />
                    <MethodologyNode position={[10, -3, -6]} color="#003865" speed={1.8} distort={0.6} />
                </Canvas>
            </div>

            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <p className="text-[14px] text-jhedai-secondary font-bold tracking-widest mb-4 uppercase">Metodología</p>
                    <h2 className="text-4xl lg:text-6xl font-extrabold text-jhedai-primary mb-6 tracking-tight">
                        La Ruta Introgresiva
                    </h2>
                    <p className="text-jhedai-primary/60 text-xl max-w-3xl mx-auto font-medium">
                        Un proceso riguroso de 4 fases diseñado para asegurar que cada activo digital sea una ventaja competitiva real y medible.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative"
                        >
                            <div className="bg-white border border-jhedai-neutral/30 p-10 rounded-[2rem] h-full relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-jhedai-secondary/30">
                                {/* Interactive background gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-jhedai-secondary/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="w-12 h-12 rounded-2xl bg-jhedai-secondary/10 flex items-center justify-center text-jhedai-secondary group-hover:bg-jhedai-secondary group-hover:text-white transition-all duration-500 transform group-hover:rotate-12">
                                            {step.icon}
                                        </div>
                                        <span className="text-3xl font-black text-jhedai-neutral/10 group-hover:text-jhedai-secondary/20 transition-colors font-mono tracking-tighter">
                                            {step.num}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-jhedai-primary mb-4 group-hover:text-jhedai-secondary transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-[15px] text-jhedai-primary/60 leading-relaxed font-medium">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Methodology;
