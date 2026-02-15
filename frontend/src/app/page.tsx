import Link from 'next/link';
import Button from '@/components/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-8 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold">OptiForge AI</div>
        <div className="space-x-4">
          <Link href="/login">
            <Button variant="secondary" size="md">Login</Button>
          </Link>
          <Link href="/signup">
            <Button variant="primary" size="md" className="bg-white text-primary hover:bg-gray-100">
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-8 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6">
          AI-Powered Product Design Optimization
        </h1>
        <p className="text-xl mb-12 text-gray-200 max-w-3xl mx-auto">
          Transform your designs with intelligent analysis. OptiForge AI helps you create better products through data-driven insights and AI-powered optimization.
        </p>
        <Link href="/signup">
          <Button variant="primary" size="lg" className="bg-white text-primary hover:bg-gray-100 text-xl px-10 py-4">
            Get Started Free →
          </Button>
        </Link>
      </main>

      {/* Features */}
      <section className="container mx-auto px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose OptiForge AI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-card">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-2xl font-semibold mb-3">AI-Powered Analysis</h3>
            <p className="text-gray-200">
              Advanced AI algorithms analyze your designs and provide actionable insights
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-card">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-2xl font-semibold mb-3">Real-Time Results</h3>
            <p className="text-gray-200">
              Get instant feedback and optimization suggestions for your designs
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-card">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-semibold mb-3">Fast & Efficient</h3>
            <p className="text-gray-200">
              Streamline your design process and save hours of manual work
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-8 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Optimize Your Designs?</h2>
        <p className="text-xl mb-8 text-gray-200">
          Join thousands of designers using OptiForge AI
        </p>
        <Link href="/signup">
          <Button variant="primary" size="lg" className="bg-white text-primary hover:bg-gray-100">
            Start Free Trial
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-8 py-8 mt-20 border-t border-white/20 text-center text-gray-300">
        <p>© 2026 OptiForge AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
