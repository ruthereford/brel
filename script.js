let selectedShapes = [];
let correctSequences = [
    [1, 3, 3, 0, 2, 0, 1, 2],
    [1, 3, 3, 2, 1, 0, 2, 0],
    [1, 3, 0, 2, 0, 1, 3, 2],
    [0, 3, 0, 2, 3, 1, 1, 2],
    [0, 3, 3, 2, 2, 1, 1, 0],
    [1, 0, 2, 3, 3, 2, 1, 0]
];
function selectShape(shape) {
    selectedShapes.push(shape);
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