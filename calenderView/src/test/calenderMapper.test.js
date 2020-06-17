import {CalendarMapper} from "../calendar/calendarMapper";

const data = [

    {
        firstname: "Sebi",
        appointment: "Feuerwehr",
        eventdate: "2020-02-02"
    },
    {
        firstname: "Roberto",
        appointment: "Sport",
        eventdate: "2020-12-12"
    },
    {
        firstname: "Fredi",
        appointment: "Sport",
        eventdate: "2020-12-12"
    },
    {
        firstname: "Susi",
        appointment: "Frei",
        eventdate: "2020-05-08"
    },
    {
        firstname: "Fritz",
        appointment: "Turnen",
        eventdate: "2020-12-03"
    },
    {
        firstname: "Sebi",
        appointment: "Golf",
        eventdate: "2020-01-01"
    },
    {
        firstname: "Sebi",
        appointment: "Frei",
        eventdate: "2020-01-01"
    },
    {
        firstname: "Roberto",
        appointment: "Essen",
        eventdate: "2020-01-01"
    },
    {
        firstname: "Susi",
        appointment: "Frei",
        eventdate: "2020-01-01"
    },
];


describe('mappertest', () => {

    let mapper = new CalendarMapper();
    let result = mapper.calendarMapper(data);


    test('mapper not to be 0', () => {
        expect(result).not.toBe(0);
    });

    test('right amount of dates', () => {
        expect(result.size).toBe(5);
    });

    test('right name of first user', () => {
        expect(result.values().next().value.entries().next().value.entries().next().value).toContain("Sebi");
    });

    test('right amount of users for same day', () => {
        expect(result.get("2020-01-01").size).toBe(   3);
    });

    test('right amount of events per user in one day', () => {
        expect(result.get("2020-01-01").entries().next().value.length).toBe(   2);
    });

    test('right event per user in one day', () => {
        expect(result.get("2020-01-01").entries().next().value[1].entries().next().value[1].description).toBe("Golf")
    });

    test('contain right date', () => {
        expect(result.keys()).toContain("2020-01-01", "2020-12-12", "2020-05-08", "2020-12-03")
    })

});
