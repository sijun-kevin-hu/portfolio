import React, { useEffect, useRef } from 'react';

const MOBILE_BREAKPOINT = 768;
const DESKTOP_PARTICLE_CAP = 62;
const MOBILE_PARTICLE_CAP = 34;
const DESKTOP_AMBIENT_CAP = 30;
const MOBILE_AMBIENT_CAP = 16;

const COLOR_POOL = [
    '0,243,255',
    '188,19,254',
    '155,206,255'
];

const randomBetween = (min, max) => min + Math.random() * (max - min);

const createParticle = (width, height) => {
    const alphaBase = randomBetween(0.24, 0.46);
    return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: randomBetween(-0.11, 0.11),
        vy: randomBetween(-0.11, 0.11),
        size: randomBetween(0.55, 1.75),
        color: COLOR_POOL[Math.floor(Math.random() * COLOR_POOL.length)],
        twinklePhase: randomBetween(0, Math.PI * 2),
        twinkleSpeed: randomBetween(0.0008, 0.0015),
        alphaBase,
        alphaAmp: randomBetween(0.04, 0.11)
    };
};

const createAmbientParticle = (width, height) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: randomBetween(-0.04, 0.04),
    vy: randomBetween(-0.04, 0.04),
    size: randomBetween(0.35, 1.2),
    phase: randomBetween(0, Math.PI * 2),
    alphaBase: randomBetween(0.08, 0.16),
    alphaAmp: randomBetween(0.03, 0.08)
});

const InteractiveBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return undefined;
        }

        if (typeof window.matchMedia !== 'function') {
            return undefined;
        }

        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const prefersReducedMotion = Boolean(reducedMotionQuery && reducedMotionQuery.matches);
        if (prefersReducedMotion) {
            return undefined;
        }

        const coarsePointerQuery = window.matchMedia('(pointer: coarse)');
        const hasCoarsePointer = Boolean(coarsePointerQuery && coarsePointerQuery.matches);
        if (hasCoarsePointer) {
            return undefined;
        }

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) {
            return undefined;
        }

        let animationFrameId = 0;
        let isDestroyed = false;
        let isInView = true;
        let isHidden = document.hidden;
        let lastFrameTs = 0;

        const state = {
            width: 0,
            height: 0,
            dpr: 1,
            isMobile: false,
            frameInterval: 1000 / 30,
            connectionDistance: 95,
            connectionDistanceSq: 95 * 95,
            mouse: { x: null, y: null, radius: 90 },
            pointerClient: { x: null, y: null },
            particles: [],
            ambientParticles: []
        };

        const grid = new Map();
        const neighborOffsets = [
            [-1, -1], [0, -1], [1, -1],
            [-1, 0], [0, 0], [1, 0],
            [-1, 1], [0, 1], [1, 1]
        ];

        const updateMouseFromClient = () => {
            const { x, y } = state.pointerClient;
            if (x == null || y == null) {
                state.mouse.x = null;
                state.mouse.y = null;
                return;
            }

            const rect = canvas.getBoundingClientRect();
            const localX = x - rect.left;
            const localY = y - rect.top;

            if (localX < 0 || localX > rect.width || localY < 0 || localY > rect.height) {
                state.mouse.x = null;
                state.mouse.y = null;
                return;
            }

            state.mouse.x = localX;
            state.mouse.y = localY;
        };

        const setCanvasSize = () => {
            state.width = window.innerWidth;
            state.height = window.innerHeight;
            state.isMobile = state.width < MOBILE_BREAKPOINT;
            state.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            state.connectionDistance = state.isMobile ? 68 : 95;
            state.connectionDistanceSq = state.connectionDistance * state.connectionDistance;
            state.frameInterval = 1000 / (state.isMobile ? 24 : 30);

            canvas.width = Math.floor(state.width * state.dpr);
            canvas.height = Math.floor(state.height * state.dpr);
            canvas.style.width = `${state.width}px`;
            canvas.style.height = `${state.height}px`;
            ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
            updateMouseFromClient();
        };

        const createParticles = () => {
            const densityDivisor = state.isMobile ? 23500 : 16500;
            const byArea = Math.floor((state.width * state.height) / densityDivisor);
            const cap = state.isMobile ? MOBILE_PARTICLE_CAP : DESKTOP_PARTICLE_CAP;
            const count = Math.max(12, Math.min(cap, byArea));
            state.particles = Array.from({ length: count }, () => createParticle(state.width, state.height));

            const ambientCap = state.isMobile ? MOBILE_AMBIENT_CAP : DESKTOP_AMBIENT_CAP;
            const ambientByArea = Math.floor((state.width * state.height) / 42000);
            const ambientCount = Math.max(10, Math.min(ambientCap, ambientByArea));
            state.ambientParticles = Array.from(
                { length: ambientCount },
                () => createAmbientParticle(state.width, state.height)
            );
        };

        const handleResize = () => {
            setCanvasSize();
            createParticles();
        };

        const handlePointerMove = (event) => {
            state.pointerClient.x = event.clientX;
            state.pointerClient.y = event.clientY;
            updateMouseFromClient();
        };

        const handlePointerLeave = () => {
            state.pointerClient.x = null;
            state.pointerClient.y = null;
            state.mouse.x = null;
            state.mouse.y = null;
        };

        const handleVisibility = () => {
            isHidden = document.hidden;
        };

        const handleScroll = () => {
            updateMouseFromClient();
        };

        const buildGrid = () => {
            grid.clear();
            const cellSize = state.connectionDistance;

            for (let i = 0; i < state.particles.length; i += 1) {
                const p = state.particles[i];
                const cellX = Math.floor(p.x / cellSize);
                const cellY = Math.floor(p.y / cellSize);
                const key = `${cellX},${cellY}`;
                const entries = grid.get(key);
                if (entries) {
                    entries.push(i);
                } else {
                    grid.set(key, [i]);
                }
            }
        };

        const connectNearbyParticles = () => {
            const cellSize = state.connectionDistance;

            for (let i = 0; i < state.particles.length; i += 1) {
                const a = state.particles[i];
                const cellX = Math.floor(a.x / cellSize);
                const cellY = Math.floor(a.y / cellSize);

                for (let k = 0; k < neighborOffsets.length; k += 1) {
                    const [offsetX, offsetY] = neighborOffsets[k];
                    const key = `${cellX + offsetX},${cellY + offsetY}`;
                    const neighborIndices = grid.get(key);
                    if (!neighborIndices) {
                        continue;
                    }

                    for (let n = 0; n < neighborIndices.length; n += 1) {
                        const j = neighborIndices[n];
                        if (j <= i) {
                            continue;
                        }

                        const b = state.particles[j];
                        const dx = a.x - b.x;
                        const dy = a.y - b.y;
                        const distanceSq = dx * dx + dy * dy;

                        if (distanceSq > state.connectionDistanceSq) {
                            continue;
                        }

                        const opacity = (1 - distanceSq / state.connectionDistanceSq) * 0.2;
                        const lineColor = i % 2 === 0 ? '0,243,255' : '188,19,254';
                        ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
                        ctx.lineWidth = 0.55;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }
        };

        const drawAurora = (timestamp) => {
            const t = timestamp * 0.00016;
            const x1 = state.width * (0.26 + Math.sin(t) * 0.08);
            const y1 = state.height * (0.28 + Math.cos(t * 0.87) * 0.07);
            const x2 = state.width * (0.76 + Math.cos(t * 0.72) * 0.07);
            const y2 = state.height * (0.68 + Math.sin(t * 1.08) * 0.06);
            const r = Math.max(state.width, state.height) * 0.34;

            const glow1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, r);
            glow1.addColorStop(0, 'rgba(0, 243, 255, 0.09)');
            glow1.addColorStop(1, 'rgba(0, 243, 255, 0)');
            ctx.fillStyle = glow1;
            ctx.beginPath();
            ctx.arc(x1, y1, r, 0, Math.PI * 2);
            ctx.fill();

            const glow2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, r);
            glow2.addColorStop(0, 'rgba(188, 19, 254, 0.08)');
            glow2.addColorStop(1, 'rgba(188, 19, 254, 0)');
            ctx.fillStyle = glow2;
            ctx.beginPath();
            ctx.arc(x2, y2, r, 0, Math.PI * 2);
            ctx.fill();
        };

        const drawAmbientParticles = (timestamp) => {
            for (let i = 0; i < state.ambientParticles.length; i += 1) {
                const p = state.ambientParticles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x += state.width;
                if (p.x > state.width) p.x -= state.width;
                if (p.y < 0) p.y += state.height;
                if (p.y > state.height) p.y -= state.height;

                const alpha = p.alphaBase + Math.sin(timestamp * 0.0008 + p.phase) * p.alphaAmp;
                ctx.fillStyle = `rgba(185, 224, 255, ${alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const updateParticles = (timestamp) => {
            const { mouse } = state;

            for (let i = 0; i < state.particles.length; i += 1) {
                const p = state.particles[i];

                if (mouse.x != null && mouse.y != null) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const distanceSq = dx * dx + dy * dy;
                    const mouseRadiusSq = mouse.radius * mouse.radius;

                    if (distanceSq < mouseRadiusSq) {
                        const influence = 1 - distanceSq / mouseRadiusSq;
                        p.vx -= (dx * influence * 0.00018);
                        p.vy -= (dy * influence * 0.00018);
                    }
                }

                p.x += p.vx;
                p.y += p.vy;

                p.vx *= 0.995;
                p.vy *= 0.995;

                if (p.x < 0) p.x += state.width;
                if (p.x > state.width) p.x -= state.width;
                if (p.y < 0) p.y += state.height;
                if (p.y > state.height) p.y -= state.height;

                const alpha = p.alphaBase + Math.sin(timestamp * p.twinkleSpeed + p.twinklePhase) * p.alphaAmp;
                ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const drawMouseAura = () => {
            const { x, y } = state.mouse;
            if (x == null || y == null) {
                return;
            }

            const radius = state.isMobile ? 72 : 105;
            const aura = ctx.createRadialGradient(x, y, 0, x, y, radius);
            aura.addColorStop(0, 'rgba(0, 243, 255, 0.11)');
            aura.addColorStop(0.55, 'rgba(188, 19, 254, 0.06)');
            aura.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = aura;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        };

        const draw = (timestamp) => {
            ctx.clearRect(0, 0, state.width, state.height);
            drawAurora(timestamp);
            drawAmbientParticles(timestamp);
            updateParticles(timestamp);
            buildGrid();
            connectNearbyParticles();
            drawMouseAura();
        };

        const isRunning = () => isInView && !isHidden;

        const animate = (timestamp) => {
            if (isDestroyed) {
                return;
            }

            if (!isRunning()) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            if (timestamp - lastFrameTs >= state.frameInterval) {
                lastFrameTs = timestamp;
                draw(timestamp);
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                isInView = Boolean(entry?.isIntersecting);
            },
            { threshold: 0.05 }
        );
        observer.observe(canvas);

        setCanvasSize();
        createParticles();

        window.addEventListener('resize', handleResize, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('pointermove', handlePointerMove, { passive: true });
        window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
        document.addEventListener('visibilitychange', handleVisibility);
        animationFrameId = requestAnimationFrame(animate);

        return () => {
            isDestroyed = true;
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerleave', handlePointerLeave);
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, []);

        return (
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ opacity: 0.58 }}
                aria-hidden="true"
            />
        );
};

export default InteractiveBackground;
