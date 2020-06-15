

export class CalenderService {


    constructor() {}


    removeCalender() {
        let row1 = document.getElementById("user1");
        row1.innerText = "";
        let row2 = document.getElementById("user2");
        row2.innerText = "";
        let row3 = document.getElementById("user3");
        row3.innerText = "";
        let row4 = document.getElementById("user4");
        row4.innerText = "";
    }


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
}
