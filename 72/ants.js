(function () {
    'use strict';

    const canvas = document.getElementById('theCanvas');
    const ctx = canvas.getContext('2d');
    const addAntsButton = document.getElementById('addAnts');
    const antColor = document.getElementById('color');
    const antAmount = document.getElementById('number');


    function resizeCanvas() {
        canvas.width = window.innerWidth - 10;
        canvas.height = window.innerHeight - 37;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Ant {
        constructor(color) {
            this.x = window.innerWidth / 2;
            this.y = window.innerHeight / 2;
            this.color = color;
        }

        move(x, y) {
            if (this.x + x > 0 && this.x + x < window.innerWidth && this.y + y > 0 && this.y + y < window.innerHeight) {
                this.x += x;
                this.y += y;
            }
        }

        travelTime() {
            if (!this.interval) {
                this._x = Ant.getRandomNumber(-1, 1);
                this._y = Ant.getRandomNumber(-1, 1);
                this.travel_time = Ant.getRandomNumber(100, 10000);
                this.interval = setInterval(() => {
                    clearInterval(this.interval);
                    this.interval = null;
                }, this.travel_time);
            }
            this.move(this._x, this._y);
        }

        static getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }

    const ants = [];
    for (let i = 0; i < 1000; i++) {
        ants.push(new Ant('black'));
    }

    setInterval(() => {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ants.forEach(ant => {
            ant.travelTime();
            ctx.fillStyle = ant.color;
            ctx.fillRect(ant.x, ant.y, 2, 2);
        });
    }, 100);

    addAntsButton.addEventListener('click', () => {
        for (let i = 0; i < (antAmount.value || 100); i++) {
            ants.push(new Ant(antColor.value));
        }
        antColor.value = '#000000';
        antAmount.value = '';
    });

}());