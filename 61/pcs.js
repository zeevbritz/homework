
//eslint-disable-next-line
var pcs = function (id) { // jshint ignore:line 
    'use strict';
    const elem = document.getElementById(id);
    let dataArray = [];
    let data = {};

    function setCss(elem, property, value) {
        elem.style[property] = value;
    }

    function getCss(elem, property) {
        return elem.style[property];
    }

    return {
        css: function (property, value) {
            if (arguments.length < 2) {
                return getCss(elem, property);
            }
            setCss(elem, property, value);
            return this;
        },
        hide: function () {
            setCss(elem, 'display', 'none');
        },
        show: function () {
            setCss(elem, 'display', 'block');
        },
        click: function (callback) {
            elem.addEventListener('click', callback);
            return this;
        },
        dataArray: function (key, value) {
            if (arguments.length < 2) {
                return dataArray.find(function (element) {
                    return element.key === key;
                }).value;
            }
            dataArray.push({ key: key, value: value });
            return this;
        },
        data: function (key, value) {
            if (arguments.length < 2) {
                return data[key];
            }
            data[key] = value;
            return this;
        },
        changeColor: function (time = 1) {

            let counter = 0;
            let intervalId;
            let intervalId2;
            let elementColor = this.css('color');
            // let elementColor = elem.css('color');

            function random() {
                return Math.floor(Math.random() * 266);
            }

            function setColors() {
                function getRandomColor() {
                    return 'RGB(' + random() + ',' + random() + ',' + random() + ')';
                }
                setCss(elem, 'color', getRandomColor());
                // this.css('color', getRandomColor());
            }

            function interval() {
                if (counter++ < (time * 60)) {
                    if (!intervalId2) {
                        setColors();
                        intervalId2 = setInterval(setColors, 1000);
                    }
                } else {
                    clearInterval(intervalId2);
                    clearInterval(intervalId);
                    setCss(elem, 'color', elementColor);
                    // elem.css('color', elementColor);
                    // this.css('color', elementColor);
                }
            }

            intervalId = setInterval(interval, 1000);
        }
    };

};
