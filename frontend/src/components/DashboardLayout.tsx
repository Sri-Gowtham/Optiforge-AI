import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface DashboardLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}

export default function DashboardLayout({
    children,
    title,
    subtitle,
}: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-bg-page">
            <Sidebar />
            <div className="ml-64">
                <Navbar title={title} subtitle={subtitle} />
                <main className="p-8">{children}</main>
            </div>
        </div>
    );
}
