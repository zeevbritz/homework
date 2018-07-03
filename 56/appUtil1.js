var myApp = myApp || {};

myApp.utils = (function(theObject){
    'use strict';

    theObject.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Shabbos'];

    theObject.getDayNumber = function(dayName) {
        for (let i = 0; i < theObject.days.length; i++) {
            if (theObject.days[i] === dayName) {
                return i + 1;
            }
        }
        return 'ERROR: NO SUCH DAY!';
    };

    theObject.getDayName = function(dayNumber) {
        for (let i = 0; i < theObject.days.length; i++) {
            if (i + 1 === dayNumber) {
                return theObject.days[i];
            }
        }
        return 'ERROR: NO SUCH DAY!';
    };

    return theObject;

}(myApp.utils || {} ));

console.log(myApp.utils.getDayNumber('Monday'));
console.log(myApp.utils.getDayName(2));