var xhr;

function HTTPHandler(){
    function getXmlHttpRequestObject() {
        if (!xhr) {
            // Create a new XMLHttpRequest object 
            xhr = new XMLHttpRequest();
        }
        return xhr;
    };

    function dataCallback() {
        // Check response is ready or not
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("User data received!");
            getDate();
            var dataDiv = document.getElementById('result-container');
            // Set current data text
            dataDiv.innerHTML = xhr.responseText;
        }
    }
    function sendDataCallback() {
        // Check response is ready or not
        if (xhr.readyState === 4 && xhr.status === 201) {
            console.log("Data creation response received!");
            getDate();
            var dataDiv = document.getElementById('sent-data-container');
            // Set current data text
            dataDiv.innerHTML = xhr.responseText;
        }
    }
    function getUsers() {
        console.log("Get users...");
        xhr = getXmlHttpRequestObject();
        xhr.onreadystatechange = dataCallback;
        // asynchronous requests
        xhr.open("GET", "http://localhost:5000/users", true);
        // Send the request over the network
        xhr.send(null);
    }
    function getDate() {
        var date = new Date().toString();

        document.getElementById('time-container').textContent
            = date;
    }
    function sendData() {
        var dataToSend = document.getElementById('data-input').value;   
        if (!dataToSend) {
            console.log("Data is empty.");
            return;
        }
        console.log("Sending data: " + dataToSend);
        xhr = getXmlHttpRequestObject();
        xhr.onreadystatechange = sendDataCallback;
        // asynchronous requests
        xhr.open("POST", "http://localhost:5000/users", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // Send the request over the network
        xhr.send(JSON.stringify({"data": dataToSend}));
    }
}

export default HTTPHandler;