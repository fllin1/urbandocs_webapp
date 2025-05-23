/**
 * Phase 2A: Homepage UX Improvements Test Suite
 * 
 * Tests for:
 * - Guest Access Mode
 * - Enhanced Hero Section
 * - Preview Functionality
 * - Improved Navigation Flow
 */

import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

// Mock the HomepagePhase2A class
const mockHomepagePhase2A = {
    init: jest.fn(),
    initializeGuestMode: jest.fn(),
    loadCitiesForGuests: jest.fn(),
    showPreviewMode: jest.fn(),
    hidePreviewModal: jest.fn(),
    updateStepsIndicator: jest.fn(),
    trackEvent: jest.fn()
};

// Setup DOM from the actual HTML file
let dom;
let document;
let window;

beforeAll(() => {
    // Read the actual HTML file
    const htmlPath = path.join(__dirname, '../src/index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    dom = new JSDOM(htmlContent, {
        url: 'http://localhost',
        resources: 'usable',
        runScripts: 'dangerously'
    });
    
    document = dom.window.document;
    window = dom.window;
    
    // Mock the HomepagePhase2A on the window
    window.HomepagePhase2A = jest.fn(() => mockHomepagePhase2A);
    window.homepagePhase2A = mockHomepagePhase2A;
});

describe('Phase 2A: Enhanced Hero Section', () => {
    test('should display the correct page title', () => {
        const title = document.querySelector('title');
        expect(title).toBeTruthy();
        expect(title.textContent).toBe('MWPLU - Synthèses PLU Simplifiées');
    });

    test('should display hero title with correct text', () => {
        const heroTitle = document.querySelector('.hero-title');
        expect(heroTitle).toBeTruthy();
        expect(heroTitle.textContent.trim()).toBe('Synthèses PLU Simplifiées');
    });

    test('should display hero subtitle', () => {
        const heroSubtitle = document.querySelector('.hero-subtitle');
        expect(heroSubtitle).toBeTruthy();
        expect(heroSubtitle.textContent).toContain('Découvrez instantanément');
    });

    test('should display value proposition cards', () => {
        const valueItems = document.querySelectorAll('.value-item');
        expect(valueItems).toHaveLength(3);
        
        const expectedTexts = ['Simple & Rapide', 'Synthèses Claires', 'Décisions Éclairées'];
        valueItems.forEach((item, index) => {
            const heading = item.querySelector('h3');
            expect(heading.textContent).toBe(expectedTexts[index]);
        });
    });

    test('should display value proposition icons', () => {
        const valueIcons = document.querySelectorAll('.value-icon');
        expect(valueIcons).toHaveLength(3);
        
        const expectedIcons = ['🏗️', '📋', '🎯'];
        valueIcons.forEach((icon, index) => {
            expect(icon.textContent).toBe(expectedIcons[index]);
        });
    });
});

describe('Phase 2A: Process Steps Indicator', () => {
    test('should display process steps section', () => {
        const processSteps = document.querySelector('.process-steps');
        expect(processSteps).toBeTruthy();
    });

    test('should have three step items', () => {
        const stepItems = document.querySelectorAll('.step-item');
        expect(stepItems).toHaveLength(3);
    });

    test('should have first step active by default', () => {
        const firstStep = document.querySelector('.step-item[data-step="1"]');
        expect(firstStep).toBeTruthy();
        expect(firstStep.classList.contains('active')).toBe(true);
    });

    test('should display step numbers correctly', () => {
        const stepNumbers = document.querySelectorAll('.step-number');
        expect(stepNumbers).toHaveLength(3);
        
        stepNumbers.forEach((stepNumber, index) => {
            expect(stepNumber.textContent).toBe((index + 1).toString());
        });
    });

    test('should display step content', () => {
        const stepContents = document.querySelectorAll('.step-content h4');
        expect(stepContents).toHaveLength(3);
        
        const expectedTitles = ['Choisissez votre ville', 'Définissez la zone', 'Découvrez la synthèse'];
        stepContents.forEach((content, index) => {
            expect(content.textContent).toBe(expectedTitles[index]);
        });
    });
});

