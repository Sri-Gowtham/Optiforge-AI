import React from 'react';
import Card from './Card';

interface DashboardCardProps {
    title: string;
    value: string | number;
    icon: string;
    trend?: {
        value: string;
        isPositive: boolean;
    };
}

const DashboardCards: React.FC<DashboardCardProps> = ({
    title,
    value,
    icon,
    trend,
}) => {
    return (
        <Card hover className="flex items-center justify-between">
            <div>
                <p className="text-sm text-slate-medium font-medium mb-1">{title}</p>
                <p className="text-3xl font-bold text-slate-dark">{value}</p>
                {trend && (
                    <p className={`text-sm mt-2 ${trend.isPositive ? 'text-success' : 'text-warning'}`}>
                        {trend.isPositive ? '↑' : '↓'} {trend.value}
                    </p>
                )}
            </div>
            <div className="text-5xl opacity-20">{icon}</div>
        </Card>
    );
};

export default DashboardCards;
