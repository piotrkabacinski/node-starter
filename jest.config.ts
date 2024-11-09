import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node",
  detectOpenHandles: true,
  maxWorkers: '85%',
  watch: false,
  testTimeout: 2000,
  testMatch: ["<rootDir>/**/users.test.ts"],
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
