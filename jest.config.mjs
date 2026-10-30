/* eslint-disable max-len */
import nextJest from 'next/jest.js';
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});
 
// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
 
  testEnvironment: 'jest-environment-jsdom',
};
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// next-intl (and use-intl) are ESM-only, so they must be transformed: next/jest ignores node_modules by default
export default async () => {
  const jestConfig = await createJestConfig(config)();
  return {
    ...jestConfig,
    transformIgnorePatterns: [
      '/node_modules/(?!(\\.pnpm/)?(next-intl|use-intl|geist|next)[@/+])',
      ...jestConfig.transformIgnorePatterns.filter((pattern) => !pattern.startsWith('/node_modules')),
    ],
  };
};
