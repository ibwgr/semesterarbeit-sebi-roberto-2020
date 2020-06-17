

export class CalendarMapper {

    constructor(){}


    calendarMapper(data) {

        const calenderMap = new Map();
        let mainContainer = [];
        for (let i = 0; i < data.length; i++) {
            mainContainer.push(data[i]);
        }

        let userMap = new Map();

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

        if (userMap.size > 0) {
            const key = mainContainer[mainContainer.length - 1].eventdate;
            calenderMap.set(key, userMap)
        }

        return calenderMap
    }

    eachUser(data){

            // Objektvalue, also die Namen mapen
            let names = data.map(x => Object.values(x))

            // Set erstellen um jeden Namen nur einmal zu haben
            let set = new Set();
            names.map(x => set.add(x.toString()))
        console.log("Mapper set ",set)
        return set

    }
}