describe('Phase 2A: Guest Access Mode', () => {
    test('should display guest banner', () => {
        const guestBanner = document.getElementById('guestBanner');
        expect(guestBanner).toBeTruthy();
        expect(guestBanner.classList.contains('guest-banner')).toBe(true);
    });

    test('should have guest banner content', () => {
        const guestText = document.querySelector('.guest-text strong');
        expect(guestText).toBeTruthy();
        expect(guestText.textContent).toBe('Mode exploration gratuit');
    });

    test('should have guest toggle button', () => {
        const guestToggle = document.getElementById('guestToggle');
        expect(guestToggle).toBeTruthy();
        expect(guestToggle.title).toBe('En savoir plus');
    });

    test('should have city selection dropdown', () => {
        const villeSelect = document.getElementById('villeSelect');
        expect(villeSelect).toBeTruthy();
        expect(villeSelect.tagName).toBe('SELECT');
    });

    test('should have zonage selection dropdown', () => {
        const zonageSelect = document.getElementById('zonageSelect');
        expect(zonageSelect).toBeTruthy();
        expect(zonageSelect.disabled).toBe(true); // Should be disabled initially
    });

    test('should have zone selection dropdown', () => {
        const zoneSelect = document.getElementById('zoneSelect');
        expect(zoneSelect).toBeTruthy();
        expect(zoneSelect.disabled).toBe(true); // Should be disabled initially
    });
});

describe('Phase 2A: Form Elements and Tooltips', () => {
    test('should have form labels with help tooltips', () => {
        const helpTooltips = document.querySelectorAll('.help-tooltip');
        expect(helpTooltips.length).toBeGreaterThan(0);
        
        helpTooltips.forEach(tooltip => {
            expect(tooltip.hasAttribute('title')).toBe(true);
            expect(tooltip.getAttribute('title')).not.toBe('');
        });
    });

    test('should have form help texts', () => {
        const helpTexts = document.querySelectorAll('.form-help-text');
        expect(helpTexts).toHaveLength(3);
        
        const villeHelp = document.getElementById('villeHelp');
        expect(villeHelp.textContent).toBe('Commencez par sélectionner votre ville');
    });

    test('should have action buttons', () => {
        const synthesisBtn = document.getElementById('synthesisBtn');
        const previewBtn = document.getElementById('previewBtn');
        const sampleBtn = document.getElementById('sampleBtn');
        
        expect(synthesisBtn).toBeTruthy();
        expect(previewBtn).toBeTruthy();
        expect(sampleBtn).toBeTruthy();
        
        // Buttons should be disabled initially
        expect(synthesisBtn.disabled).toBe(true);
        expect(previewBtn.disabled).toBe(true);
    });
});

describe('Phase 2A: Preview Modal', () => {
    test('should have preview modal element', () => {
        const previewModal = document.getElementById('previewModal');
        expect(previewModal).toBeTruthy();
        expect(previewModal.classList.contains('modal')).toBe(true);
        expect(previewModal.classList.contains('hidden')).toBe(true);
    });

    test('should have modal structure', () => {
        const modalBackdrop = document.querySelector('.modal-backdrop');
        const modalContent = document.querySelector('.modal-content');
        const modalHeader = document.querySelector('.modal-header');
        const modalBody = document.querySelector('.modal-body');
        const modalFooter = document.querySelector('.modal-footer');
        
        expect(modalBackdrop).toBeTruthy();
        expect(modalContent).toBeTruthy();
        expect(modalHeader).toBeTruthy();
        expect(modalBody).toBeTruthy();
        expect(modalFooter).toBeTruthy();
    });

    test('should have modal close buttons', () => {
        const closePreview = document.getElementById('closePreview');
        const closePreviewBtn = document.getElementById('closePreviewBtn');
        
        expect(closePreview).toBeTruthy();
        expect(closePreviewBtn).toBeTruthy();
    });

    test('should have preview content container', () => {
        const previewContent = document.querySelector('.preview-content');
        expect(previewContent).toBeTruthy();
    });
});

describe('Phase 2A: Social Proof Section', () => {
    test('should display social proof section', () => {
        const socialProof = document.querySelector('.social-proof');
        expect(socialProof).toBeTruthy();
    });

    test('should display statistics', () => {
        const statItems = document.querySelectorAll('.stat-item');
        expect(statItems).toHaveLength(3);
    });

    test('should display correct stat numbers', () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        expect(statNumbers).toHaveLength(3);
        
        const expectedNumbers = ['500+', '2000+', '98%'];
        statNumbers.forEach((stat, index) => {
            expect(stat.textContent).toBe(expectedNumbers[index]);
        });
    });

    test('should display stat labels', () => {
        const statLabels = document.querySelectorAll('.stat-label');
        expect(statLabels).toHaveLength(3);
        
        const expectedLabels = ['Communes disponibles', 'Synthèses générées', 'Utilisateurs satisfaits'];
        statLabels.forEach((label, index) => {
            expect(label.textContent).toBe(expectedLabels[index]);
        });
    });
});

