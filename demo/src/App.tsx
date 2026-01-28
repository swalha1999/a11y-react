import { useState } from 'react';
import { AccessibilityWidget, en, ar } from '@swalha1999/a16y-widget';
import type { AccessibilityTranslations } from '@swalha1999/a16y-widget';

type ThemeColor = '#6366f1' | '#10b981' | '#f59e0b' | '#ef4444' | '#8b5cf6';
type Language = 'en' | 'ar';

const themes: { name: string; color: ThemeColor }[] = [
  { name: 'Indigo', color: '#6366f1' },
  { name: 'Emerald', color: '#10b981' },
  { name: 'Amber', color: '#f59e0b' },
  { name: 'Red', color: '#ef4444' },
  { name: 'Purple', color: '#8b5cf6' },
];

const translations: Record<Language, AccessibilityTranslations> = {
  en,
  ar,
};

function App() {
  const [theme, setTheme] = useState<ThemeColor>('#6366f1');
  const [lang, setLang] = useState<Language>('en');

  return (
    <div className="demo-container">
      {/* Hero Section */}
      <header className="hero">
        <h1>React Accessibility Widget</h1>
        <p>
          A beautifully designed, accessible, and i18n-ready accessibility widget for React applications.
        </p>
        <div className="badge-container">
          <span className="badge">TypeScript</span>
          <span className="badge">i18n Ready</span>
          <span className="badge">RTL Support</span>
          <span className="badge">Fully Accessible</span>
        </div>
        <div className="cta-buttons">
          <a
            href="https://github.com/swalha1999/a16y-widget"
            className="cta-button primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/@swalha1999/a16y-widget"
            className="cta-button secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            npm install @swalha1999/a16y-widget
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          {/* Features Section */}
          <section className="section">
            <h2 className="section-title">Features</h2>
            <p className="section-subtitle">
              Everything you need to make your React app more accessible
            </p>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">Aa</div>
                <h3>Text Adjustments</h3>
                <p>
                  Allow users to adjust text size, line spacing, and letter spacing for better readability.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎨</div>
                <h3>Visual Adjustments</h3>
                <p>
                  Invert colors, enable grayscale mode, or hide images for users with visual sensitivities.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔗</div>
                <h3>Navigation Aids</h3>
                <p>
                  Underline links, enable big cursor, and add a reading guide for easier navigation.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🌍</div>
                <h3>i18n & RTL</h3>
                <p>
                  Full internationalization support with built-in English and Arabic translations.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Fully Accessible</h3>
                <p>
                  ARIA attributes, keyboard navigation, and focus trapping for screen reader users.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💾</div>
                <h3>Persistent Settings</h3>
                <p>
                  User preferences are saved to localStorage and restored on subsequent visits.
                </p>
              </div>
            </div>
          </section>

          {/* Interactive Demo Section */}
          <section className="section">
            <h2 className="section-title">Try It Out</h2>
            <p className="section-subtitle">
              Click the accessibility button in the bottom right corner to open the widget.
              Customize the theme and language below.
            </p>

            {/* Theme Selector */}
            <div className="theme-selector">
              {themes.map((t) => (
                <button
                  key={t.color}
                  className={`theme-button ${theme === t.color ? 'active' : ''}`}
                  onClick={() => setTheme(t.color)}
                >
                  <span className="theme-dot" style={{ background: t.color }} />
                  {t.name}
                </button>
              ))}
            </div>

            {/* Language Switcher */}
            <div className="lang-switcher">
              <button
                className={`lang-button ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
              >
                English (LTR)
              </button>
              <button
                className={`lang-button ${lang === 'ar' ? 'active' : ''}`}
                onClick={() => setLang('ar')}
              >
                العربية (RTL)
              </button>
            </div>

            {/* Demo Area */}
            <div className="demo-area">
              <div className="demo-content">
                <h2>Sample Content</h2>
                <p>
                  This is sample content to demonstrate the accessibility features.
                  Try adjusting the text size, enabling grayscale mode, or turning on the
                  reading guide to see how the widget affects the page content.
                </p>
                <p>
                  The widget settings are <a href="#">persisted in localStorage</a>,
                  so your preferences will be remembered when you return.
                </p>
                <ul className="demo-list">
                  <li>
                    <span className="check">✓</span>
                    Adjust text size for better readability
                  </li>
                  <li>
                    <span className="check">✓</span>
                    Change line and letter spacing
                  </li>
                  <li>
                    <span className="check">✓</span>
                    Invert colors or enable grayscale
                  </li>
                  <li>
                    <span className="check">✓</span>
                    Underline links for visibility
                  </li>
                  <li>
                    <span className="check">✓</span>
                    Enable reading guide for focus
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Installation Section */}
          <section className="section">
            <h2 className="section-title">Quick Start</h2>
            <p className="section-subtitle">
              Get started in under a minute
            </p>
            <div className="code-block">
              <pre>{`// Install the package
npm install @swalha1999/a16y-widget

// In your app
import { AccessibilityWidget, en, injectAccessibilityStyles } from '@swalha1999/a16y-widget';

// Inject styles once at app root
injectAccessibilityStyles();

function App() {
  return (
    <div>
      <AccessibilityWidget
        translations={en}
        primaryColor="#6366f1"
      />
      {/* Your app content */}
    </div>
  );
}`}</pre>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>
          Made with ❤️ | <a href="https://github.com/swalha1999/a16y-widget">GitHub</a> | MIT License
        </p>
      </footer>

      {/* The Accessibility Widget */}
      <AccessibilityWidget
        translations={translations[lang]}
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
        primaryColor={theme}
        position="bottom-right"
      />
    </div>
  );
}

export default App;
