import React, { useEffect, useRef } from 'react';

const InteractiveBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let mouse = { x: null, y: null, radius: 200 };
        let resizeTimeout;

        // Configuration state
        let state = {
            width: 0,
            height: 0,
            isMobile: false,
            connectionDistance: 120,
            connectionDistanceSq: 14400
        };

        class Particle {
            constructor() {
                this.x = Math.random() * state.width;
                this.y = Math.random() * state.height;
                this.vx = (Math.random() - 0.5) * 0.2;
                this.vy = (Math.random() - 0.5) * 0.2;
                this.size = Math.random() * 1.5 + 0.5;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 20) + 1;
                // Subtler colors
                this.color = Math.random() > 0.6 ? 'rgba(0, 243, 255, 0.5)' : 'rgba(188, 19, 254, 0.4)';
            }

            update() {
                // Gentle mouse interaction
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        const maxDistance = mouse.radius;
                        const force = (maxDistance - distance) / maxDistance;
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const directionX = forceDirectionX * force * this.density * 0.6;
                        const directionY = forceDirectionY * force * this.density * 0.6;

                        if (distance < mouse.radius) {
                            this.x -= directionX;
                            this.y -= directionY;
                        }
                    }
                }

                this.x += this.vx;
                this.y += this.vy;

                // Wrap around screen
                if (this.x < 0) this.x = state.width;
                else if (this.x > state.width) this.x = 0;

                if (this.y < 0) this.y = state.height;
                else if (this.y > state.height) this.y = 0;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
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

            // Adjusted density for cleaner look
            const densityDivisor = state.isMobile ? 15000 : 10000;
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

            // Draw particles and connections
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Connect particles
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distanceSq = dx * dx + dy * dy;

                    if (distanceSq < state.connectionDistanceSq) {
                        const opacity = 1 - (distanceSq / state.connectionDistanceSq);
                        ctx.strokeStyle = `rgba(100, 100, 120, ${opacity * 0.15})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
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
            style={{ opacity: 0.6 }}
        />
    );
};

export default InteractiveBackground;
