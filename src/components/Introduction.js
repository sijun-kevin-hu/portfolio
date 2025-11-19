import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { technicalFrameworks, technicalLanguages } from '../data/techStack';

const IntroCard = () => {
    const cardRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    // Select a few icons for the floating animation
    const floatingIcons = [
        technicalFrameworks[0].img, // React
        technicalLanguages[0].img,  // Python
        technicalLanguages[2].img,  // JavaScript
        technicalFrameworks[3].img  // Tailwind
    ];

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            onMouseMove={handleMouseMove}
            className="relative w-full mb-8 group"
        >
            {/* Abstract Background Shape */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-3xl transform -skew-y-1 group-hover:skew-y-0 transition-transform duration-500" />
            
            <div className="relative bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden">
                {/* Spotlight Effect */}
                <div 
                    className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                        background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.1), transparent 40%)`
                    }}
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Content Side */}
                    <div className="lg:col-span-7 space-y-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm font-medium rounded-full border border-cyan-500/30">
                                    About Me
                                </span>
                                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm font-medium rounded-full border border-purple-500/30">
                                    Georgia Tech '25
                                </span>
                            </div>
                            
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 group-hover:text-cyan-400 transition-colors duration-300">
                                Who I Am
                            </h3>
                            
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                Hey, I'm Kevin 👋 GT CS senior. I build web stuff that people actually use. Shipping code > everything else.
                            </p>

                            <h3 className="text-2xl font-bold text-white mb-4">
                                What I Do
                            </h3>
                            
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Tech stack hopper. Frontend, backend, whatever works. If it's cool, I'm building it. Obsessed with pixel-perfect UIs and buttery smooth interactions.
                            </p>
                        </div>
                    </div>

                    {/* Visual Side */}
                    <div className="lg:col-span-5 relative h-full min-h-[400px] rounded-xl overflow-hidden bg-gray-800/30 border border-white/5 group-hover:border-cyan-500/20 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent opacity-50" />
                        
                        {/* Code snippet decoration */}
                        <div className="absolute inset-4 bg-gray-900/80 rounded-lg p-6 font-mono text-sm text-gray-400 overflow-hidden opacity-90 shadow-2xl">
                            <div className="flex gap-1.5 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="space-y-2">
                                <p><span className="text-purple-400">const</span> <span className="text-blue-400">kevin</span> = <span className="text-yellow-400">{'{'}</span></p>
                                <p className="pl-4"><span className="text-blue-300">university</span>: <span className="text-green-400">"Georgia Tech"</span>,</p>
                                <p className="pl-4"><span className="text-blue-300">major</span>: <span className="text-green-400">"Computer Science"</span>,</p>
                                <p className="pl-4"><span className="text-blue-300">year</span>: <span className="text-orange-400">4</span>,</p>
                                <p className="pl-4"><span className="text-blue-300">passion</span>: <span className="text-green-400">"Building cool stuff"</span>,</p>
                                <p className="pl-4"><span className="text-blue-300">coffee</span>: <span className="text-purple-400">true</span>,</p>
                                <p className="pl-4"><span className="text-blue-300">sleep</span>: <span className="text-purple-400">false</span></p>
                                <p><span className="text-yellow-400">{'}'}</span>;</p>
                            </div>
                        </div>

                        {/* Floating Tech Icons */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="relative w-full h-full">
                                {floatingIcons.map((icon, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute"
                                        style={{
                                            top: `${20 + i * 25}%`,
                                            right: `${10 + (i % 2) * 40}%`,
                                        }}
                                        animate={{
                                            y: [0, -15, 0],
                                            rotate: [0, 10, 0]
                                        }}
                                        transition={{
                                            duration: 3 + i,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: i * 0.5
                                        }}
                                    >
                                        <div className="p-3 bg-gray-900/90 rounded-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10 backdrop-blur-sm">
                                            <img src={icon} alt="tech" className="w-10 h-10" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const InfoCard = ({ title, content, icon, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5 }}
            className="group relative bg-gray-900/50 border border-white/5 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 flex flex-col h-full"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="p-8 relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 bg-gray-800 rounded-lg border border-white/10 flex items-center justify-center mb-6 group-hover:border-cyan-500/50 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-300">
                    {icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                    {title}
                </h3>

                <p className="text-gray-400 leading-relaxed flex-grow">
                    {content}
                </p>
            </div>
        </motion.div>
    );
};

const Introduction = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <section ref={ref} className="section-padding relative overflow-hidden py-20" id="about">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] opacity-30" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] opacity-30" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-cyan-400 font-mono text-sm tracking-wider mb-4">DISCOVER</h2>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Me</span>
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>

                {/* Main Featured Card */}
                <IntroCard />

                {/* Secondary Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoCard 
                        title="My Approach"
                        content="Debugging at 2AM is a lifestyle. I write clean code and design UX that doesn't make you rage quit. Simple, effective, and aesthetic."
                        delay={0.2}
                        icon={
                            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        }
                    />
                    <InfoCard 
                        title="Let's Connect"
                        content="Got a crazy idea? Let's build it. Open to collabs, tech chats, or just sending memes. (React > everything else, don't @ me)."
                        delay={0.4}
                        icon={
                            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        }
                    />
                </div>
            </div>
        </section>
    );
};

export default Introduction;
