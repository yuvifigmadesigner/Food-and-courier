import React from 'react';
import iPhoneBezel from '../assets/iPhone16Plus.svg';
import OrderInfoCard from '../assets/Order Info card.svg';
import CardRight from '../assets/Frame 148.svg';
import HomeScreen from '../assets/HOME.svg';
import Ribbon from '../assets/ribbon.svg';

const PhoneMockup = () => (
    <div className="card-center" style={{
        position: 'relative',
        width: '420px',
        height: '850px',
        background: 'transparent',
        border: 'none',
        borderRadius: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        {/* Bezel Image */}
        <img src={iPhoneBezel} alt="iPhone 16 Plus" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 20,
            pointerEvents: 'none'
        }} />

        {/* Screen Content - Positioned inside the bezel */}
        {/* Screen Content - Positioned inside the bezel */}
        <div className="phone-screen-content" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            height: '96%',
            background: '#ffffff',
            borderRadius: '48px',
            overflowY: 'auto',
            zIndex: 10,
            display: 'block',
            marginTop: '6px', // Slight gap to align notch
        }}>
            <img src={HomeScreen} alt="Home Screen" style={{
                width: '100%',
                height: 'auto',
                display: 'block'
            }} />
        </div>
    </div>
);

const HeroShowcase = () => {
    return (
        <div className="gallery-section">
            {/* Abstract Blue Shape Background - Smooth Blob Style */}
            <div className="bg-swiggle" style={{
                position: 'absolute',
                top: '46%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(-3deg)',
                width: '1157px',
                height: '745px',
                zIndex: 0,
                pointerEvents: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <img src={Ribbon} alt="Background Ribbon" className="ribbon-appear" style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0 }} />
            </div>

            {/* Floating Left Cards - Far (Outer) - Removed container styles/radius */}
            <div className="card-far-side left" style={{
                position: 'absolute',
                left: '-14%',
                top: '45%',
                width: '260px',
                transform: 'rotate(-25deg)',
                zIndex: 5,
                opacity: 0.6,
                filter: 'blur(3px)'
            }}>
                <img src={OrderInfoCard} alt="Order Info" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>

            {/* Floating Left Cards - Near - Removed container styles/radius */}
            <div className="card-side left" style={{
                position: 'absolute',
                left: '8%',
                top: '30%',
                width: '320px',
                transform: 'rotate(-12deg)',
                zIndex: 15,
                filter: 'drop-shadow(0 25px 40px rgba(0,0,0,0.12))'
            }}>
                <img src={OrderInfoCard} alt="Order Info" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>

            <PhoneMockup />

            {/* Floating Right Cards - Near - Removed container styles/radius */}
            <div className="card-side right" style={{
                position: 'absolute',
                right: '8%',
                top: '28%',
                width: '320px',
                transform: 'rotate(12deg)',
                zIndex: 15,
                filter: 'drop-shadow(0 25px 40px rgba(0,0,0,0.12))'
            }}>
                <img src={CardRight} alt="Card Right" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>

            {/* Floating Right Cards - Far (Outer) - Removed container styles/radius */}
            <div className="card-far-side right" style={{
                position: 'absolute',
                right: '-14%',
                top: '45%',
                width: '260px',
                transform: 'rotate(25deg)',
                zIndex: 5,
                opacity: 0.6,
                filter: 'blur(3px)'
            }}>
                <img src={CardRight} alt="Card Right" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
        </div>
    );
};
export default HeroShowcase;
