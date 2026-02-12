import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Matter from 'matter-js';

const RoadmapItem = ({ stage, title, desc, tag, color, delay, isMobile }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay }}
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: isMobile ? '1.5rem' : '2rem',
            backgroundColor: '#FAFAFA', // Very light gray
            borderLeft: `4px solid ${color}`,
            borderTop: '1px solid #E5E5E5',
            borderRight: '1px solid #E5E5E5',
            borderBottom: '1px solid #E5E5E5',
            position: 'relative',
            height: '100%',
        }}
    >
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#94A3B8',
                    backgroundColor: '#F1F5F9',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '4px'
                }}>
                    {stage}
                </span>
                <span style={{ fontSize: '1.5rem', color: color }}>•</span>
            </div>

            <h3 style={{
                fontSize: isMobile ? '1.25rem' : '1.5rem',
                fontWeight: '700',
                color: '#0F172A',
                marginBottom: '0.75rem',
                fontFamily: "'Outfit', sans-serif",
                lineHeight: 1.2
            }}>
                {title}
            </h3>

            <p style={{
                fontSize: isMobile ? '14px' : '1rem',
                color: '#64748B',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
            }}>
                {desc}
            </p>
        </div>

        <div style={{
            display: 'inline-block',
            fontSize: '12px',
            fontWeight: '600',
            color: '#0F172A',
            borderBottom: '2px solid transparent',
            transition: 'border-color 0.2s',
            cursor: 'default'
        }}>
            {tag}
        </div>
    </motion.div>
);

const ImpactCard = ({ title, desc, number, isMobile }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem' }}>
        <h3 style={{
            fontSize: isMobile ? '2.5rem' : '3rem',
            fontWeight: '800',
            fontFamily: "'Outfit', sans-serif",
            color: '#E2E8F0', // Light slate for number
            lineHeight: 1,
            letterSpacing: '-0.03em',
            marginBottom: '0.25rem'
        }}>
            {number}
        </h3>
        <h4 style={{ fontSize: isMobile ? '1.1rem' : '1.25rem', fontWeight: '700', color: '#0F172A' }}>{title}</h4>
        <p style={{ fontSize: isMobile ? '14px' : '1rem', color: '#64748B', lineHeight: '1.6' }}>{desc}</p>
    </div>
);

