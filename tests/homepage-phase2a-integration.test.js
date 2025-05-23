/**
 * Phase 2A: Homepage JavaScript Integration Tests
 * Tests the actual JavaScript functionality of the HomepagePhase2A class
 */

// Import the actual HomepagePhase2A class
import HomepagePhase2A from '../src/js/homepage-phase2a.js';

// Mock DOM elements and browser APIs
const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
};

const mockWindow = {
    localStorage: mockLocalStorage,
    location: { href: 'http://localhost:5002' },
    addEventListener: jest.fn(),
    Event: global.Event
};

const mockDocument = {
    getElementById: jest.fn(),
    querySelector: jest.fn(),
    querySelectorAll: jest.fn(),
    createElement: jest.fn(),
    addEventListener: jest.fn(),
    body: { style: {}, appendChild: jest.fn() }
};

// Mock DOM elements
const mockElements = {
    guestBanner: { classList: { remove: jest.fn(), add: jest.fn() } },
    guestToggle: { addEventListener: jest.fn() },
    villeSelect: { 
        disabled: false, 
        appendChild: jest.fn(), 
        addEventListener: jest.fn(),
        value: ''
    },
    zonageSelect: { 
        disabled: true, 
        innerHTML: '', 
        appendChild: jest.fn(), 
        addEventListener: jest.fn() 
    },
    zoneSelect: { 
        disabled: true, 
        innerHTML: '', 
        appendChild: jest.fn(), 
        addEventListener: jest.fn() 
    },
    synthesisBtn: { disabled: true, addEventListener: jest.fn() },
    previewBtn: { disabled: true, addEventListener: jest.fn() },
    sampleBtn: { addEventListener: jest.fn() },
    previewModal: { classList: { remove: jest.fn(), add: jest.fn() } },
    statusMessage: { innerHTML: '', classList: { remove: jest.fn(), add: jest.fn() } }
};

beforeEach(() => {
    // Setup global mocks
    global.window = mockWindow;
    global.document = mockDocument;
    
    // Setup getElementById mock
    mockDocument.getElementById.mockImplementation((id) => mockElements[id] || null);
    
    // Setup querySelector mocks
    mockDocument.querySelector.mockImplementation((selector) => {
        if (selector === '.modal-backdrop') return { addEventListener: jest.fn() };
        if (selector === '.modal-body .preview-content') return { innerHTML: '' };
        return null;
    });
    
    mockDocument.querySelectorAll.mockImplementation((selector) => {
        if (selector === '#closePreview, #closePreviewBtn') {
            return [{ addEventListener: jest.fn() }, { addEventListener: jest.fn() }];
        }
        if (selector === '.help-tooltip') {
            return [
                { addEventListener: jest.fn(), getAttribute: jest.fn().mockReturnValue('Help text') },
                { addEventListener: jest.fn(), getAttribute: jest.fn().mockReturnValue('More help') }
            ];
        }
        if (selector === '.step-item') {
            return [
                { classList: { add: jest.fn(), remove: jest.fn() } },
                { classList: { add: jest.fn(), remove: jest.fn() } },
                { classList: { add: jest.fn(), remove: jest.fn() } }
            ];
        }
        return [];
    });
    
    // Clear all mocks
    jest.clearAllMocks();
});

