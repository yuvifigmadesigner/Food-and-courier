
import React from 'react';
import HeroTitle from './HeroTitle';
import ProjectInfo from './ProjectInfo';
import HeroShowcase from './HeroShowcase';

const HeroSection = () => {
    return (
        <section className="hero-container">
            <HeroTitle />
            <ProjectInfo />
            <HeroShowcase />
        </section>
    );
};

export default HeroSection;
