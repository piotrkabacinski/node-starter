import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node",
  detectOpenHandles: true,
  maxWorkers: '85%',
  testTimeout: 10_000,
  watch: false,
  testMatch: ["<rootDir>/**/*.test.ts"],
  forceExit: true,
  testPathIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  moduleNameMapper: {
    "^src/(.*)": "<rootDir>/src/$1",
  }
};

export default config;
