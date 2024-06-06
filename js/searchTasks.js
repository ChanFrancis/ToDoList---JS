// Get all search element
const SearchForm = document.getElementById("navForm");
const searchBar = document.getElementById("searchBar");
const searchDate = document.getElementById("searchDate");
const searchSubmit = document.getElementById("searchSubmit");
const searchDescription = document.getElementById("searchDescription");

// Get all radio element 
const RadioSearchByKeyWord = document.getElementById("searchByKeyWord");
const RadiotSearchByDate = document.getElementById("searchByDate");

// Search result that will be printed out afterward 
let searchResult = "";

// Get right container id 
const rightPageContainer = document.getElementById("pageContent");


// Collect "AddForm" data on submit
document.getElementById("searchSubmit").addEventListener("click", (event) => {
    // Prevent on submit reload
    event.preventDefault();

    // Retreive the inputs values
    let TaskKeyWord = searchBar.value;
    let TaskDate = searchDate.value;

    // Search for the keyword in priority, then check the date if there is no keyword
    if (TaskKeyWord !== "") {
        getTask(TaskKeyWord)
    } else if (TaskDate !=="") {
        getTaskByDate(TaskDate);
    }
    else {
        searchResult = "<div class='searchResult'> Recherche invalide. Veuillez remplir le champ des mots clefs ou selectionner une date.</div>";
        tasksListID.innerHTML = searchResult
    }

    // If screen size is medium/small, remove the "active" class from the nav
    nav.classList.remove("active");
})

// Fetching content by keyword
function getTask(label) {
    searchResult = "";
    AllTasks.forEach(data => {

        // Isolating the date to compare it to the search date
        let titleCheckMatches = data.label.includes(label)

        if (titleCheckMatches) {
            searchResult += printElement(data)
        }

    })

    if(searchResult) {
        searchResult += "<div class='searchResult'> Résultat de recherche '"+ label +"' : </div>" 
    } else {
        searchResult = "<div class='searchResult'> Aucun résultat trouvé avec le mot '"+ label +"'.</div>" 
    }

    tasksListID.innerHTML = searchResult
    launchDeleteListerner();
    launchtDoneListerner();
}


// Looking for tasks by date
function getTaskByDate(date) {
    searchResult = "";
    AllTasks.forEach(data => {

        // Isolating the date to compare it to the search date
        let formatStartDate = data.start_date.split("T")[0]

        if (formatStartDate === date) {
            searchResult += printElement(data)
        }

    })

    if(searchResult) {
        searchResult += "<div class='searchResult'> Résultat de recherche '"+ date +"' : </div>" 
    } else {
        searchResult = "<div class='searchResult'> Aucun résultat trouvé avec la date '"+ date +"'.</div>" 
    }

    tasksListID.innerHTML = searchResult
    launchDeleteListerner();
    launchtDoneListerner();
}

// Showing search type based of checked radio
// On DOM load, check search by key word
document.addEventListener("DOMContentLoaded", () => {
    RadioSearchByKeyWord.checked = true;
    searchBar.classList.add('active')
})

/*
When key word radio is checked, 
add 'active' class to the radio and remove 'active' class or any value from the date radio
*/
RadioSearchByKeyWord.addEventListener("change", ()=> {
    if(RadioSearchByKeyWord.checked){
        searchBar.classList.add('active');
        searchDate.classList.remove('active');
        searchDate.value= "";
    } 
})

/*
When date radio is checked, 
add 'active' class to the radio and remove 'active' class or any value from the key word radio
*/
RadiotSearchByDate.addEventListener("change", ()=> {
    if(RadiotSearchByDate.checked){
        searchDate.classList.add('active');
        searchBar.classList.remove('active');
        searchBar.value= "";
    } 
})