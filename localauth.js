function populateLocations() {
    fetch("https://api.beta.ons.gov.uk/v1/code-lists/local-authority/editions/2016/codes", {
            mode: 'cors'
        })
        .then(data => data.json())
        .then(function (data) {
            data.items.map(function (data) {
                places = data.label
                let node = document.createElement("option");
                let textnode = document.createTextNode(places);
                node.appendChild(textnode);
                node.value = data.id
                document.getElementById("places").appendChild(node);
            })

            sortlist()
        })

}

function sortlist() {
    let lb = document.getElementById('places');
    let options = document.getElementById('places');
    let n_options = options.length;
    let temp = []

    for (i = n_options; i--;) {
        temp[i] = options[i].text + ";" + options[i].value;
    }
    temp.sort();
    for (i = n_options; i--;) {
        parts = temp[i].split(';');
        options[i].text = parts[0];
        options[i].value = parts[1];
    }
}


function getDataforRegion(value) {
    document.getElementById("hidden").style.display = ""
    let location = document.getElementById("places");
    let locationID = location.value;
    let locationName = location.options[location.selectedIndex].text;
    getPopulation(locationID, locationName)
    getASHE(locationID, locationName)
    getDatasets(locationID, locationName)
}

function getPopulation(locationID, locationName) {
    let datasetID = 'mid-year-pop-est'
    let node = document.createElement("b");
    let textnode = document.createTextNode(locationName + " (2016)");
    node.appendChild(textnode);
    document.getElementById("populationPlace").appendChild(node);
    fetch(host + "/v1/datasets/" + datasetID + "/editions/time-series/versions/2/observations?time=2016&age=*&sex=0&geography=" + locationID, {
            mode: 'cors'
        })
        .then(data => data.json())
        .then(function (data) {
            let age = 0
            data.observations.map(function (data) {
                age = age + Number(data.observation)
            })
            let node = document.createElement("h5");
            let textnode = document.createTextNode(age);
            node.appendChild(textnode);
            document.getElementById("totalPop").appendChild(node);
        })

    fetch(host + "/v1/datasets/" + datasetID + "/editions/time-series/versions/2/observations?time=2016&age=*&sex=2&geography=" + locationID, {
            mode: 'cors'
        })
        .then(data => data.json())
        .then(function (data) {
            let age = 0
            data.observations.map(function (data) {
                age = age + Number(data.observation)
            })
            let node = document.createElement("h5");
            let textnode = document.createTextNode(age);
            node.appendChild(textnode);
            document.getElementById("femalePop").appendChild(node);
        })

    fetch(host + "/v1/datasets/" + datasetID + "/editions/time-series/versions/2/observations?time=2016&age=*&sex=1&geography=" + locationID, {
            mode: 'cors'
        })
        .then(data => data.json())
        .then(function (data) {
            let age = 0
            data.observations.map(function (data) {
                age = age + Number(data.observation)
            })
            let node = document.createElement("h5");
            let textnode = document.createTextNode(age);
            node.appendChild(textnode);
            document.getElementById("malePop").appendChild(node);
        })

    let body = '{ "name": "sex", "options": [ "0", "1", "2" ] }, { "name": "time", "options": [ "2016" ] }, { "name": "age", "options": [ "51", "31", "7", "34", "54", "2", "66", "56", "16", "50", "26", "46", "18", "59", "81", "9", "60", "4", "42", "20", "28", "21", "11", "10", "5", "55", "82", "63", "90", "64", "73", "79", "76", "48", "23", "78", "13", "15", "27", "74", "6", "0", "47", "39", "29", "67", "52", "32", "61", "8", "45", "80", "3", "69", "12", "57", "1", "36", "88", "62", "49", "72", "86", "58", "71", "37", "87", "89", "85", "75", "35", "70", "43", "41", "84", "30", "17", "14", "33", "22", "38", "19", "83", "53", "40", "44", "68", "65", "25", "77", "24" ] }'
    linkToCMD(locationID, datasetID, body)
}

function getASHE(locationID, locationName) {
    let datasetID = 'ashe-table-8-earnings'
    let node = document.createElement("b");
    let textnode = document.createTextNode(locationName + " (2016)");
    node.appendChild(textnode);
    document.getElementById("ashePlace").appendChild(node);
    fetch(host + "/v1/datasets/" + datasetID + "/editions/time-series/versions/1/observations?Time=2016&Earnings=annual-pay-gross&Sex=all&Workingpattern=all&Statistics=median&Geography=" + locationID, {
            mode: 'cors'
        })
        .then(data => data.json())
        .then(function (data) {
            if (data.observations["0"].observation == "") {
                value = data.observations["0"].metadata["Data marking"]
            } else {
                value = "£" + data.observations["0"].observation
            }
            let node = document.createElement("h5");
            let textnode = document.createTextNode(value + " (+/- " + data.observations["0"].metadata["Coefficient of variation"] + "%)");
            node.appendChild(textnode);
            document.getElementById("totalEarnings").appendChild(node);

        })

    fetch(host + "/v1/datasets/" + datasetID + "/editions/time-series/versions/1/observations?Time=2016&Earnings=annual-pay-gross&Sex=female&Workingpattern=all&Statistics=median&Geography=" + locationID, {
            mode: 'cors'
        })
        .then(data => data.json())
        .then(function (data) {
            if (data.observations["0"].observation == "") {
                value = data.observations["0"].metadata["Data marking"]
            } else {
                value = "£" + data.observations["0"].observation
            }
            let node = document.createElement("h5");
            let textnode = document.createTextNode(value + " (+/- " + data.observations["0"].metadata["Coefficient of variation"] + "%)");
            node.appendChild(textnode);
            document.getElementById("femaleEarnings").appendChild(node);
        })

    fetch(host + "/v1/datasets/" + datasetID + "/editions/time-series/versions/1/observations?Time=2016&Earnings=annual-pay-gross&Sex=male&Workingpattern=all&Statistics=median&Geography=" + locationID, {
            mode: 'cors'
        })
        .then(data => data.json())
        .then(function (data) {
            if (data.observations["0"].observation == "") {
                value = data.observations["0"].metadata["Data marking"]
            } else {
                value = "£" + data.observations["0"].observation
            }
            let node = document.createElement("h5");
            let textnode = document.createTextNode(value + " (+/- " + data.observations["0"].metadata["Coefficient of variation"] + "%)");
            node.appendChild(textnode);
            document.getElementById("maleEarnings").appendChild(node);

        })
    let body = '{"name": "earnings", "options": [ "annual-pay-gross" ] }, { "name": "sex", "options": [ "all", "female", "male" ] }, {"name": "statistics", "options": [ "median" ] }, { "name": "time", "options": [ "2016" ] }, { "name": "workingpattern", "options": [ "all" ] }'

    linkToCMD(locationID, datasetID, body)
}