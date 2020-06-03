
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
     //       let user1 = document.getElementById("user1");
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
// next and previous functionality
            let nextbtn = document.getElementById("next");
            let prevBtn = document.getElementById("prev");
            nextbtn.onclick = function () {
                next();
            };
            prevBtn.onclick = function () {
                previous();
            };

// init calendar
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
                    // adding active class if day matches today
                    if (
                        dayInt === day &&
                        month === today.getMonth() &&
                        year === today.getFullYear()
                    ) {
                        cell.classList.add("active");
                    }

                    // appending date attributes to single date li element
                    cell.setAttribute("data-day", day);
                    cell.setAttribute("data-month", month);
                    cell.setAttribute("data-year", year);
                    //appending li to body of calendar
                    cell.classList.add("singleDay");
                    cell.appendChild(cellText);

                    calendarBody.appendChild(cell);

                }
                // set month string value
                document.getElementById("month").innerHTML = months[month];
                // set year string value
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


            let row1 = document.getElementById("user1");
            let row2 = document.getElementById("user2");

            for (let [key, value] of calenderMap) {

                let r = "Roberto";
                let s = "Sebi";
                let a = [];
                let b = [];
                let xy = value.entries();
                for (let [user, termin] of xy){
                    if (user === r){
                        a.push(user, termin)
                    }

                    if(user === s){
                        b.push(user, termin)
                    }
                }
                console.log(key, value)

                let user1 = document.createElement("li");
                user1.innerHTML = key + "<br />" + a;
                user1.setAttribute("user", "Roberto");
                row1.appendChild(user1);

                let user2 = document.createElement("li");
                user2.innerHTML = key + "<br />" + b;
                user2.setAttribute("user", "Sebi");
                row2.appendChild(user2);


            }
        }
    }
}
