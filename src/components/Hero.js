import React, { useEffect, useState } from 'react';
import '../index.css';
import linkedInLogo from '../images/linkedin-logo.png';
import githubLogo from '../images/github-logo.png';
import gmailLogo from '../images/gmail-logo.png';
import dev from '../images/dev.png';

const Hero = () => {
    const [displayedText, setDisplayedText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100); // Adjust typing speed (in ms)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const words = ['Web Developer.', 'Software Developer.', 'Computer Science Student.'];

        const handleTyping = () => {
            const currentWord = words[wordIndex];
            const nextText = isDeleting
                ? currentWord.slice(0, displayedText.length - 1) // Remove one letter
                : currentWord.slice(0, displayedText.length + 1); // Add one letter

            setDisplayedText(nextText);

            if (!isDeleting && nextText === currentWord) {
                // Pause at the full word
                setIsDeleting(true);
                setTypingSpeed(2000); // Pause time (ms)
            } else if (isDeleting && nextText === '') {
                // Move to the next word when fully deleted
                setIsDeleting(false);
                setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
                setTypingSpeed(200); // Adjust speed for the next word typing
            } else {
                // Normal typing/deleting speed
                setTypingSpeed(100);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(timer); // Cleanup timeout
    }, [displayedText, isDeleting, typingSpeed, wordIndex]);


    return (
        <div className='hero-container relative flex flex-col md:-mt-24 md:flex-row md:justify-between items-center px-6 lg:px-24 mt-8'>
            <div className='flex'>
                <div className='pl-8 md:pl-18'>
                    <h1 className='text-8xl font-bold'>
                        Hi, I'm <br /> 
                        <span className='text-blue-600'>Kevin.</span>
                    </h1>

                    <div className='links flex items-center gap-2 md:gap-4 mt-4'>
                        <button className='px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex-shrink-0'>
                            <a href='/resume.pdf' download='kevin-hu-resume.pdf'>
                                My Resume
                            </a>
                        </button>
                        
                        <div className='social-links flex gap-2 md:gap-4 flex-shrink-0'>
                            <a href='https://linkedin.com/in/sijunkevinhu' className='hover:scale-110 transition-transfrom'>
                                <img src={linkedInLogo} alt="LinkedIn" className='w-12 h-12' />
                            </a>
                            <a href='https://github.com/sijun-kevin-hu' className='hover:scale-110 transition-transfrom'>
                                <img src={githubLogo} alt="GitHub" className='w-12 h-12' />
                            </a>
                            <a href='mailto:kevinhu91846@gmail.com' className='hover:scale-110 transition-transfrom'>
                                <img src={gmailLogo} alt="Gmail" className='w-12 h-12' />
                            </a>
                        </div>
                    </div>

                    <p className='text-xl mt-4 font-bold'>
                        I am a {' '}
                        <span className='text-blue-600'>
                            {displayedText}
                            <span className='blink-cursor'></span>
                        </span>
                    </p>
                </div>
            </div>
            <div className='w-full lg:w-1/2 max-w-md flex justify-center flex-shrink-0 -mt-16 lg:mt-0'>
                <img src={dev} alt="Dev" className='w-full h-auto object-contain max-w-xs sm:max-w-md lg:max-w-lg' />
            </div>
        </div>
    );
};

export default Hero;