const GravityFooter = ({ isMobile }) => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);

    useEffect(() => {
        // Module aliases
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse;

        // Create engine
        const engine = Engine.create();
        engineRef.current = engine;

        // Create renderer
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: sceneRef.current.clientWidth,
                height: isMobile ? 300 : 400,
                background: 'transparent',
                wireframes: false
                // Removed pixelRatio to ensure accurate mouse hit-testing
            }
        });

        // Food Icons as Bodies
        const foodIcons = ['🍔', '🍕', '🌮', '🥗', '🍩', '🍪', '🥑', '🥓', '🍱', '🍜'];
        const foodBodies = [];

        // Add walls
        const ground = Bodies.rectangle(
            sceneRef.current.clientWidth / 2,
            (isMobile ? 300 : 400) + 30, // Just below view
            sceneRef.current.clientWidth,
            60,
            { isStatic: true, render: { visible: false } }
        );

        const leftWall = Bodies.rectangle(
            -30,
            200,
            60,
            400,
            { isStatic: true, render: { visible: false } }
        );

        const rightWall = Bodies.rectangle(
            sceneRef.current.clientWidth + 30,
            200,
            60,
            400,
            { isStatic: true, render: { visible: false } }
        );

        Composite.add(engine.world, [ground, leftWall, rightWall]);

        // Add food
        const foodCount = isMobile ? 5 : 8; // Fewer items on mobile
        for (let i = 0; i < foodCount; i++) {
            const icon = foodIcons[Math.floor(Math.random() * foodIcons.length)];
            const x = Math.random() * sceneRef.current.clientWidth;
            const y = -Math.random() * 500 - 50; // Start above screen

            const body = Bodies.circle(x, y, isMobile ? 22 : 30, {
                restitution: 0.8,
                friction: 0.005,
                render: {
                    sprite: {
                        texture: `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${isMobile ? 44 : 60}" height="${isMobile ? 44 : 60}" viewBox="0 0 50 50"><text x="50%" y="58%" font-size="40" text-anchor="middle" dominant-baseline="middle">${icon}</text></svg>`,
                        xScale: 1,
                        yScale: 1
                    }
                }
            });
            foodBodies.push(body);
        }

        Composite.add(engine.world, foodBodies);

        // Add mouse control
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

        // Prevent capturing scroll events so page can still scroll
        mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
        mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
        mouse.element.removeEventListener("wheel", mouse.mousewheel);

        Composite.add(engine.world, mouseConstraint);

        // Keep the mouse in sync with rendering
        render.mouse = mouse;

        // Run the engine
        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Dynamic interaction handler
        // ... (Logic removed to simplify, assuming previous fix for pointer events works or relying on explicit touch/mouse handling)
        // But for the scroll issue requested previously, let's keep the handleMouseMove logic in the component

        // Cleanup
        return () => {
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) {
                render.canvas.remove();
            }
        };
    }, [isMobile]);

    const handleMouseMove = (e) => {
        if (!engineRef.current || !sceneRef.current) return;

        const rect = sceneRef.current.getBoundingClientRect();
        // Support touch events roughly
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const bodies = Matter.Composite.allBodies(engineRef.current.world).filter(b => !b.isStatic);
        const hit = Matter.Query.point(bodies, { x, y });

        if (hit.length > 0) {
            sceneRef.current.style.pointerEvents = 'auto'; // Capture dragging
        } else {
            sceneRef.current.style.pointerEvents = 'none'; // Allow scrolling
        }
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove} // Add touch handler
            style={{
                position: 'relative',
                width: '100%',
                height: isMobile ? '300px' : '400px',
                overflow: 'hidden',
                marginTop: isMobile ? '2rem' : '4rem',
                background: 'linear-gradient(to bottom, #FFFFFF, #F1F5F9)',
            }}
        >
            <div
                ref={sceneRef}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none'
                }}
            />

            {/* Overlay Content */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                textAlign: 'center',
                pointerEvents: 'none',
                width: '90%'
            }}>
                <h2 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: isMobile ? '2rem' : '2.5rem',
                    fontWeight: '800',
                    color: '#0F172A',
                    marginBottom: '1rem',
                    textShadow: '0 2px 10px rgba(255,255,255,0.8)',
                    pointerEvents: 'auto',
                    userSelect: 'none'
                }}>
                    Thanks for Scrolling!
                </h2>
                <button
                    style={{
                        pointerEvents: 'auto',
                        padding: isMobile ? '0.8rem 2rem' : '1rem 2.5rem',
                        backgroundColor: '#0F172A',
                        color: 'white',
                        borderRadius: '50px',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: isMobile ? '0.9rem' : '1rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        transition: 'transform 0.2s'
                    }}
                    onClick={() => window.location.href = 'https://www.yuvi-portfolio.in/'}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                    View Full Portfolio
                </button>
                <div style={{
                    marginTop: '1rem',
                    fontSize: '0.85rem',
                    color: '#64748B',
                    fontWeight: '500',
                    pointerEvents: 'auto', // Allow scrolling on text
                    userSelect: 'none'     // Prevent selection
                }}>
                    (Drag the food!)
                </div>
            </div>
        </div>
    );
};

