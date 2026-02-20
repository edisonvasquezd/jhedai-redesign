import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const PARTICLE_COUNT = 15000;
const RADIUS = 3.8;
const TUBE_RADIUS = 1.2;

const ParticleTorus = () => {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const { positions, torusPositions, randomOffsets, sizes } = useMemo(() => {
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const torusPositions = new Float32Array(PARTICLE_COUNT * 3);
        const randomOffsets = new Float32Array(PARTICLE_COUNT * 3);
        const sizes = new Float32Array(PARTICLE_COUNT);

        // Generate precise TorusKnot geometry
        const geometry = new THREE.TorusKnotGeometry(RADIUS, TUBE_RADIUS, 500, 30);
        const geoPositions = geometry.attributes.position.array;
        const count = geoPositions.length / 3;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;
            // Map particles to geometry vertices (looping if count < PARTICLE_COUNT)
            const index = i % count;
            const x = geoPositions[index * 3];
            const y = geoPositions[index * 3 + 1];
            const z = geoPositions[index * 3 + 2];

            torusPositions[i3] = x;
            torusPositions[i3 + 1] = y;
            torusPositions[i3 + 2] = z;

            // Scatter logic
            const scatter = 3 + Math.random() * 5;
            const angle = Math.random() * Math.PI * 2;
            const r = Math.random() * scatter;

            randomOffsets[i3] = Math.cos(angle) * r;
            randomOffsets[i3 + 1] = Math.sin(angle) * r;
            randomOffsets[i3 + 2] = (Math.random() - 0.5) * scatter;

            positions[i3] = torusPositions[i3];
            positions[i3 + 1] = torusPositions[i3 + 1];
            positions[i3 + 2] = torusPositions[i3 + 2];

            sizes[i] = 1.2 + Math.random() * 3.5;
        }

        return { positions, torusPositions, randomOffsets, sizes };
    }, []);

    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor1: { value: new THREE.Color('#003865') }, // Primary Blue
                uColor2: { value: new THREE.Color('#00A9E0') }, // Bright Blue
                uColor3: { value: new THREE.Color('#FF585D') }, // Accent Orange
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            },
            vertexShader: `
        attribute float aSize;
        uniform float uTime;
        uniform float uPixelRatio;
        varying float vDistance;
        varying float vRandom;

        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vDistance = length(position.xyz) / 6.0;
          vRandom = aSize / 4.0;
          gl_PointSize = aSize * uPixelRatio * (8.5 / -mvPosition.z);
          gl_PointSize = max(gl_PointSize, 1.8);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
            fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform float uTime;
        varying float vDistance;
        varying float vRandom;

        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;

          // Soft circle check
          float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
          alpha *= 0.85;

          // Color based on position and time
          vec3 color = mix(uColor1, uColor2, vDistance);
          float orangeMix = sin(vRandom * 6.28 + uTime * 0.8) * 0.5 + 0.5;
          color = mix(color, uColor3, orangeMix * 0.18);

          gl_FragColor = vec4(color, alpha);
        }
      `,
            transparent: true,
            depthWrite: false,
            blending: THREE.NormalBlending,
        });
    }, []);

    useFrame((state) => {
        if (!pointsRef.current || !materialRef.current) return;
        const t = state.clock.getElapsedTime();

        // Cycle: Formed -> Scattered -> Formed
        // Modified to spend more time "formed"
        const cycle = t * 0.3; // Slower complete cycle
        const raw = Math.sin(cycle);
        // Transform sine wave to be sharp at peaks (scattered) and flat at troughs (formed)
        // We want 'pw' (position weight of scatter) to be 0 for a while.

        // Map raw (-1 to 1) to (0 to 1)
        const normalized = (raw + 1) / 2;

        // Power curve to keep it close to 0 (formed) longer
        const pw = Math.pow(normalized, 4);

        const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;
            // Subtle noise even when formed for "aliveness"
            const organic = Math.sin(i * 0.1 + t) * 0.05;

            posArray[i3] = torusPositions[i3] + randomOffsets[i3] * pw + organic;
            posArray[i3 + 1] = torusPositions[i3 + 1] + randomOffsets[i3 + 1] * pw + organic;
            posArray[i3 + 2] = torusPositions[i3 + 2] + randomOffsets[i3 + 2] * pw + organic;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Elegant slow rotation
        pointsRef.current.rotation.x = t * 0.1;
        pointsRef.current.rotation.y = t * 0.2;
        pointsRef.current.rotation.z = t * 0.05;

        materialRef.current.uniforms.uTime.value = t;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-aSize"
                    args={[sizes, 1]}
                />
            </bufferGeometry>
            <primitive ref={materialRef} object={shaderMaterial} attach="material" />
        </points>
    );
};

const HeroTorus = () => {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 7], fov: 55 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ParticleTorus />
            </Canvas>
        </div>
    );
};

export default HeroTorus;
