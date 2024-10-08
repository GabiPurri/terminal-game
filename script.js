// DOM elements
const gameText = document.getElementById('game-text');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submit-button');
const restartButton = document.getElementById('restart-button');

// Game state
let currentScene = 'loading';  // Start with loading
let userInputValue = '';       // Variable to store user input
let gameContent = {};          // Variable to store game content
let currentChallenge = null;   // Variable to store the current challenge
let isTyping = false;  // Variable to track if text is still typing

disableInput();  // Disable input when the page loads


// Fetch game content from JSON Github file
fetch('https://raw.githubusercontent.com/GabiPurri/terminal-game/master/gameContent.json')
  .then(response => response.json())
  .then(data => {
    gameContent = data;
    startGame();
  })
  .catch(error => console.error('Error loading game content:', error));

  function typeText(text, callback) {
    isTyping = true;  // Mark as typing
    disableInput();    // Disable input while typing

    let i = 0;
    gameText.textContent = ''; // Clear previous text before typing new text
    const typingInterval = setInterval(() => {
        if (i < text.length) {
            gameText.textContent += text.charAt(i);
            gameText.scrollTop = gameText.scrollHeight; // Scroll to the bottom
            i++;
        } else {
            clearInterval(typingInterval);
            isTyping = false;  // Typing is complete
            enableInput();     // Enable input when typing is done
            if (callback) callback(); // Execute the next function after typing
        }
    }, 30); // Adjust typing speed here
}


// Show blinking text (Assessing connected entity...)
function blinkText(times, callback) {
  let blinkCount = 0;
  const blinkInterval = setInterval(() => {
    if (blinkCount < times) {
      gameText.textContent += "Assessing connected entity...\n";
      gameText.scrollTop = gameText.scrollHeight;
      setTimeout(() => {
        gameText.textContent = gameText.textContent.replace("Assessing connected entity...\n", ""); // Remove blink text
        gameText.scrollTop = gameText.scrollHeight;
        blinkCount++;
      }, 700);
    } else {
      clearInterval(blinkInterval);
      if (callback) callback();
    }
  }, 1400);
}

// Handle user input and game logic
function handleInput() {
  if (isTyping) return; // Prevent handling input while typing

  userInputValue = userInput.value.trim().toLowerCase(); // Store and normalize input
  userInput.value = '';  // Clear input field after reading the input

  // Check the current scene
  if (currentScene === 'intro') {
    if (userInputValue === 'yes') {
      currentScene = 'scene1'; // Move to Scene 1 if 'yes'
      pickRandomChallenge();   // Present a random challenge
    } else if (userInputValue === 'no') {
      typeText("\nWell, too bad. Goodbye.\n", showRestartButton); // Show restart button after saying goodbye
    } else {
      typeText("\nInvalid response. Try again.\n> Are you ready? (Type yes or no)");
    }
  } else if (currentScene === 'scene1') {
    if (userInputValue === '1') {
      currentScene = 'scene2'; // Move to Scene 2 if user selects '1'
      typeText("\nWell done!\n\n> You are now standing in front of this mysterious website, with three distinct paths ahead. Are you excited? (Type 'yes')");
    } else if (userInputValue === '2') {
      denyAccess(currentChallenge.wrongChoiceText); // Show specific wrong choice text
    } else {
      typeText("\nInvalid response. Try again.\n> Please choose an option (Type '1' or '2')");
    }
  } else if (currentScene === 'scene2') {
    if (userInputValue === 'yes') {
      currentScene = 'scene3'; // Move to Scene 3 if 'yes' is typed
      typeText("Now, listen.\n\n> To the north, a page beckons with the promise of knowledge and quirky facts about Gabi. (Type 'about')\n\n> To the west, a fine collection of side projects, hobbies, and experiments. (Type 'play')\n\n> To the east, a showcase of her past and current work is revealed. (Type 'work')\n\n> To the south, the way back home. (Type 'home')");
    } else {
      typeText("\nInvalid response. Try again.\n> Type 'yes' to proceed.");
    }
  } else if (currentScene === 'scene3') {
    if (userInputValue === 'about') {
      window.location.href = '#'; // Placeholder for about page URL
    } else if (userInputValue === 'work') {
      window.location.href = '#'; // Placeholder for work page URL
    } else if (userInputValue === 'play') {
      window.location.href = '#'; // Placeholder for play page URL
    } else if (userInputValue === 'home') {
      window.location.href = '#'; // Placeholder for home page URL
    } else {
      typeText("\nInvalid response. Try again.\n> Type 'about', 'work', or 'play'.");
    }
  } else {
    typeText("\nInvalid response. Try again.");
  }
}

// Deny access and show restart button
function denyAccess(message) {
  typeText("\n" + message, showRestartButton);
}

// Show restart button
function showRestartButton() {
  restartButton.style.display = 'inline-block'; // Make restart button visible
}

// Pick a random challenge for Scene 1
function pickRandomChallenge() {
  currentChallenge = gameContent.challenges[Math.floor(Math.random() * gameContent.challenges.length)];
  typeText(`${currentChallenge.description}\n\nWhat do you do?\n    ${currentChallenge.options[0]}\n    ${currentChallenge.options[1]}`);
}

// Event listeners for input submission
submitButton.addEventListener('click', handleInput);

// Add Enter key functionality
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleInput();
  }
});

// Restart button functionality
restartButton.addEventListener('click', () => {
  location.reload(); // Reload the page
});

// Start the game with boot-up sequence
function startGame() {
  blinkText(3, () => {
    typeText(gameContent.introText, () => {
      currentScene = 'intro'; // Set the initial scene to 'intro' after the boot-up sequence
    });
  });
}

function disableInput() {
  userInput.disabled = true;   // Disable the input field
  submitButton.disabled = true;  // Disable the submit button
  userInput.placeholder = "Please wait...";  // Update placeholder text
}

function enableInput() {
  userInput.disabled = false;  // Enable the input field
  submitButton.disabled = false; // Enable the submit button
  userInput.placeholder = "Type here...";  // Restore placeholder text
  userInput.focus();           // Automatically focus the input field
}
