const calculateBmi = (height: number, weight: number): string => {
    const inMeters = height / 100;
    const bmi = weight / (inMeters ** 2);

    if (bmi < 18.5) {
        return 'underweight';
    } else if (bmi < 24.9) {
        return 'healthy weight';
    } else if (bmi < 29.9) {
        return 'overweight';
    } else {
        return 'obese';
    } 
}

console.log(calculateBmi(180, 74));