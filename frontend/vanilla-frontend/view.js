

export class View {


    constructor() {




            // set variables
            let today = new Date();
            let dayInt = today.getDate();
            let month = today.getMonth();
            let year = today.getFullYear();
// body of the calendar
            let calendarBody = document.getElementById("days");
            let user1 = document.getElementById("user1")
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
                user1.innerText = "";
                // checking the mount of days in this month to control the loop
                let totalDays = daysInMonth(month, year);
                // adding the dates to the calendar
                for (let day = 1; day <= totalDays; day++) {
                    // create li node with text content & apend to body
                    let cell = document.createElement("li");
                    let user = document.createElement("li");
                    user.setAttribute("id", day + 1 -1)
                    user.setAttribute("user", "Roberto")

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
                    user1.appendChild(user)
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
            this.year = month === 0 ? year - 1 : year;
            this.monthmonth = month === 0 ? 11 : month - 1;
            showCalendar(month, year);
        }
    }
}
