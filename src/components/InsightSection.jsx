import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ribbonSvg from '../assets/ribbon.svg';
import vectorIcon from '../assets/Vector 2.svg';
import increaseIcon from '../assets/increase-svgrepo-com.svg';

// Geometric Shape Components for the "Design" feel
const GeometricShapes = () => (
    <>
        {/* Green Semi-Circle Left */}
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '-20px',
            width: '60px',
            height: '100px',
            backgroundColor: '#10B981',
            borderTopRightRadius: '100px',
            borderBottomRightRadius: '100px',
            transform: 'translateY(-50%)',
            zIndex: 1
        }} />

        {/* Red Circle Bottom */}
        <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '40px',
            width: '60px',
            height: '60px',
            backgroundColor: '#EF4444',
            borderRadius: '50%',
            zIndex: 1
        }} />

        {/* Yellow Triangle Top Right (CSS Triangle) */}
        <div style={{
            position: 'absolute',
            top: '60px',
            right: '30px',
            width: 0,
            height: 0,
            borderLeft: '35px solid transparent',
            borderRight: '35px solid transparent',
            borderBottom: '60px solid #F59E0B',
            transform: 'rotate(15deg)',
            zIndex: 1
        }} />

        {/* Blue Square Bottom Right */}
        <div style={{
            position: 'absolute',
            bottom: '50px',
            right: '-10px',
            width: '70px',
            height: '70px',
            backgroundColor: '#3B82F6',
            transform: 'rotate(50deg)',
            zIndex: 1
        }} />
    </>
);

const CARD_DATA = [
    {
        id: 'arch',
        tag: "Architecture",
        title: "SCALABILITY & FLEXIBILITY",
        subtitle: "A SYSTEM BUILT FOR GROWTH",
        icon: increaseIcon,
        bg: '#bfd7ea',
        // Reverted to Previous Blue Theme
        backBg: '#0F172A',
        backAccent: '#38BDF8',
        backText: '#CBD5E1',
        points: [
            { headline: "Atomic Design System", desc: "Exhaustive, template-based component library for rapid deployment." },
            { headline: "Designer Onboarding", desc: "Standardized library ensures quick learning curve and top-tier quality." },
            { headline: "Collaborative Planning", desc: "Notion-based tracking board for seamless cross-team documentation." }
        ]
    },
    {
        id: 'identity',
        tag: "Identity",
        title: "EXTENDING THE BRAND",
        subtitle: "A UNIFIED EXPERIENCE",
        icon: vectorIcon,
        bg: '#ebf2fa',
        // Back Face: Premium Brand (Deep Wine + Peach)
        backBg: '#2a0a18',
        backAccent: '#fba5a5', // Soft Peach
        backText: '#e2e8f0',
        points: [
            { headline: "Cohesive Visual Language", desc: "Modular design system across app, web, and social media." },
            { headline: "Multilingual Accessibility", desc: "Informative visuals for diverse Tier-2 markets like Silvassa." },
            { headline: "Unified Trust Signals", desc: "Standardized badges and value engines for safety and transparency." }
        ]
    }
];

