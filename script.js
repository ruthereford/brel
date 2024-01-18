let sequenceToGuess = [];
let userSelectedShapes = [];
let allSequences = [
    [1, 3, 3, 0, 2, 0, 1, 2],
    [1, 3, 3, 2, 1, 0, 2, 0],
    [1, 3, 0, 2, 0, 1, 3, 2],
    [0, 3, 0, 2, 3, 1, 1, 2],
    [0, 3, 3, 2, 2, 1, 1, 0],
    [1, 0, 2, 3, 3, 2, 1, 0]
];

// Function to start the game
function startGame() {
    initializeGame();
}

function initializeGame() {
    // Choose a random sequence from the provided correct sequences
    const randomSequenceIndex = Math.floor(Math.random() * allSequences.length);
    sequenceToGuess = allSequences[randomSequenceIndex].slice(0, 3); // Show the first 3 shapes
    displayShapes(sequenceToGuess);

    // Hide the "Start Game" button
    document.getElementById("startButton").style.display = "none";
}

// Function to display shapes based on a given sequence
function displayShapes(sequence) {
    const shapeContainer = document.getElementById("shapeContainer");
    shapeContainer.innerHTML = ''; // Clear previous shapes

    for (const shape of sequence) {
        const shapeImg = document.createElement("img");
        shapeImg.src = getImagePath(shape);
        shapeImg.alt = `Shape ${shape}`;
        shapeImg.classList.add("shape");
        shapeImg.setAttribute("data-shape", shape);
        shapeImg.onclick = () => selectShape(shape);
        shapeContainer.appendChild(shapeImg);
    }

        // Add a "Confirm" button
        // const confirmBtn = document.createElement("button");
        // confirmBtn.textContent = "Confirm";
        // confirmBtn.onclick = confirmSelection;
        // shapeContainer.appendChild(confirmBtn);
    }


// Function to get the image path based on the shape
function getImagePath(shape) {
    const shapeImages = {
        0: "images/circle.jpg",
        1: "images/square.jpg",
        2: "images/hexagon.jpg",
        3: "images/star.jpg"
    };

    return shapeImages[shape];
}


// Function to handle shape selection by the user
function selectShape(selectedShape) {
    // Reset user-selected sequence if more than 8 shapes are clicked
    if (userSelectedShapes.length >= 8) {
        userSelectedShapes = [];
    }
    // Update userSelectedShapes array with the selected shape
    userSelectedShapes.push(selectedShape);

    // Display the selected shape text
    const selectedShapeText = document.getElementById("selectedShapeText");
    selectedShapeText.textContent = `Selected Shape: ${getShapeName(selectedShape)}`;

    // Display the user-selected sequence
    displayUserSequence();

    if (userSelectedShapes.length === sequenceToGuess.length) {
        const isCorrect = arraysEqual(userSelectedShapes, sequenceToGuess);

        if (isCorrect) {
            if (userSelectedShapes.length === 8) {
                alert("Congratulations! You completed the sequence. Starting a new round.");
                initializeGame(); // Start a new round
            } else {
                alert("Correct! Keep guessing the next shape.");
                sequenceToGuess.push(allSequences[randomSequenceIndex][userSelectedShapes.length]);
                displayShapes(sequenceToGuess);
                userSelectedShapes = [];
                // Clear the selected shape text after the correct guess
                selectedShapeText.textContent = '';
            }
        } else {
            alert("Incorrect Sequence. Please try again.");
            userSelectedShapes = [];
            // Clear the selected shape text after an incorrect guess
            selectedShapeText.textContent = '';
        }
    }
}

// Function to display the user-selected sequence
function displayUserSequence() {
    const userSequenceContainer = document.getElementById("userSequenceContainer");
    userSequenceContainer.innerHTML = ''; // Clear previous user sequence

    for (let i = 0; i < userSelectedShapes.length; i++) {
        const shapeImg = document.createElement("img");
        shapeImg.src = getImagePath(userSelectedShapes[i]);
        shapeImg.alt = `Shape ${userSelectedShapes[i]}`;
        shapeImg.classList.add("shape");
        shapeImg.setAttribute("data-shape", userSelectedShapes[i]);

        // Add a click event to remove the shape from userSelectedShapes
        shapeImg.onclick = () => removeShapeFromSequence(i);

        userSequenceContainer.appendChild(shapeImg);
    }
}

// Function to remove a shape from userSelectedShapes
function removeShapeFromSequence(index) {
    userSelectedShapes.splice(index, 1);
    displayUserSequence();
}


// Function to confirm the selected shapes and compare with the sequence to guess
function confirmSelection() {
    if (userSelectedShapes.length === sequenceToGuess.length) {
        const isCorrect = arraysEqual(userSelectedShapes, sequenceToGuess);

        if (isCorrect) {
            if (userSelectedShapes.length === 8) {
                alert("Congratulations! You completed the sequence. Starting a new round.");
                initializeGame(); // Start a new round
            } else {
                alert("Correct! Keep guessing the next shape.");
                sequenceToGuess.push(allSequences[randomSequenceIndex][userSelectedShapes.length]);
                displayShapes(sequenceToGuess);
                userSelectedShapes = [];
            }
        } else {
            alert("Incorrect Sequence. Please try again.");
            userSelectedShapes = [];
        }
    } else {
        alert("Please select the entire sequence before confirming.");
    }
}


// Function to get the name of the shape
function getShapeName(shape) {
    const shapeNames = {
        0: "Circle",
        1: "Square",
        2: "Hexagon",
        3: "Star"
    };

    return shapeNames[shape];
}

// Function to clear displayed shapes
function clearShapes() {
    const shapeContainer = document.getElementById("shapeContainer");
    shapeContainer.innerHTML = '';
}

// Function to compare arrays