const ConclusionSection = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            color: '#0F172A',
            padding: isMobile ? '4rem 1.5rem 0 1.5rem' : '8rem 2rem 0 2rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Decor */}
            <div style={{
                position: 'absolute',
                top: '-5%',
                right: '-5%',
                fontSize: isMobile ? '20rem' : '40rem',
                fontWeight: '900',
                color: '#F8FAFC',
                zIndex: 0,
                lineHeight: 1,
                userSelect: 'none',
                pointerEvents: 'none',
                fontFamily: "'Outfit', sans-serif"
            }}>
                X
            </div>

            <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: isMobile ? '4rem' : '8rem' }}>

                {/* 1. Header & Roadmap Grid */}
                <div>
                    <div style={{ marginBottom: isMobile ? '3rem' : '4rem', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', flexWrap: 'wrap', gap: isMobile ? '1rem' : '2rem' }}>
                        <div>
                            <h5 style={{ color: '#64748B', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontSize: isMobile ? '0.8rem' : '1rem' }}>Looking Ahead</h5>
                            <h2 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: '800', fontFamily: "'Outfit', sans-serif", color: '#0F172A', lineHeight: 1.1 }}>
                                Future <span style={{ color: '#3B82F6', textDecoration: 'underline', textDecorationThickness: '4px', textDecorationSkipInk: 'none' }}>Scope</span>
                            </h2>
                        </div>
                        <p style={{ maxWidth: '400px', fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
                            Design never sleeps. Here is the strategic plan for the next iterations, focusing on retention, scale, and monetization.
                        </p>
                    </div>

                    {/* Bento Grid Design with Original Content */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        <RoadmapItem
                            stage="Strategy"
                            title="Beyond the MVP"
                            desc="Transitioning from critical problem-solving to a comprehensive, end-to-end design overhaul of the entire application."
                            tag="Phase 2.0"
                            color="#EF4444" // Red
                            delay={0.1}
                            isMobile={isMobile}
                        />
                        <RoadmapItem
                            stage="Research"
                            title="Logistics Model"
                            desc="Conducting deep-dive research and specialized design for the newly introduced 'Family-Partner' model to ensure long-term viability."
                            tag="Validation"
                            color="#F59E0B" // Amber
                            delay={0.15}
                            isMobile={isMobile}
                        />
                        <RoadmapItem
                            stage="Growth"
                            title="Dual-Sided Rewards"
                            desc="Integrating gamified incentive systems for both customers and delivery partners to maximize retention and platform loyalty."
                            tag="Gamification"
                            color="#10B981" // Emerald
                            delay={0.2}
                            isMobile={isMobile}
                        />
                        <RoadmapItem
                            stage="Psychology"
                            title="Pricing Perception 2.0"
                            desc="Refining psychological value-framing strategies to further stabilize the user's 'cost vs. reward' mental model."
                            tag="Behavioral Design"
                            color="#3B82F6" // Blue
                            delay={0.25}
                            isMobile={isMobile}
                        />
                        <RoadmapItem
                            stage="Revenue"
                            title="Subscription Architecture"
                            desc="Introducing a recurring membership model (SendMe Pro) to secure steady revenue streams and high-frequency user engagement."
                            tag="Monetization"
                            color="#8B5CF6" // Violet
                            delay={0.3}
                            isMobile={isMobile}
                        />
                        <RoadmapItem
                            stage="Process"
                            title="Continuous Roadmap"
                            desc="Utilizing the Notion collaborative board to manage and prioritize these Phase 2 developments with the engineering team."
                            tag="Management"
                            color="#6366F1" // Indigo
                            delay={0.35}
                            isMobile={isMobile}
                        />
                    </div>
                </div>

                {/* 2. Impact & Conclusion - Replaced Stats with Text Cards */}
                <div style={{ padding: isMobile ? '2rem 0' : '4rem 0', borderTop: '2px solid #F1F5F9', borderBottom: '2px solid #F1F5F9' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: '800', fontFamily: "'Outfit', sans-serif", color: '#0F172A' }}>Core Impact</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: isMobile ? '2rem' : '3rem' }}>
                        <ImpactCard
                            number="01"
                            title="MVP-First Mindset"
                            desc="Focused on the most critical user pain points and technical 'Blocking Issues' to rescue the app's 2.9-star rating."
                            isMobile={isMobile}
                        />
                        <ImpactCard
                            number="02"
                            title="The Power of Systems"
                            desc="Proved that a modular design library is the only way to scale a super-app without losing brand consistency."
                            isMobile={isMobile}
                        />
                        <ImpactCard
                            number="03"
                            title="Operational Empathy"
                            desc="Learned that a Product Designer’s true client is often the City Manager whose workload is halved by smart automation."
                            isMobile={isMobile}
                        />
                    </div>
                </div>

            </div>

            {/* 3. Gravity Interactive Footer */}
            <GravityFooter isMobile={isMobile} />
        </section>
    );
};

export default ConclusionSection;
