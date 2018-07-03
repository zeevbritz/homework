var myApp = myApp || {};

myApp.utils = (function (theObject) {
    'use strict';

    theObject.stringCaseInsensitiveEquals = function (string1, string2) {
        return string1.toUpperCase() === string2.toUpperCase();
    };
    
    return theObject;

}(myApp.utils || {}));

console.log(myApp.utils.stringCaseInsensitiveEquals('appLE', 'APPle'));
console.log(myApp.utils.stringCaseInsensitiveEquals('appLE', 'APPl'));