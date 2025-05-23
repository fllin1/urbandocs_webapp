/**
 * Jest setup file for polyfills and global configurations
 */

// Polyfill for TextEncoder/TextDecoder (required by JSDOM)
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock fetch for testing (if needed)
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

// Mock console.log to reduce noise during tests
const originalConsoleLog = console.log;
console.log = jest.fn();

// Restore console.log for debugging if needed
global.restoreConsoleLog = () => {
  console.log = originalConsoleLog;
};

// Mock window.location for tests that need it
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:3000',
    hostname: 'localhost',
    port: '3000',
    protocol: 'http:',
  },
  writable: true,
});

// Mock window.matchMedia (for responsive tests)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver if needed
global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
  unobserve: jest.fn(),
})); 