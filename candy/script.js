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
 