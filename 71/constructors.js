(function () {
    'use strict';

    function Vehicle(color) {
        this.color = color;
    }

    Vehicle.prototype.go = function (speed) {
        this.speed = speed;
        console.log(`now going at ${this.speed} mph`);
    };

    Vehicle.prototype.print = function () {
        console.log(`Color: ${this.color}, Speed: ${this.speed}`);
    };

    function Plane(color) {
        this.color = color;
    }

    Plane.prototype = Object.create(Vehicle.prototype);
    Plane.prototype.constructor = Plane;

    Plane.prototype.go = function (speed) {
        this.speed = speed;
        console.log(`now Flying at ${this.speed} knots`);
    };

    const vehicle1 = new Vehicle('Black');
    const plane1 = new Plane('Blue');

    vehicle1.go(45);
    plane1.go(800);

    vehicle1.print();
    plane1.print();


}());