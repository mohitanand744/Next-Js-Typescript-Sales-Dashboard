/**
 * This utility adds compatibility for Recharts with React 19
 * by ensuring the "super expression must be null or a function" error is avoided
 */

// Add this empty file to ensure proper module resolution
// The real fix is using dynamic imports with { ssr: false } 