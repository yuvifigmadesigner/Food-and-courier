import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import FeatureHeader from './FeatureHeader';
import FeatureCard from './FeatureCard';
import LocationDemo from '../assets/LocationStrategyDemo.mp4';
import HelpVideo from '../assets/help.mp4';
import DeliveryVideo from '../assets/delivery.mp4';
import Card3 from '../assets/card 3.png';
import Card32 from '../assets/card 32.png';
import Card33 from '../assets/card 33.png';
import Card34 from '../assets/card 34.png';
import Help1 from '../assets/help1.png';
import Help2 from '../assets/help2.png';
import Review1 from '../assets/SendMe - Deliveries.png';
import Review2 from '../assets/SendMe - Deliveries2.png';
import Review3 from '../assets/SendMe - Deliveries3.png';

const LazyVideo = ({ src }) => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { margin: "200px 0px" }); // Preload when 200px away
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (isInView && !hasLoaded) {
            setHasLoaded(true);
        }
    }, [isInView, hasLoaded]);

    return (
        <div ref={containerRef} style={{ height: '100%', width: '100%', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
            {hasLoaded ? (
                <video
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            ) : (
                <div style={{ width: '100%', height: '100%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                    Loading...
                </div>
            )}
        </div>
    );
};

const Card = ({ children, i, progress, range, targetScale, targetRotate = 0 }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    })

    const scale = useTransform(progress, range, [1, targetScale]);

    // Calculate 50% point of the range for rotation start
    const rotateStart = range[0] + (range[1] - range[0]) * 0.5;
    const rotate = useTransform(progress, [range[0], rotateStart, range[1]], [0, 0, targetRotate]);

    return (
        <div ref={container} style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: 0 }}>
            <motion.div
                style={{
                    scale,
                    rotate,
                    top: `calc(-5vh + ${i * 25}px)`,
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {children}
            </motion.div>
        </div>
    )
}

const FeatureSection = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    return (
        <div style={{ width: '100%', marginTop: '15vh' }}>
            {/* SECTION 1: Header (Full Width, Hug Height) */}
            <div style={{ width: '100%', padding: '0 1rem', marginBottom: '10vh' }}>
                <div style={{ maxWidth: '1800px', margin: '0 auto' }}>
                    <FeatureHeader />
                </div>
            </div>

            {/* SECTION 2: Cards Container (Sticky Scroll Track) */}
            <div ref={container} style={{ width: '100%', padding: '0 2%', marginBottom: '20vh', boxSizing: 'border-box' }}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '5vh' }}>
                    {/* ================================================================================== */}
                    <Card i={0} progress={scrollYProgress} range={[0, 0.5]} targetScale={0.98} targetRotate={-5}>
                        <FeatureCard
                            style={{ width: '100%' }}
                            backgroundColor="#4A0E2E"
                            /* --- Card Dimensions & Spacing --- */
                            height="680px"            // Card Height
                            marginTop="0rem"          // Top Margin
                            marginBottom="0rem"       // Bottom Margin (handled by spacer)
                            padding="4rem 4rem"       // Card Padding (Top/Bottom Left/Right)
                            contentPaddingTop="0rem"  // Text Content Top Padding
                            contentPaddingBottom="0rem" // Text Content Bottom Padding

                            showRibbon={true}
                            ribbonStyle={{
                                rotation: '85deg',
                                scale: '1.4',
                                right: '-12%',
                                hueRotate: '160deg', // Adjusted for Salmon/Orange
                                opacity: 0.8 // Increased opacity for vibrancy
                            }}
                            icon={<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FDBA74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>}
                            title={<span style={{ color: '#FFF' }}>Smart Address Logic</span>}
                            subtitle={<span style={{ color: '#FDBA74' }}>Eliminating Map Latency and App Crashes through Smart Background Rendering.</span>}
                            description={
                                /* --- Text Content & Structure --- */
                                <div style={{ position: 'relative' }}>
                                    <div style={{ color: '#FFEDD5', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                                        <h5 style={{ fontSize: '1rem', fontWeight: '700', color: '#FDBA74', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Purpose & Solution</h5>
                                        <p style={{ fontSize: '0.95rem', letterSpacing: '0.016em' }}><strong style={{ color: '#FDBA74' }}>The Motive:</strong> Avoid CPU spikes and crashes caused by instant map loading.</p>
                                        <p style={{ fontSize: '0.95rem', letterSpacing: '0.016em' }}><strong style={{ color: '#FDBA74' }}>The Solution:</strong> An intermediary selection screen (Auto vs. Manual).</p>
                                        <p style={{ fontSize: '0.95rem', letterSpacing: '0.016em' }}><strong style={{ color: '#FDBA74' }}>Technical Logic & Crash Reduction:</strong> Silent background map rendering eliminates freezes and optimizes memory, reducing crash probability by 50–60%.</p>

                                        { /* Horizontal Overlapping Review Stack */}
                                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '1rem', marginLeft: '1rem' }}>
                                            <img
                                                src={Review3}
                                                alt="User Review 3"
                                                className="review-sticker"
                                                loading="lazy"
                                                style={{
                                                    width: '240px',
                                                    borderRadius: '12px',
                                                    transform: 'rotate(-4deg)',
                                                    boxShadow: '0 12px 24px rgba(0,0,0,0.4)',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    zIndex: 3
                                                }}
                                            />
                                            <img
                                                src={Review2}
                                                alt="User Review 2"
                                                className="review-sticker"
                                                loading="lazy"
                                                style={{
                                                    width: '240px',
                                                    borderRadius: '12px',
                                                    transform: 'rotate(2deg) translateY(10px)',
                                                    boxShadow: '0 12px 24px rgba(0,0,0,0.4)',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    marginLeft: '-110px',
                                                    zIndex: 2
                                                }}
                                            />
                                            <img
                                                src={Review1}
                                                alt="User Review 1"
                                                className="review-sticker"
                                                loading="lazy"
                                                style={{
                                                    width: '240px',
                                                    borderRadius: '12px',
                                                    transform: 'rotate(-2deg) translateY(-5px)',
                                                    boxShadow: '0 12px 24px rgba(0,0,0,0.4)',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    marginLeft: '-110px',
                                                    zIndex: 1
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            }
                            tags={['#ProgressiveDisclosure', '#HicksLaw', '#ErrorPrevention(Poka-Yoke)', '#GracefulDegradation', '#ResponseTimeOptimization']}

                            /* --- Phone Screen Content (Location Demo Video) --- */
                            phoneScreenContent={
                                <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
                                    <LazyVideo src={LocationDemo} />
                                </div>
                            }
                        />
                    </Card>

                    {/* ================================================================================== */}
                    {/* CARD 2: INTELLIGENT HELP & SUPPORT (Deep Violet Theme)                             */}
                    {/* Features: Hybrid AI/Human support model, self-service guides                       */}
                    {/* ================================================================================== */}
                    <Card i={1} progress={scrollYProgress} range={[0.5, 1]} targetScale={0.99} targetRotate={-5}>
                        <FeatureCard
                            style={{ width: '100%' }}
                            backgroundColor="#172554" // Deep Blue
                            /* --- Card Dimensions & Spacing --- */
                            height="760px"            // Card Height
                            marginTop="0rem"          // Top Margin
                            marginBottom="0rem"       // Bottom Margin
                            padding="4rem 4rem"       // Card Padding (Top/Bottom Left/Right)
                            contentPaddingTop="4rem" // Text Content Top Padding (Reduced)
                            contentPaddingBottom="4rem" // Text Content Bottom Padding (Reduced)

                            showRibbon={true}
                            ribbonStyle={{
                                rotation: '110deg',
                                scale: '1.5',
                                right: '-18%',
                                hueRotate: '190deg', // Sky Blue
                                opacity: 0.6
                            }}
                            icon={<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c3dd32ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>}
                            title={<span style={{ color: '#F0F9FF' }}>Intelligent Help & Support</span>}
                            subtitle={<span style={{ color: '#c3dd32ff' }}>Scaling Instant Resolution through AI-Human Hybrid Architecture</span>}
                            description={
                                /* --- Text Content & Structure --- */
                                <div style={{ position: 'relative' }}>
                                    <div style={{ color: '#ffffffff', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                                        <h5 style={{ fontSize: '1rem', fontWeight: '700', color: '#c3dd32ff', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Purpose & Solution</h5>
                                        <p style={{ fontSize: '0.95rem', letterSpacing: '0.016em' }}><strong style={{ color: '#c3dd32ff' }}>The Motive:</strong> To eliminate support bottlenecks and reduce the manual workload on operational managers by automating 80% of repetitive queries.</p>
                                        <p style={{ fontSize: '0.95rem', letterSpacing: '0.016em' }}><strong style={{ color: '#c3dd32ff' }}>The Solution:</strong> An integrated, tiered support journey that prioritizes interactive self-service before escalating to human intervention.</p>
                                        <p style={{ fontSize: '0.95rem', letterSpacing: '0.016em' }}><strong style={{ color: '#c3dd32ff' }}>Hybrid Resolution Model:</strong> Smart bots resolve routine issues instantly via card-based guides, while live agents handle escalations with personalized care and discounts to rebuild trust.</p>

                                        { /* Horizontal Overlapping Help Stack */}
                                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '1rem', marginLeft: '1rem' }}>
                                            <img
                                                src={Help2}
                                                alt="Help Screen 2"
                                                className="review-sticker"
                                                loading="lazy"
                                                style={{
                                                    width: '240px',
                                                    borderRadius: '12px',
                                                    transform: 'rotate(-4deg)',
                                                    boxShadow: '0 12px 24px rgba(0,0,0,0.4)',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    zIndex: 2
                                                }}
                                            />
                                            <img
                                                src={Help1}
                                                alt="Help Screen 1"
                                                className="review-sticker"
                                                loading="lazy"
                                                style={{
                                                    width: '240px',
                                                    borderRadius: '12px',
                                                    transform: 'rotate(2deg) translateY(10px)',
                                                    boxShadow: '0 12px 24px rgba(0,0,0,0.4)',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    marginLeft: '-110px',
                                                    zIndex: 1
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            }
                            tags={['#ProgressiveEscalation', '#ServiceDesign', '#InformationArchitecture', '#RecognitionOverRecall', '#ErrorRecovery']}

                            /* --- Phone Screen Content (Help Video) --- */
                            phoneScreenContent={
                                <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
                                    <LazyVideo src={HelpVideo} />
                                </div>
                            }
                        />
                    </Card>

                    {/* ================================================================================== */}
                    {/* CARD 3: TRANSPARENT VALUE ARCHITECTURE (Teal/Emerald Theme)                        */}
                    {/* Features: Pricing perception, delivery logistics, visual tracking                  */}
                    {/* ================================================================================== */}
                    <Card i={2} progress={scrollYProgress} range={[1, 1]} targetScale={1}>
                        <FeatureCard
                            style={{ width: '100%' }}
                            backgroundColor="#f1c2dcff" // Light Pink
                            /* --- Card Dimensions & Spacing --- */
                            height="860px"            // Card Height
                            marginTop="0rem"          // Top Margin
                            marginBottom="0rem"       // Bottom Margin
                            padding="6rem 4rem"       // Card Padding (Top/Bottom Left/Right)
                            contentPaddingTop="4rem"  // Text Content Top Padding
                            contentPaddingBottom="2rem" // Text Content Bottom Padding
                            tagColor="#831843"        // Custom Tag Text Color

                            showRibbon={true}
                            ribbonStyle={{
                                rotation: '260deg', // Flipped orientation
                                scale: '1.35',
                                right: '-15%',
                                hueRotate: '110deg', // Blue + 110 = Red/Maroon
                                brightness: '0.4',   // Darken to Maroon
                                opacity: 1           // Solid shape
                            }}
                            icon={<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#500724" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>}
                            title={<span style={{ color: '#500724' }}>Transparent Value Architecture</span>}
                            subtitle={<span style={{ color: '#831843' }}>Orchestrating Trust through Psychological Pricing & Flexible Logistics</span>}
                            description={
                                /* --- Text Content & Structure --- */
                                <div style={{ position: 'relative' }}>
                                    <div style={{ color: '#831843', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                                        <h5 style={{ fontSize: '1rem', fontWeight: '700', color: '#500724', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Purpose & Solution</h5>
                                        <p style={{ fontSize: '0.95rem', letterSpacing: '0.016em' }}><strong style={{ color: '#500724' }}>The Motive:</strong> To eliminate "Price Shock" and post-delivery rider friction caused by hidden charges and a lack of real-time parcel visibility.</p>
                                        <p style={{ fontSize: '0.95rem', letterSpacing: '0.016em' }}><strong style={{ color: '#500724' }}>The Solution:</strong> A dual-layered strategy that stabilizes pricing perception while introducing a community-driven, flexible delivery model.</p>
                                        <p style={{ fontSize: '0.95rem', letterSpacing: '0.016em' }}><strong style={{ color: '#500724' }}>Incentivized Trust:</strong> Recalibrated prices and "Massive Value" coupons frame discounts as earned rewards, transforming perceived costs into purchasing incentives.</p>
                                        <p style={{ fontSize: '0.95rem', letterSpacing: '0.016em' }}><strong style={{ color: '#500724' }}>Family-Partner Logistics:</strong> Solves rider shortages by rebranding delivery as a stress-free, zero-pressure side income, ensuring a reliable and motivated fleet.</p>
                                        <p style={{ fontSize: '0.95rem', letterSpacing: '0.016em' }}><strong style={{ color: '#500724' }}>Live Visibility:</strong> Real-time GPS tracking eliminates anxiety and enforces the "No Extra Cash" policy through total transparency.</p>

                                        { /* Horizontal Overlapping Pricing Stack */}
                                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '1rem', marginLeft: '1rem' }}>
                                            <img
                                                src={Card3}
                                                alt="Pricing Card 3"
                                                className="review-sticker"
                                                loading="lazy"
                                                style={{
                                                    width: '240px',
                                                    borderRadius: '12px',
                                                    transform: 'rotate(-6deg)',
                                                    boxShadow: '0 12px 24px rgba(0,0,0,0.4)',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    zIndex: 4
                                                }}
                                            />
                                            <img
                                                src={Card32}
                                                alt="Pricing Card 32"
                                                className="review-sticker"
                                                loading="lazy"
                                                style={{
                                                    width: '240px',
                                                    borderRadius: '12px',
                                                    transform: 'rotate(-2deg) translateY(8px)',
                                                    boxShadow: '0 12px 24px rgba(0,0,0,0.4)',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    marginLeft: '-110px',
                                                    zIndex: 3
                                                }}
                                            />
                                            <img
                                                src={Card33}
                                                alt="Pricing Card 33"
                                                className="review-sticker"
                                                loading="lazy"
                                                style={{
                                                    width: '240px',
                                                    borderRadius: '12px',
                                                    transform: 'rotate(2deg) translateY(-4px)',
                                                    boxShadow: '0 12px 24px rgba(0,0,0,0.4)',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    marginLeft: '-110px',
                                                    zIndex: 2
                                                }}
                                            />
                                            <img
                                                src={Card34}
                                                alt="Pricing Card 34"
                                                className="review-sticker"
                                                loading="lazy"
                                                style={{
                                                    width: '240px',
                                                    borderRadius: '12px',
                                                    transform: 'rotate(6deg) translateY(4px)',
                                                    boxShadow: '0 12px 24px rgba(0,0,0,0.4)',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    marginLeft: '-110px',
                                                    zIndex: 1
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            }
                            tags={['#PriceAnchoring', '#FramingEffect', '#LaborIllusion', '#EndowmentEffect', '#HumanCentricLogistics']}

                            /* --- Phone Screen Content (Delivery Demo Video) --- */
                            phoneScreenContent={
                                <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
                                    <LazyVideo src={DeliveryVideo} />
                                </div>
                            }
                        />
                    </Card>
                </div>
            </div>
        </div >
    );
};

export default FeatureSection;
