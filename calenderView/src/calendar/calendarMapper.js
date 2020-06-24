

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

            let currentEntry = mainContainer[x];
            let nextEntry = mainContainer[x + 1];

            if (nextEntry && currentEntry.eventdate === nextEntry.eventdate) {

                let user = currentEntry.firstname;
                let event = currentEntry.appointment;
                let eventsForUser = userMap.get(user);

                if (!eventsForUser) {
                    eventsForUser = [];
                }

                eventsForUser.push({id: currentEntry, description: event});
                userMap.set(user, eventsForUser);

            } else {

                let user = currentEntry.firstname;
                let event = currentEntry.appointment;
                let eventsForUser = userMap.get(user);

                if (!eventsForUser) {
                    eventsForUser = [];
                }

                eventsForUser.push({id: currentEntry, description: event});
                userMap.set(user, eventsForUser);
                calenderMap.set(currentEntry.eventdate, userMap);
                userMap = new Map();
            }
        }

        if (userMap.size > 0) {
            const key = mainContainer[mainContainer.length - 1].eventdate;
            calenderMap.set(key, userMap)
        }

        return calenderMap
    }

    eachUser(data){
            let names = data.map(x => Object.values(x));
            let set = new Set();
            names.map(x => set.add(x.toString()));

        return set
    }
}
