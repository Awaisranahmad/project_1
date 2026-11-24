// BMI calculator for Gym Pulse.
// Reads weight (kg) and height (cm), validates the inputs, then shows
// the BMI value and its WHO category. Wired up with addEventListener
// (no inline onclick), so the markup stays clean.

function classifyBMI(bmi) {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
}

function calculateBMI() {
    const weightInput = document.querySelector('#weight-input');
    const heightInput = document.querySelector('#height-input');
    const resultText = document.querySelector('.result');

    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);

    // Validation: numbers only, inside sane human ranges.
    // (The old code only checked for empty strings, so a height of 0
    //  produced BMI Infinity and negative values gave a negative BMI.)
    if (!Number.isFinite(weight) || !Number.isFinite(height)) {
        resultText.textContent = "Please enter both values!";
        resultText.style.color = "red";
        return;
    }
    if (weight <= 0 || weight > 500) {
        resultText.textContent = "Weight must be between 1 and 500 kg.";
        resultText.style.color = "red";
        return;
    }
    if (height < 50 || height > 250) {
        resultText.textContent = "Height must be between 50 and 250 cm.";
        resultText.style.color = "red";
        return;
    }

    // Formula: BMI = kg / (m * m)
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const category = classifyBMI(bmi);

    resultText.textContent = `Your BMI: ${bmi.toFixed(2)} (${category})`;
    resultText.style.color = "var(--mocha)";
}

document.querySelector('#calculate-btn').addEventListener('click', calculateBMI);
