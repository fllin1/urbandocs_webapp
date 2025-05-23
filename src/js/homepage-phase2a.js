/**
 * Phase 2A: Homepage UX Improvements JavaScript
 * Features: Guest Mode, Preview Functionality, Enhanced Navigation
 */

class HomepagePhase2A {
    constructor() {
        this.isGuestMode = true; // Default to guest mode
        this.currentStep = 1;
        this.previewData = null;
        
        console.log('HomepagePhase2A constructor called');
        this.init();
    }

    init() {
        console.log('HomepagePhase2A init called');
        this.initializeGuestMode();
        this.initializeStepsIndicator();
        this.initializeTooltips();
        this.initializePreviewModal();
        this.initializeFormEnhancements();
        this.initializeAnalytics();
    }

    // Guest Mode Functionality
    initializeGuestMode() {
        console.log('Initializing guest mode...');
        const guestBanner = document.getElementById('guestBanner');
        const guestToggle = document.getElementById('guestToggle');
        const villeSelect = document.getElementById('villeSelect');

        console.log('Elements found:', {
            guestBanner: !!guestBanner,
            guestToggle: !!guestToggle,
            villeSelect: !!villeSelect
        });

        // Show guest banner if user is not authenticated
        if (this.isGuestMode) {
            if (guestBanner) {
                guestBanner.classList.remove('hidden');
                console.log('Guest banner shown');
            }
            
            // Enable city selection for guests
            if (villeSelect) {
                villeSelect.disabled = false;
                console.log('City select enabled, loading cities...');
                this.loadCitiesForGuests();
            } else {
                console.error('villeSelect element not found!');
            }
        }

        // Guest banner toggle
        if (guestToggle) {
            guestToggle.addEventListener('click', () => {
                this.showGuestModeInfo();
            });
            console.log('Guest toggle listener added');
        }
    }

