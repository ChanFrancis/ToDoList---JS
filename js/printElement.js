// Function that will return the content to print
function printElement(data) {
    let print = ""
     
    // Picking start date and dismantle the content
    let StartDate = data.start_date.split("T")
    let StartTime = StartDate[1].split(":").slice(0, 2)
    let endDateDiv = ""
    
    // If object have "end_date", saving the date and hour to print out later
        if (data.end_date) {
            let EndDate = data.end_date.split("T");
            let EndTime = EndDate[1].split(":").slice(0, 2);
            endDateDiv += `<div class='todoFinishedList'>Tâche terminée :<br> ${EndDate[0]} à ${EndTime[0]}h${EndTime[1]}.</div>`;
        }
    
    print += `
        <div class='todoCard'>
            <div class='todoDateDelete'>
                <div> ${StartDate[0]} <br> ${StartTime[0]}h${StartTime[1]} </div>
                <div id='delete_${data.label}'> × </div>
            </div>
        
        <h2 class='todoTitle'> ${data.label} </h2>
        <div class='todoDescrip'> ${data.description} </div>`

    // Based on situation, print out the validation button or finished date
    if (!data.end_date) {
        print += `<button id='done_${data.label}' class='todoDone'>Terminé</button></div>`
    }
    else {
        print += endDateDiv + `</div>`
    }


    return print
}