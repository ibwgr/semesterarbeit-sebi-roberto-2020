import {CalenderService} from "../calendar/calenderService.js";
import 'regenerator-runtime/runtime'
import {response} from "express";


describe('fetch-tests', () => {

    let service = new CalenderService();

    global.fetch = jest.fn().mockImplementation(() => {
        return new Promise((resolve) => {
            resolve([{

                ok: true,
                id:1,
                firstname: "Sebi",
                eventdate: "2020-02-02",
                appointment: "Frei",
                json: function() {
                    return {appointment: 'Frei'}
                }
            },
                {
                    ok: true,
                    id:2,
                    firstname: "Roberto",
                    eventdate: "2020-02-02",
                    appointment: "Schule",
                    json: function() {
                        return {appointment: 'Schule'}
                    }

                }])
        })
    });

    it('fetch list of users from server', async () => {

        const result = await service.listUser();
        console.log(result);
        expect(response.statusCode).toBe(200);
        expect(result[0].firstname).toBe("Sebi");
        expect(result[1].firstname).toBe("Roberto");
        expect(result.length).toBe(2)
    });

    it('fetch list of events from server', async () => {

        await service.showFamilyCalendar(4,2020);
        expect(response.statusCode).toBe(200)
    });


    it('delete event call should return code 200', async () => {

        await service.deleteAppointment(1);
        expect(response.statusCode).toBe(200)
    });


    it('add event call should return code 200', async () => {

        await service.addNewAppointment({firstname: "Roberto", appointment: "Golfen", eventdate: "2020-03-03"});
        expect(response.statusCode).toBe(200)
    });

});
