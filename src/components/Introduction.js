import React, { useState, useEffect } from 'react';

const Introduction = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const element = document.getElementById('about');
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    return (
        <section className='section-padding relative overflow-hidden' id='about'>
            {/* Cyberpunk background effects */}
            <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full filter blur-xl opacity-50'></div>
                <div className='absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full filter blur-xl opacity-50'></div>
                <div className='absolute inset-0 grid-overlay opacity-10'></div>
            </div>

            <div className='relative z-10 max-w-7xl mx-auto'>
                <div className={`text-center mb-16 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
                    <h2 className='text-cyan-400 uppercase font-bold text-sm tracking-wider mb-4'>
                        About Me
                    </h2>
                    <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6'>
                        Introduction.
                    </h1>
                    <div className='w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full'></div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                    {/* Left side - Text content */}
                    <div className={`space-y-6 ${isVisible ? 'slide-in-left' : 'opacity-0'}`}>
                        <div className='cyber-card p-8 hover-lift'>
                            <div className='flex items-center mb-4'>
                                <div className='w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mr-4'>
                                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                                    </svg>
                                </div>
                                <h3 className='text-xl font-semibold text-white'>Who I Am</h3>
                            </div>
                            <p className='text-gray-300 leading-relaxed'>
                                Hi, I'm Kevin! I'm a fourth-year Computer Science student at Georgia Tech with a passion for full-stack engineering and web development. 
                                I love building apps that not only work well but also make an impact on the people who use them.
                            </p>
                        </div>

                        <div className='cyber-card p-8 hover-lift'>
                            <div className='flex items-center mb-4'>
                                <div className='w-12 h-12 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full flex items-center justify-center mr-4'>
                                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
                                    </svg>
                                </div>
                                <h3 className='text-xl font-semibold text-white'>What I Do</h3>
                            </div>
                            <p className='text-gray-300 leading-relaxed'>
                                I'm always excited to learn new technologies and take on challenges that push me to grow. 
                                Whether it's creating sleek, user-friendly interfaces or building out efficient backends, I enjoy every part of the process that brings ideas to life.
                            </p>
                        </div>
                    </div>

                    {/* Right side - Additional content */}
                    <div className={`space-y-6 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
                        <div className='cyber-card p-8 hover-lift'>
                            <div className='flex items-center mb-4'>
                                <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4'>
                                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                                    </svg>
                                </div>
                                <h3 className='text-xl font-semibold text-white'>My Approach</h3>
                            </div>
                            <p className='text-gray-300 leading-relaxed'>
                                Outside of coding, I'm always looking for ways to get creative and explore how technology can solve real-world problems.
                                I believe in writing clean, maintainable code and creating intuitive user experiences.
                            </p>
                        </div>

                        <div className='cyber-card p-8 hover-lift'>
                            <div className='flex items-center mb-4'>
                                <div className='w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-4'>
                                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                                    </svg>
                                </div>
                                <h3 className='text-xl font-semibold text-white'>Let's Connect</h3>
                            </div>
                            <p className='text-gray-300 leading-relaxed'>
                                I'd love to collaborate on exciting projects or share ideas! Whether you have a project in mind or just want to chat about technology, 
                                feel free to reach out.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Call to action */}
                <div className={`text-center mt-16 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
                    <a 
                        href='#projects' 
                        className='btn-primary inline-flex items-center group'
                    >
                        <span>View My Work</span>
                        <svg className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Introduction;