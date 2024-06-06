// Function that will be launched after fetching data
// Listening to all "Terminé" button. When clicked, the function will register the date and save the end_date to the back-end
function launchtDoneListerner() {
    const taskDoneButtons = document.querySelectorAll(`[id^="done_"]`);

    taskDoneButtons.forEach(button => {

        button.addEventListener("click", () => {
            const buttonLabel = button.id.split('_')[1];
            let date = {
                end_date: myDate
            }
            updateTask(buttonLabel, date);
        })
    })
}

// Saving the end_date (task done date) to the back-end
function updateTask(label, updateTask) {
    fetch(`${url}/tasks/${label}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateTask)
    })
        .then(response => {
            if (response.status === 200) {
                fetchTasks();
                console.log('Updated');
            } else if (response.status === 404) {
                console.log('Not Found');
            } else if (response.status === 400) {
                console.log('Bad request');
            } else {
                throw new Error('Internal server error');
            }
        })
        .catch(error => console.error('Error:', error));
}

