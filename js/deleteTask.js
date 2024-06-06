// Get all delete element
const deleteContainer = document.getElementById("DeleteContainer");
const deleteConfirm = document.getElementById("DoNotAskAgain");
const deleteButton = document.getElementById("DeleteConfirmed");
const deleteCancelled = document.getElementById("DeleteCancelled");

// Delete without confirmation is false untill the user check "do not ask again"
let stopDeleteConfirmation = false;

// On click of the le delete button, retreive the id and Label
let selectedDelete = "";

// Function will be launched after fetching the data
function launchDeleteListerner() {
    const deleteClicks = document.querySelectorAll('[id^="delete_"]');

    deleteClicks.forEach((target) => {
        target.addEventListener("click", (event) => {
            event.preventDefault();

            // Separate the id to retreive the label
            selectedDelete = target.id.split('_')[1];

            // If "stopDeleteConfirmation" is not checked, show the delete container otherwise delete the task
            if (!stopDeleteConfirmation) {
                deleteContainer.classList.remove("hidden");
            }
            else {
                deleteTask(selectedDelete);
                selectedDelete = "";
            }

        })
    })
};

// If user click outside the container or not on the "ajouter une tâche" button, hide the add task container
document.addEventListener("click", (event) => {
    const insideClick = deleteContainer.contains(event.target)

    if (!insideClick && !event.target.matches('[id^="delete_"]')) {
        deleteContainer.classList.add("hidden");
        selectedDelete = "";
    }
});

// If user click on the cancel button, hide the add task container
deleteCancelled.addEventListener("click", (event) => {
    event.preventDefault();
    deleteContainer.classList.add("hidden");
    selectedDelete = "";
});

// Listenning to the "stopDeleteConfirmation" checkbox
deleteConfirm.addEventListener("change", () => {
    if (deleteConfirm.checked) {
        stopDeleteConfirmation = true;
    }
});

// On load, the "stopDeleteConfirmation" checkbox is always false
document.addEventListener("DOMContentLoaded", () => {
    deleteConfirm.checked = false;
});

// Delete task with the label we retreived
function deleteTask(label) {
    fetch(`${url}/tasks/${label}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.status === 200) {
                console.log('Successful operation');
                fetchTasks();
            } else if (response.status === 404) {
                console.log('Task not found');
            } else {
                throw new Error('Internal server error');
            }
        })
        .catch(error => console.error('Error:', error));
}

// Delete the task when the delete button is clicked
deleteButton.addEventListener("click", () => {
    deleteTask(selectedDelete);
    deleteContainer.classList.add("hidden");
    selectedDelete = "";
})