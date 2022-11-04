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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));