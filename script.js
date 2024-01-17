let selectedShapes = [];
let sequenceToGuess = [];
let userSelectedShapes = [];
let correctSequences = [
    [1, 3, 3, 0, 2, 0, 1, 2],
    [1, 3, 3, 2, 1, 0, 2, 0],
    [1, 3, 0, 2, 0, 1, 3, 2],
    [0, 3, 0, 2, 3, 1, 1, 2],
    [0, 3, 3, 2, 2, 1, 1, 0],
    [1, 0, 2, 3, 3, 2, 1, 0]
];

function initializeGame() {
    sequenceToGuess = generateRandomSequence();
    displayShapes(sequenceToGuess);
}

// Function to generate a random sequence of three shapes from the provided sequences
function generateRandomSequence() {
    const randomIndex = Math.floor(Math.random() * allSequences.length);
    const randomSequence = allSequences[randomIndex].slice(0, 3); // Take the first three shapes

    return randomSequence;
}

// Function to display shapes based on a given sequence
function displayShapes(sequence) {
    const shapeContainer = document.getElementById("shapeContainer");
    shapeContainer.innerHTML = ''; // Clear previous shapes

    for (const shape of sequence) {
        const shapeDiv = document.createElement("div");
        shapeDiv.classList.add("shape");
        shapeDiv.setAttribute("data-shape", shape);
        shapeDiv.onclick = () => selectShape(shape);
        shapeContainer.appendChild(shapeDiv);
    }
}

function selectShape(shape) {
    selectedShapes.push(shape);
    displayShapes();
    checkOrder();
}

function checkOrder() {
    if (selectedShapes.length === 8) {
        // Compare selectedShapes with the correct sequence
        const isCorrect = arraysEqual(selectedShapes, correctSequences[correctSequences.length - 1]);
        // You can define the correct sequence based on the numerical representation provided

        // Display the result to the user
        if (isCorrect) {
            alert("Correct Order!");
        } else {
            alert("Incorrect Order. Please try again.");
        }
        alert("Correct Order!");
        selectedShapes = [];  // Reset for the next attempt
    }
}

// Helper function to compare arrays
function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}