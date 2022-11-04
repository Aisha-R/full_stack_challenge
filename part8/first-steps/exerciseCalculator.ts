interface ExerciseValues {
    value1: number;
    value2: Array<number>;
}

const parseArguments = (args: Array<string>): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const arr1 = args.slice(3);

    const arr2 = arr1.map(entry => Number(entry));

    if (!isNaN(Number(args[2]))) {
        let notANumber = false;

        arr2.forEach(entry => {
            if (isNaN(entry)) {
                notANumber = true
            }
        });

        if (notANumber) {
            throw new Error('Provided values were not numbers!');
        } else {
            return {
                value1: Number(args[2]),
                value2: arr2
            }
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (actual: Array<number>, target: number): Result => {

    const trainingDays = actual.filter(day => day > 0);

    const sum = actual.reduce((current, next) => current + next, 0);
    
    let rating;
    let ratingDescription;

    if (actual.length === trainingDays.length) {
        rating = 5;
        ratingDescription = 'great job'
    } else if (actual.length > (trainingDays.length * 0.5)) {
        rating = 3;
        ratingDescription = 'not too bad but could be better'
    } else if (actual.length > 0) {
        rating = 1;
        ratingDescription = 'must have had a busy couple of days; pick up the pace for the upcoming week'
    } else {
        rating = 0;
        ratingDescription = 'don\'t give up; try again next week'
    }

    return {
        periodLength: actual.length,
        trainingDays: trainingDays.length,
        success: trainingDays.length === 7,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: sum / actual.length
    };
}

try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateExercises(value2, value1));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}