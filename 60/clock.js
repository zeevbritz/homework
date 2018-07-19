var pcs = pcs || {};

pcs.clock = (function () {
    'use strict';

    let d, hours, minutes, seconds, clockDiv;

    clockDiv = document.createElement('div');
    document.body.appendChild(clockDiv);

    clockDiv.style.border = '2px solid black';
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

    function getClock() {
        setInterval(getTime, 1000);
        getTime();
    }

    return {
        getClock: getClock
    };

}());

pcs.newClock = (function () {
    'use strict';
    let intervalId;
    let clockDiv = document.createElement('div');
    let timeDiv = document.createElement('div');
    let alarmLabel = document.createElement('label');
    let alarm = document.createElement('input');
    alarmLabel.setAttribute('for', 'alarm');
    alarm.setAttribute('type', 'time');
    clockDiv.appendChild(timeDiv);
    clockDiv.appendChild(alarmLabel);
    clockDiv.appendChild(alarm);
    document.body.appendChild(clockDiv);

    alarmLabel.innerHTML = 'Alarm';

    clockDiv.style.border = '2px solid green';
    clockDiv.style.display = 'inline-block';
    clockDiv.style.padding = '20px';
    clockDiv.style.fontSize = '2em';
    clockDiv.style.borderRadius = '7px';
    clockDiv.style.margin = '10px';

    alarmLabel.style.fontSize = '.5em';
    alarmLabel.style.margin = '10px';

    // alarm.addEventListener('input', function () {
    //     console.log(alarm.value);
    // });

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

        timeDiv.innerHTML = hr12(h) + ':' + doubleDigit(m) + ':' + doubleDigit(s) + ' ' + ampm(h);

        if (alarm.value === doubleDigit(h) + ':' + doubleDigit(m)) {
            if (!intervalId) {
                intervalId = setInterval(setColors, 500);
            }
        } else {
            clearInterval(intervalId);
            intervalId = null;
            clockDiv.style.backgroundColor = 'white';
        }


    }
    function random() {
        return Math.floor(Math.random() * 266);
    }

    function setColors() {
        function getRandomColor() {
            return 'RGB(' + random() + ',' + random() + ',' + random() + ')';
        }
        clockDiv.style.backgroundColor = getRandomColor();
    }

    function getClock() {
        setInterval(setTime, 1000);
        setTime();
    }

    return {
        getClock: getClock
    };

}());