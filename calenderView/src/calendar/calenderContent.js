

export class CalenderContent {


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


    showFamilyCalendar(monat) {

        return fetch('http://localhost:3000/month/' + monat)
            .then(function (response) {

                return response.json();

            })

            .catch(function (err) {
                console.log('error: ' + err);
            });
    }



    listUser(){

        return fetch('http://localhost:3000/names')
            .catch(function (err) {
                console.log('error: ' + err);
            })
        }


    addNewAppointment(event) {

        // Übermitteln
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
}
