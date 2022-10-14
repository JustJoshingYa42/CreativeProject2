const addedFacts = new Set()

document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();
    const numActivities = document.getElementById("activityNum").value;
    if (numActivities == "") {
        return;   
    }
    
    const category = document.getElementById("typeSubmit").value;
    if (category == ""){
        return;
    }
    
    let url ="";
    
    if (category != "any") {
        url = "https://www.boredapi.com/api/activity?type=" + category;
    }
    else {
        url = "https://www.boredapi.com/api/activity"
    }
    
    
    const factResults = document.getElementById("factResults");
    const factContainer = document.createElement("div");
    factContainer.classList.add("factContainer");

    for (let i = 0; i < numActivities; i++) {
        loadNewFact(url, factResults, addedFacts)
    }
    
});


async function getRequest(url) {
    const resp = await fetch(url);
    let data = resp.json()
    return data;
    
}

async function loadNewFact(url, docObject, mySet) {
    try {
        let data = await getRequest(url);
        const factObject = document.createElement("div");
        factObject.classList.add("factObject");
        
        let n = 0;
        
        while (mySet.has(data.activity && n < 5)) {
            data = await getRequest(url);
            n++;
        }
        
        if (n == 5) {
            return;
        }
        
        mySet.add(data.activity);
        factObject.innerHTML = data.activity;
        docObject.appendChild(factObject);
        
    }
    catch(e) {
        console.log(e.message)
    }
}
