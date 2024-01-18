let allSequences = [
    [1, 3, 3, 0, 2, 0, 1, 2],
    [1, 3, 3, 2, 1, 0, 2, 0],
    [1, 3, 0, 2, 0, 1, 3, 2],
    [0, 3, 0, 2, 3, 1, 1, 2],
    [0, 3, 3, 2, 2, 1, 1, 0],
    [1, 0, 2, 3, 3, 2, 1, 0]
];

let sequenceToGuess = [];
let userSelectedShapes = [];

// Function to generate a random sequence of three shapes from the provided sequences
function generateRandomSequence(length) {
    const shapes = [0, 1, 2, 3]; // Assuming 0 represents circle, 1 represents square, 2 represents hex, and 3 represents star
    const randomSequence = [];
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * shapes.length);
        randomSequence.push(shapes[randomIndex]);
    }

    return randomSequence;
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
}

// Function to get the image path based on the shape
function getImagePath(shape) {
    const shapeImages = {
        0: "images/circle.png",
        1: "images/square.png",
        2: "images/hex.png",
        3: "images/star.png"
    };

    return shapeImages[shape];
}

// Function to handle image upload
function handleImageUpload() {
    const imageInput = document.getElementById("imageInput");
    const shapeContainer = document.getElementById("shapeContainer");

    const selectedImage = imageInput.files[0];
    if (selectedImage) {
        const imageUrl = URL.createObjectURL(selectedImage);

        const shapeImg = document.createElement("img");
        shapeImg.src = imageUrl;
        shapeImg.alt = "User Shape";
        shapeImg.classList.add("shape", "user");
        shapeImg.onclick = () => selectShape("user");
        shapeContainer.appendChild(shapeImg);

        // Add the user-uploaded shape to the comparison list
        userSelectedShapes.push("user");
    }
}

// Function to handle shape selection by the user
function selectShape(selectedShape) {
    userSelectedShapes.push(selectedShape);

    if (userSelectedShapes.length === sequenceToGuess.length) {
        const isCorrect = arraysEqual(userSelectedShapes, sequenceToGuess);
        
        if (isCorrect) {
            alert("Correct Sequence! You can proceed to the next level.");
            initializeGame();
        } else {
            alert("Incorrect Sequence. Please try again.");
            userSelectedShapes = [];
        }
    }
}

// Function to clear displayed shapes
function clearShapes() {
    const shapeContainer = document.getElementById("shapeContainer");
    shapeContainer.innerHTML = '';
}

// Function to compare arrays
