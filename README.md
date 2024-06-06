# ToDoList-JS
Développement d'un To Do list sous JS avec un back-end OpenAPI exécutable.
<br/>
Afin d'utiliser cette To Do list, il faut lancer l'éxécutable "todolist_windows_amd64.exe" qui se situe dans le fichier API. Cela permettra de réaliser le CRUD avec l'application.
<br/><br/>
<h3>Cette application permet : </h3>
<li>d'enregistrer des tâches à réaliser</li>
<li>de supprimer des tâches enregistrées</li>
<li>de mettre à jour les tâches lorsqu'elles sont terminées</li>
<li>de visualiser les tâches par : Tâches en cours, toutes les tâches ou tâches terminées</li>
<li>de rechercher une ou plusieurs tâches par mot clef ou par date.</li>
<br/>

<h3>Les fichiers JS :</h3>
<li>date.js - Mise en forme de la date en format toISOString avec le bon UTC</li>
<li>displayfetchAPI.js - Fetch les tâches enregistrées dans notre database et les diffuser sur notre fichier index.html (local host 9000)</li>
<li>deleteTask.js - Surppime les tâches au click. Pour la suppression, la fonction à besoin de prendre le titre de la tâche (id du back-end)</li>
<li>taskDone.js - Enregistrer la date de fin lorsqu'une tâche est terminée  </li>
<li>createTask.js - Création d'une tâche. <br/>- Le titre de la tâche ne doit pas inclure des caratères spéciaux et doit être unique.<br/>- A la création d'une tâche, un message de confirmation apparaît pendant un petit moment. </li>
<li>searchTasks.js - Permet de recherche une ou plusieurs tâche par date ou par mot clef.</li>
<li>printElement.js - Fonction permettant de transformer un objet vers le format "card" qui sera intégrer dans le html par la suite (cette fonrtion prend un objet comme paramètre ayant "start_date", "label" et "description" au minimum). </li>
<li>responsive.js - Ajoute ou supprime des class pour une affichage responsive avec le CSS.</li>
<br/>

![image](https://github.com/ChanFrancis/ToDoList-JS/assets/108381402/e279a704-5186-4150-8f80-4fc54ede836b)
