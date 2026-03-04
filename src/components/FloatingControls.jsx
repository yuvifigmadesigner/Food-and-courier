import React, { useState, useEffect } from 'react';
import FullScreenIcon from '../assets/full screen.svg';

const FloatingControls = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [hasPulsed, setHasPulsed] = useState(false); // Track if impulse animation has stopped

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
            setHasPulsed(true); // Stop animation once user clicks to enter
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const buttonStyle = {
        backgroundColor: 'rgba(30, 41, 59, 0.4)', // More transparent for glass effect
        color: '#fff',
        border: '1px solid rgba(255, 255, 255, 0.15)', // Subtle border
        borderRadius: '50%',
        width: '3.5rem',
        height: '3.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backdropFilter: 'blur(16px) saturate(180%)', // iOS Glass effect
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.36)', // Deeper shadow
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        outline: 'none',
        position: 'relative',
        overflow: 'hidden',
    };

    const handleMouseEnter = (e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.4)'; // Restore glass effect
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
        }}>
            {/* Inline Styles for Beam Animation */}
            <style>
                {`
                    @keyframes lightBeam {
                        0% { left: -100%; opacity: 0; }
                        50% { opacity: 1; }
                        100% { left: 100%; opacity: 0; }
                    }
                    .beam-effect::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: -100%;
                        width: 50%;
                        height: 100%;
                        background: linear-gradient(
                            to right,
                            rgba(56, 189, 248, 0) 0%,
                            rgba(235, 249, 255, 0.6) 50%,
                            rgba(56, 189, 248, 0) 100%
                        );
                        transform: skewX(-25deg);
                        animation: lightBeam 2.5s infinite;
                        pointer-events: none;
                    }
                `}
            </style>

            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                style={{
                    ...buttonStyle,
                    opacity: showScrollTop ? 1 : 0,
                    pointerEvents: showScrollTop ? 'auto' : 'none',
                    transform: showScrollTop ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                    if (showScrollTop) handleMouseEnter(e);
                }}
                onMouseLeave={(e) => {
                    if (showScrollTop) handleMouseLeave(e);
                }}
                title="Scroll to Top"
                aria-label="Scroll to Top"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19V5" />
                    <path d="M5 12l7-7 7 7" />
                </svg>
            </button>

            {/* Fullscreen Button with Beam Effect */}
            <button
                onClick={toggleFullscreen}
                // Apply 'beam-effect' class ONLY if not pulsed yet and not fullscreen
                className={!hasPulsed && !isFullscreen ? "beam-effect" : ""}
                style={buttonStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
                {isFullscreen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                        <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                        <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                        <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                    </svg>
                ) : (
                    <img src={FullScreenIcon} alt="Full Screen" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                )}
            </button>
        </div>
    );
};

export default FloatingControls;
