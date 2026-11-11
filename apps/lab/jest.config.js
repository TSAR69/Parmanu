module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  moduleNameMapper: {
    "^@axiom/core$": "<rootDir>/../../packages/core/src/index.ts",
    "^@axiom/module-atomic$":
      "<rootDir>/../../packages/modules/atomic/src/index.ts",
    "^@axiom/visualization$": "<rootDir>/../../packages/visualization/src/index.ts",
  },
};
