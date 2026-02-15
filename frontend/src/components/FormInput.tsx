import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    helperText?: string;
}

const FormInput: React.FC<FormInputProps> = ({
    label,
    error,
    helperText,
    id,
    className = '',
    ...props
}) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="mb-4">
            <label
                htmlFor={inputId}
                className="block text-sm font-medium text-slate-dark mb-2"
            >
                {label}
            </label>
            <input
                id={inputId}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${error
                        ? 'border-warning focus:ring-warning'
                        : 'border-gray-300 hover:border-gray-400'
                    } ${className}`}
                {...props}
            />
            {error && (
                <p className="mt-1.5 text-sm text-warning">{error}</p>
            )}
            {helperText && !error && (
                <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
            )}
        </div>
    );
};

export default FormInput;
