const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const { getScore } = require("./calculate");

app.use(express.json());
app.use(cors())
app.use(bodyParser.json());

// Calculate the NEWS Score
app.post("/api/calculate", (req, res) => {
    const { valueTemperature, valueHeartRate, valueRespiratoryRate } = req.body;

    const score1 = getScore(valueTemperature, 1); // Value, rangeType
    const score2 = getScore(valueHeartRate, 2);
    const score3 = getScore(valueRespiratoryRate, 3);
    const newsScore = score1 + score2 + score3;

    res.json({ newsScore });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
