import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

// 70% — masa gigante de agua que rebota dentro del viewport
const MASS_COUNT = 450000;
// 30% — partículas independientes dispersas
const SCATTER_COUNT = 190000;

const MassParticles = () => {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const { positions, sizes, randoms } = useMemo(() => {
        const positions = new Float32Array(MASS_COUNT * 3);
        const sizes = new Float32Array(MASS_COUNT);
        const randoms = new Float32Array(MASS_COUNT);

        for (let i = 0; i < MASS_COUNT; i++) {
            const i3 = i * 3;

            // Large cloud shape — gaussian-like distribution
            // This creates a big visible mass, not a tiny dot
            const gx = (Math.random() + Math.random() + Math.random()) / 3; // central tendency
            const gy = (Math.random() + Math.random() + Math.random()) / 3;
            const gz = (Math.random() + Math.random()) / 2;

            positions[i3] = (gx - 0.5) * 20;     // spread ~10 units wide
            positions[i3 + 1] = (gy - 0.5) * 16;  // spread ~8 units tall
            positions[i3 + 2] = (gz - 0.5) * 3;    // shallow depth

            sizes[i] = 0.5 + Math.random() * 2.2;
            randoms[i] = Math.random();
        }

        return { positions, sizes, randoms };
    }, []);

    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor1: { value: new THREE.Color('#00A9E0') },
                uColor2: { value: new THREE.Color('#4FC3F7') },
                uColor3: { value: new THREE.Color('#B3E5FC') },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            },
            vertexShader: `
                attribute float aSize;
                attribute float aRandom;
                uniform float uTime;
                uniform float uPixelRatio;
                varying float vAlpha;
                varying float vRandom;

                void main() {
                    vec3 pos = position;
                    float t = uTime;

                    // === MASA DE AGUA — rebota dentro del viewport ===
                    // Movimiento global lento tipo ping-pong suave
                    // Usa funciones sin con períodos distintos para que no sea repetitivo
                    float driftX = sin(t * 0.07) * 5.0 + sin(t * 0.03) * 2.5;
                    float driftY = cos(t * 0.055) * 4.0 + sin(t * 0.025) * 2.0;
                    pos.x += driftX;
                    pos.y += driftY;

                    // Corriente interna — la masa respira y fluye
                    float phase = position.x * 0.15 + position.y * 0.12;
                    pos.x += sin(phase + t * 0.25) * 1.2;
                    pos.y += cos(phase * 0.8 + t * 0.18) * 0.8;

                    // Efecto cabeza: las partículas del borde siguen con delay
                    float dist = length(position.xy);
                    float lag = dist * 0.04;
                    pos.x += sin(t * 0.07 - lag) * 1.0;
                    pos.y += cos(t * 0.055 - lag) * 0.8;

                    // Ondulación tipo agua
                    pos.x += sin(pos.y * 0.12 + t * 0.3) * 0.5;
                    pos.y += cos(pos.x * 0.1 + t * 0.22) * 0.3;
                    pos.z += sin(pos.y * 0.08 + t * 0.1 + aRandom * 3.14) * 0.4;

                    // Micro-vibración individual
                    pos.x += sin(t * 0.8 + aRandom * 6.28) * 0.06;
                    pos.y += cos(t * 0.7 + aRandom * 3.14) * 0.05;

                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    float depth = -mvPosition.z;

                    vAlpha = smoothstep(18.0, 0.5, depth);
                    vAlpha = clamp(vAlpha * 1.5, 0.15, 1.0);
                    vRandom = aRandom;

                    gl_PointSize = aSize * uPixelRatio * (6.0 / max(depth, 0.5));
                    gl_PointSize = max(gl_PointSize, 1.5);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform vec3 uColor1;
                uniform vec3 uColor2;
                uniform vec3 uColor3;
                varying float vAlpha;
                varying float vRandom;

                void main() {
                    float dist = length(gl_PointCoord - vec2(0.5));
                    if (dist > 0.5) discard;

                    float alpha = 1.0 - smoothstep(0.0, 0.45, dist);
                    alpha = pow(alpha, 0.7);
                    alpha *= vAlpha * 2.0;
                    alpha = clamp(alpha, 0.0, 1.0);

                    vec3 color = mix(uColor1, uColor2, vRandom);
                    color = mix(color, uColor3, smoothstep(0.8, 1.0, vRandom) * 0.6);
                    color *= 1.4;

                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
    }, []);

    useFrame(() => {
        if (!materialRef.current) return;
        materialRef.current.uniforms.uTime.value = performance.now() * 0.001;
    });

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
                <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
            </bufferGeometry>
            <primitive ref={materialRef} object={shaderMaterial} attach="material" />
        </points>
    );
};

const ScatteredParticles = () => {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const { positions, sizes, randoms } = useMemo(() => {
        const positions = new Float32Array(SCATTER_COUNT * 3);
        const sizes = new Float32Array(SCATTER_COUNT);
        const randoms = new Float32Array(SCATTER_COUNT);

        for (let i = 0; i < SCATTER_COUNT; i++) {
            const i3 = i * 3;

            positions[i3] = (Math.random() - 0.5) * 60;
            positions[i3 + 1] = (Math.random() - 0.5) * 50;
            positions[i3 + 2] = (Math.random() - 0.5) * 14 - 2;

            sizes[i] = 0.3 + Math.random() * 1.5;
            randoms[i] = Math.random();
        }

        return { positions, sizes, randoms };
    }, []);

    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor1: { value: new THREE.Color('#00A9E0') },
                uColor2: { value: new THREE.Color('#80DEEA') },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            },
            vertexShader: `
                attribute float aSize;
                attribute float aRandom;
                uniform float uTime;
                uniform float uPixelRatio;
                varying float vAlpha;
                varying float vRandom;

                void main() {
                    vec3 pos = position;

                    pos.x += sin(uTime * 0.1 + aRandom * 6.28) * 1.5;
                    pos.y += cos(uTime * 0.08 + aRandom * 3.14) * 1.2;
                    pos.z += sin(uTime * 0.06 + aRandom * 4.71) * 0.5;
                    pos.x += sin(pos.y * 0.03 + uTime * 0.05) * 2.0;

                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    float depth = -mvPosition.z;

                    vAlpha = smoothstep(20.0, 1.0, depth);
                    vAlpha = clamp(vAlpha * 1.2, 0.1, 0.8);
                    vAlpha *= 0.6 + 0.4 * sin(uTime * 1.5 + aRandom * 6.28);

                    vRandom = aRandom;

                    gl_PointSize = aSize * uPixelRatio * (5.0 / max(depth, 0.5));
                    gl_PointSize = max(gl_PointSize, 1.0);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform vec3 uColor1;
                uniform vec3 uColor2;
                varying float vAlpha;
                varying float vRandom;

                void main() {
                    float dist = length(gl_PointCoord - vec2(0.5));
                    if (dist > 0.5) discard;

                    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
                    alpha *= vAlpha * 1.8;
                    alpha = clamp(alpha, 0.0, 1.0);

                    vec3 color = mix(uColor1, uColor2, vRandom);
                    color *= 1.2;

                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
    }, []);

    useFrame(() => {
        if (!materialRef.current) return;
        materialRef.current.uniforms.uTime.value = performance.now() * 0.001;
    });

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
                <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
            </bufferGeometry>
            <primitive ref={materialRef} object={shaderMaterial} attach="material" />
        </points>
    );
};

const ParticleBackground = () => {
    return (
        <Canvas
            camera={{ position: [0, 0, 8], fov: 55 }}
            dpr={[1, 1.5]}
            gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
            <MassParticles />
            <ScatteredParticles />
        </Canvas>
    );
};

export default ParticleBackground;
