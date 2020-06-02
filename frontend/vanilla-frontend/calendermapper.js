export class Calendermapper {


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


        function appendData(data) {

            const calenderMap = new Map();
            let mainContainer = [];
            for (let i = 0; i < data.length; i++) {
                mainContainer.push(data[i]);
                console.log(mainContainer)
            }


            let userMap = new Map();
            for (let x = 0; x < mainContainer.length; x++){

                let currentEntry = mainContainer[x];
                let nextEntry = mainContainer[x + 1];


                if ( nextEntry && currentEntry.eventdate === nextEntry.eventdate) {


                    let user = currentEntry.firstname;
                    let event = currentEntry.appointment;
                    let eventsForUser = userMap.get(user);

                    if (!eventsForUser){
                        eventsForUser = [];
                    }


                        eventsForUser.push(event);
                        userMap.set(user, eventsForUser)


                }else {

                    let user = currentEntry.firstname;
                    let event = currentEntry.appointment;

                    let eventsForUser = userMap.get(user);

                    if (!eventsForUser){
                        eventsForUser = [];
                    }


                    eventsForUser.push(event);
                    userMap.set(user, eventsForUser)
                    calenderMap.set(currentEntry.eventdate, userMap)

                    userMap = new Map();

                }
            }
            if (userMap.size > 0){
                const key = mainContainer[mainContainer.length-1].eventdate;
                calenderMap.set(key, userMap)

            } console.log(calenderMap)
        }
    }
}
