
import React from 'react';

const ProjectInfo = () => {
    return (
        <div className="project-info-container">
            {/* Role Section */}
            <div className="info-segment">
                <div className="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 9C2 7.89543 2.89543 7 4 7H20C21.1046 7 22 7.89543 22 9V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V9Z" />
                        <path d="M16 7V4C16 2.89543 15.1046 2 14 2H10C8.89543 2 8 2.89543 8 4V7" />
                        <path d="M22 12H2" />
                        <path d="M7 12V14" />
                        <path d="M17 12V14" />
                    </svg>
                </div>
                <div className="text-content">
                    <span className="info-label">Role</span>
                    <span className="info-value">Product Designer</span>
                </div>
            </div>

            <div className="info-divider"></div>

            {/* Timeline Section */}
            <div className="info-segment">
                <div className="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                        <path d="M9.17070571,17 C9.58254212,15.8348076 10.6937812,15 12,15 C13.3062188,15 14.4174579,15.8348076 14.8292943,17 L20,17 L21,18 L20,19 L14.8292943,19 C14.4174579,20.1651924 13.3062188,21 12,21 C10.6937812,21 9.58254212,20.1651924 9.17070571,19 L3,19 L4,18 L3,17 L9.17070571,17 Z M12,19 C12.5522847,19 13,18.5522847 13,18 C13,17.4477153 12.5522847,17 12,17 C11.4477153,17 11,17.4477153 11,18 C11,18.5522847 11.4477153,19 12,19 Z M14,12 L12,14 L10,12 L7,12 C5.8954305,12 5,11.1045695 5,10 L5,5 C5,3.8954305 5.8954305,3 7,3 L17,3 C18.1045695,3 19,3.8954305 19,5 L19,10 C19,11.1045695 18.1045695,12 17,12 L14,12 Z M7,5 L7,10 L11,10 L12,11 L13,10 L17,10 L17,5 L7,5 Z" />
                    </svg>
                </div>
                <div className="text-content">
                    <span className="info-label">Timeline</span>
                    <span className="info-value">Jan - Feb 2026</span>
                </div>
            </div>

            <div className="info-divider"></div>

            {/* Actions Section */}
            <div className="actions-segment">
                <button
                    className="action-btn design-btn"
                    aria-label="Figma Design File"
                    onClick={() => window.open('https://www.figma.com/design/ygheuJ0lHkNacD6KFKru2o/Food---Delivery?node-id=123-2197&t=dxzFoXQYgKgdCi1a-1', '_blank')}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3H9C7.34315 3 6 4.34315 6 6C6 7.65685 7.34315 9 9 9M12 3V9M12 3H15C16.6569 3 18 4.34315 18 6C18 7.65685 16.6569 9 15 9M12 9H9M12 9H15M12 9V15M9 9C7.34315 9 6 10.3431 6 12C6 13.6569 7.34315 15 9 15M15 9C16.6569 9 18 10.3431 18 12C18 13.6569 16.6569 15 15 15C13.3431 15 12 13.6569 12 12C12 10.3431 13.3431 9 15 9ZM12 15H9M12 15V18C12 19.6569 10.6569 21 9 21C7.34315 21 6 19.6569 6 18C6 16.3431 7.34315 15 9 15" />
                    </svg>
                    <span>Design</span>
                </button>

                <button
                    className="action-btn research-btn"
                    aria-label="Figjam Research File"
                    onClick={() => window.open('https://www.figma.com/board/8fM4S8Ccsu0MkMco7RlFvf/SendMe---Deliveries?node-id=0-1&t=mSeacZbgKDbyrRlc-1', '_blank')}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <span>Research</span>
                </button>
            </div>
        </div>
    );
};

export default ProjectInfo;
