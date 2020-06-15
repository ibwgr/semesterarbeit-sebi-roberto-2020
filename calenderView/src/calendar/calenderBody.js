import {bindCallback} from "rxjs";


export class CalenderBody {


    constructor(view, mapper){

        this.mapper = mapper;
        this.view = view;
        this.calender();
        const newEntry = document.getElementById("showModal");
        this.showModal(newEntry);
        const saveData = document.getElementById("saveData");
        this.saveEntry(saveData);
        const backToCalender = document.getElementById("back");
        this.backToCalender(backToCalender);
        const saveUser = document.getElementById("saveUser");
        this.saveUser(saveUser);
    }

    showMonth(monat){
        let user1 = document.getElementById("username1").innerHTML;
        let user2 = document.getElementById("username2").innerHTML;
        let user3 = document.getElementById("username3").innerHTML;
        let user4 = document.getElementById("username4").innerHTML;
        let today = new Date();
        let year = today.getFullYear()
        today = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);
        let end = new Date(today);
        let lastEnd = end.getDate();
        this.showData(year,monat + 1, user1, user2, user3, user4, lastEnd)
    }

    calender(){

    let today = new Date();
    let dayInt = today.getDate();
    let month1 = today.getMonth();

    today = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);

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

    nextbtn.onclick = ()=>{
       this.view.removeCalender();
        let lastEnd = nextMonth();
        let user1 = document.getElementById("username1").innerHTML;
        let user2 = document.getElementById("username2").innerHTML;
        let user3 = document.getElementById("username3").innerHTML;
        let user4 = document.getElementById("username4").innerHTML;
        this.showData(year1, month1+1, user1, user2, user3, user4, lastEnd)
    };


    prevBtn.onclick = ()=>{
        this.view.removeCalender();
        let lastEnd = previousMonth();
        let user1 = document.getElementById("username1").innerHTML;
        let user2 = document.getElementById("username2").innerHTML;
        let user3 = document.getElementById("username3").innerHTML;
        let user4 = document.getElementById("username4").innerHTML;
        this.showData(year1,month1+1,  user1, user2, user3, user4, lastEnd)
    };

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

        today = new Date(today.getFullYear(), today.getMonth() + 2, 0, 23, 59, 59);
        let end = new Date(today);
        let lastEnd = end.getDate();
        year1 = month1 === 11 ? year1 + 1 : year1;
        month1 = (month1 + 1) % 12;


        showCalendar(year1, month1);
        return lastEnd
    }

    function previousMonth() {
        today = new Date(today.getFullYear(), today.getMonth(), 0, 23, 59, 59);
        let end = new Date(today);
        let lastEnd = end.getDate();
        year1 = month1 === 0 ? year1 - 1 : year1;
        month1 = month1 === 0 ? 11 : month1 - 1;
        showCalendar(year1, month1);
        return lastEnd
    }}


    showModal(button){
        button.addEventListener('click', ()=> {
            let element = document.getElementById("modal");
            element.classList.toggle("hide");

            //fetch aufrufen
            const fetch = this.view.listUser();

            //behandlung des fetch
            fetch.then(function (datanames) {
                    // Objektvalue, also die Namen mapen
                    let names = datanames.map(x => Object.values(x));

                    // Set erstellen um jeden Namen nur einmal zu haben
                    let set = new Set();
                    names.map(x => set.add(x.toString()));

                    // Select-Liste mit den Namen füllen
                    let lstName = document.getElementById("person");

                    let allUser = document.createElement("OPTION");
                    allUser.textContent = "Für alle User";
                    lstName.options.add(allUser)


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
        })
    }

    saveEntry(button){


        button.addEventListener('click', () => {

            // Eingaben aus dem Modal auslesen
            let termin = document.getElementById("termin").value;
            let date = document.getElementById("date").value;
            let person = document.getElementById("person").value;
            if (termin === "") {
                alert("Ungültige Eingabe")
            } else if (date === "") {
                alert("Ungültige Eingabe")
            } else if (person === "") {
                alert("Ungültige Eingabe")
            } else if (person === "Für alle User") {

                let user1 = document.getElementById("username1").innerText;
                let user2 = document.getElementById("username2").innerText;
                let user3 = document.getElementById("username3").innerText;
                let user4 = document.getElementById("username4").innerText;

                let users = [user1, user2, user3, user4];

                for (let x = 0; x < users.length; x++) {

                    let event = {};
                    event.firstname = users[x];
                    event.appointment = termin;
                    event.eventdate = date;

                    this.view.addNewAppointment(event)
                }
            }

            else{
                let event = {};

                event.firstname = person;
                event.appointment = termin;
                event.eventdate = date;

                this.view.addNewAppointment(event);
                }

            const selectElement = document.getElementById("person");
            while (selectElement.length > 0){
                selectElement.remove(0);
            }
            document.getElementById("modal").classList.toggle("hide");
            location.reload()
        })
    }

    backToCalender(button){
        button.addEventListener('click', ()=> {
            // Select Liste leeren
            const selectElement = document.getElementById("person");
            while (selectElement.length > 0){
                selectElement.remove(0);
            }
            document.getElementById("modal").classList.toggle("hide");
        })
    }

    async showData(year, monat, user1, user2, user3, user4, lastEnd){

        const klsdf = function fetchedData (data) {
            const view = this.view;

            let calenderMap = this.mapper.calendarMapper(data, user1, user2, user3, user4);

            let timeArray = [];

            let row1 = document.getElementById("user1");
            let row2 = document.getElementById("user2");
            let row3 = document.getElementById("user3");
            let row4 = document.getElementById("user4");


            for (let [key, value] of calenderMap.entries()) {

                let r = user1;
                let s = user2;
                let f = user3;
                let z = user4;
                let time = new Date(key);
                let tag = time.getDate();
                let mapping = value.entries();
                let a = [];
                let b = [];
                let c = [];
                let d = [];

                for (let [user, termin] of mapping) {

                    function pushItems(users) {

                        termin.forEach((val, key) => {
                            let appointment = termin[key].description;
                            let identifier = termin[key].id.id;
                            let object = {meet: appointment, nr: identifier};
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


                let a2 = a.map(function (e) {
                    return e.nr
                });
                let b2 = b.map(function (e) {
                    return e.nr
                });
                let c2 = c.map(function (e) {
                    return e.nr
                });
                let d2 = d.map(function (e) {
                    return e.nr
                });

                let element = createField(a, a2);
                row1.appendChild(element);
                let element1 = createField(b, b2);
                row2.appendChild(element1);
                let element2 = createField(c, c2);
                row3.appendChild(element2);
                let element3 = createField(d, d2);
                row4.appendChild(element3);
            }

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

                button.onclick = function() {

                    view.deleteAppointment(id)
                };


                if (button.id === ""){
                    button.style.display = "none"
                }
                else {
                    let a = [];
                    for (let x =0; x < data.length; x++){

                        a.push(data[x].meet + "<br>");
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

        }.bind({mapper: this.mapper, view: this.view});

        const fetch = this.view.showFamilyCalendar(monat, year);
        await fetch.then(klsdf);
    }


    saveUser(button) {

        const fetch = this.view.listUser();
        const view = this.view;

        const saveUser = async function saveUsr() {
            let arr = [];
            let isNew = false;
            let event = {}


            // Eingaben aus dem Inputfeld auslesen
            let newUser = document.getElementById("newUser").value;


            //behandlung des fetch
            await fetch.then(data =>{

                // Objektvalue, also die Namen mapen
                let names = data.map(x => Object.values(x))

                // Set erstellen um jeden Namen nur einmal zu haben
                let set = new Set();
                names.map(x => set.add(x.toString()))
                arr = Array.from(set);

                let idx = arr.indexOf(newUser);
               // Prüfung ob Inputfeld nicht leer und nicht schon bestehender Nutzer
                if(newUser === ""){
                    alert("Kein Nutzername erfasst!")
                    } else if(idx !== -1){
                        alert("Nutzer bereits vorhanden!")
                    }else{ isNew = true}
                    console.log(isNew)
                    console.log(arr)
                // leerer Eintrag in DB erstellen, damit der User einen Eintrag hat. Ugly quick and dirty
                if(isNew){
                // Objekt bilden -> Wird im fetch zu json umgewandelt
                    event.firstname = newUser;
                    event.appointment = "";
                    event.eventdate = "0000-00-00";
                    view.addNewAppointment(event);
                    location.reload()
                   console.log(event)
                }
                    // Inputfeld leeren
                    // document.getElementById("newUser").value = "";
                });
        }

        button.addEventListener('click',saveUser);

    }
}

