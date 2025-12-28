import React, { useEffect, useRef } from 'react';

// Highly performant custom cursor that bypasses React render cycle for movement
const CustomCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;

        // Use requestAnimationFrame for smooth movement references
        let requestRef;
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        // Speed factor for the trailing circle (0.1 = slow/smooth, 1 = instant)
        // Increased speed slightly since it's the only element now
        const speed = 0.2;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const animate = () => {
            // Smooth follow logic for the main ring
            const distX = mouseX - cursorX;
            const distY = mouseY - cursorY;

            cursorX += distX * speed;
            cursorY += distY * speed;

            if (cursor) {
                cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
            }

            requestRef = requestAnimationFrame(animate);
        };

        // Add event listeners
        window.addEventListener('mousemove', onMouseMove);
        requestRef = requestAnimationFrame(animate);

        // Hover effect logic
        const handleMouseOver = (e) => {
            const target = e.target;
            // Check if hovering over clickable elements
            if (target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('clickable')) {
                cursor.classList.add('hovering');
            }
        };

        const handleMouseOut = (e) => {
            const target = e.target;
            if (target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('clickable')) {
                cursor.classList.remove('hovering');
            }
        };

        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(requestRef);
        };
    }, []);

    // Inline styles for critical performance and scope isolation
    const styles = {
        cursor: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '24px', // Slightly smaller
            height: '24px', // Slightly smaller
            border: '2px solid var(--color-neon-cyan, #00f3ff)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9999,
            transform: 'translate3d(-100px, -100px, 0)', // Initial off-screen
            transition: 'width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s',
            boxShadow: '0 0 10px rgba(0, 243, 255, 0.3)',
            mixBlendMode: 'difference',
            // Centering the circle on the coordinate
            marginTop: '-12px',
            marginLeft: '-12px',
        }
    };

    return (
        <>
            <style>
                {`
                    /* Hover states */
                    .custom-cursor.hovering {
                        width: 48px !important;
                        height: 48px !important;
                        background-color: rgba(0, 243, 255, 0.1);
                        border-color: var(--color-neon-purple, #bc13fe) !important;
                        margin-top: -24px !important;
                        margin-left: -24px !important;
                    }
                    
                    /* Hide on mobile/touch devices */
                    @media (hover: none) and (pointer: coarse) {
                        .custom-cursor {
                            display: none !important;
                        }
                    }
                `}
            </style>
            <div ref={cursorRef} className="custom-cursor" style={styles.cursor} />
        </>
    );
};

export default CustomCursor;
