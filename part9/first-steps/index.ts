import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

import express from 'express';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    return res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

    if (Object.keys(req.query).length < 2) {
        return res.status(400).send({ error: "malformatted parameters" });
    }

    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        return res.status(400).send({ error: "malformatted parameters" });
    }

    const bmi = calculateBmi(height, weight);
    return res.send({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const daily_exercises: any = req.body.daily_exercises;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const target: any  = req.body.target;

    if (!target || !daily_exercises) {
        return res.status(400).send({ error: "parameters missing" });
    }

    if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
        return res.status(400).send({ error: "malformatted parameters" });
    }

    const onlyNumbers = daily_exercises.every(element => typeof (element) === "number");

    if (!onlyNumbers) {
        return res.status(400).send({ error: "malformatted parameters" });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);
    return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});