describe('HomepagePhase2A Class', () => {
    let homepageInstance;

    beforeEach(() => {
        homepageInstance = new HomepagePhase2A();
    });

    test('should initialize correctly', () => {
        expect(homepageInstance).toBeDefined();
        expect(homepageInstance.isGuestMode).toBe(true);
        expect(homepageInstance.currentStep).toBe(1);
    });

    test('should initialize guest mode', () => {
        homepageInstance.initializeGuestMode();
        
        expect(mockDocument.getElementById).toHaveBeenCalledWith('guestBanner');
        expect(mockDocument.getElementById).toHaveBeenCalledWith('guestToggle');
        expect(mockDocument.getElementById).toHaveBeenCalledWith('villeSelect');
    });

    test('should load cities for guests', async () => {
        await homepageInstance.loadCitiesForGuests();
        
        // Verify cities are loaded
        expect(mockElements.villeSelect.appendChild).toHaveBeenCalled();
        expect(mockElements.villeSelect.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    });

    test('should handle city selection', () => {
        homepageInstance.handleCitySelection('grenoble');
        
        expect(mockDocument.getElementById).toHaveBeenCalledWith('zonageSelect');
        expect(mockDocument.getElementById).toHaveBeenCalledWith('villeHelp');
        expect(mockElements.zonageSelect.disabled).toBe(false);
    });

    test('should handle zonage selection', () => {
        homepageInstance.handleZonageSelection('ua');
        
        expect(mockDocument.getElementById).toHaveBeenCalledWith('zoneSelect');
        expect(mockDocument.getElementById).toHaveBeenCalledWith('zonageHelp');
        expect(mockElements.zoneSelect.disabled).toBe(false);
    });

    test('should enable action buttons after all selections', () => {
        homepageInstance.enableActionButtons();
        
        expect(mockElements.synthesisBtn.disabled).toBe(false);
        expect(mockElements.previewBtn.disabled).toBe(false);
        expect(mockElements.synthesisBtn.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    });

    test('should update steps indicator', () => {
        homepageInstance.updateStepsIndicator(2);
        
        expect(homepageInstance.currentStep).toBe(2);
        expect(mockDocument.querySelectorAll).toHaveBeenCalledWith('.step-item');
    });

    test('should initialize tooltips', () => {
        homepageInstance.initializeTooltips();
        
        expect(mockDocument.querySelectorAll).toHaveBeenCalledWith('.help-tooltip');
    });

    test('should generate preview content', () => {
        // Mock the form elements to have values
        mockElements.villeSelect.value = 'grenoble';
        mockElements.zonageSelect.value = 'ua';
        mockElements.zoneSelect.value = '1';
        
        const content = homepageInstance.generatePreviewContent();
        
        expect(content).toContain('Aperçu de la synthèse PLU');
        expect(content).toContain('UA-1 à grenoble');
        expect(content).toContain('Destination de la zone');
        expect(content).toContain('Règles de construction');
    });

    test('should track events', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        
        homepageInstance.trackEvent('test_event', { key: 'value' });
        
        expect(consoleSpy).toHaveBeenCalledWith('Analytics Event:', 'test_event', { key: 'value' });
        
        consoleSpy.mockRestore();
    });

    test('should validate form', () => {
        // Mock form elements without values
        mockElements.villeSelect.value = '';
        mockElements.zonageSelect.value = '';
        mockElements.zoneSelect.value = '';
        
        const isValid = homepageInstance.validateAndSubmitForm();
        
        expect(isValid).toBe(false);
        expect(mockDocument.getElementById).toHaveBeenCalledWith('statusMessage');
    });

    test('should validate form with complete values', () => {
        // Mock form elements with values
        mockElements.villeSelect.value = 'grenoble';
        mockElements.zonageSelect.value = 'ua';
        mockElements.zoneSelect.value = '1';
        
        const isValid = homepageInstance.validateAndSubmitForm();
        
        expect(isValid).toBe(true);
    });
});

describe('HomepagePhase2A Modal Functionality', () => {
    let homepageInstance;

    beforeEach(() => {
        homepageInstance = new HomepagePhase2A();
    });

    test('should show preview modal', () => {
        // Mock the required elements
        mockElements.previewModal = { classList: { remove: jest.fn(), add: jest.fn() } };
        mockDocument.querySelector.mockReturnValue({ innerHTML: '' });
        
        homepageInstance.showPreviewMode();
        
        expect(mockDocument.getElementById).toHaveBeenCalledWith('previewModal');
        expect(mockDocument.querySelector).toHaveBeenCalledWith('.modal-body .preview-content');
    });

    test('should hide preview modal', () => {
        homepageInstance.hidePreviewModal();
        
        expect(mockDocument.getElementById).toHaveBeenCalledWith('previewModal');
    });

    test('should initialize preview modal', () => {
        homepageInstance.initializePreviewModal();
        
        expect(mockDocument.getElementById).toHaveBeenCalledWith('previewModal');
        expect(mockDocument.querySelectorAll).toHaveBeenCalledWith('#closePreview, #closePreviewBtn');
    });
});

describe('HomepagePhase2A Form Enhancements', () => {
    let homepageInstance;

    beforeEach(() => {
        homepageInstance = new HomepagePhase2A();
    });

    test('should initialize form enhancements', () => {
        const spy = jest.spyOn(homepageInstance, 'addFormLoadingStates');
        homepageInstance.initializeFormEnhancements();
        
        expect(spy).toHaveBeenCalled();
    });

    test('should add form loading states', () => {
        mockDocument.querySelectorAll.mockReturnValue([
            { addEventListener: jest.fn(), id: 'villeSelect' },
            { addEventListener: jest.fn(), id: 'zonageSelect' }
        ]);
        
        homepageInstance.addFormLoadingStates();
        
        expect(mockDocument.querySelectorAll).toHaveBeenCalledWith('.form-select');
    });

    test('should show validation error', () => {
        homepageInstance.showValidationError('Test error message');
        
        expect(mockDocument.getElementById).toHaveBeenCalledWith('statusMessage');
    });
});

describe('HomepagePhase2A Analytics', () => {
    let homepageInstance;

    beforeEach(() => {
        homepageInstance = new HomepagePhase2A();
    });

    test('should initialize analytics', () => {
        const spy = jest.spyOn(homepageInstance, 'trackEvent');
        homepageInstance.initializeAnalytics();
        
        expect(spy).toHaveBeenCalledWith('homepage_view', expect.objectContaining({
            isGuest: true,
            timestamp: expect.any(String)
        }));
    });
}); 