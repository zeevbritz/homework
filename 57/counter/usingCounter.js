/*global app*/
(function () {
    'use strict';
    function count(number) {
        /* jshint -W040 */
        for (let i = 0; i < number; i++) {
            this.count();
        }
        console.log(this.getCount());
    }

    function creatCounter(array) {
        for (let i = 0; i < array.length; i++) {
            count.call(app.counters.createCounter(), array[i]);
        }
        console.log('there are', app.counters.getCounters(), 'counters');
    }

    count.call(app.counter, 10);
    creatCounter([5, 15]);
}());