describe('Phase 2A: Footer Integration', () => {
    test('should maintain enhanced footer', () => {
        const footer = document.querySelector('.site-footer');
        expect(footer).toBeTruthy();
    });

    test('should have footer contact section', () => {
        const footerContact = document.querySelector('.footer-contact');
        expect(footerContact).toBeTruthy();
        
        const contactEmail = document.querySelector('a[href="mailto:contact@mwplu.com"]');
        const contactPhone = document.querySelector('a[href="tel:0601842720"]');
        
        expect(contactEmail).toBeTruthy();
        expect(contactPhone).toBeTruthy();
    });

    test('should have footer navigation', () => {
        const footerNav = document.querySelector('.footer-nav');
        expect(footerNav).toBeTruthy();
        
        const navLinks = document.querySelectorAll('.footer-nav-list a');
        expect(navLinks.length).toBeGreaterThan(0);
    });

    test('should have social media links', () => {
        const socialLinks = document.querySelectorAll('.social-link');
        expect(socialLinks.length).toBeGreaterThan(0);
    });
});

describe('Phase 2A: SEO and Meta Tags', () => {
    test('should have correct meta description', () => {
        const metaDescription = document.querySelector('meta[name="description"]');
        expect(metaDescription).toBeTruthy();
        expect(metaDescription.getAttribute('content')).toContain('PLU françaises');
    });

    test('should have viewport meta tag', () => {
        const viewport = document.querySelector('meta[name="viewport"]');
        expect(viewport).toBeTruthy();
        expect(viewport.getAttribute('content')).toBe('width=device-width, initial-scale=1.0');
    });

    test('should have correct charset', () => {
        const charset = document.querySelector('meta[charset]');
        expect(charset).toBeTruthy();
        expect(charset.getAttribute('charset')).toBe('UTF-8');
    });
});

describe('Phase 2A: Accessibility', () => {
    test('should have accessible form labels', () => {
        const formLabels = document.querySelectorAll('label[for]');
        
        formLabels.forEach(label => {
            const forAttribute = label.getAttribute('for');
            const associatedInput = document.getElementById(forAttribute);
            expect(associatedInput).toBeTruthy();
        });
    });

    test('should have alt text for images', () => {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            expect(img.hasAttribute('alt')).toBe(true);
            expect(img.getAttribute('alt')).not.toBe('');
        });
    });

    test('should have aria labels for social links', () => {
        const socialLinks = document.querySelectorAll('.social-link[aria-label]');
        
        socialLinks.forEach(link => {
            expect(link.getAttribute('aria-label')).not.toBe('');
        });
    });
});

// Test Utilities
describe('Test Utilities', () => {
    test('should be able to simulate click events', () => {
        const button = document.getElementById('sampleBtn');
        expect(button).toBeTruthy();
        
        // Test that we can create and dispatch events
        const clickEvent = new window.Event('click');
        expect(() => button.dispatchEvent(clickEvent)).not.toThrow();
    });

    test('should be able to simulate form changes', () => {
        const select = document.getElementById('villeSelect');
        expect(select).toBeTruthy();
        
        // Test that we can change select values
        select.value = 'grenoble';
        const changeEvent = new window.Event('change');
        expect(() => select.dispatchEvent(changeEvent)).not.toThrow();
    });
});

// Integration Tests
describe('Phase 2A: Integration Tests', () => {
    test('should have all required CSS files linked', () => {
        const cssLink = document.querySelector('link[href="css/main.css"]');
        expect(cssLink).toBeTruthy();
    });

    test('should have webpack bundle scripts included', () => {
        const scripts = document.querySelectorAll('script[src*=".bundle.js"]');
        expect(scripts.length).toBeGreaterThan(0);
        
        // Check for specific bundles
        const homepageScript = document.querySelector('script[src*="homepagePhase2A"]');
        expect(homepageScript).toBeTruthy();
    });

    test('should maintain responsive design structure', () => {
        const container = document.querySelector('.container');
        const grid = document.querySelector('.grid');
        const gridCols = document.querySelectorAll('[class*="grid-col-"]');
        
        expect(container).toBeTruthy();
        expect(grid).toBeTruthy();
        expect(gridCols.length).toBeGreaterThan(0);
    });
});

/**
 * Test Utilities and Helpers
 */
const TestHelpers = {
    // Simulate guest user session
    simulateGuestSession: () => {
        // Helper to set up guest user state
    },

    // Simulate authenticated user session
    simulateAuthenticatedSession: () => {
        // Helper to set up authenticated user state
    },

    // Load test PLU data
    loadTestPLUData: () => {
        // Helper to load sample PLU data for testing
    },

    // Check responsive behavior
    testResponsiveBreakpoints: () => {
        // Helper to test different screen sizes
    },

    // Measure performance metrics
    measurePerformance: () => {
        // Helper to measure loading times and performance
    }
};

module.exports = TestHelpers; 