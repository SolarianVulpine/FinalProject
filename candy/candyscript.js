class WordAssociationGame {
    constructor() {
        this.score = 0;
        this.timeLeft = 60;
        this.currentWord = '';
        this.timerInterval = null;
        this.usedWords = new Set();

        // DOM Elements
        this.promptElement = document.getElementById('prompt');
        this.userInputElement = document.getElementById('user-input');
        this.submitButton = document.getElementById('submit-btn');
        this.scoreElement = document.getElementById('score');
        this.timerElement = document.getElementById('timer');
        this.feedbackElement = document.getElementById('feedback');

        this.bindEvents();
    }

    bindEvents() {
        this.submitButton.addEventListener('click', () => this.checkAssociation());
        this.userInputElement.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkAssociation();
        });
    }
 async startGame() {
        try {
            // If it's the first round, start with a seed word
            if (!this.currentWord) {
                const seedWords = ['happy', 'love', 'music', 'home', 'book'];
                this.currentWord = seedWords[Math.floor(Math.random() * seedWords.length)];
            }

            const response = await fetch(`https://api.datamuse.com/words?ml=${this.currentWord}&max=50`);
            const relatedWords = await response.json();
            
            // Filter out words that have already been used
            const availableWords = relatedWords
                .filter(word => 
                    word.word.length > 2 && 
                    !this.usedWords.has(word.word) && 
                    /^[a-zA-Z]+$/.test(word.word)
                );

            if (availableWords.length === 0) {
                throw new Error('No available words');
            }

            // Select a random word from available related words
            const selectedWord = availableWords[Math.floor(Math.random() * availableWords.length)];
            this.currentWord = selectedWord.word.toLowerCase();
            
            this.promptElement.textContent = `Find a word associated with: ${this.currentWord}`;
            this.feedbackElement.textContent = '';
            this.feedbackElement.style.backgroundColor = '';
            
            this.startTimer();
        } catch (error) {
            this.feedbackElement.textContent = 'Error finding a word. Restarting game...';
            this.feedbackElement.style.backgroundColor = '#ffdddd';
            setTimeout(() => this.startGame(), 2000);
        }
    }

    checkAssociation() {
        const userWord = this.userInputElement.value.trim().toLowerCase();
        
        if (!userWord) {
            this.showFeedback('Please enter a word!', '#ffdddd');
            return;
        }

        if (this.usedWords.has(userWord)) {
            this.showFeedback('You already used this word!', '#ffdddd');
            return;
        }

        this.fetchWordAssociation(userWord);
    }

    async fetchWordAssociation(userWord) {
        try {
            const response = await fetch(`https://api.datamuse.com/words?ml=${this.currentWord}&max=100`);
            const relatedWords = await response.json();

            // Check if the user's word is semantically related
            const isRelated = relatedWords.some(word => 
                word.word.toLowerCase() === userWord.toLowerCase()
            );

            if (isRelated) {
                this.score++;
                this.scoreElement.textContent = this.score;
                this.usedWords.add(userWord);
                this.showFeedback('Great association!', '#ddffdd');
                this.userInputElement.value = '';
                
                // Move to next round
                this.startGame();
            } else {
                this.showFeedback('Not a good association. Try again!', '#ffdddd');
            }
        } catch (error) {
            this.showFeedback('Error checking association. Try again.', '#ffdddd');
        }
    }

    showFeedback(message, backgroundColor) {
        this.feedbackElement.textContent = message;
        this.feedbackElement.style.backgroundColor = backgroundColor;
    }

    startTimer() {
        // Clear any existing timer
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        this.timeLeft = 60;
        this.timerElement.textContent = this.timeLeft;

        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.timerElement.textContent = this.timeLeft;

            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    endGame() {
        clearInterval(this.timerInterval);
        this.promptElement.textContent = `Game Over! Your score: ${this.score}`;
        this.submitButton.disabled = true;
        this.userInputElement.disabled = true;
        this.showFeedback(`Final Score: ${this.score}`, '#f0f0f0');
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new WordAssociationGame();
    game.startGame();
});