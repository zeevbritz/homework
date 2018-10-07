(function () {
    'use strict';

    class Vehicle {
        constructor(color) {
            this.color = color;
        }

        go(speed) {
            this.speed = speed;
            console.log(`now going at ${this.speed} mph`);
        }

        print() {
            console.log(`Color: ${this.color}, Speed: ${this.speed}`);
        }
    }

    class Plane extends Vehicle {
        // are the next two lines needed (i saw it in MDN)?
        constructor(color) {
            super(color);
        }

        go(speed) {
            this.speed = speed;
            console.log(`now Flying at ${this.speed} knots`);
        }
    }

    const vehicle1 = new Vehicle('Black');
    const plane1 = new Plane('Blue');

    vehicle1.go(45);
    plane1.go(800);

    vehicle1.print();
    plane1.print();
}());