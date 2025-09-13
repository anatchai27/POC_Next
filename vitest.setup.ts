import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { vi } from 'vitest';

// Establish API mocking before all tests
beforeAll(() => {
  vi.mock('next/router', () => require('next-router-mock'));
});

// Cleanup after each test
afterEach(() => {
  cleanup();
});
