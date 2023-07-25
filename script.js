function calculateBMI() {
    const name = document.getElementById('nameInput').value.trim();
    const age = parseInt(document.getElementById('ageInput').value, 10);
    const height = parseInt(document.getElementById('heightInput').value, 10) / 100; // Convert to meters
    const region = document.getElementById('regionInput').value.trim();

    if (name === '' || isNaN(age) || isNaN(height) || region === '') {
        alert('Please fill in all fields.');
        return;
    }

    const bmi = (weight / (height * height)).toFixed(2);
    let recommendation = '';

    if (bmi < 18.5) {
        recommendation = 'Underweight - You should consider gaining some weight.';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        recommendation = 'Normal weight - Keep up the good work!';
    } else if (bmi >= 25 && bmi < 29.9) {
        recommendation = 'Overweight - You should consider losing some weight.';
    } else {
        recommendation = 'Obese - You should consult a healthcare professional for advice.';
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Hello ${name},</p>
        <p>Your BMI is: ${bmi}</p>
        <p>${recommendation}</p>
        <p>Region: ${region}</p>
    `;
}
