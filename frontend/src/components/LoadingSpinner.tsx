import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    color = 'border-primary',
}) => {
    const sizeStyles = {
        sm: 'w-6 h-6 border-2',
        md: 'w-10 h-10 border-3',
        lg: 'w-16 h-16 border-4',
    };

    return (
        <div className="flex items-center justify-center">
            <div
                className={`${sizeStyles[size]} ${color} border-t-transparent rounded-full animate-spin`}
            ></div>
        </div>
    );
};

export default LoadingSpinner;
