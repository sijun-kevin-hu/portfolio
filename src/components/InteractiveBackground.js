import React, { useEffect, useRef } from 'react';

const InteractiveBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };
        let resizeTimeout;
        
        // Configuration state to avoid constant recalculation
        let state = {
            width: 0,
            height: 0,
            isMobile: false,
            connectionDistance: 100,
            connectionDistanceSq: 10000
        };

        class Particle {
            constructor() {
                this.x = Math.random() * state.width;
                this.y = Math.random() * state.height;
                this.vx = 0;
                this.vy = 0;
                this.size = Math.random() * 2 + 1;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
                this.color = Math.random() > 0.5 ? '#00ffff' : '#ff00ff';
            }

            update() {
                // Physics based interaction for smooth movement
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < mouse.radius) {
                        const maxDistance = mouse.radius;
                        const force = (maxDistance - distance) / maxDistance;
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        
                        // Reduced power for gentler, smoother movement
                        const power = force * this.density * 0.05;
                        
                        this.vx -= forceDirectionX * power;
                        this.vy -= forceDirectionY * power;
                    }
                }

                // Spring back to base - gentler spring
                const dxBase = this.baseX - this.x;
                const dyBase = this.baseY - this.y;
                const springStrength = 0.02;

                this.vx += dxBase * springStrength;
                this.vy += dyBase * springStrength;

                // Higher friction for smoother, slower movement
                this.vx *= 0.95;
                this.vy *= 0.95;

                this.x += this.vx;
                this.y += this.vy;
            }
        }

        const updateState = () => {
            state.width = window.innerWidth;
            state.height = window.innerHeight;
            state.isMobile = state.width < 768;
            state.connectionDistance = state.isMobile ? 80 : 120; 
            state.connectionDistanceSq = state.connectionDistance * state.connectionDistance;
            
            canvas.width = state.width;
            canvas.height = state.height;
        };

        const init = () => {
            particles = [];
            updateState();
            
            // Significantly increased particle count
            const densityDivisor = state.isMobile ? 20000 : 9000;
            const numberOfParticles = (state.width * state.height) / densityDivisor;
            
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const handleResize = () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(init, 100);
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };

        const animate = () => {
            ctx.clearRect(0, 0, state.width, state.height);
            
            const cellSize = state.connectionDistance;
            const cols = Math.ceil(state.width / cellSize);
            const rows = Math.ceil(state.height / cellSize);
            const grid = new Array(cols * rows);
            
            // Batched drawing lists
            const cyanParticles = [];
            const magentaParticles = [];
            // Line buckets for opacity levels (0.1 to 1.0)
            // Index 0 = opacity > 0 && <= 0.1, Index 9 = opacity > 0.9 && <= 1.0
            const lineBuckets = Array(10).fill(null).map(() => []); 
            
            // 1. Update particles and populate grid
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.update();
                
                // Add to grid
                const col = Math.floor(p.x / cellSize);
                const row = Math.floor(p.y / cellSize);
                
                if (col >= 0 && col < cols && row >= 0 && row < rows) {
                    const index = row * cols + col;
                    if (!grid[index]) grid[index] = [];
                    grid[index].push(i);
                }
                
                if (p.color === '#00ffff') cyanParticles.push(p);
                else magentaParticles.push(p);
            }
            
            // 2. Draw Particles
            ctx.fillStyle = '#00ffff';
            ctx.beginPath();
            for (let p of cyanParticles) {
                ctx.moveTo(p.x + p.size, p.y);
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            }
            ctx.fill();
            
            ctx.fillStyle = '#ff00ff';
            ctx.beginPath();
            for (let p of magentaParticles) {
                ctx.moveTo(p.x + p.size, p.y);
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            }
            ctx.fill();

            // 3. Calculate Connections and Bucket them
            const neighbors = [
                { dx: 1, dy: 0 },
                { dx: -1, dy: 1 },
                { dx: 0, dy: 1 },
                { dx: 1, dy: 1 }
            ];

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const index = y * cols + x;
                    const cellParticles = grid[index];
                    
                    if (!cellParticles || cellParticles.length === 0) continue;

                    for (let i = 0; i < cellParticles.length; i++) {
                        const pA = particles[cellParticles[i]];

                        // Same cell connections
                        for (let j = i + 1; j < cellParticles.length; j++) {
                            const pB = particles[cellParticles[j]];
                            queueConnection(pA, pB, lineBuckets);
                        }

                        // Neighbor cell connections
                        for (let offset of neighbors) {
                            const nx = x + offset.dx;
                            const ny = y + offset.dy;

                            if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
                                const nIndex = ny * cols + nx;
                                const neighborParticles = grid[nIndex];
                                if (neighborParticles) {
                                    for (let k = 0; k < neighborParticles.length; k++) {
                                        const pB = particles[neighborParticles[k]];
                                        queueConnection(pA, pB, lineBuckets);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // 4. Draw Lines from Buckets
            ctx.lineWidth = 0.5;
            for (let i = 0; i < lineBuckets.length; i++) {
                const bucket = lineBuckets[i];
                if (bucket.length === 0) continue;

                // Opacity: index 0 is approx 0.1, index 9 is approx 1.0
                const opacity = (i + 1) / 10; 
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.beginPath();
                
                for (let j = 0; j < bucket.length; j += 4) {
                    ctx.moveTo(bucket[j], bucket[j+1]);
                    ctx.lineTo(bucket[j+2], bucket[j+3]);
                }
                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const queueConnection = (pA, pB, buckets) => {
            let dx = pA.x - pB.x;
            let dy = pA.y - pB.y;
            
            if (Math.abs(dx) > state.connectionDistance) return;
            if (Math.abs(dy) > state.connectionDistance) return;

            let distanceSq = dx * dx + dy * dy;

            if (distanceSq < state.connectionDistanceSq) {
                let distance = Math.sqrt(distanceSq);
                // 1 - distance/max = alpha. 
                // if distance is small, alpha is 1.
                // if distance is max, alpha is 0.
                let alpha = 1 - (distance / state.connectionDistance);
                
                // Map alpha 0..1 to index 0..9
                let bucketIdx = Math.floor(alpha * 10);
                if (bucketIdx < 0) bucketIdx = 0;
                if (bucketIdx > 9) bucketIdx = 9;
                
                buckets[bucketIdx].push(pA.x, pA.y, pB.x, pB.y);
            }
        };

        // Initialize
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);
        
        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            if (resizeTimeout) clearTimeout(resizeTimeout);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ opacity: 0.3 }}
        />
    );
};

export default InteractiveBackground;
