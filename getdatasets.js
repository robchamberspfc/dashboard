
function getDatasets(locationID) {
    document.getElementById("hiddenDatasets").style.display = ""
    let domain = "beta.ons.gov.uk"
    let datasetlist = "https://api." + domain
    let codelistEdition = "/v1/code-lists/local-authority/editions/2016/codes/"
    //use dataset id to call the dataset api
    fetch(datasetlist + codelistEdition + locationID + "/datasets", {
            mode: 'cors'
        })
        .then(data => data.json())
        .then(function (data) {
            data.items.map(function (data) {
            // console.log(data)
            let datasetAPI = data.editions["0"].links.latest_version.href
            // console.log(datasetAPI)
            // datasetURI = datasetAPI.split("/v1")[1]
            // console.log(datasetURI)
            // datasetWeb = "https://" + domain + datasetURI
            // console.log(datasetWeb)

            fetch(datasetAPI + "/metadata", {
                mode: 'cors'
            })
            .then(data => data.json())
            .then(function (data) {
                console.log(data)
                let datasetAPI = data.links.version.href
                // console.log(datasetAPI)
                datasetURI = datasetAPI.split("/v1")[1]
                // console.log(datasetURI)
                datasetWeb = "https://" + domain + datasetURI

                datasetName = data.title
                console.log (datasetName)
                let h5 = document.createElement("h5")
                let node = document.createElement("a"); // Create a <h1> node
                let textnode = document.createTextNode(datasetName); // Create a text node
                node.title = datasetName;
                node.setAttribute('href', datasetWeb) ;
                node.appendChild(textnode); // Append the text to <h1>
                h5.appendChild(node)
                document.getElementById("links-to-datasets").appendChild(h5);
                



            })



            })




        })
}



