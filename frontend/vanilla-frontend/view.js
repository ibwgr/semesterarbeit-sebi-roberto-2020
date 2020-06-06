


export class View {


    constructor() {

        fetch('http://localhost:3000/month/' + 4)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                appendData(data)

            })
            .catch(function (err) {
                console.log('error: ' + err);
            });


            // set variables
            let today = new Date();
            let dayInt = today.getDate();
            let month = today.getMonth();
            let year = today.getFullYear();
// body of the calendar
            let calendarBody = document.getElementById("days");
            let row1 = document.getElementById("user1");
            let row2 = document.getElementById("user2");
            let row3 = document.getElementById("user3");
            let row4 = document.getElementById("user4");

            let months = [
                "Januar",
                "Februar",
                "März",
                "April",
                "Mai",
                "Juni",
                "Juli",
                "August",
                "September",
                "Oktober",
                "November",
                "Dezember"
            ];
            let weekdays = [
                "Sonntag",
                "Montag",
                "Dienstag",
                "Mittwoch",
                "Donnerstag",
                "Freitag",
                "Samstag"
            ];

            let nextbtn = document.getElementById("next");
            let prevBtn = document.getElementById("prev");
            nextbtn.onclick = function () {
                next();
            };
            prevBtn.onclick = function () {
                previous();
            };


            showCalendar(month, year, dayInt );

            function showCalendar(month, year, day) {
                // gets the day of the week for this date
                let weekday = new Date(year, month).getDay();
                // clearing all previous cells
                calendarBody.innerHTML = "";
                // checking the mount of days in this month to control the loop
                let totalDays = daysInMonth(month, year);
                // adding the dates to the calendar
                for (let day = 1; day <= totalDays; day++) {
                    // create li node with text content & apend to body
                    let cell = document.createElement("li");

                        let cellText = document.createTextNode(weekdays[weekday] + " " + day + ". " + months[month]);
                        if (weekday > 5) {
                            weekday = 0
                        } else {
                            weekday++
                    }

                    if (
                        dayInt === day && month === today.getMonth() && year === today.getFullYear()) {
                        cell.classList.add("active");
                    }

                    cell.setAttribute("data-day", day);
                    cell.setAttribute("data-month", month);
                    cell.setAttribute("data-year", year);

                    cell.classList.add("singleDay");
                    cell.appendChild(cellText);

                    calendarBody.appendChild(cell);

                }

                document.getElementById("month").innerHTML = months[month];
                document.getElementById("year").innerHTML = year;
            }

            function daysInMonth(month, year) {
                // day 0 here returns the last day of the PREVIOUS month
                return new Date(year, month + 1, 0).getDate();
            }

            function next() {
                year = month === 11 ? year + 1 : year;
                month = (month + 1) % 12;
                showCalendar(month, year);
            }


            function previous() {
            year = month === 0 ? year - 1 : year;
            month = month === 0 ? 11 : month - 1;
            showCalendar(month, year);
        }

            function appendData(data) {

            const calenderMap = new Map(); // neue Haupt-Map initialisiert
            let mainContainer = [];
            for (let i = 0; i < data.length; i++) {
                mainContainer.push(data[i]);
            }
                let timeArray = [];
            let userMap = new Map(); // neue Map initialisiert für ein user mit event
            for (let x = 0; x < mainContainer.length; x++){

                let currentEntry = mainContainer[x]; //aktueller Eintrag
                let nextEntry = mainContainer[x + 1]; // nächster Eintrag


                if (nextEntry && currentEntry.eventdate === nextEntry.eventdate) { //check ob es weitere Events am gleichen Tag gibt



                    let user = currentEntry.firstname;
                    let event = currentEntry.appointment;

                    let eventsForUser = userMap.get(user); //in erster Iteration undefined

                    if (!eventsForUser){
                        eventsForUser = [];  // falls undefinend erstelle neues leeres Array
                    }

                    eventsForUser.push(event);  // füge event dem array hinzu
                    userMap.set(user, eventsForUser); // füge alle events für einen User hinzu. (key und value)
                }

                else {  // falls nächstes Datum unterschiedlich ist => neue map erstellen

                    let user = currentEntry.firstname;
                    let event = currentEntry.appointment;


                    let eventsForUser = userMap.get(user);

                    if (!eventsForUser){
                        eventsForUser = [];
                    }

                    eventsForUser.push(event);
                    userMap.set(user, eventsForUser);

                    calenderMap.set(currentEntry.eventdate, userMap); // setze key und value für haupt-map

                    userMap = new Map(); // neue userMap für neues Datum wird initialisiert.
                }
            }
            if (userMap.size > 0){          // bearbeitung des letzten Eintrags
                const key = mainContainer[mainContainer.length-1].eventdate;
                calenderMap.set(key, userMap)
            }



            for (let [key, value] of calenderMap.entries()) {

                let r = "Roberto";
                let s = "Sebi";
                let f = "Fredi";
                let z = "Susi";
                let a = [];
                let b = [];
                let c = [];
                let d = [];

                let time = new Date(key);

                let tag = time.getDate();


                let xy = value.entries();
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


               timeArray.push(tag)

                for (let x = 0; x < timeArray.length; x++) {

                    let currentDate = timeArray[x];
                    let nextDate = timeArray[x + 1];
                    let diffTage = nextDate - currentDate;



                    if (diffTage > 1) {


                        for (let x = 0; x < diffTage; x++) {

                            let element = createField('Roberto', "", "");
                            row1.appendChild(element);
                            let element1 = createField('Sebi', "", "");
                            row2.appendChild(element1);
                            let element2 = createField('Fredi', "", "");
                            row3.appendChild(element2);
                            let element3 = createField('Susi', "", "");
                            row4.appendChild(element3)
                        }
                    } else {
                        let element = createField('Roberto', value, a);
                        row1.appendChild(element);
                        let element1 = createField('Sebi', value, b);
                        row2.appendChild(element1);
                        let element2 = createField('Fredi', value, c);
                        row3.appendChild(element2);
                        let element3 = createField('Susi', value, d);
                        row4.appendChild(element3)
                    }
                }
            }


            function createField(user, key, data) {
                const element = document.createElement("li");
                element.innerHTML = key + "<br />" + data;
                element.setAttribute("user", user)
                return element
            }

        }
    }
}