const PaperCard = ({ data, isFlipped }) => {
    return (
        <div style={{ width: '320px', height: '460px', perspective: '1000px' }}>
            <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* FRONT FACE */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    backgroundColor: data.bg || '#edede9', // Use data.bg
                    borderRadius: '2rem',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #E2E8F0',
                }}>
                    <div style={{
                        backgroundColor: '#FCD34D',
                        color: '#78350F',
                        padding: '0.3rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        marginBottom: '2rem',
                        alignSelf: 'center'
                    }}>
                        {data.tag}
                    </div>

                    <h3 style={{
                        fontSize: '2rem',
                        fontWeight: '800',
                        lineHeight: 1.1,
                        color: '#1E293B',
                        marginBottom: '0.5rem',
                        textAlign: 'center',
                        textTransform: 'uppercase'
                    }}>
                        {data.title}
                    </h3>
                    <p style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#64748B', textAlign: 'center', marginBottom: '3rem', letterSpacing: '0.1em' }}>
                        {data.subtitle}
                    </p>

                    <div style={{
                        width: '100%',
                        flex: 1,
                        backgroundColor: '#E2E8F0',
                        borderRadius: '1rem',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <GeometricShapes />
                        <div style={{
                            width: '80%', height: '70%', backgroundColor: '#fff', borderRadius: '0.5rem',
                            border: '2px solid #1E293B', zIndex: 2, boxShadow: '4px 4px 0px #1E293B',
                            display: 'flex', flexDirection: 'column'
                        }}>
                            <div style={{ height: '20px', borderBottom: '2px solid #1E293B', display: 'flex', alignItems: 'center', paddingLeft: '6px', gap: '4px' }}>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#EF4444' }}></div>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F59E0B' }}></div>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }}></div>
                            </div>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {data.id === 'arch' ? (
                                    <img
                                        src={increaseIcon}
                                        alt=""
                                        loading="lazy"
                                        style={{ width: '40px', height: '40px', objectFit: 'contain', opacity: 0.8 }}
                                    />
                                ) : data.id === 'identity' ? (
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        backgroundColor: '#323232',
                                        WebkitMask: `url(${vectorIcon}) no-repeat center / contain`,
                                        mask: `url(${vectorIcon}) no-repeat center / contain`
                                    }} />
                                ) : (
                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E293B' }}>&lt;/&gt;</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* BACK FACE */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    backgroundColor: data.backBg || '#1E293B', // Dynamic Background
                    borderRadius: '2rem',
                    padding: '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
                    border: `1px solid ${data.backAccent ? data.backAccent + '40' : '#334155'}` // Dynamic Border
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {data.points.map((point, i) => (
                            <div key={i}>
                                <h5 style={{ fontSize: '1.1rem', fontWeight: '700', color: data.backAccent || '#60A5FA', marginBottom: '0.4rem' }}>{point.headline}</h5>
                                <p style={{ fontSize: '0.9rem', color: data.backText || '#94A3B8', lineHeight: '1.5' }}>{point.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const ActionButton = ({ text, onClick, filled }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                padding: '1rem 2rem', // Larger, more premium feel
                borderRadius: '16px', // Modern rounded rect
                fontSize: '1rem',
                fontWeight: '800',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem', // Space between text and icon

                // Colors and Borders
                border: filled ? 'none' : `1px solid ${isHovered ? '#fff' : 'rgba(255,255,255,0.3)'}`, // Standardized white border for outline
                backgroundColor: filled ? '#bce4ff' : (isHovered ? 'rgba(255,255,255,0.1)' : 'transparent'), // Glass hover for outline
                color: filled ? '#0F172A' : '#fff', // Dark text on light button, White text on outline

                // Shadows and Effects
                boxShadow: filled
                    ? (isHovered ? '0 10px 25px -5px rgba(188, 228, 255, 0.6)' : '0 4px 15px -3px rgba(188, 228, 255, 0.3)')
                    : 'none',
                transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                backdropFilter: filled ? 'none' : 'blur(4px)'
            }}
        >
            {text}
            {/* Icons */}
            {filled ? (
                // Eye Icon for "Show me"
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            ) : (
                // Arrow Right for "Next card"
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isHovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.3s' }}>
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                </svg>
            )}
        </button>
    );
};

// Card shuffle animation variants
const cardVariants = {
    front: {
        x: 0,
        y: 0,
        scale: 1,
        zIndex: 10,
        opacity: 1,
        rotate: 4, // Subtle tilt right (3-4 deg)
        rotateY: 0,
        transition: {
            duration: 0.6,
            ease: "easeInOut"
        }
    },
    back: {
        x: -15, // Slight offset to left for visibility
        y: 15,
        scale: 0.92,
        zIndex: 5,
        opacity: 1,
        rotate: -3, // Subtle tilt left (3-4 deg)
        rotateY: 0,
        transition: {
            duration: 0.6,
            ease: "easeInOut"
        }
    },
    // The animation to play when going FROM front TO back
    toBack: {
        x: [0, 220, -10], // Swing Right then Center-ish (offset for back pos)
        y: [0, 15, 15],
        scale: [1, 1, 0.92],
        zIndex: [10, 10, 5],
        rotate: [3, 10, -3], // Subtle rotation arc: 3 -> 10 -> -3
        opacity: 1,
        rotateY: 0,
        transition: {
            duration: 0.7,
            ease: "easeInOut",
            times: [0, 0.5, 1]
        }
    },
    // The animation to play when going FROM back TO front
    toFront: {
        x: [-10, -220, 0], // Swing Left then Center
        y: [15, 0, 0],
        scale: [0.92, 0.92, 1],
        zIndex: [5, 5, 10],
        rotate: [-3, -10, 3], // Subtle rotation arc: -3 -> -10 -> 3
        opacity: 1,
        rotateY: 0,
        transition: {
            duration: 0.7,
            ease: "easeInOut",
            times: [0, 0.5, 1]
        }
    }
};

const InsightSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    // Track previous index to determine animation direction/variant
    // Actually, simple toggle between 0 and 1 is enough for 2 cards.

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev + 1) % CARD_DATA.length);
    };

    const handleFlip = () => {
        setIsFlipped((prev) => !prev);
    };

    return (
        <section style={{ width: '100%', backgroundColor: '#040320ff', padding: '6rem 2rem', overflow: 'hidden', position: 'relative' }}>

            {/* Decorative Ribbon from Asset - Bottom Right Corner */}
            <div style={{
                position: 'absolute',
                right: '-100px',
                bottom: '-50px',
                width: '600px', // Fixed smaller size
                opacity: 0.8,
                zIndex: 0,
                pointerEvents: 'none',
                transform: 'rotate(-70deg)'
            }}>
                <img src={ribbonSvg} alt="" loading="lazy" style={{ width: '100%', height: 'auto' }} />
            </div>

            <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

                {/* Grid Layout: Left (Text) | Right (Interactive Cards Area) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 0.8fr) 1.2fr', gap: '4rem', alignItems: 'center' }}>

                    {/* Left Column: Stats & Text */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', paddingLeft: '4rem' }}>
                        <div>
                            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '3.5rem', fontWeight: '700', color: '#fff', marginBottom: '1.5rem' }}>
                                Building for <span style={{ color: '#5D7BFB' }}>Scale</span>
                            </h2>
                            <p style={{ color: '#94A3B8', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '500px' }}>
                                A data-driven approach leveraging optimized interactions.
                            </p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                            <div><h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff' }}>55%</h3><p style={{ color: '#94A3B8' }}>Crash Reduction</p></div>
                            <div><h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff' }}>60%</h3><p style={{ color: '#94A3B8' }}>Automation</p></div>
                            <div><h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff' }}>40%</h3><p style={{ color: '#94A3B8' }}>Lower Abandonment</p></div>
                            <div><h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff' }}>42s</h3><p style={{ color: '#94A3B8' }}>Faster Discovery</p></div>
                        </div>
                    </div>

                    {/* Right Column: Interaction Area */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '2.5rem',
                        position: 'relative'
                    }}>

                        {/* Card Stack Container */}
                        <div style={{
                            position: 'relative',
                            width: '320px',
                            height: '460px',
                        }}>
                            {/* Render ALL cards and animate them based on active index */}
                            {CARD_DATA.map((card, index) => {
                                const isActive = index === currentIndex;

                                // Determine animation variant
                                // If strictly alternating, one is always toFront, one is toBack?
                                // We need to know if we JUST changed.
                                // For simple toggle:
                                // If active: animate "toFront".
                                // If inactive: animate "toBack".
                                // But initially we want "front" and "back" static.
                                // Ideally framer-motion handles "animate" to a value.
                                // But keyframes in variants are safer for the arc.

                                return (
                                    <motion.div
                                        key={card.id}
                                        variants={cardVariants}
                                        initial={isActive ? "front" : "back"}
                                        animate={isActive ? "toFront" : "toBack"}
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            // Preserves 3D for children flip
                                            transformStyle: 'preserve-3d'
                                        }}
                                    >
                                        <PaperCard data={card} isFlipped={isActive && isFlipped} />
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Controls Row */}
                        <div style={{ display: 'flex', gap: '1.5rem', zIndex: 20 }}>
                            <ActionButton text="Next card" onClick={handleNext} filled={false} />
                            <ActionButton text={isFlipped ? "Show Front" : "Show me!"} onClick={handleFlip} filled={true} />
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default InsightSection;
