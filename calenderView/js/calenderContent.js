
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

                    eventsForUser.push({id: currentEntry, description: event});
                    // füge event dem array hinzu
                    userMap.set(user, eventsForUser); // füge alle events für einen User hinzu. (key und value)

                } else {  // falls nächstes Datum unterschiedlich ist => neue map erstellen

                    let user = currentEntry.firstname;
                    let event = currentEntry.appointment;
                    let eventsForUser = userMap.get(user);


                    if (!eventsForUser) {
                        eventsForUser = [];
                    }

                    eventsForUser.push({id: currentEntry, description: event});
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

                    function pushItems(users) {

                        termin.forEach((val, key)=>{
                            let appointment = termin[key].description;
                            let identifier = termin[key].id.id;
                            let object = {meet: appointment, nr: identifier}
                            users.push(object)
                    })
                }

                    if (user === r) {
                        pushItems(a)
                    }
                    if (user === s) {
                        pushItems(b)
                    }
                    if (user === f) {
                        pushItems(c)
                    }
                    if (user === z) {
                        pushItems(d)
                }}


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
                        let element = createField("", "");
                        row1.appendChild(element);
                        let element1 = createField("", "");
                        row2.appendChild(element1);
                        let element2 = createField("", "");
                        row3.appendChild(element2);
                        let element3 = createField("", "");
                        row4.appendChild(element3)
                    }
                }


                let a2 = a.map(function(e) {
                    return e.nr
                });
                let b2 = b.map(function(e) {
                    return e.nr
                });
                let c2 = c.map(function(e) {
                    return e.nr
                });
                let d2 = d.map(function(e) {
                    return e.nr
                });


                let element = createField(a, a2);
                row1.appendChild(element);
                //element.appendChild(addDeleteButton(a2));
                let element1 = createField(b, b2);
                row2.appendChild(element1);
               // element1.appendChild(addDeleteButton(b2));
                let element2 = createField(c, c2);
                row3.appendChild(element2);
              //  element2.appendChild(addDeleteButton(c2));
                let element3 = createField(d, d2);
                row4.appendChild(element3);
              //  element3.appendChild(addDeleteButton(d2));
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

            function createField(data, id) {

                const element = document.createElement("li");

                let button = document.createElement("button");
                button.classList.add("button");
                button.setAttribute("id", id);
                button.innerText = "Löschen";
                button.style.backgroundColor = "green";

                button.onclick = function () {

                    fetch('http://localhost:3000/events/' + id, {
                        method: 'DELETE',
                    })
                        .then(res => res.json())
                        .catch((error)=>{
                            console.log(error)
                        });
                    location.reload()
                };


                if (button.id === ""){
                    button.style.display = "none"
                }
                else {

                   let a = [];

                    for (let x =0; x < data.length; x++){

                        a.push(data[x].meet);
                    }

                    element.innerHTML = a;
                    element.appendChild(button);
                    button.id = id
                }
                return element
            }

            function fillIn(input) {

                for (let x = 0; x < input; x++) {

                    let element = createField("", "");
                    row1.appendChild(element);
                    let element1 = createField( "", "");
                    row2.appendChild(element1);
                    let element2 = createField("", "");
                    row3.appendChild(element2);
                    let element3 = createField("", "");
                    row4.appendChild(element3)
                }
            }
        }
    }



    listUser(){

        fetch('http://localhost:3000/names')
            .then(function (response) {
                return response.json();
            })
            .then(function (datanames) {


                // Array nur mit den Namen
                let gleich = datanames.map(x => Object.values(x))

                // Set erstellen um jeden Namen nur einmal zu haben
                let set = new Set();
                gleich.map(x => set.add(x.toString()))

                // Select-Liste mit den Namen füllen
                let lstName = document.getElementById("person");
                set.forEach(function (item) {
                    let lstOption = document.createElement("OPTION");
                    lstName.options.add(lstOption);
                    lstOption.textContent = item;
                    lstOption.nodeValue = item;
                    lstName.add(lstOption);
                })

            })
            .catch(function (err) {
                console.log('error: ' + err);
            });


        }


    addNewAppointment() {

        // Eingaben aus dem Modal auslesen
        let termin = document.getElementById("termin").value;
        let date = document.getElementById("date").value;
        let person = document.getElementById("person").value;

        // Objekt bilden -> Wird im fetch zu json umgewandelt
        var event = {};
        event.firstname = person;
        event.appointment = termin;
        event.eventdate = date;

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
            });
        location.reload()
    }
}
