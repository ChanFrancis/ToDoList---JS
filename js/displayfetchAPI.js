// URL for the back-end
const url = "http://127.0.0.1:9000/v1";

// Get element to display the fetched content
const tasksListID = document.getElementById("ToDoList");

// Saving all tasks fetched
let AllTasks = [];
// Saving the content that will be displayed
let displayTasksList = "";

// Get elements from the nabvar
const todoTaskRadio = document.getElementById("todoTask");
const allTasksRadio = document.getElementById("allTasks");
const finishedTasksRadio = document.getElementById("finishedTasks");

// Dernier filter
let lastPage = ""


// Fetch all tasks and display the content on "tasksListID"
function fetchTasks() {
    displayTasksList = ""
    fetch(`${url}/tasks`)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 204) {
                console.log('List empty.');

            } else {
                throw new Error('Internal server error');
            }
        })
        .then(data => {
            // Exit the function if data is null
            if (!data) {
                AllTasks = "";
                displayTasksList = "<div class='emptyData'>Aucune tâche enregistrée.</div>"
                return tasksListID.innerHTML = displayTasksList
            }

            // Sort the data by "start_date" before saving it
            data = data.sort((a, b) => {
                return new Date(a.start_date) - new Date(b.start_date);
            })

            // Saving data that will be used by the displaying functions
            AllTasks = data;

            // Display tasks based of the last filter checked
            switch (lastPage) {
                case "ongoing":
                    DisplayOnGoingTasks();
                    break;
                case "all":
                    DisplayAllTasks()
                    break;
                case "finished":
                    DisplayFinishedTasks()
                    break;
                default:
                    console.log("Issue with the switch case");
            }
        })
        .catch(error => console.error('Error:', error));
}

// Lauching the fetch function
fetchTasks();


// Fisrt nav content, displaying only remaining ongoing tasks
function DisplayOnGoingTasks() {
    // If "AllTasks" is empty, display empty to do message and ignore the rest of the function
    if (AllTasks === "") {
        displayTasksList = "<div class='emptyData'>Aucune tâche à faire.</div>"
        return tasksListID.innerHTML = displayTasksList
    }

    displayTasksList = ""
    // Selecting the "AllTasks" that have all tasks objects saved in it
    AllTasks.forEach(element => {
        if (!element.end_date) {
            // printElement is a function that will return the html that have to be printed
            displayTasksList += printElement(element)
        }
    })

    // if displayTasksList is still empty, that mean we don't have any task ongoing
    if (displayTasksList === "") {
        displayTasksList = "<div class='emptyData'>Aucune tâche à faire.</div>"
        return tasksListID.innerHTML = displayTasksList
    } else {
        displayTasksList += "<div class='Title'>Tâches en cours : </div>"
    }

    tasksListID.innerHTML = displayTasksList
    launchDeleteListerner();
    launchtDoneListerner();
}


// Second nav content, displaying all tasks 
function DisplayAllTasks() {
    // If "AllTasks" is empty, display empty to do message and ignore the rest of the function
    if (AllTasks === "") {
        displayTasksList = "<div class='emptyData'>Aucune tâche enregistrée.</div>"
        return tasksListID.innerHTML = displayTasksList
    }

    displayTasksList = ""

    AllTasks.forEach(element => {
        displayTasksList += printElement(element)
    })

    displayTasksList += "<div class='Title'>Toutes les tâches : </div>"

    tasksListID.innerHTML = displayTasksList
    launchDeleteListerner();
    launchtDoneListerner();
}


// Display only the finished tasks
function DisplayFinishedTasks() {
    // If "AllTasks" is empty, display empty to do message and ignore the rest of the function
    if (AllTasks === "") {
        displayTasksList = "<div class='emptyData'>Aucune tâche terminée.</div>"
        return tasksListID.innerHTML = displayTasksList
    }

    displayTasksList = ""
    AllTasks.forEach(element => {
        if (element.end_date) {
            displayTasksList += printElement(element)
        }
    })

    // if displayTasksList is still empty, that mean we don't have any task done
    if (displayTasksList === "") {
        displayTasksList = "<div class='emptyData'>Aucune tâche terminée.</div>"
        return tasksListID.innerHTML = displayTasksList
    } else {
        displayTasksList += "<div class='Title'>Tâches terminées : </div>"
    }

    tasksListID.innerHTML = displayTasksList
    launchDeleteListerner();
    launchtDoneListerner();
}


// Print out the content based of the checked nav radio
// if the screen size is medium/small, remove nav .active when selecting a filter or research 
todoTaskRadio.addEventListener("change", () => {
    if (todoTaskRadio.checked) {
        DisplayOnGoingTasks()
        lastPage = "ongoing";
        nav.classList.remove("active");
    }
});

allTasksRadio.addEventListener("change", () => {
    if (allTasksRadio.checked) {
        DisplayAllTasks()
        lastPage = "all";
        nav.classList.remove("active");
    }
});

finishedTasksRadio.addEventListener("change", () => {
    if (finishedTasksRadio.checked) {
        DisplayFinishedTasks()
        lastPage = "finished";
        nav.classList.remove("active");
    }
});

// On load, always checked the first radio from the navbar
document.addEventListener("DOMContentLoaded", () => {
    todoTaskRadio.checked = true
    lastPage = "ongoing"
})
