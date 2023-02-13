function getScore(value, rangeType) {
    const rangeScores = {
        1: [
            { range: [31, 35], score: 3 },
            { range: [35, 36], score: 1 },
            { range: [36, 38], score: 0 },
            { range: [38, 39], score: 1 },
            { range: [39, 42], score: 2 },
        ],
        2: [
            { range: [25, 40], score: 3 },
            { range: [40, 50], score: 1 },
            { range: [50, 90], score: 0 },
            { range: [90, 110], score: 1 },
            { range: [110, 130], score: 2 },
            { range: [130, 220], score: 3 },
        ],
        3: [
            { range: [3, 8], score: 3 },
            { range: [8, 11], score: 1 },
            { range: [11, 20], score: 0 },
            { range: [20, 24], score: 2 },
            { range: [24, 60], score: 3 },
        ],
    };

    // Validation of rangeType in case unvalidated request
    const ranges = rangeScores[rangeType];
    if (!ranges) {
        return "ERROR: Invalid rangeType";
    }

    // Loop to iterate each range object
    for (const { range, score } of ranges) {
        if (value >= range[0] && value <= range[1]) {
            return score;
        }
    }

    // In case of input error, this specifies which calue(s) are invalid
    return `ERROR: Value outside of ${Object.keys(rangeScores)[rangeType - 1]} range`; // If error, pass which value is outside of range
}

module.exports = {
    getScore
};