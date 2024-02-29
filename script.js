
document.addEventListener('DOMContentLoaded', function() {
    const storyTextElement = document.getElementById('storyText');
    const continueButton = document.getElementById('continueButton');
    const story = "Ngày xửa ngày xưa, có một cặp đôi gặp nhau trong câu lạc bộ Neo Culture Tech và yêu nhau sâu đậm cùng nhau, nhưng bởi chàng trai hậu đậu và hay trễ giờ nên đã làm cô gái bị tổn thương và vô tình đẩy cô ấy rời xa. Nhận ra lỗi lầm mình, chàng trai không ngại khó khăn đi tìm cô gái";
    let index = 0;

    function typeStory() {
        if (index < story.length) {
            storyTextElement.innerHTML += story.charAt(index);
            index++;
            setTimeout(typeStory, 50); // Adjust typing speed as needed
        } else {
            continueButton.style.display = 'inline-block'; // Show the continue button after the story is typed out
        }
    }

    typeStory(); // Start typing the story

    continueButton.addEventListener('click', function() {
        document.getElementById('introScreen').style.display = 'none';
        document.querySelector('.game-container').style.display = 'block';
    });
});



// Existing Game Logic
document.addEventListener('keydown', function (event) {
    const mario = document.getElementById('mario');
    const currentPosition = mario.offsetLeft;

    if (event.key === 'ArrowUp') {
        jump();
    } else if (event.key === 'ArrowLeft') {
        moveLeft(mario, currentPosition);
    } else if (event.key === 'ArrowRight') {
        moveRight(mario, currentPosition);
    }
});

function jump() {
    let mario = document.getElementById('mario');
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');

        setTimeout(function () {
            mario.classList.remove('jump');
        }, 300);
    }
}

function moveLeft(mario, currentPosition) {
    const newPosition = currentPosition - 10;
    mario.style.left = `${newPosition}px`;
}

function moveRight(mario, currentPosition) {
    const newPosition = currentPosition + 10;
    mario.style.left = `${newPosition}px`;
    checkCollision(); // Check for collision after moving
}

// Rest of your existing code remains unchanged

function checkCollision() {
    const mario = document.getElementById('mario');
    const princess = document.getElementById('princess');

    const marioRect = mario.getBoundingClientRect();
    const princessRect = princess.getBoundingClientRect();

    // Check if Mario's and Princess's rectangles overlap
    if (marioRect.right > princessRect.left && marioRect.left < princessRect.right &&
        marioRect.bottom > princessRect.top && marioRect.top < princessRect.bottom) {
        
        // Mario has reached the Princess
        showPrincessMessage();
    }
}

function showPrincessMessage() {
    // Remove any existing message and choices
    const existingMessage = document.getElementById('princessMessage');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create a div to show the message and choices
    const messageDiv = document.createElement('div');
    messageDiv.id = 'princessMessage';
    messageDiv.style.position = 'absolute';
    messageDiv.style.top = '20%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translateX(-50%)';
    messageDiv.style.padding = '20px';
    messageDiv.style.backgroundColor = 'lavender'; // A color that might fit a princess theme
    messageDiv.style.border = '2px solid violet'; // A border color to complement the background
    messageDiv.style.borderRadius = '10px'; // Rounded corners for a softer look
    messageDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // A subtle shadow for depth
    messageDiv.innerHTML = `
        <p style="font-style: italic; color: darkmagenta;">"Em bùn quá chồng oi, anh no lam vay voi em ho huhuhu?"</p>
        <button onclick="leavePrincess()" style="margin-right: 10px; background-color: lightcoral; color: white; border: none; border-radius: 5px; padding: 5px 10px;">Leave</button>
        <button onclick="encouragePrincess()" style="background-color: lightgreen; color: white; border: none; border-radius: 5px; padding: 5px 10px;">Encourage</button>
    `;

    document.body.appendChild(messageDiv);
}

function leavePrincess() {
    const messageDiv = document.getElementById('princessMessage');
    const leaveButton = messageDiv.querySelector('button[onclick="leavePrincess()"]');

    // Function to generate a random position within the viewport
    function getRandomPosition(element) {
        const viewportWidth = window.innerWidth - element.offsetWidth;
        const viewportHeight = window.innerHeight - element.offsetHeight;
        const randomX = Math.random() * viewportWidth;
        const randomY = Math.random() * viewportHeight;
        return { x: randomX, y: randomY };
    }

    // Get a new random position for the leave button
    const newPosition = getRandomPosition(leaveButton);

    // Update the leave button's position
    leaveButton.style.position = 'fixed'; // Use 'fixed' positioning to move freely around the viewport
    leaveButton.style.left = `${newPosition.x}px`;
    leaveButton.style.top = `${newPosition.y}px`;

    // Optionally, update the message to reflect the humorous or narrative element of the button moving
    messageDiv.querySelector('p').textContent = "Em be qua dang iu nen a ko leave dc kkk";
}



function encouragePrincess() {
    clearScreen();

    // Trigger fireworks
    for (let i = 0; i < 5; i++) { // Create multiple fireworks
        setTimeout(createFirework, i * 200); // Stagger their timing
    }

    // Show "Happy Ending" text after fireworks
    setTimeout(showHappyEnding, 3000); // Adjust timing as needed
}

function clearScreen() {
    document.body.innerHTML = ''; // Clears the screen
    document.body.style.backgroundColor = 'black'; // Optional: Set a night sky background
}

function createFirework() {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    firework.style.left = `${50 + (Math.random() - 0.5) * 30}%`; // Randomize the horizontal start position
    document.body.appendChild(firework);

    // Remove the firework element after the animation ends
    setTimeout(() => firework.remove(), 2200); // Adjust timing based on the longest animation duration
}

function showHappyEnding() {
    const message = document.createElement('div');
    message.textContent = 'Happy Ending!';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.color = 'white';
    message.style.fontSize = '2em';
    document.body.appendChild(message);
}



const style = document.createElement('style');
style.innerHTML = `
    .jump {
        animation: jump 0.3s ease;
    }

    @keyframes jump {
        0% { bottom: 50px; }
        50% { bottom: 150px; }
        100% { bottom: 50px; }
    }

    #mario {
        /* Existing styles */
        transition: left 0.1s; /* Smooth transition for left property */
    }
`;
document.head.appendChild(style);