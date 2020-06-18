

export class CalenderService {


    constructor() {}

    showFamilyCalendar(monat, year) {

        return fetch('http://localhost:3000/date/' + monat + "/" + year)
            .then(function (response) {

                return response.json();

            })

            .catch(function (err) {
                console.log('error: ' + err);
            });
    }


    listUser(){

        return fetch('http://localhost:3000/names')
            .then(function (response) {
                return response.json();
            })
            .catch(function (err) {
                console.log('error: ' + err);
            })
        }


    addNewAppointment(event) {

        fetch('http://localhost:3000/create', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(event)
        })
            .then (function (response) {
            return response.json();
            })
            .catch (function (err) {
                console.log('error: ' + err);
            })
    }


    deleteAppointment(id) {
        for (let x = 0; x < id.length; x++) {

            fetch('http://localhost:3000/events/' + id[x], {
                method: 'DELETE',
            })
                .then(res => res.json())
                .catch((error) => {
                    console.log(error)
                });
            location.reload()
        }
    }

    deleteUser(name){

        fetch('http://localhost:3000/event/' + name, {
            method: 'DELETE',
        })
            .then (function (response) {
            return response.json();
        })
            .catch (function (err) {
                console.log('error: ' + err);
            })

    }
}
