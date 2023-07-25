function calculateBMI() {
    const name = document.getElementById('nameInput').value.trim();
    const age = parseInt(document.getElementById('ageInput').value, 10);
    const height = parseInt(document.getElementById('heightInput').value, 10) / 100; // Convert to meters
    const region = document.getElementById('regionInput').value.trim();

    if (name === '' || isNaN(age) || isNaN(height) || region === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Prompt for weight and validate it
    let weight = prompt('Please enter your weight in kg:');
    weight = parseFloat(weight);

    if (isNaN(weight) || weight <= 0) {
        alert('Invalid weight value. Please enter a valid weight.');
        return;
    }

    // Calculate BMI
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

    // Display result with recommended foods button
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class="card mt-4">
            <div class="card-body">
                <h5 class="card-title">BMI Result for ${name}</h5>
                <p class="card-text">Your BMI is: ${bmi}</p>
                <p class="card-text">${recommendation}</p>
                <p class="card-text">Region: ${region}</p>
                ${getRecommendedFoodsButton(bmi)}
            </div>
        </div>
    `;
}
