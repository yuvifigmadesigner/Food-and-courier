
import React from 'react';
import Vector2 from '../assets/Vector 2.svg';

const HeroTitle = () => {
    return (
        <header className="header-section">
            <h1 className="header-title">
                SendMe
                <span className="plane-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={Vector2} alt="Delivery Icon" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                </span>
                Redesign
            </h1>
            <p className="header-subtitle">
                Restoring Trust in a Hyper-Local Delivery Ecosystem
            </p>
        </header>
    );
};

export default HeroTitle;
