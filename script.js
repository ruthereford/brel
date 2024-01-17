let selectedShapes = [];

function selectShape(shape) {
    selectedShapes.push(shape);
    checkOrder();
}

function checkOrder() {
    if (selectedShapes.length === 8) {
        // Compare selectedShapes with the correct sequence
        // You can define the correct sequence based on the numerical representation provided
        // Display the result to the user
        alert("Correct Order!");
        selectedShapes = [];  // Reset for the next attempt
    }
}
