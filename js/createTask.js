// Error message
const errorMessageID = document.getElementById("ErrorMessages");
let errorMessage ="";

const AddTaskContainer = document.getElementById("AddTaskContainer");
const CreateCancelled = document.getElementById("CreateCancelled");
const confirmAddTask = document.getElementById("confirmAddTask");
const AddTask = document.getElementById("addTask");

// Create task inputs
const titleInput = document.getElementById("label");
const descriptionInput = document.getElementById("description");


let newTask = ""


// Collect "AddForm" data on submit
document.getElementById("AddForm").addEventListener("submit", (event) => {
    // // Prevent on submit reload
    event.preventDefault();

    // Retreive the inputs values
    let formLabel = titleInput.value.trim();
    let formDescription = descriptionInput.value.trim();

    // Prepare the object that will be sent to the back-end
    // let newTask = "";
    newTask = {
        label: formLabel,
        description: formDescription,
        start_date: myDate
    }

    createTask(newTask)
})


// Sending the data to the back-end
function createTask(task) {
    fetch(`${url}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
        .then(response => {
            errorMessage = "";
            if (response.status === 201) {
                // Task creation is successful, remove error message and inputs value
                errorMessage = "";
                titleInput.value = "";
                descriptionInput.value = "";

                // Call the back the fetch function, hide the tasks creation container
                fetchTasks();
                AddTaskContainer.classList.add("hidden")

                // Display a small banner on top to confirm task creation
                taskAddedSuccessful();
                console.log('Task created successfully');

            } else if (response.status === 400) {
                errorMessage += "Champs 'Titre' requis";
                console.log('Bad request');
            } else if (response.status === 409) {
                errorMessage += "Ce 'Titre' existe déjà";
                console.log('Task already exists');
            } else {
                errorMessage += "Problème de serveur, veuillez réessayer ultérieurement";
                throw new Error('Internal server error');
            }
                errorMessageID.innerHTML = errorMessage
        })
        .catch(error => console.error('Error:', error));
}

// Revome the Add task window when user click somewhere else
document.addEventListener("click", (event) => {
    const insideClick = AddTaskContainer.contains(event.target)

    if (!insideClick && !event.target.matches('[id="addTask"]')) {
        AddTaskContainer.classList.add("hidden");
    }
});

// Remove the Add task window when user click on "Annuler" button
CreateCancelled.addEventListener("click", () => {
    AddTaskContainer.classList.add("hidden")
});

// Show the Add task window when user click on the "Ajouter une tâche" button
AddTask.addEventListener("click", () => {
    AddTaskContainer.classList.remove("hidden")
});

// Display success message
function taskAddedSuccessful() {
    const taskAddedContainer = document.getElementById("TaskAddSuccess");
    taskAddedContainer.classList.remove('opacity');

    setTimeout(() => {
        taskAddedContainer.classList.add('opacity');
    }, 1500)
}
