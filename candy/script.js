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

        this.bindEvents()
    