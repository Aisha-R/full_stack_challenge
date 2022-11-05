import calculateBmi from './bmiCalculator'

import express from 'express';
const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

    if (Object.keys(req.query).length < 2) {
        return res.send({ error: "malformatted parameters" })
    }

    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        return res.send({ error: "malformatted parameters" })
    }

    const bmi = calculateBmi(height, weight);
    return res.send({ weight, height, bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});