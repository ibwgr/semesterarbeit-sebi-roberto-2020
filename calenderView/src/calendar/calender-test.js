let assert = require('assert');

const data = [

    {
        id: 1,
        firstname: "Roberto",
        appointment: "Essen",
        eventdate: "2020-12-12"
    },
    {
        id: 2,
        firstname: "Sebi",
        appointment: "Feuerwehr",
        eventdate: "2020-02-02"
    },
    {
        id: 3,
        firstname: "Roberto",
        appointment: "Sport",
        eventdate: "2020-12-12"
    },
    {
        id: 4,
        firstname: "Susi",
        appointment: "Frei",
        eventdate: "2020-01-01"
    },
    {
        id: 5,
        firstname: "Fritz",
        appointment: "Turnen",
        eventdate: "2003-12-03"
    },

    {
        id: 6,
        firstname: "Sebi",
        appointment: "Gold",
        eventdate: "2003-12-12"
    },

    ];



describe('Basic Mocha String Test', function () {
    it('should return number of charachters in a string', function () {
        assert.equal("Hello".length, 4);
    });
    it('should return first charachter of the string', function () {
        assert.equal("Hello".charAt(0), 'H');
    });
});




