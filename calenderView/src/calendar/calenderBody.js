

export class CalenderBody {


    constructor(view){

        this.view = view;
        this.calender();
        const newEntry = document.getElementById("showModal");
        this.showModal(newEntry);
        const saveData = document.getElementById("saveData");
        this.saveEntry(saveData);
        const backToCalender = document.getElementById("back");
        this.backToCalender(backToCalender);
    }

    showMonth(monat){
        let user1 = document.getElementById("username1").innerHTML;
        let user2 = document.getElementById("username2").innerHTML;
        let user3 = document.getElementById("username3").innerHTML;
        let user4 = document.getElementById("username4").innerHTML;

        this.view.showFamilyCalendar(monat+1, user1, user2, user3, user4);

    }

    calender(){

    let today = new Date();
    let dayInt = today.getDate();
    let month1 = today.getMonth();

    this.showMonth(month1);

    let year1 = today.getFullYear();
    let calendarBody = document.getElementById("days");
    let weekday = new Date(year1, month1).getDay();
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
       this.view.removeCalender();
        nextMonth();
        let user1 = document.getElementById("username1").innerHTML;
        let user2 = document.getElementById("username2").innerHTML;
        let user3 = document.getElementById("username3").innerHTML;
        let user4 = document.getElementById("username4").innerHTML;
        this.view.showFamilyCalendar(month1+1, user1, user2, user3, user4)

    }.bind({view: this.view});


    prevBtn.onclick = function () {
        this.view.removeCalender();
        previousMonth();
        let user1 = document.getElementById("username1").innerHTML;
        let user2 = document.getElementById("username2").innerHTML;
        let user3 = document.getElementById("username3").innerHTML;
        let user4 = document.getElementById("username4").innerHTML;
        this.view.showFamilyCalendar(month1+1, user1, user2, user3, user4)
    }.bind({view: this.view});



    showCalendar(month1, year1);


   function showCalendar(month, year) {

       let totalDays = daysInMonth(month1, year1);

       calendarBody.innerHTML = "";

        function daysInMonth(month, year) {
            return new Date(year, month + 1, 0).getDate();
        }


        for (let day = 1; day <= totalDays; day++) {

            let cell = document.createElement("li");
            let cellText = document.createTextNode(weekdays[weekday] + " " + day + ".  " + months[month1]);
            if (weekday === 0 || weekday === 6){
                cell.classList.add("weekend")
            }
            if (weekday > 5){weekday = 0}else{weekday++}

            if (
                dayInt === day &&
                month === today.getMonth() &&
                year === today.getFullYear()
            ) {
                cell.classList.add("active");
            }

            cell.classList.add("singleDay");
            cell.appendChild(cellText);
            calendarBody.appendChild(cell);
        }

        document.getElementById("month").innerHTML = months[month1] + " " + year1;

    }

    function nextMonth() {
        year1 = month1 === 11 ? year1 + 1 : year1;
        month1 = (month1 + 1) % 12;
        showCalendar(year1, month1)
    }

    function previousMonth() {
       year1 = month1 === 0 ? year1 - 1 : year1;
       month1 = month1 === 0 ? 11 : month1 - 1;
       showCalendar(year1, month1)
    }
    }


    showModal(button){
        button.addEventListener('click', function () {
            let element = document.getElementById("modal");
            element.classList.toggle("hide");

            //fetch aufrufen
            const fetch = this.view.listUser;

            //behandlung des fetch
            fetch.then(function (response) {
                return response.json();
            })
                .then(function (datanames) {
                    // Objektvalue, also die Namen mapen
                    let names = datanames.map(x => Object.values(x))

                    // Set erstellen um jeden Namen nur einmal zu haben
                    let set = new Set();
                    names.map(x => set.add(x.toString()))

                    // Select-Liste mit den Namen füllen
                    let lstName = document.getElementById("person");
                    set.forEach(function (item) {
                        let lstOption = document.createElement("OPTION");
                        lstName.options.add(lstOption);
                        lstOption.textContent = item;
                        lstOption.nodeValue = item;
                        lstName.add(lstOption);})
                })
                .catch(function (err) {
                    console.log('error: ' + err);
                });
        }.bind({view: this.view}))
    }

    saveEntry(button){
        button.addEventListener('click', function () {

            // Eingaben aus dem Modal auslesen
            let termin = document.getElementById("termin").value;
            let date = document.getElementById("date").value;
            let person = document.getElementById("person").value;
            if(termin === ""){
                alert("Ungültige Eingabe")
            }else if(date === ""){
                alert("Ungültige Eingabe")
            }else if(person === ""){
                alert("Ungültige Eingabe")
            }else{
                // Objekt bilden -> Wird im fetch zu json umgewandelt
                var event = {};
                event.firstname = person;
                event.appointment = termin;
                event.eventdate = date;

                this.view.addNewAppointment(event);
                }

            // Select Liste leeren
            const selectElement = document.getElementById("person");
            while (selectElement.length > 0){
                selectElement.remove(0);
            }
            document.getElementById("modal").classList.toggle("hide");
            location.reload()
        }.bind({view: this.view}))
    }

    backToCalender(button){
        button.addEventListener('click', function () {
            // Select Liste leeren
            const selectElement = document.getElementById("person");
            while (selectElement.length > 0){
                selectElement.remove(0);
            }
            document.getElementById("modal").classList.toggle("hide");
        }.bind({view: this.view}))
    }


}

