function calculateBMI() {
    // 1. Input values ko pakarna
    const weight = document.querySelector('input[placeholder="Weight (kg)"]').value;
    const height = document.querySelector('input[placeholder="Height (cm)"]').value;
    const resultText = document.querySelector('.result');

    // 2. Validation: Check karna ke inputs khali to nahi
    if (weight === "" || height === "") {
        resultText.innerText = "Please enter both values!";
        resultText.style.color = "red";
        return;
    }

    // 3. Formula: BMI = kg / (m * m)
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    // 4. Result dikhana
    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal weight";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obese";

    resultText.innerText = `Your BMI: ${bmi} (${category})`;
    resultText.style.color = "var(--mocha)";
}