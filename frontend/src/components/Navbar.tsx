interface NavbarProps {
    title: string;
    subtitle?: string;
}

export default function Navbar({ title, subtitle }: NavbarProps) {
    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-20">
            {/* Left — Page title */}
            <div>
                <h1 className="text-lg font-semibold text-text-dark">{title}</h1>
                {subtitle && (
                    <p className="text-xs text-text-medium -mt-0.5">{subtitle}</p>
                )}
            </div>

            {/* Right — Search + Actions */}
            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative">
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-64 pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-bg-page text-text-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                </div>

                {/* Notification */}
                <button className="relative p-2 text-gray-400 hover:text-text-dark hover:bg-gray-50 rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-warning rounded-full"></span>
                </button>

                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center text-primary font-semibold text-sm cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
                    JD
                </div>
            </div>
        </header>
    );
}
