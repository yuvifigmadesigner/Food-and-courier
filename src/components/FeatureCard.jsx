import React from 'react';
import iPhoneBezel from '../assets/iPhone16Plus.svg';
import Ribbon from '../assets/ribbon.svg';

const FeatureCard = ({ backgroundColor, icon, title, subtitle, description, tags, phoneScreenContent, showRibbon, ribbonStyle = {}, height = '680px', marginTop = '0', marginBottom = '4rem', padding = '4rem 4rem', contentPaddingTop = '0', contentPaddingBottom = '0', tagColor, style = {} }) => {

    // Determine if background is light for text contrast
    const isLight = ['#FDF2F8', '#FBCFE8', '#f1c2dcff'].includes(backgroundColor);
    const titleColor = isLight ? '#0F172A' : '#fff';
    const textColor = isLight ? '#475569' : '#fff';
    const accentColor = isLight ? '#831843' : '#fff';
    const tagBg = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)';
    const tagBorder = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)';

    return (
        <div style={{
            ...style, // Spread custom styles (e.g., sticky positioning)
            backgroundColor: backgroundColor,
            borderRadius: '2.5rem',
            padding: padding,
            position: 'relative',
            overflow: 'hidden',
            color: '#fff',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center', // Vertically center content
            justifyContent: 'space-between',
            height: height, // Use prop
            marginTop: marginTop,
            marginBottom: marginBottom // Increased spacing between cards
        }}>
            <div style={{ flex: 1, paddingRight: '3rem', zIndex: 2, position: 'relative', paddingTop: contentPaddingTop, paddingBottom: contentPaddingBottom }}>
                <div style={{ marginBottom: '1.5rem', color: accentColor }}>
                    {icon}
                </div>
                <h3 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '0.75rem', lineHeight: '1.2', letterSpacing: '0.016em', color: titleColor }}>
                    {title}
                </h3>
                {subtitle && (
                    <h4 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '1.5rem', opacity: 0.9, lineHeight: '1.5', letterSpacing: '0.016em', color: isLight ? '#831843' : 'inherit' }}>
                        {subtitle}
                    </h4>
                )}
                <div style={{ fontSize: '1rem', lineHeight: '1.6', opacity: 0.95, maxWidth: '580px', letterSpacing: '0.016em', color: textColor }}>
                    {description}
                </div>
                {tags && tags.length > 0 && (
                    <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', maxWidth: '550px' }}>
                        {tags.map((tag, index) => (
                            <span key={index} style={{
                                backgroundColor: tagBg,
                                color: tagColor || accentColor,
                                padding: '0.4rem 0.8rem',
                                borderRadius: '1rem',
                                fontSize: '0.8rem',
                                border: `1px solid ${tagBorder}`
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div style={{
                position: 'relative',
                width: '430px',
                height: '860px',
                flexShrink: 0,
                alignSelf: 'flex-start', // Align to top
                marginTop: '-3rem', // Pull up slightly into the padding
                marginRight: '-3rem' // Push to edge
            }}>
                <img src={iPhoneBezel} alt="Phone Mockup" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 2,
                    pointerEvents: 'none'
                }} />

                {/* Optional Ribbon Background */}
                {showRibbon && (
                    <div style={{
                        position: 'absolute',
                        top: ribbonStyle.top || '50%',
                        right: ribbonStyle.right || '-15%',
                        left: 'auto',
                        transform: `translateY(-50%) rotate(${ribbonStyle.rotation || '90deg'}) scale(${ribbonStyle.scale || '1.4'})`,
                        width: '800px',
                        height: '800px',
                        zIndex: 0,
                        pointerEvents: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: ribbonStyle.opacity || 0.6
                    }}>
                        <img
                            src={Ribbon}
                            alt=""
                            className="ribbon-appear"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                filter: ribbonStyle.hueRotate ? `hue-rotate(${ribbonStyle.hueRotate}) brightness(${ribbonStyle.brightness || 1.2})` : 'none'
                            }}
                        />
                    </div>
                )}

                {/* Screen Content Container */}
                <div style={{
                    position: 'absolute',
                    top: '2%',
                    left: '6%',
                    width: '88%',
                    height: '96%',
                    borderRadius: '40px',
                    overflow: 'hidden',
                    backgroundColor: '#fff',
                    zIndex: 1
                }}>
                    {phoneScreenContent}
                </div>
            </div>
        </div>
    );
};

export default FeatureCard;
