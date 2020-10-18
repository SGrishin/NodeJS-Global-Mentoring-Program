module.exports = {
    testEnvironment: 'node',
    roots: [
        'src/',
    ],
    testMatch: [
        '**/__tests__/**/*.+(js)',
        '**/?(*.)+(spec|test).+(js)',
    ],
    transform: {
        '^.+\\.js$': '<rootDir>/jest.transform.js'
    }
};