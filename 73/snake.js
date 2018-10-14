(function () {
    'use strict';

    const canvas = document.getElementById('theCanvas');
    const context = canvas.getContext('2d');
    const LEFT = 37,
        UP = 38,
        RIGHT = 39,
        DOWN = 40;
    const button = document.getElementById('button');
    const START = 'Play Game',
        PAUSE = 'Pause Game',
        RESUME = 'Resume Playing';
    const snakeSize = 64;
    const crunchSound = document.getElementById('crunch');
    const crashSound = document.getElementById('crash');
    const scoreOutput = document.getElementById('score');



    let headX = 0;
    let headY = 0;
    let direction = RIGHT;
    let appleX = -1;
    let appleY = 0;
    let score = 0;
    let speed = 600;
    let timeOutId;

    function resizeCanvas() {
        canvas.width = (window.innerWidth - 2) - (window.innerWidth - 2) % snakeSize;
        canvas.height = (window.innerHeight - 2) - (window.innerHeight - 2) % snakeSize;

        // in case apple is now off the screen - obviously we could check first
        context.clearRect(appleX, appleY, snakeSize, snakeSize);
        if (appleX + 1) { // if apple not placed yet will be 0
            placeApple();
        }
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const snakeHead = document.createElement('img');
    snakeHead.src = 'images/snakeHead.png';

    // snakeHead.onload = render;
    function render() {
        // let test = setInterval(() => {
        context.clearRect(headX, headY, snakeSize, snakeSize);

        switch (direction) {
            case LEFT:
                headX -= snakeSize;
                break;
            case UP:
                headY -= snakeSize;
                break;
            case RIGHT:
                headX += snakeSize;
                break;
            case DOWN:
                headY += snakeSize;
                break;
        }

        if (headX === appleX && headY === appleY) {
            crunchSound.currentTime = 0;
            crunchSound.play();
            score++;
            scoreOutput.innerHTML = score;
            placeApple();
            speed -= 10;
        }

        if (headX === canvas.width || headX === 0 - snakeSize || headY === canvas.height || headY === 0 - snakeSize) {
            switch (direction) {
                case LEFT:
                    headX += snakeSize / 2;
                    break;
                case UP:
                    headY += snakeSize / 2;
                    break;
                case RIGHT:
                    headX -= snakeSize / 2;
                    break;
                case DOWN:
                    headY -= snakeSize / 2;
                    break;
            }
            crashSound.play();
            context.drawImage(snakeHead, headX, headY, snakeSize, snakeSize);
            button.innerHTML = 'Play Game';
            return;
            // clearTimeout(test);
        }

        context.drawImage(snakeHead, headX, headY, snakeSize, snakeSize);
        // }, speed);
        timeOutId = setTimeout(render, speed);
    }

    const apple = document.createElement('img');
    apple.src = 'images/apple.png';
    apple.onload = placeApple;

    function placeApple() {
        appleX = getRandomNumber(0, canvas.width - snakeSize);
        appleY = getRandomNumber(0, canvas.height - snakeSize);
        appleX = appleX - appleX % snakeSize;
        appleY = appleY - appleY % snakeSize;
        if (appleX === headX && appleY === headY) {
            placeApple();
            return;
        }
        context.drawImage(apple, appleX, appleY, snakeSize, snakeSize);
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    document.addEventListener('keydown', event => {
        switch (event.keyCode) // note keyCode is DEPRECATED
        {
            case LEFT:
            case UP:
            case RIGHT:
            case DOWN:
                direction = event.keyCode;
        }
    });

    button.addEventListener('click', () => {
        switch (button.innerHTML) {
            case START:
                context.clearRect(headX, headY, snakeSize, snakeSize);
                headX = 0;
                headY = 0;
                direction = RIGHT;
                score = 0;
                speed = 600;
                button.innerHTML = 'Pause Game';
                scoreOutput.innerHTML = '';
                render();
                break;
            case RESUME:
                button.innerHTML = 'Pause Game';
                render();
                break;
            case PAUSE:
                button.innerHTML = 'Resume Playing';
                clearTimeout(timeOutId);
        }
    });

}());