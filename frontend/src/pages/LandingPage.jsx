import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Navbar />

            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1>Optimize Your Product Designs with AI</h1>
                        <p className="hero-subtitle">
                            Get instant, comprehensive feedback from 5 specialized AI agents.<br />
                            Transform your design process in just 10 seconds.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/signup" className="btn btn-primary btn-lg">
                                Start Free Trial →
                            </Link>
                            <a href="#how-it-works" className="btn btn-secondary btn-lg">
                                See How It Works
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="hero-stats">
                            <div className="hero-stat">
                                <span className="hero-stat-value">10s</span>
                                <span className="hero-stat-label">Analysis Time</span>
                            </div>
                            <div className="hero-stat">
                                <span className="hero-stat-value">5</span>
                                <span className="hero-stat-label">AI Agents</span>
                            </div>
                            <div className="hero-stat">
                                <span className="hero-stat-value">75%</span>
                                <span className="hero-stat-label">Time Saved</span>
                            </div>
                            <div className="hero-stat">
                                <span className="hero-stat-value">99%</span>
                                <span className="hero-stat-label">Accuracy</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title gradient-text text-center">5 Specialized AI Agents</h2>
                    <p className="section-subtitle text-center">
                        Comprehensive analysis from every angle
                    </p>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🎨</div>
                            <h3>Visual Design</h3>
                            <p>Analyzes aesthetics, proportions, and visual hierarchy for professional appeal.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>Performance</h3>
                            <p>Evaluates structural integrity, efficiency, and engineering fundamentals.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🔧</div>
                            <h3>Materials</h3>
                            <p>Recommends optimal materials for durability, cost, and sustainability.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">💰</div>
                            <h3>Cost Estimation</h3>
                            <p>Calculates manufacturing costs with detailed material and labor breakdowns.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🏭</div>
                            <h3>Feasibility</h3>
                            <p>Assesses manufacturability and recommends production methods.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="how-it-works-section">
                <div className="container">
                    <h2 className="section-title gradient-text text-center">How It Works</h2>
                    <p className="section-subtitle text-center">
                        Three simple steps to optimize your designs
                    </p>

                    <div className="steps-grid">
                        <div className="step">
                            <div className="step-number">1</div>
                            <h3>Upload Design</h3>
                            <p>Upload your product design file (JPG, PNG, PDF) with our easy drag-and-drop interface.</p>
                        </div>

                        <div className="step">
                            <div className="step-number">2</div>
                            <h3>AI Analysis</h3>
                            <p>Our 5 specialized AI agents analyze your design in just 10 seconds.</p>
                        </div>

                        <div className="step">
                            <div className="step-number">3</div>
                            <h3>Get Results</h3>
                            <p>Receive comprehensive feedback and actionable recommendations.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container text-center">
                    <h2 className="cta-title">Ready to Transform Your Design Process?</h2>
                    <p className="cta-subtitle">
                        Join thousands of designers using AI to create better products faster
                    </p>
                    <Link to="/signup" className="btn btn-lg" style={{ background: 'white', color: '#667eea' }}>
                        Get Started Free Today
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container text-center">
                    <p>&copy; 2026 OptiForge AI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
