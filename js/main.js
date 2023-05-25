$(window).bind("load", function() {

    var rpc_nodes = [
        "https://api.deathwing.me",
		"https://hive.roelandp.nl",
		"https://api.openhive.network",
		"https://rpc.ausbit.dev",
		"https://hived.emre.sh",
		"https://hive-api.arcange.eu",
		"https://api.hive.blog",
		"https://api.c0ff33a.uk",
		"https://rpc.ecency.com",
		"https://anyx.io",
		"https://techcoderx.com",
		"https://api.hive.blue",
		"https://rpc.mahdiyari.info"
    ];

    var he_rpc_nodes = [
        "https://engine.rishipanthee.com", 
		"https://ha.herpc.dtools.dev", 
		"https://api.hive-engine.com",
		"https://api.primersion.com",
		"https://herpc.actifit.io"
    ];

    let ssc;

    var hivePriceAPI = "https://api.coingecko.com/api/v3/simple/price?ids=hive&vs_currencies=usd";
    
    async function checkHiveNodeStatus(nodeUrl, statusElement) {
        try 
        {
            const response = await axios.get(nodeUrl);
            if (response.status === 200) 
            {
                statusElement.textContent = "Working";
                statusElement.classList.remove("fail"); // Remove "fail" class if present
                statusElement.classList.add("working");
            } 
            else 
            {
                statusElement.textContent = "Fail";
                statusElement.classList.remove("working"); // Remove "working" class if present
                statusElement.classList.add("fail");
            }
        } 
        catch (error) 
        {
          statusElement.textContent = "Fail";
          statusElement.classList.remove("working"); // Remove "working" class if present
          statusElement.classList.add("fail");
        }
    };
      
    async function addHiveNodes() {
        try 
        {
            var buttonHive = document.getElementById("popup-button-hive");
            var popupHive = document.getElementById("popup-container-hive");
            const tableBody = document.querySelector("#api-list-hive tbody");
            const workingNodes = [];
            const failedNodes = [];            

            // Function to enable the button
            function enableButton() 
            {
                buttonHive.disabled = false;
            }

            // Clear the existing table body content
            tableBody.innerHTML = "";
    
            for (let i = 0; i < rpc_nodes.length; i++) 
            {
                const nodeUrl = rpc_nodes[i];
                const row = document.createElement("tr");
                const urlCell = document.createElement("td");
                const statusCell = document.createElement("td");
    
                urlCell.textContent = nodeUrl;
                urlCell.classList.add("node-url"); // add new class to url cell
                statusCell.textContent = "Checking...";
    
                row.appendChild(urlCell);
                row.appendChild(statusCell);
    
                tableBody.appendChild(row);
    
                // Check node status
                checkHiveNodeStatus(nodeUrl, statusCell);
            }
    
            // Reorder the list of nodes based on their status
            setTimeout(() => {
                const rows = Array.from(tableBody.getElementsByTagName("tr"));
    
                rows.forEach((row) => {
                    if (row.lastChild.textContent === "Working") 
                    {
                        workingNodes.push(row);
                    } 
                    else 
                    {
                        failedNodes.push(row);
                    }
                });
    
                tableBody.innerHTML = "";
    
                // Append workingNodes first, then failedNodes
                workingNodes.forEach((row) => {
                    tableBody.appendChild(row);
                });
    
                failedNodes.forEach((row) => {
                    tableBody.appendChild(row);
                });
            }, 5000);
    
            // Add event listeners to the rows in the table body
            var rowsHive = tableBody.getElementsByTagName("tr");
            for (var i = 0; i < rowsHive.length; i++) 
            {
                rowsHive[i].addEventListener("click", function (event) {
                    // Prevent the default link behavior
                    event.preventDefault();
    
                    // Get the node URL from the first cell in the row
                    var nodeUrl = this.cells[0].textContent;
    
                    // Set the API endpoint to the selected node
                    hive.api.setOptions({ url: nodeUrl });
    
                    // Update the button text
                    buttonHive.value = nodeUrl;
                    buttonHive.innerHTML = nodeUrl;
    
                    // Save the selected endpoint to local storage
                    localStorage.setItem("selectedEndpoint", nodeUrl);
    
                    // Hide the popup
                    popupHive.style.display = "none";
                    
                    enableButton();
    
                    // Reload the page after 1 second (adjust the time as needed)
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                });
            }
        } 
        catch (error) 
        {
            console.log("Error at addHiveNodes(): ", error);
        }
    };       

    async function checkEngineNodeStatus(nodeUrl, statusElement) {
        try 
        {
            const response = await axios.get(nodeUrl);
            if (response.status === 200) 
            {
                statusElement.textContent = "Working";
                statusElement.classList.remove("fail"); // Remove "fail" class if present
                statusElement.classList.add("working");
            } 
            else 
            {
                statusElement.textContent = "Fail";
                statusElement.classList.remove("working"); // Remove "working" class if present
                statusElement.classList.add("fail");
            }
        } 
        catch (error) 
        {
          statusElement.textContent = "Fail";
          statusElement.classList.remove("working"); // Remove "working" class if present
          statusElement.classList.add("fail");
        }
    };

    async function addEngineNodes() {
        try {
            var buttonEngine = document.getElementById("popup-button-engine");
            var popupEngine = document.getElementById("popup-container-engine");
            const tableBody = document.querySelector("#api-list-engine tbody");
            const workingNodes = [];
            const failedNodes = [];
    
            // Function to enable the button
            function enableButton() {
                buttonEngine.disabled = false;
            }
    
            // Clear the existing table body content
            tableBody.innerHTML = "";
    
            for (let i = 0; i < he_rpc_nodes.length; i++) 
            {
                const nodeUrl = he_rpc_nodes[i];
                const row = document.createElement("tr");
                const urlCell = document.createElement("td");
                const statusCell = document.createElement("td");
    
                urlCell.textContent = nodeUrl;
                urlCell.classList.add("node-url"); // add new class to url cell
                statusCell.textContent = "Checking...";
    
                row.appendChild(urlCell);
                row.appendChild(statusCell);
    
                tableBody.appendChild(row);
    
                // Check node status
                checkEngineNodeStatus(nodeUrl, statusCell);
            }
    
            // Reorder the list of nodes based on their status
            setTimeout(() => {
                const rows = Array.from(tableBody.getElementsByTagName("tr"));
    
                rows.forEach((row) => {
                    if (row.lastChild.textContent === "Working") {
                        workingNodes.push(row);
                    } else {
                        failedNodes.push(row);
                    }
                });
    
                tableBody.innerHTML = "";
    
                // Append workingNodes first, then failedNodes
                workingNodes.forEach((row) => {
                    tableBody.appendChild(row);
                });
    
                failedNodes.forEach((row) => {
                    tableBody.appendChild(row);
                });
            }, 5000);
    
            // Add event listeners to the rows in the table body
            var rowsEngine = tableBody.getElementsByTagName("tr");
            for (var i = 0; i < rowsEngine.length; i++) 
            {
                rowsEngine[i].addEventListener("click", function (event) {
                    // Prevent the default link behavior
                    event.preventDefault();
    
                    // Get the node URL from the first cell in the row
                    var nodeUrl = this.cells[0].textContent;
    
                    // Set the API endpoint to the selected node
                    ssc = new SSC(nodeUrl);
    
                    // Update the button text
                    buttonEngine.value = nodeUrl;
                    buttonEngine.innerHTML = nodeUrl;
    
                    // Save the selected endpoint to local storage
                    localStorage.setItem("selectedEngEndpoint", nodeUrl);
    
                    // Hide the popup
                    popupEngine.style.display = "none";
    
                    enableButton();
    
                    // Reload the page after 1 second (adjust the time as needed)
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                });
            }
        } 
        catch (error) 
        {
            console.log("Error at addEngineNodes(): ", error);
        }
    };      
    
    async function initializeHiveAPI() {
        var selectedEndpoint = await getSelectedEndpoint();
        console.log("SELECT HIVE API NODE : ", selectedEndpoint);
        hive.api.setOptions({ url: selectedEndpoint });

        var button = document.getElementById("popup-button-hive");
        button.value = selectedEndpoint;
        button.innerHTML = selectedEndpoint;
    };

    async function initializeEngineAPI() {
        var selectedEngEndpoint = await getSelectedEngEndpoint();
        console.log("SELECT ENGINE API NODE : ", selectedEngEndpoint);
        ssc = new SSC(selectedEngEndpoint);

        var button = document.getElementById("popup-button-engine");
        button.value = selectedEngEndpoint;
        button.innerHTML = selectedEngEndpoint;
    };

    async function processAPIs() {
        try 
        {              
            await initializeHiveAPI();
            await initializeEngineAPI();            
        } 
        catch (error) 
        {
            console.log("Error while processing APIs: ", error);
        }
    };
      
    processAPIs();    

    hive.config.set('alternative_api_endpoints', rpc_nodes);

    // remove unnessary parameters from url
    window.history.replaceState({}, document.title, "/" + "");

    var user = null;
    var MARKETVALUES;

    const MINHELIOS = 5;
    const MINATH = 5;

    async function processAll () {
        //getBridge();
        getSurfHistory();
        getBeeHistory();
        getPobHistory();
    };

    processAll(); 
    
    async function getBridge () {
        try
        {
            const res = await hive.api.getAccountsAsync(['uswap']);
            console.log("res : ", res);
            const res2 = await ssc.findOne("tokens", "balances", { account: 'uswap', symbol: 'SWAP.HIVE' });
            console.log("res2 : ", res2);
            $("#hive_liq").text(parseInt(res[0].balance.split(" ")[0]));
            $("#swap_liq").text(parseInt(res2.balance));
            $("#bridge").removeClass("d-none");
        }
        catch (error)
        {
            console.log("Error at getBridge : ", error);
        }
    };    

    function dec(val) {
        return Math.floor(val * 1000) / 1000;
    };

    async function getSurfHistory () {
        try
        {
            const historyRaw = await hive.api.getAccountHistoryAsync("helios.voter", -1, 100, '1', null);        

            // loop through history and create an array with only tx id, author, link and timestamp
            let history = historyRaw.map((tx) => {
                const { timestamp, op, trx_id } = tx[1];
                const { author, permlink, weight, voter } = op[1];           
                return { timestamp, author, permlink, weight, trx_id, voter };
            });

            // filter out only vote transactions with weight > 0
            history = history.filter((tx) => {
                return tx.voter == "helios.voter" && tx.weight > 0;
            });

            // fitler out only last 10 transactions
            history = history.slice(-10);

            // reverse the array so that the latest transaction is on top
            history = history.reverse();

            console.log(history);

            // loop through history and create html (author (with @), permlink (link to the post with first 10 characters), weight (in percent), timestamp string date, tx id (last 6 characters))
            history.forEach((tx) => {            
                const { timestamp, author, permlink, weight, trx_id, voter } = tx;
                const date = new Date(timestamp);
                const dateString = date.toDateString();
                const timeString = date.toLocaleTimeString();
                const txIdShort = trx_id.slice(-15);
                const permlinkShort = permlink.slice(0, 20);
                const weightPercent = weight / 100;
                const html = `
                    <tr class="table-font">
                        <td><a class="link-info" href="https://peakd.com/@${author}" target="_blank">@${author}</a></td>
                        <td><a class="link-info" href="https://peakd.com/@${author}/${permlink}" target="_blank">${permlinkShort}...</a></td>
                        <td>${weightPercent}%</td>
                        <td>${dateString} ${timeString}</td>
                        <td><a class="link-info" href="https://hiveblocks.com/tx/${trx_id}" target="_blank">${txIdShort}...</a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
                            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                        </svg>
                        </td>
                    </tr>
                `;
                $("#surfhistory").append(html);
            });

            // show history table
            $("#surfhistorycard").removeClass("d-none");
            // add flex
            $("#surfhistorycard").addClass("d-flex");
        }
        catch (error)
        {
            console.log("Error at getSurfHistory() : ", );
        }
    };

    async function getBeeHistory () {
        try
        {
            const historyRaw = await hive.api.getAccountHistoryAsync("bee.voter", -1, 100, '1', null);        

            // loop through history and create an array with only tx id, author, link and timestamp
            let history = historyRaw.map((tx) => {
                const { timestamp, op, trx_id } = tx[1];
                const { author, permlink, weight, voter } = op[1];           
                return { timestamp, author, permlink, weight, trx_id, voter };
            });

            // filter out only vote transactions with weight > 0
            history = history.filter((tx) => {
                return tx.voter == "bee.voter" && tx.weight > 0;
            });

            // fitler out only last 10 transactions
            history = history.slice(-10);

            // reverse the array so that the latest transaction is on top
            history = history.reverse();

            console.log(history);

            // loop through history and create html (author (with @), permlink (link to the post with first 10 characters), weight (in percent), timestamp string date, tx id (last 6 characters))
            history.forEach((tx) => {            
                const { timestamp, author, permlink, weight, trx_id, voter } = tx;
                const date = new Date(timestamp);
                const dateString = date.toDateString();
                const timeString = date.toLocaleTimeString();
                const txIdShort = trx_id.slice(-15);
                const permlinkShort = permlink.slice(0, 20);
                const weightPercent = weight / 100;
                const html = `
                    <tr class="table-font">
                        <td><a class="link-info" href="https://peakd.com/@${author}" target="_blank">@${author}</a></td>
                        <td><a class="link-info" href="https://peakd.com/@${author}/${permlink}" target="_blank">${permlinkShort}...</a></td>
                        <td>${weightPercent}%</td>
                        <td>${dateString} ${timeString}</td>
                        <td><a class="link-info" href="https://hiveblocks.com/tx/${trx_id}" target="_blank">${txIdShort}...</a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
                            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                        </svg>
                        </td>
                    </tr>
                `;
                $("#beehistory").append(html);
            });

            // show history table
            $("#beehistorycard").removeClass("d-none");
            // add flex
            $("#beehistorycard").addClass("d-flex");
        }
        catch (error)
        {
            console.log("Error at getBeeHistory() : ", );
        }
    };    

    async function getPobHistory () {
        try
        {
            const historyRaw = await hive.api.getAccountHistoryAsync("pob.voter", -1, 100, '1', null);        

            // loop through history and create an array with only tx id, author, link and timestamp
            let history = historyRaw.map((tx) => {
                const { timestamp, op, trx_id } = tx[1];
                const { author, permlink, weight, voter } = op[1];           
                return { timestamp, author, permlink, weight, trx_id, voter };
            });

            // filter out only vote transactions with weight > 0
            history = history.filter((tx) => {
                return tx.voter == "pob.voter" && tx.weight > 0;
            });

            // fitler out only last 10 transactions
            history = history.slice(-10);

            // reverse the array so that the latest transaction is on top
            history = history.reverse();

            console.log(history);

            // loop through history and create html (author (with @), permlink (link to the post with first 10 characters), weight (in percent), timestamp string date, tx id (last 6 characters))
            history.forEach((tx) => {            
                const { timestamp, author, permlink, weight, trx_id, voter } = tx;
                const date = new Date(timestamp);
                const dateString = date.toDateString();
                const timeString = date.toLocaleTimeString();
                const txIdShort = trx_id.slice(-15);
                const permlinkShort = permlink.slice(0, 20);
                const weightPercent = weight / 100;
                const html = `
                    <tr class="table-font">
                        <td><a class="link-info" href="https://peakd.com/@${author}" target="_blank">@${author}</a></td>
                        <td><a class="link-info" href="https://peakd.com/@${author}/${permlink}" target="_blank">${permlinkShort}...</a></td>
                        <td>${weightPercent}%</td>
                        <td>${dateString} ${timeString}</td>
                        <td><a class="link-info" href="https://hiveblocks.com/tx/${trx_id}" target="_blank">${txIdShort}...</a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
                            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                        </svg>
                        </td>
                    </tr>
                `;
                $("#pobhistory").append(html);
            });

            // show history table
            $("#pobhistorycard").removeClass("d-none");
            // add flex
            $("#pobhistorycard").addClass("d-flex");
        }
        catch (error)
        {
            console.log("Error at getPobHistory() : ", );
        }
    };    

    $(document).ready(function() { 
        clickFunctions();
        refresh(); 
        loadHiveNode();
        loadEngineNode();
        actionTriggers();
    });

    async function loadHiveNode() {
        try 
        {
            // Get a reference to the button and the popup container
            var buttonHive = document.getElementById("popup-button-hive");
            var popupHive = document.getElementById("popup-container-hive");          
    
            // Store the interval ID
            var addHiveNodesInterval;

            // Function to disable the button
            function disableButton() {
                buttonHive.disabled = true;
            }

            // Function to enable the button
            function enableButton() {
                buttonHive.disabled = false;
            }
    
            // Add an event listener to the button
            buttonHive.addEventListener("click", function () {
                // Show the popup
                popupHive.style.display = "block";
                disableButton();
                addHiveNodes();
                addHiveNodesInterval = setInterval(addHiveNodes, 60000);
            });
    
            // Get a reference to the API list table body
            var tableBodyHive = document.querySelector("#api-list-hive tbody");
    
            // Add an event listener to the close button
            var closeButtonHive = document.getElementById("close-button-hive");
            closeButtonHive.addEventListener("click", function () {
                // Hide the popup
                popupHive.style.display = "none";
                enableButton();
    
                // Clear the interval if it exists
                if (addHiveNodesInterval) 
                {
                    clearInterval(addHiveNodesInterval);
                }
    
                // Remove all rows from the table body
                tableBodyHive.innerHTML = "";
            });
    
            // Add an event listener to the table body
            tableBodyHive.addEventListener("click", function (event) {
                var target = event.target;
                if (target && target.nodeName === "TD") 
                {
                    // Get the node URL from the first cell in the row
                    var nodeUrl = target.parentNode.cells[0].textContent;
    
                    // Set the API endpoint to the selected node
                    hive.api.setOptions({ url: nodeUrl });
    
                    // Update the button text
                    buttonHive.value = nodeUrl;
                    buttonHive.innerHTML = nodeUrl;
    
                    // Save the selected endpoint to local storage
                    localStorage.setItem("selectedEndpoint", nodeUrl);
    
                    // Hide the popup
                    popupHive.style.display = "none";
                    enableButton();
    
                    // Remove all rows from the table body
                    tableBodyHive.innerHTML = "";
    
                    // Reload the page after 1 second (adjust the time as needed)
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                }
            });

            // Add an event listener to check if the popup is still open after 1 minute
            popupHive.addEventListener("transitionend", function () {
                if (popupHive.style.display === "block") 
                {
                    // Clear the interval if it exists
                    if (addHiveNodesInterval) {
                        clearInterval(addHiveNodesInterval);
                    }

                    // Update the current set of APIs
                    addHiveNodes();
                    addHiveNodesInterval = setInterval(addHiveNodes, 60000);
                }
            });
        } 
        catch (error) 
        {
            console.log("Error at loadHiveNode(): ", error);
        }
    };
    
    async function loadEngineNode() {
        try 
        {
            // Get a reference to the button and the popup container
            var buttonEngine = document.getElementById("popup-button-engine");
            var popupEngine = document.getElementById("popup-container-engine");

            // Store the interval ID
            var addEngineNodesInterval;

            // Function to disable the button
            function disableButton() 
            {
                buttonEngine.disabled = true;
            }

            // Function to enable the button
            function enableButton() 
            {
                buttonEngine.disabled = false;
            }

            // Add an event listener to the button
            buttonEngine.addEventListener("click", function () {
                // Show the popup
                popupEngine.style.display = "block";
                disableButton();
                addEngineNodes();
                addEngineNodesInterval = setInterval(addEngineNodes, 60000);
            });

            // Get a reference to the API list table body
            var tableBodyEngine = document.querySelector("#api-list-engine tbody");

            // Add an event listener to the close button
            var closeButtonEngine = document.getElementById("close-button-engine");
            closeButtonEngine.addEventListener("click", function () {
                // Hide the popup
                popupEngine.style.display = "none";
                enableButton();

                // Clear the interval if it exists
                if (addEngineNodesInterval) 
                {
                    clearInterval(addEngineNodesInterval);
                }

                // Remove all rows from the table body
                tableBodyEngine.innerHTML = "";
            });

            // Add an event listener to the table body
            tableBodyEngine.addEventListener("click", function (event) {
                var target = event.target;
                if (target && target.nodeName === "TD") 
                {
                    // Get the node URL from the first cell in the row
                    var nodeUrl = target.parentNode.cells[0].textContent;

                    // Set the API endpoint to the selected node
                    ssc = new SSC(nodeUrl);

                    // Update the button text
                    buttonEngine.value = nodeUrl;
                    buttonEngine.innerHTML = nodeUrl;

                    // Save the selected endpoint to local storage
                    localStorage.setItem("selectedEngEndpoint", nodeUrl);

                    // Hide the popup
                    popupEngine.style.display = "none";
                    enableButton();

                    // Remove all rows from the table body
                    tableBodyEngine.innerHTML = "";

                    // Reload the page after 1 second (adjust the time as needed)
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                }
            });

            // Add an event listener to check if the popup is still open after 1 minute
            popupEngine.addEventListener("transitionend", function () {
                if (popupEngine.style.display === "block") 
                {
                    // Clear the interval if it exists
                    if (addEngineNodesInterval) {
                        clearInterval(addEngineNodesInterval);
                    }

                    // Update the current set of APIs
                    addEngineNodes();
                    addEngineNodesInterval = setInterval(addEngineNodes, 60000);
                }
            });
        } 
        catch (error) 
        {
            console.log("Error at loadEngineNode(): ", error);
        }
    };

    async function getHeliosBalances (account) {
        var heliosJson = [];
        try
        {
            const res = await hive.api.getAccountsAsync([account]);
            if (res.length > 0) 
            {
                const balHelios = await getTokenBalance(account, "HELIOS");
                const marketHelios = await getMarketInfo(["HELIOS"]);                
                var hiveUSD = await getHiveUSD();                                
                
                if (balHelios.length > 0 && marketHelios.length > 0 && hiveUSD > 0) 
                {
                    var val = (parseFloat(balHelios[0].balance) * parseFloat(marketHelios[0].lastPrice)) * parseFloat(hiveUSD);
                    
                    var ddata = {
                        "heliosVal" : dec(balHelios[0].balance),
                        "hiveVal" :  parseFloat(val).toFixed(3)
                    }
                    heliosJson.push(ddata);
                    return heliosJson;
                } 
                else 
                {
                    var ddata = {
                        "heliosVal" : 0.0,
                        "hiveVal" :  0.0
                    } 
                    heliosJson.push(ddata);
                    return heliosJson;
                }
            } 
            else 
            {
                var ddata = {
                    "heliosVal" : 0.0,
                    "hiveVal" :  0.0
                } 
                heliosJson.push(ddata);
                return heliosJson;
            }
        }
        catch (error)
        {
            console.log("Error at getHeliosBalances() : ", error);
            var ddata = {
                "heliosVal" : 0.0,
                "hiveVal" :  0.0
            } 
            heliosJson.push(ddata);
            return heliosJson;
        }
    };

    async function getAthonBalances (account) {
        var athonJson = [];
        try
        {
            const res = await hive.api.getAccountsAsync([account]);
            if (res.length > 0) 
            {
                const balAthon = await getTokenBalance(account, "ATH");
                const marketAthon = await getMarketInfo(["ATH"]);
                var hiveUSD = await getHiveUSD();                                
                
                if (balAthon.length > 0 && marketAthon.length > 0 && hiveUSD > 0) 
                {
                    var val = (parseFloat(balAthon[0].balance) * parseFloat(marketAthon[0].lastPrice)) * parseFloat(hiveUSD);
                    
                    var ddata = {
                        "athonVal" : dec(balAthon[0].balance),
                        "hiveVal" :  parseFloat(val).toFixed(3)
                    }
                    athonJson.push(ddata);
                    return athonJson;
                } 
                else 
                {
                    var ddata = {
                        "athonVal" : 0.0,
                        "hiveVal" :  0.0
                    } 
                    athonJson.push(ddata);
                    return athonJson;
                }
            } 
            else 
            {
                var ddata = {
                    "athonVal" : 0.0,
                    "hiveVal" :  0.0
                } 
                athonJson.push(ddata);
                return athonJson;
            }
        }
        catch (error)
        {
            console.log("Error at getAthonBalances() : ", error);
            var ddata = {
                "athonVal" : 0.0,
                "hiveVal" :  0.0
            } 
            athonJson.push(ddata);
            return athonJson;
        }
    };   

    async function getTokenBalance (account, symbol) {
        var tokenJson = [];
        try
        {
            tokenJson = await ssc.find("tokens", "balances", { account, symbol: symbol }, 1000, 0, []);
            return tokenJson;
        }
        catch (error)
        {
            console.log("Error at getTokenBalance() : ", error);
            return tokenJson;
        }
    };

    async function getMarketInfo (symbols) {
        var marketJson = [];
        try
        {           
            marketJson = await ssc.find("market", "metrics", { symbol: { "$in": [...symbols] } }, 1000, 0, []);            
            return marketJson;
        }
        catch (error)
        {
            console.log("Error at getMarket() : ", error);
            return marketJson;
        }
    };

    async function getHiveUSD () {
        var hiveUSD = 0;
        try
        {
            const { data } = await axios.get(hivePriceAPI);
            hiveUSD = data.hive.usd;
            return hiveUSD;
        }
        catch (error)
        {
            console.log("Error at getHiveUSD() : ", error);
            return hiveUSD;
        }
    };

    async function clickFunctions () {
        try
        {
            $("#refresh").click(async function () {
                $(this).attr("disabled", true);
                await refresh();
                $(this).removeAttr("disabled");
            });

            $("#refreshSurfHistory").click(() => {
                // Empty history table with a fade-out effect
                $("#surfhistory").fadeOut(200, function() {
                    $(this).empty();
                    // Set a small timeout before executing getSurfHistory()
                    setTimeout(() => {
                        getSurfHistory();
                        // Fade-in the history table after the data is loaded
                        $("#surfhistory").fadeIn(200);
                    }, 500); // Adjust the timeout value (in milliseconds) as needed
                });
            });

            $("#refreshPobHistory").click(() => {
                // Empty history table with a fade-out effect
                $("#pobhistory").fadeOut(200, function() {
                    $(this).empty();
                    // Set a small timeout before executing getBeeHistory()
                    setTimeout(() => {
                        getPobHistory();
                        // Fade-in the history table after the data is loaded
                        $("#pobhistory").fadeIn(200);
                    }, 500); // Adjust the timeout value (in milliseconds) as needed
                });
            });

            $("#refreshBeeHistory").click(() => {
                // Empty history table with a fade-out effect
                $("#beehistory").fadeOut(200, function() {
                    $(this).empty();
                    // Set a small timeout before executing getBeeHistory()
                    setTimeout(() => {
                        getBeeHistory();
                        // Fade-in the history table after the data is loaded
                        $("#beehistory").fadeIn(200);
                    }, 500); // Adjust the timeout value (in milliseconds) as needed
                });
            });

            $("#checkbalance").click(async function() {
                try
                {
                    user = $.trim($("#username").val().toLowerCase());
                    if (user.length >= 3) {
                        $(this).attr("disabled", "true");
                        await updateBalance();
                        $(this).removeAttr("disabled");
                        localStorage['user'] = user;
                    }
                }
                catch (error)
                {
                    console.log("Error at checkbalance-Click : ", error);
                }
            });
        
        }
        catch (error)
        {
            console.log("Error at clickFunctions() : ", error);
        }
    };

    async function refresh () {
        try
        {
            var marketInfo = await getMarketInfo(["HELIOS", "ATH"]);
            var hiveUSD = await getHiveUSD();            
            if(marketInfo.length > 0)
            {
                var helios_price = 0.0, helios_value = 0.0, helios_vol = 0.0, helios_change = 0.0;            
                if(marketInfo[0].symbol == "HELIOS")
                {
                    helios_price = parseFloat(marketInfo[0].lastPrice) || 0.0;
                    helios_value = parseFloat(marketInfo[0].lastPrice * hiveUSD) || 0.0;
                    helios_vol = parseFloat(marketInfo[0].volume * hiveUSD) || 0.0;
                    helios_change = parseFloat(marketInfo[0].priceChangePercent) || 0.0;
                }

                var athon_price = 0.0, athon_value = 0.0, athon_vol = 0.0, athon_change = 0.0;            
                if(marketInfo[0].symbol == "ATH")
                {
                    athon_price = parseFloat(marketInfo[1].lastPrice) || 0.0;
                    athon_value = parseFloat(marketInfo[1].lastPrice * hiveUSD) || 0.0;
                    athon_vol = parseFloat(marketInfo[1].volume * hiveUSD) || 0.0;
                    athon_change = parseFloat(marketInfo[1].priceChangePercent) || 0.0;
                }

                $("#helios_price").text(helios_price.toFixed(3));
                $("#helios_value").text(helios_value.toFixed(3));
                $("#helios_vol").text(helios_vol.toFixed(3));
                $("#helios_change").text(helios_change.toFixed(3));
                $("#athon_price").text(athon_price.toFixed(3));
                $("#athon_value").text(athon_value.toFixed(3));
                $("#athon_vol").text(athon_vol.toFixed(3));
                $("#athon_change").text(athon_change.toFixed(3));
            }
            else
            {
                $("#helios_price").text("0.000");
                $("#helios_value").text("0.000");
                $("#helios_vol").text("0.000");
                $("#helios_change").text("0.000");
                $("#athon_price").text("0.000");
                $("#athon_value").text("0.000");
                $("#athon_vol").text("0.000");
                $("#athon_change").text("0.000");
            }
        }
        catch (error)
        {
            console.log("Error At refresh() : ", error);

            $("#helios_price").text("0.000");
            $("#helios_value").text("0.000");
            $("#helios_vol").text("0.000");
            $("#helios_change").text("0.000");
            $("#athon_price").text("0.000");
            $("#athon_value").text("0.000");
            $("#athon_vol").text("0.000");
            $("#athon_change").text("0.000");
        }
    };

    async function actionTriggers () {
        try
        {
            const postLinkField = document.getElementById("postlink");
            postLinkField.addEventListener("input", async function() {
                await postURL(postLinkField.value);
            });
        }
        catch (error)
        {
            console.log("Error at actionTriggers() : ", error);
        }
    };
    
    async function postURL (post_link) {
        try
        {            
            console.log("post_link : ", post_link);
            const author = post_link.split("@")[1].split("/")[0];
            const link = post_link.split("@")[1].split("/")[1];
            var postData = await hive.api.getContentAsync(author, link);
            if(postData != null || Object.keys(postData).length !== 0)
            {
                console.log("HERE postData : ", postData);
            }
            else
            {
                console.log("HERE NO postData : ", postData);
            }
           
            var beeTagStatus = await checkBeeTags(postData);
            if(beeTagStatus == true)
            {

            }
            
        }
        catch (error)
        {
            console.log("Error at postURL() : ", error);
        }
    };

    async function checkBeeTags (postData) {
        var validStatus = false;
        try
        {
            const json_metadata = JSON.parse(postData.json_metadata);
            console.log(json_metadata);
            if (json_metadata.tags.includes("tribes") || json_metadata.tags.includes("hive-engine")) 
            {                
                validStatus = true;
            }
            return validStatus;
        }
        catch (error)
        {
            console.log("Error at checkBeeTags() : ", error);
            return validStatus;
        }
    };

    async function updateBurn(r) {
        try 
        {
            const symbol = $("#input").val();
            const val = $("#inputquantity").val();
            const post_link = $("#post").val();

            const {
                lastPrice,
                lastDayPrice
            } = marketvalues[symbol];

            let es_val = (parseFloat(lastPrice) + parseFloat(lastDayPrice)) / 2;
            es_val *= marketvalues.HIVE;
            es_val *= val;
            es_val = dec(es_val);

            $("#es_val").text(`$ ${es_val}`);
            function isMin(val) {
                if (val >= min[symbol]) return true;
                else return false;
            }

            if (isMin(val) && bal[symbol] >= val && post_link.length > 0) 
            {
                $("#swap").removeAttr("disabled");
                if (r) r(true, parseFloat(val).toFixed(3), symbol, post_link);
            } 
            else 
            {
                $("#swap").attr("disabled", "true");
                if (r) r(false, 0, 0, comment);
            }
        } 
        catch (error) 
        {
            console.log("Error at updateBurn() : ", error);
        }
    };

    $(".s").click(function () {

        $("#input").val($(this).find(".sym").text());

        $("#inputquantity").val($(this).find(".qt").text());

        updateBurn();

    });

    $("#inputquantity").keyup(() => { updateBurn(); });

    $("#input").change(() => { updateBurn(); });

    $("#post").keyup(() => { updateBurn(); });

    async function updateBalance() {        
        var balHelios = await getHeliosBalances(user);               
        $("#helios").text(balHelios[0].heliosVal.toFixed(3));
        $("#helios_bal_value").text(balHelios[0].hiveVal);
        var balAthon = await getAthonBalances(user);        
        $("#athon").text(balAthon[0].athonVal.toFixed(3));
        $("#athon_bal_value").text(balAthon[0].hiveVal);
    };

    if (localStorage['user']) {
        $("#username").val(localStorage['user']);
        user = localStorage['user'];
        updateBalance();
    };

    async function isValid (post) {
        const valid_diffence = 18 * 60 * 60 * 1000;
        const { created } = post;
        const created_timestamp = new Date(created).getTime();
        const current_timestamp = new Date().getTime();
        const diff = current_timestamp - created_timestamp;
        if (diff > valid_diffence) 
        {
            return false;
        }
        else 
        {
            return true;
        }
    };

    $("#swap").click(async function () {

        $("#swap").attr("disabled", "true");

        $("#loading").removeClass("d-none");

        $("#status").text("Please Wait...");

        await refresh();

        await updateBalance();

        updateBurn(async function(canBurn, amount, currency, post_link) {

            if (canBurn) {

                $("#swap").attr("disabled", "true");



                let post = false;

                try {

                    const author = post_link.split("@")[1].split("/")[0];

                    const link = post_link.split("@")[1].split("/")[1];

                    post = await hive.api.getContentAsync(author, link);

                    if (!post.created) throw error;

                } catch (e) {

                    $("#status").text("Invalid Post Link");

                    $("#swap").removeAttr("disabled");

                    $("#loading").addClass("d-none");

                    return;

                }

    

                if (!post) {

                    $("#status").text("Invalid Post Link");

                    $("#swap").removeAttr("disabled");

                    $("#loading").addClass("d-none");

                    return;

                }



                if (!isValid(post)) {

                    $("#status").text("Post is older than 18 hours");

                    $("#loading").addClass("d-none");

                    $("#swap").removeAttr("disabled");

                    return;

                };



                $("#loading").addClass("d-none");

                $("#status").text(`Confirm the transaction through Keychain.`);



                try {

                    hive_keychain.requestHandshake();

                } catch (e) {

                    $("#loading").addClass("d-none");

                    $("#status").text("No method of transaction available, Install Keychain.");

                    updateBurn();

                }

                

                if (currency === "HELIOS") {

                    hive_keychain.requestSendToken(

                        user,

                        "helios.burn",

                        amount,

                        post_link,

                        currency,

                        async function (res) {

                            if (res.success === true) {

                                $("#status").text("Successfully Sent To Burn!");

                                $("#status").addClass("text-success");

                                await updateBalance();

                                updateBurn();

                            } else {

                                $("#status").text("Transaction failed, Please try again.");

                                updateBurn();

                            }

                            console.log(res);

                        }

                    );

                }

            } else {

                $("#loading").addClass("d-none");

                $("#status").text('Account balance updated, Try Again.');

                updateBurn();

            }

        });

    });
});

async function getSelectedEndpoint() {
    var endpoint = await localStorage.getItem("selectedEndpoint");
    if (endpoint) 
    {
      return endpoint;
    } 
    else 
    {
      return "https://anyx.io";
    }
};

async function getSelectedEngEndpoint() {
    var endpoint = await localStorage.getItem("selectedEngEndpoint");
    if (endpoint) 
    {
      return endpoint;
    } 
    else 
    {
      return "https://engine.rishipanthee.com";
    }
};