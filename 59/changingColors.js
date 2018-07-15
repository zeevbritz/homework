(function () {
    'use strict';

    let table = get('table');
    let button = get('button');
    let intervalId;
    let intervalId2;
    let infoText = get('infoText');
    let bgColorElem;
    let textColorElem;
    let timeCreatedCell;
    let bgColorCell;
    let textColorCell;

    function get(id) {
        return document.getElementById(id);
    }

    function setCss(element, property, value) {
        element.style[property] = value;
    }

    function getCss(element, property) {
        return element.style[property];
    }

    function random() {
        return Math.floor(Math.random() * 266);
    }

    function setColors() {
        function getRandomColor() {
            return 'RGB(' + random() + ',' + random() + ',' + random() + ')';
        }
        setCss(document.body, 'backgroundColor', getRandomColor());
        setCss(document.body, 'color', getRandomColor());
        bgColorElem = document.body.style.backgroundColor;
        textColorElem = getCss(document.body, 'color');
    }

    function insertData() {
        setCss(bgColorCell, 'backgroundColor', bgColorElem);
        setCss(textColorCell, 'backgroundColor', textColorElem);
        timeCreatedCell.innerHTML = new Date().toLocaleString();
        bgColorCell.innerHTML = bgColorElem;
        textColorCell.innerHTML = textColorElem;
    }

    function addRow() {
        let row = table.insertRow();
        row = table.insertRow();
        timeCreatedCell = row.insertCell();
        bgColorCell = row.insertCell();
        textColorCell = row.insertCell();
    }

    button.addEventListener('click', function () {
        if (!intervalId) {
            addRow();
            setColors();
            insertData();
            intervalId = setInterval(setColors, 700);
            intervalId2 = setInterval(insertData, 700);
            button.innerHTML = 'Stop';
            infoText.innerHTML = 'Press the Stop button to select the colors';
        } else {
            clearInterval(intervalId);
            intervalId = null;
            clearInterval(intervalId2);
            intervalId2 = null;
            button.innerHTML = 'Start';
            infoText.innerHTML = 'Press the Start button to change the colors';
            bgColorElem = document.body.style.backgroundColor;
            textColorElem = getCss(document.body, 'color');
        }
    });

    table.addEventListener('click', function (event) {
        // console.log(event);
        setCss(document.body, 'backgroundColor', event.target.parentElement.cells[1].innerHTML);
        setCss(document.body, 'color', event.target.parentNode.cells[2].innerHTML);
    });

}());