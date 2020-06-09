
export class CalenderContent {


    constructor() {
    }


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


    showFamilyCalendar(monat, user1, user2, user3, user4) {


        fetch('http://localhost:3000/month/' + monat)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                appendData(data)

            })
            .catch(function (err) {
                console.log('error: ' + err);
            });


        let row1 = document.getElementById("user1");
        let row2 = document.getElementById("user2");
        let row3 = document.getElementById("user3");
        let row4 = document.getElementById("user4");


        function appendData(data) {

            const calenderMap = new Map(); // neue Haupt-Map initialisiert
            let mainContainer = [];
            for (let i = 0; i < data.length; i++) {
                mainContainer.push(data[i]);
            }


            let userMap = new Map(); // neue Map initialisiert für ein user mit event

            for (let x = 0; x < mainContainer.length; x++) {

                let currentEntry = mainContainer[x]; //aktueller Eintrag
                let nextEntry = mainContainer[x + 1]; // nächster Eintrag

                if (nextEntry && currentEntry.eventdate === nextEntry.eventdate) { //check ob es weitere Events am gleichen Tag gibt

                    let user = currentEntry.firstname;

                    let event = currentEntry.appointment;

                    let eventsForUser = userMap.get(user); //in erster Iteration undefined

                    if (!eventsForUser) {
                        eventsForUser = [];  // falls undefinend erstelle neues leeres Array
                    }

                    eventsForUser.push(event);  // füge event dem array hinzu
                    userMap.set(user, eventsForUser); // füge alle events für einen User hinzu. (key und value)
                } else {  // falls nächstes Datum unterschiedlich ist => neue map erstellen

                    let user = currentEntry.firstname;
                    let event = currentEntry.appointment;
                    let eventsForUser = userMap.get(user);


                    if (!eventsForUser) {
                        eventsForUser = [];
                    }

                    eventsForUser.push(event);
                    userMap.set(user, eventsForUser);

                    calenderMap.set(currentEntry.eventdate, userMap); // setze key und value für haupt-map

                    userMap = new Map(); // neue userMap für neues Datum wird initialisiert.
                }
            }


            if (userMap.size > 0) {          // bearbeitung des letzten Eintrags
                const key = mainContainer[mainContainer.length - 1].eventdate;
                calenderMap.set(key, userMap)

            }

            let timeArray = [];

            for (let [key, value] of calenderMap.entries()) {

                let r = user1;
                let s = user2;
                let f = user3;
                let z = user4;

                let time = new Date(key);
                let tag = time.getDate();
                let xy = value.entries();

                let a = [];
                let b = [];
                let c = [];
                let d = [];


                for (let [user, termin] of xy) {

                    if (user === r) {
                        a.push(user, termin)
                    }
                    if (user === s) {
                        b.push(user, termin)
                    }
                    if (user === f) {
                        c.push(user, termin)
                    }
                    if (user === z) {
                        d.push(user, termin)
                    }
                }

                timeArray.push(tag);


                let date = new Date();
                let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                let today = new Date(firstDay);
                let firstOfMonth = today.getDate();
                let firstEntry = timeArray[0];
                let firstEmptyFields = firstEntry - firstOfMonth;
                let currentDate = timeArray[timeArray.length - 2];
                let nextDate = timeArray[timeArray.length - 1];
                let diffTage = nextDate - currentDate;


                if (timeArray > 0) {
                    fillIn(firstEmptyFields)
                }

                if (diffTage > 1) {

                    for (let x = 1; x < diffTage; x++) {
                        let element = createField("");
                        row1.appendChild(element);
                        let element1 = createField("");
                        row2.appendChild(element1);
                        let element2 = createField("");
                        row3.appendChild(element2);
                        let element3 = createField("");
                        row4.appendChild(element3)
                    }
                }


                let element = createField(a.pop());
                row1.appendChild(element);
                element.appendChild(addDeleteButton());
                let element1 = createField(b.pop());
                row2.appendChild(element1);
                element1.appendChild(addDeleteButton());
                let element2 = createField(c.pop());
                row3.appendChild(element2);
                element2.appendChild(addDeleteButton());
                let element3 = createField(d.pop());
                row4.appendChild(element3);
                element3.appendChild(addDeleteButton());
            }

            let lastDay = new Date();
            let lastday = new Date(lastDay.getFullYear(), lastDay.getMonth() + 1, 0, 23, 59, 59);
            let end = new Date(lastday);
            let lastEnd = end.getDate();

            let lastEntry = timeArray.pop();
            let fillUp = lastEnd - lastEntry;


            if (calenderMap.size === 0) { // Gitter auffüllen mit leeren Feldern falls es im Monat keine Termine hat
                fillIn(lastEnd)
            }

            fillIn(fillUp);

            function addDeleteButton() {
                let button = document.createElement("button");
                button.id = "deleteButton";
                button.innerText = "Löschen";
                button.style.backgroundColor = "green";

                return button
            }

            function createField(data) {
                const element = document.createElement("li");
                if (data === undefined){
                    element.innerHTML = ""
                }else {
                    element.innerHTML = data;
                }
                return element
            }

            function fillIn(input) {

                for (let x = 0; x < input; x++) {

                    let element = createField("");
                    row1.appendChild(element);
                    let element1 = createField( "");
                    row2.appendChild(element1);
                    let element2 = createField("");
                    row3.appendChild(element2);
                    let element3 = createField("");
                    row4.appendChild(element3)
                }
            }
        }
    }


    addNewAppointment() {
        //AddItems
    }


    deleteAppointment(date, user, termin) {
        let button = document.getElementById("deleteButton")
        button.onclick = function () {

            fetch('https://localhost:3000/events' + id, {
                method: 'DELETE',
            })
                .then(res => res.text()) // or res.json()
                .then(res => console.log(res))

        }

    }


}
