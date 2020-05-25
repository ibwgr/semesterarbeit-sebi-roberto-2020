export class View {

    constructor(){


        fetch('http://localhost:3000/events')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                appendData(data);
            })
            .catch(function (err) {
                console.log('error: ' + err);
            });



        function appendData(data) {
            var mainContainer = document.getElementById("values");
            for (var i = 0; i < data.length; i++) {
                var div = document.createElement("div");
                div.innerHTML = 'Name: ' + data[i].firstname + ' ' + data[i].appointment;
                mainContainer.appendChild(div);
            }
        }
    }
}
