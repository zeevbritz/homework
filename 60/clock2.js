var pcs = pcs || {};

pcs.clock2 = (function () {
    'use strict';

    let d, hours, minutes, seconds, clockDiv;

    clockDiv = document.createElement('div');
    document.body.appendChild(clockDiv);

    clockDiv.style.border = '2px solid red';
    clockDiv.style.display = 'inline-block';
    clockDiv.style.padding = '20px';
    clockDiv.style.fontSize = '2em';
    clockDiv.style.borderRadius = '7px';
    clockDiv.style.margin = '10px';

    function getTime() {

        function ampm(number) {
            let ampm = 'AM';
            if (number > 11) {
                ampm = 'PM';
            }
            return ampm;
        }

        function hr12(number) {
            if (number > 12) {
                number -= 12;
            }
            if (number === 0) {
                number = 12;
            }
            return number;
        }

        function doubleDigit(number) {
            if (number < 10) {
                number = '0' + number;
            }
            return number;
        }

        d = new Date();

        hours = d.getHours();
        minutes = d.getMinutes();
        seconds = d.getSeconds();

        clockDiv.innerHTML = hr12(hours) + ':' + doubleDigit(minutes) + ':' + doubleDigit(seconds) + ' ' + ampm(hours);
    }

        setInterval(getTime, 1000);
        getTime();

}());

pcs.newClock2 = (function () {
    'use strict';

    let clockDiv = document.createElement('div');
    document.body.appendChild(clockDiv);

    clockDiv.style.border = '2px solid blue';
    clockDiv.style.display = 'inline-block';
    clockDiv.style.padding = '20px';
    clockDiv.style.fontSize = '2em';
    clockDiv.style.borderRadius = '7px';
    clockDiv.style.margin = '10px';

    let h = 0;
    let m = 0;
    let s = -1;

    function setTime() {

        function ampm(number) {
            let ampm = 'AM';
            if (number > 11) {
                ampm = 'PM';
            }
            return ampm;
        }

        function hr12(number) {
            if (number > 12) {
                number -= 12;
            }
            if (number === 0) {
                number = 12;
            }

            return number;
        }

        function doubleDigit(number) {
            if (number < 10) {
                number = '0' + number;
            }
            return number;
        }

        if (s++ >= 59) {
            s = 0;
            if (m++ >= 59) {
                m = 0;
                if (h++ >= 24) {
                    h = 0;
                }
            }
        }

        clockDiv.innerHTML = hr12(h) + ':' + doubleDigit(m) + ':' + doubleDigit(s) + ' ' + ampm(h);

    }

        setInterval(setTime, 1000);
        setTime();

}());