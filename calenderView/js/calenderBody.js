

export class CalenderBody {


    constructor(view){

        this.view = view;
        this.calender();
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
    const pickerMonth = datepicker('#month', {
        startDay: 1,
        customDays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        customMonths: months,
        overlayButton: "Auswählen",
        overlayPlaceholder: "Jahr eingeben",
        showAllDates: true,
        onSelect: instance => {
            month1 = instance.dateSelected.getMonth();
            year1 = instance.dateSelected.getFullYear();
        }
    });
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
            pickerMonth.navigate(today);
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
}
