function calculateBMI() {
    const name = document.getElementById('nameInput').value.trim();
    const age = parseInt(document.getElementById('ageInput').value, 10);
    const height = parseInt(document.getElementById('heightInput').value, 10) / 100; // Convert to meters
    const region = document.getElementById('regionInput').value.trim();
    const weight = parseFloat(document.getElementById('weightInput').value);

    if (name === '' || isNaN(age) || isNaN(height) || isNaN(weight) || weight <= 0 || region === '') {
        alert('Please fill in all fields with valid values.');
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

function getRecommendedFoodsButton(bmi) {
    if (bmi < 18.5 || bmi >= 30) {
        // If underweight or obese, show the button with recommended foods
        return `
            <button class="btn btn-primary btn-block mt-3" onclick="showRecommendedFoods()">Recommended Foods</button>
            
        `;
    }
    // Otherwise, don't show the button
    return '';
}

function showRecommendedFoods() {
    const foods = [
        'For Underweight: Nuts, Avocado, Whole Grains, Dairy Products, Eggs, Lean Meats',
        'For Obese: Fruits, Vegetables, Whole Grains, Lean Proteins, Nuts, Seeds',
    ];

    let foodList = '';
    foods.forEach(food => {
        foodList += `<li>${food}</li>`;
    });

    // Randomly pick five foods from the list
    const randomFoods = pickRandomFoods(foods, 5);

    let foodListHTML = '';
    randomFoods.forEach(food => {
        foodListHTML += `<li>${food}</li>`;
    });

    const modalContent = `
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Recommended Foods</h5>
            </div>
            <div class="modal-body">
                <ul>${foodListHTML}</ul>
            </div>
        </div>
    `;

    // Create a modal (bootstrap)
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.id = 'foodModal';
    modal.tabIndex = '-1';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'foodModalLabel');
    modal.innerHTML = modalContent;

    document.body.appendChild(modal);

    // Show the modal
    const modalElement = new bootstrap.Modal(modal, {
        backdrop: 'static',
    });
    modalElement.show();

    // Add the food list to the resultDiv as well
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML += `
        <div class="card mt-4">
            <div class="card-body">
                <h5 class="card-title">Recommended Foods</h5>
                <ul>${foodList}</ul>
            </div>
        </div>
    `;
}

function pickRandomFoods(foodsList, count) {
    const shuffledFoods = foodsList.slice().sort(() => 0.5 - Math.random());
    return shuffledFoods.slice(0, count);
}

document.addEventListener('DOMContentLoaded', function () {
    const calculateButton = document.querySelector('button[onclick="calculateBMI()"]');
    calculateButton.addEventListener('click', calculateBMI);
    
    const foodButton = document.getElementById('foodButton');
    foodButton.addEventListener('click', showRecommendedFoods);
});
