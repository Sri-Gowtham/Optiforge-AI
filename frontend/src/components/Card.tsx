import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: 'sm' | 'md' | 'lg';
    hover?: boolean;
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    padding = 'md',
    hover = false,
}) => {
    const paddingStyles = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    const baseStyles = 'bg-white rounded-card shadow-sm border border-gray-200';
    const hoverStyles = hover ? 'hover:shadow-lg transition-shadow duration-200' : '';

    return (
        <div className={`${baseStyles} ${paddingStyles[padding]} ${hoverStyles} ${className}`}>
            {children}
        </div>
    );
};

export default Card;