    async loadCitiesForGuests() {
        try {
            console.log('Loading cities for guests...');
            
            // Add small delay to ensure app.js has finished its checks
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Simulate loading cities for guests (would normally come from API)
            const cities = [
                { value: 'grenoble', text: 'Grenoble (38)' },
                { value: 'lyon', text: 'Lyon (69)' },
                { value: 'marseille', text: 'Marseille (13)' },
                { value: 'nice', text: 'Nice (06)' },
                { value: 'toulouse', text: 'Toulouse (31)' }
            ];

            const villeSelect = document.getElementById('villeSelect');
            if (villeSelect) {
                console.log('Adding cities to select...');
                
                // Enable the select first
                villeSelect.disabled = false;
                
                // Clear ALL existing options
                villeSelect.innerHTML = '';
                
                // Add default option
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Sélectionnez une ville...';
                villeSelect.appendChild(defaultOption);
                
                // Add guest cities
                cities.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city.value;
                    option.textContent = city.text;
                    villeSelect.appendChild(option);
                });
                
                console.log(`Added ${cities.length} cities to select`);
                console.log('Current select options:', Array.from(villeSelect.options).map(opt => opt.textContent));
                
                // Add city change event listener
                // Remove existing listener if any
                if (this.cityChangeHandler) {
                    villeSelect.removeEventListener('change', this.cityChangeHandler);
                }
                
                // Create and store bound handler
                this.cityChangeHandler = (event) => {
                    console.log('Guest mode city changed:', event.target.value);
                    this.handleCitySelection(event.target.value);
                    this.updateStepsIndicator(2);
                };
                
                villeSelect.addEventListener('change', this.cityChangeHandler);
                console.log('Guest mode city change listener added');
            } else {
                console.error('villeSelect element not found');
            }
        } catch (error) {
            console.error('Error loading guest cities:', error);
        }
    }

    handleCitySelection(cityValue) {
        const zonageSelect = document.getElementById('zonageSelect');
        const villeHelp = document.getElementById('villeHelp');

        if (!cityValue) return;

        // Enable zonage selection
        zonageSelect.disabled = false;
        zonageSelect.innerHTML = '<option value="">Choisissez un type de zonage...</option>';

        // Add sample zonage options
        const zonageOptions = [
            { value: 'ua', text: 'UA - Zone urbaine dense' },
            { value: 'ub', text: 'UB - Zone urbaine' },
            { value: 'uc', text: 'UC - Zone urbaine périphérique' },
            { value: 'n', text: 'N - Zone naturelle' },
            { value: 'a', text: 'A - Zone agricole' }
        ];

        zonageOptions.forEach(zonage => {
            const option = document.createElement('option');
            option.value = zonage.value;
            option.textContent = zonage.text;
            zonageSelect.appendChild(option);
        });

        // Update help text
        if (villeHelp) {
            villeHelp.textContent = `Ville sélectionnée: ${cityValue}`;
        }

        // Remove existing listener if any
        zonageSelect.removeEventListener('change', this.zonageChangeHandler);
        
        // Create and store bound handler
        this.zonageChangeHandler = () => {
            this.handleZonageSelection(zonageSelect.value);
            this.updateStepsIndicator(3);
        };
        
        zonageSelect.addEventListener('change', this.zonageChangeHandler);
    }

    handleZonageSelection(zonageValue) {
        const zoneSelect = document.getElementById('zoneSelect');
        const zonageHelp = document.getElementById('zonageHelp');

        if (!zonageValue) return;

        // Enable zone selection
        zoneSelect.disabled = false;
        zoneSelect.innerHTML = '<option value="">Choisissez une zone spécifique...</option>';

        // Add sample zone options based on zonage
        const zoneOptions = [
            { value: '1', text: `${zonageValue.toUpperCase()}-1` },
            { value: '2', text: `${zonageValue.toUpperCase()}-2` },
            { value: '3', text: `${zonageValue.toUpperCase()}-3` }
        ];

        zoneOptions.forEach(zone => {
            const option = document.createElement('option');
            option.value = zone.value;
            option.textContent = zone.text;
            zoneSelect.appendChild(option);
        });

        // Update help text
        if (zonageHelp) {
            zonageHelp.textContent = `Zonage sélectionné: ${zonageValue.toUpperCase()}`;
        }

        // Remove existing listener if any
        zoneSelect.removeEventListener('change', this.zoneChangeHandler);
        
        // Create and store bound handler
        this.zoneChangeHandler = () => {
            this.handleZoneSelection(zoneSelect.value);
            this.enableActionButtons();
        };
        
        zoneSelect.addEventListener('change', this.zoneChangeHandler);
    }

    handleZoneSelection(zoneValue) {
        const zoneHelp = document.getElementById('zoneHelp');
        
        if (zoneHelp && zoneValue) {
            zoneHelp.textContent = `Zone sélectionnée: ${zoneValue}`;
        }
    }

    enableActionButtons() {
        const synthesisBtn = document.getElementById('synthesisBtn');
        const previewBtn = document.getElementById('previewBtn');

        if (synthesisBtn) {
            synthesisBtn.disabled = false;
            
            // Remove existing listener if any
            synthesisBtn.removeEventListener('click', this.synthesisClickHandler);
            
            // Create and store bound handler
            this.synthesisClickHandler = () => {
                if (this.isGuestMode) {
                    this.showPreviewMode();
                } else {
                    this.showFullSynthesis();
                }
            };
            
            synthesisBtn.addEventListener('click', this.synthesisClickHandler);
        }

        if (previewBtn) {
            previewBtn.disabled = false;
            
            // Remove existing listener if any
            previewBtn.removeEventListener('click', this.previewClickHandler);
            
            // Create and store bound handler
            this.previewClickHandler = () => {
                this.showPreviewMode();
            };
            
            previewBtn.addEventListener('click', this.previewClickHandler);
        }

        // Sample button
        const sampleBtn = document.getElementById('sampleBtn');
        if (sampleBtn) {
            // Remove existing listener if any
            sampleBtn.removeEventListener('click', this.sampleClickHandler);
            
            // Create and store bound handler
            this.sampleClickHandler = () => {
                this.showSampleContent();
            };
            
            sampleBtn.addEventListener('click', this.sampleClickHandler);
        }
    }

    // Steps Indicator
    initializeStepsIndicator() {
        this.updateStepsIndicator(1);
    }

    updateStepsIndicator(activeStep) {
        this.currentStep = activeStep;
        const steps = document.querySelectorAll('.step-item');
        
        steps.forEach((step, index) => {
            const stepNumber = index + 1;
            if (stepNumber <= activeStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    // Tooltips and Help
    initializeTooltips() {
        const tooltips = document.querySelectorAll('.help-tooltip');
        
        tooltips.forEach(tooltip => {
            tooltip.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target, e.target.getAttribute('title'));
            });
            
            tooltip.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }

    showTooltip(element, text) {
        // Create tooltip element if it doesn't exist
        let tooltip = document.getElementById('tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'tooltip';
            tooltip.className = 'tooltip';
            document.body.appendChild(tooltip);
        }

        tooltip.textContent = text;
        tooltip.style.display = 'block';
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.bottom + 5) + 'px';
    }

    hideTooltip() {
        const tooltip = document.getElementById('tooltip');
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }

    // Preview Modal Functionality
    initializePreviewModal() {
        const modal = document.getElementById('previewModal');
        const closeButtons = document.querySelectorAll('#closePreview, #closePreviewBtn');
        const backdrop = document.querySelector('.modal-backdrop');

        // Close modal handlers
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.hidePreviewModal();
            });
        });

        if (backdrop) {
            backdrop.addEventListener('click', () => {
                this.hidePreviewModal();
            });
        }

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
                this.hidePreviewModal();
            }
        });
    }

    showPreviewMode() {
        const modal = document.getElementById('previewModal');
        const modalBody = document.querySelector('.modal-body .preview-content');

        if (!modal || !modalBody) return;

        // Generate preview content
        const previewContent = this.generatePreviewContent();
        modalBody.innerHTML = previewContent;

        // Show modal
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Track analytics
        this.trackEvent('preview_opened', {
            step: this.currentStep,
            isGuest: this.isGuestMode
        });
    }

    generatePreviewContent() {
        const city = document.getElementById('villeSelect').value;
        const zonage = document.getElementById('zonageSelect').value;
        const zone = document.getElementById('zoneSelect').value;

        return `
            <div class="preview-container">
                <div class="preview-header">
                    <h4>Aperçu de la synthèse PLU</h4>
                    <div class="preview-location">
                        <strong>Zone:</strong> ${zonage?.toUpperCase()}-${zone} à ${city}
                    </div>
                </div>

                <div class="preview-sections">
                    <div class="preview-section">
                        <h5>📋 Destination de la zone</h5>
                        <div class="preview-content-box">
                            <p>Cette zone est destinée principalement à l'habitat et aux activités compatibles...</p>
                            <div class="preview-locked">
                                <span class="lock-icon">🔒</span>
                                <em>Contenu complet disponible avec un compte gratuit</em>
                            </div>
                        </div>
                    </div>

                    <div class="preview-section">
                        <h5>🏗️ Règles de construction</h5>
                        <div class="preview-content-box">
                            <p>Hauteur maximale: <strong>12 mètres</strong></p>
                            <p>Coefficient d'emprise au sol: <strong>40%</strong></p>
                            <div class="preview-locked">
                                <span class="lock-icon">🔒</span>
                                <em>+ 15 autres règles détaillées</em>
                            </div>
                        </div>
                    </div>

                    <div class="preview-section">
                        <h5>🚗 Stationnement</h5>
                        <div class="preview-content-box">
                            <p>1 place par logement obligatoire...</p>
                            <div class="preview-locked">
                                <span class="lock-icon">🔒</span>
                                <em>Règles complètes et exceptions disponibles</em>
                            </div>
                        </div>
                    </div>

                    <div class="preview-benefits">
                        <h5>🎯 Avec un compte gratuit, vous débloquez:</h5>
                        <ul>
                            <li>✅ Synthèses complètes et détaillées</li>
                            <li>✅ Téléchargement PDF</li>
                            <li>✅ Accès à toutes les communes</li>
                            <li>✅ Mise à jour automatique des règlements</li>
                            <li>✅ Support par email</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    hidePreviewModal() {
        const modal = document.getElementById('previewModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    showSampleContent() {
        // Show a sample PLU synthesis for demonstration
        const villeSelect = document.getElementById('villeSelect');
        const zonageSelect = document.getElementById('zonageSelect');
        const zoneSelect = document.getElementById('zoneSelect');

        // Set sample values
        villeSelect.value = 'grenoble';
        this.handleCitySelection('grenoble');
        
        setTimeout(() => {
            zonageSelect.value = 'ua';
            this.handleZonageSelection('ua');
            
            setTimeout(() => {
                zoneSelect.value = '1';
                this.handleZoneSelection('1');
                this.enableActionButtons();
                this.updateStepsIndicator(3);
                
                // Show preview after a short delay
                setTimeout(() => {
                    this.showPreviewMode();
                }, 500);
            }, 300);
        }, 300);
    }

    showFullSynthesis() {
        // Redirect to full synthesis (for authenticated users)
        window.location.href = '/plu-summary';
    }

    showGuestModeInfo() {
        // Show guest mode information
        const statusMessage = document.getElementById('statusMessage');
        if (statusMessage) {
            statusMessage.innerHTML = `
                <div class="guest-mode-info">
                    <h4>🎯 Mode exploration gratuit</h4>
                    <p>Vous pouvez actuellement :</p>
                    <ul>
                        <li>✅ Explorer toutes les communes disponibles</li>
                        <li>✅ Voir la structure de nos synthèses</li>
                        <li>✅ Découvrir un aperçu du contenu</li>
                    </ul>
                    <p><strong>Créez un compte gratuit</strong> pour :</p>
                    <ul>
                        <li>🔓 Accéder aux synthèses complètes</li>
                        <li>📥 Télécharger les résumés en PDF</li>
                        <li>💾 Sauvegarder vos recherches favorites</li>
                    </ul>
                    <div class="guest-cta">
                        <a href="/signup" class="primary-btn">Créer un compte gratuit</a>
                        <a href="/login" class="secondary-btn">Se connecter</a>
                    </div>
                </div>
            `;
            statusMessage.classList.remove('hidden');
        }
    }

    // Form Enhancements
    initializeFormEnhancements() {
        // Add loading states
        this.addFormLoadingStates();
        
        // Add form validation
        this.addFormValidation();
        
        // Add keyboard navigation
        this.addKeyboardNavigation();
    }

    addFormLoadingStates() {
        const selects = document.querySelectorAll('.form-select');
        
        selects.forEach(select => {
            select.addEventListener('change', () => {
                // Add loading state simulation
                const nextSelect = this.getNextSelect(select);
                if (nextSelect) {
                    this.showSelectLoading(nextSelect);
                    setTimeout(() => {
                        this.hideSelectLoading(nextSelect);
                    }, 500);
                }
            });
        });
    }

    getNextSelect(currentSelect) {
        const selects = ['villeSelect', 'zonageSelect', 'zoneSelect'];
        const currentIndex = selects.indexOf(currentSelect.id);
        return currentIndex < selects.length - 1 ? 
            document.getElementById(selects[currentIndex + 1]) : null;
    }

    showSelectLoading(select) {
        if (select) {
            select.style.opacity = '0.6';
            select.disabled = true;
        }
    }

    hideSelectLoading(select) {
        if (select) {
            select.style.opacity = '1';
            select.disabled = false;
        }
    }

    addFormValidation() {
        const form = document.getElementById('pluForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.validateAndSubmitForm();
            });
        }
    }

    validateAndSubmitForm() {
        const ville = document.getElementById('villeSelect').value;
        const zonage = document.getElementById('zonageSelect').value;
        const zone = document.getElementById('zoneSelect').value;

        if (!ville || !zonage || !zone) {
            this.showValidationError('Veuillez sélectionner une ville, un zonage et une zone.');
            return false;
        }

        // Submit form or show preview based on guest mode
        if (this.isGuestMode) {
            this.showPreviewMode();
        } else {
            this.showFullSynthesis();
        }

        return true;
    }

    showValidationError(message) {
        const statusMessage = document.getElementById('statusMessage');
        if (statusMessage) {
            statusMessage.innerHTML = `<div class="alert alert-warning">${message}</div>`;
            statusMessage.classList.remove('hidden');
            
            setTimeout(() => {
                statusMessage.classList.add('hidden');
            }, 5000);
        }
    }

    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Enter key to proceed to next step
            if (e.key === 'Enter' && e.target.tagName === 'SELECT') {
                const nextSelect = this.getNextSelect(e.target);
                if (nextSelect && !nextSelect.disabled) {
                    nextSelect.focus();
                }
            }
        });
    }

    // Analytics and Tracking
    initializeAnalytics() {
        // Track page view
        this.trackEvent('homepage_view', {
            isGuest: this.isGuestMode,
            timestamp: new Date().toISOString()
        });
    }

    trackEvent(eventName, properties = {}) {
        // Analytics tracking (would integrate with actual analytics service)
        console.log('Analytics Event:', eventName, properties);
        
        // Example: gtag('event', eventName, properties);
        // Example: mixpanel.track(eventName, properties);
    }
}

// Global initialization functions for inline script compatibility
window.initializeGuestMode = function() {
    console.log('Global initializeGuestMode called');
    window.homepagePhase2A = new HomepagePhase2A();
};

window.initializeStepsIndicator = function() {
    console.log('Global initializeStepsIndicator called');
    // Already handled in main class
};

window.initializeTooltips = function() {
    console.log('Global initializeTooltips called');
    // Already handled in main class
};

window.initializePreviewModal = function() {
    console.log('Global initializePreviewModal called');
    // Already handled in main class
};

// Make HomepagePhase2A available globally
window.HomepagePhase2A = HomepagePhase2A;

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded, initializing HomepagePhase2A...');
    if (!window.homepagePhase2A) {
        try {
            window.homepagePhase2A = new HomepagePhase2A();
            console.log('HomepagePhase2A successfully initialized');
        } catch (error) {
            console.error('Error initializing HomepagePhase2A:', error);
        }
    } else {
        console.log('HomepagePhase2A already initialized');
    }
});

// Also try to initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    console.log('Document still loading, waiting for DOMContentLoaded...');
} else {
    console.log('Document already loaded, initializing immediately...');
    if (!window.homepagePhase2A) {
        try {
            window.homepagePhase2A = new HomepagePhase2A();
            console.log('HomepagePhase2A successfully initialized immediately');
        } catch (error) {
            console.error('Error initializing HomepagePhase2A immediately:', error);
        }
    }
} 