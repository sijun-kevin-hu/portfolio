import React from 'react';
import '../index.css';
import linkedInLogo from '../images/linkedin-logo.png';
import githubLogo from '../images/github-logo.png';
import gmailLogo from '../images/gmail-logo.png';
import dev from '../images/dev.png';

const Hero = () => {
    return (
        <div className='hero-container relative flex flex-row items-center justify-between p-4'>
            <div className='relative z-10 flex flex-col gap-4'>
                <div className='pl-16 pt-14'>
                    <h1 className='text-8xl font-bold'>
                        Hi, I'm <br /> 
                        <span className='text-blue-600'>Kevin.</span>
                    </h1>

                    <div className='links flex items-center gap-4 mt-4'>
                        <button className='px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800'>
                            My Resume
                        </button>
                        
                        <div className='social-links flex gap-4 flex-shrink-0'>
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
                        I am a <span className='text-blue-600'>Software Engineer</span>
                    </p>
                </div>
            </div>
            <div className='dev-img w-full lg:w-1/2 max-w-md flex-shrink-0'>
                <img src={dev} alt="Dev Image" className='w-full h-auto object-contain' />
            </div>
        </div>
    );
};

export default Hero;