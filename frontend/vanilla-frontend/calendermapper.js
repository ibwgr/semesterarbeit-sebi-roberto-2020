export class Calendermapper {


    constructor(){

   /*     fetch('http://localhost:3000/month/' + month)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {




            })
            .catch(function (err) {
                console.log('error: ' + err);
            });*/



        function appendData(data) {
            let mainContainer = document.getElementById("values");
            for (let i = 0; i < data.length; i++) {
                let div = document.createElement("div");
                div.innerHTML = 'Name: ' + data[i].firstname + ' ' + data[i].appointment;
                mainContainer.appendChild(div)

                return div.innerHTML
            }
        }



    }


}
