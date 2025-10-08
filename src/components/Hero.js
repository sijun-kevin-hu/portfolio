import { useEffect, useState } from 'react';
import '../index.css';
import linkedInLogo from '../images/linkedin-logo.png';
import githubLogo from '../images/github-logo.png';
import gmailLogo from '../images/gmail-logo.png';
import dev from '../images/dev.png';
import { CONTACT_INFO, CAROUSEL_PHRASES} from '../constants';

const Hero = () => {
    const [displayedText, setDisplayedText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);
    const [isVisible, setIsVisible] = useState(false);
    const words = CAROUSEL_PHRASES.words;

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        const handleTyping = () => {
            const currentWord = words[wordIndex];
            const nextText = isDeleting
                ? currentWord.slice(0, displayedText.length - 1)
                : currentWord.slice(0, displayedText.length + 1);

            setDisplayedText(nextText);

            if (!isDeleting && nextText === currentWord) {
                setIsDeleting(true);
                setTypingSpeed(2000);
            } else if (isDeleting && nextText === '') {
                setIsDeleting(false);
                setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
                setTypingSpeed(200);
            } else {
                setTypingSpeed(100);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, typingSpeed, wordIndex, words]);

    return (
        <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
            {/* Cyberpunk background effects */}
            <div className='absolute inset-0 overflow-hidden'>
                {/* Grid overlay */}
                <div className='absolute inset-0 grid-overlay opacity-20'></div>
                
                {/* Floating geometric shapes */}
                <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full filter blur-xl animate-pulse'></div>
                <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-xl animate-pulse'></div>
                <div className='absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-xl animate-pulse'></div>
                
                
                {/* Subtle floating particles */}
                <div className='absolute inset-0'>
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className='absolute w-1 h-1 bg-cyan-400/30 rounded-full matrix-rain'
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${8 + Math.random() * 4}s`
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                    {/* Left side - Text content */}
                    <div className={`space-y-8 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
                        <div className='space-y-4'>
                            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight'>
                                Hi, I'm{' '}
                                <span className='gradient-text'>Kevin.</span>
                            </h1>
                            
                            <p className='text-xl sm:text-2xl md:text-3xl text-gray-200 font-medium'>
                                I am a{' '}
                                <span className='text-cyan-400 font-semibold'>
                                    {displayedText}
                                    <span className='blink-cursor'></span>
                                </span>
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
                            <a 
                                href='/resume.pdf' 
                                download='kevin-hu-resume.pdf'
                                className='btn-primary inline-flex items-center justify-center group'
                            >
                                <span>Download Resume</span>
                                <svg className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                                </svg>
                            </a>
                            
                            <a 
                                href='#projects' 
                                className='btn-secondary inline-flex items-center justify-center group'
                            >
                                <span>View Projects</span>
                                <svg className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                                </svg>
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className='flex items-center gap-4 sm:gap-6'>
                            <span className='text-gray-400 font-medium'>Connect with me:</span>
                            <div className='flex gap-3 sm:gap-4'>
                                <a 
                                    href={CONTACT_INFO.linkedin}
                                    className='p-3 bg-gray-800/50 rounded-full border border-cyan-500/30 hover:border-cyan-400 hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    <img src={linkedInLogo} alt="LinkedIn" className='w-6 h-6 sm:w-8 sm:h-8' />
                                </a>
                                <a 
                                    href={CONTACT_INFO.github}
                                    className='p-3 bg-gray-800/50 rounded-full border border-cyan-500/30 hover:border-cyan-400 hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    <img src={githubLogo} alt="GitHub" className='w-6 h-6 sm:w-8 sm:h-8' />
                                </a>
                                <a 
                                    href={"mailto:" + CONTACT_INFO.email}
                                    className='p-3 bg-gray-800/50 rounded-full border border-cyan-500/30 hover:border-cyan-400 hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    <img src={gmailLogo} alt="Gmail" className='w-6 h-6 sm:w-8 sm:h-8' />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Image */}
                    <div className={`flex justify-center lg:justify-end ${isVisible ? 'slide-in-left' : 'opacity-0'}`}>
                        <div className='relative'>
                            <div className='absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur-3xl opacity-30 animate-pulse'></div>
                            <div className='absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur-2xl opacity-20 animate-pulse' style={{animationDelay: '1s'}}></div>
                            <img 
                                src={dev} 
                                alt="Developer illustration" 
                                className='relative w-full max-w-md lg:max-w-lg xl:max-w-xl float hover:scale-105 transition-transform duration-500 hologram'
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
                <div className='w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center'>
                    <div className='w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse'></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;