import "./styles.css";
import { renderItems, addItem, addProject, Item } from "./list";

function createTable(x){
    x.innerHTML = `
        <caption></caption>
        <tr>
            <th>title</th>
            <th>description</th>
            <th>dueDate</th>
            <th>priority</th>
            <th>progress</th>
            <th>remove</th>
        </tr>
    `;
    content.appendChild(x);
}

function refreshProjectOptions() {
    const projectSelect = document.querySelector("#project");
    const selectProj = document.querySelector("#projectSelect");

    projectSelect.textContent = "";
    selectProj.textContent = "";

    
    for (let project of myProjects) {
        const option1 = document.createElement("option");
        option1.value = project.name;
        option1.textContent = project.name;

        const option2 = option1.cloneNode(true);

        projectSelect.appendChild(option1);
        selectProj.appendChild(option2);
    }
}


const table = document.createElement("table");
const buttonDiv = document.querySelector("#add");

const content = document.querySelector("#content");
content.appendChild(table);

//buttons for the add div
const buttonOne = document.createElement("button");
const buttonTwo = document.createElement("button");
const buttonThree = document.createElement("button");
const buttonFour = document.createElement("button");
buttonOne.textContent = "new project";
buttonTwo.textContent = "new to-do item";
buttonThree.textContent = "select project";
buttonFour.textContent = "view projects";
buttonDiv.appendChild(buttonTwo);
buttonDiv.appendChild(buttonOne);
buttonDiv.appendChild(buttonThree);
buttonDiv.appendChild(buttonFour);

createTable(table);

function updateLocalStorage() {
    localStorage.setItem("myProjects", JSON.stringify(myProjects));
}

let myProjects = [];
const storedLibrary = localStorage.getItem("myProjects");

if (storedLibrary) {
    const parsed = JSON.parse(storedLibrary);
    myProjects = parsed.map(project => ({
        name: project.name,
        arr: project.arr.map(item =>
            new Item(item.title, item.description, item.dueDate, item.priority, item.checked)
        )
    }));
} else {
    myProjects = [
        {
            name: "Campus Safety App",
            arr: [
                new Item("Finalize emergency alert API", "Complete testing for real-time alerts", "02/05", "High", false),
                new Item("Style profile page", "Center profile image and add 'Edit Image' button", "03/05", "Medium", false)
            ]
        },
        {
            name: "Portfolio Website",
            arr: [
                new Item("Refactor animation loop", "Improve updateFrame logic for cart and wheel", "04/05", "Low", false)
            ]
        },
        {
            name: "Shell Program",
            arr: [
                new Item("Fix path handling", "Ensure /bin/ and added paths persist correctly", "05/05", "High", false),
                new Item("Implement & operator", "Allow parallel command execution using fork()", "06/05", "High", false)
            ]
        }
    ];

    localStorage.setItem("myProjects", JSON.stringify(myProjects));
}

const cap = document.querySelector("caption");
cap.textContent = "def";
cap.style.color = "black";
cap.style.fontSize = "47px";

for (let i of myProjects){
    if (i.name === "def"){
        for (let j of i.arr)renderItems(j, table);
    }
}

const selectDialog = document.createElement("dialog");

selectDialog.innerHTML = `
    <form method="dialog">
        <div class="form-element">
            <label for="projectSelect">Select Project</label>
            <select name="projectSelect" id="projectSelect"></select>
        </div>
        <div>
            <button value="cancel" id="cancelSelectBtn">Cancel</button>
            <button value="default" id="confirmSelectBtn">Confirm</button>
        </div>
    </form>
`;

document.body.appendChild(selectDialog);

const newProjectDialog = document.createElement("dialog");

newProjectDialog.innerHTML = `
  <form method="dialog">
    <div class="form-element">
      <label for="projectName">Project Name:</label>
      <input type="text" id="projectName" name="projectName">
    </div>
    <div>
      <button value="cancel" id="cancelProjectBtn">Cancel</button>
      <button value="default" id="confirmProjectBtn">Confirm</button>
    </div>
  </form>
`;

document.body.appendChild(newProjectDialog);

const dialog = document.createElement("dialog");
dialog.innerHTML = `
<form method="dialog">
    <div class="form-element">
        <label for="title">Title</label>
        <input type="text" id="title" name="title">
    </div>
    <div class="form-element">
        <label for="desc">Description:</label>
        <input type="text" id="desc" name="desc">
    </div>
    <div class="form-element">
        <label for="date">Due Date:</label>
        <input type="date" id="date" name="date">
    </div>
    <div class="form-element">
        <label for="priority">Priority:</label>
        <select name="priority" id="priority">
            <option value="High">High</option>
            <option value="Low">Low</option>
        </select>
    </div>
    <div class="form-element">
        <label for="project">Select Project:</label>
        <select name="project" id="project"></select>
    </div>

    <div>
        <button value="cancel" id="cancelBtn">Cancel</button>
        <button value="default" id="confirmBtn">Confirm</button>
    </div>
</form>
`;

document.body.appendChild(dialog);

//add project options in the appropriate forms (select project and add new items forms)
const select = document.querySelector("#project");
const selectProj = document.querySelector("#projectSelect");
for (let project of myProjects){
    const option = document.createElement("option");
    option.value = project.name;
    option.textContent = project.name;
    
    if (project.name === "def") {
        option.selected = true;
    }
    selectProj.appendChild(option);
    select.appendChild(option.cloneNode(true));
}

//forms elements
const cancelSelectBtn = document.querySelector("#cancelSelectBtn");
const confirmSelectBtn = document.querySelector("#confirmSelectBtn")
const confirmBtn = document.querySelector("#confirmBtn");
const closeButton = document.querySelector("#cancelBtn");
const confirmProjectBtn = document.querySelector("#confirmProjectBtn");
const cancelProjectBtn = document.querySelector("#cancelProjectBtn")
const title = document.querySelector("#title");
const description = document.querySelector("#desc");
const dueDate = document.querySelector("#date");
const selectEl = document.querySelector("#priority");
const newProject = document.querySelector("#projectName");
const selProj = document.querySelector("#projectSelect");

buttonOne.addEventListener("click", () => {
    newProjectDialog.showModal();
});

buttonTwo.addEventListener("click", () => {
    //console.log(myProjects);
    dialog.showModal();
});

buttonThree.addEventListener("click", () => {
    selectDialog.showModal();
});

buttonFour.addEventListener("click", () => {
    content.textContent = "";
    
    const h1 = document.createElement("h1");
    h1.textContent = "My Projects";
    content.appendChild(h1);

    myProjects.forEach((project, index) => {
        const projectCard = document.createElement("div");
        projectCard.className = "project-card";

        const title = document.createElement("h2");
        title.textContent = project.name;

        const summary = document.createElement("p");
        summary.textContent = `Items: ${project.arr.length}`;

        // Optional: Show a few items
        const itemList = document.createElement("ul");
        for (let i = 0; i < Math.min(project.arr.length, 3); i++) {
            const li = document.createElement("li");
            li.textContent = `${project.arr[i].title} - ${project.arr[i].dueDate}`;
            itemList.appendChild(li);
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete Project";
        deleteBtn.addEventListener("click", () => {
            if (confirm(`Are you sure you want to delete "${project.name}"?`)) {
                myProjects.splice(index, 1);
                updateLocalStorage();
                refreshProjectOptions();
                buttonFour.click(); 
            }
        });

        projectCard.appendChild(title);
        projectCard.appendChild(summary);
        if (project.arr.length > 0) {
            projectCard.appendChild(itemList);
        }
        projectCard.appendChild(deleteBtn);
        content.appendChild(projectCard);
    });
});


confirmProjectBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addProject(newProject.value);
    alert("new project added succsesfully!")
    
    refreshProjectOptions();

    newProjectDialog.close();

    newProject.value = "";
});

cancelProjectBtn.addEventListener("click", () => {
    newProjectDialog.close();
});

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault(); 
    
    const newItem = new Item(
        title.value,
        description.value,
        dueDate.value,
        selectEl.value, 
    );
    
    for (let i of myProjects)if (i.name === select.value)i.arr.push(newItem);
    
    updateLocalStorage();
    alert("new item added succsesfully!")
    console.log(JSON.parse(localStorage.getItem("myProjects")));
    
    title.value = "";
    description.value = "";
    dueDate.value = "";
    selectEl.value = "High";

    dialog.close();
    
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

confirmSelectBtn.addEventListener("click", (event) => {
    event.preventDefault();
    
    content.textContent = "";
    const tabl = document.createElement("table");
    content.appendChild(tabl);
    createTable(tabl);
    const capt = document.querySelector("caption");
    capt.textContent = selProj.value;
    capt.style.color = "black";
    capt.style.fontSize = "47px";

    for (let i of myProjects){
        if (i.name === selProj.value){
            for (let j of i.arr)renderItems(j, tabl);
        }
    }
    
    selectDialog.close();
});

cancelSelectBtn.addEventListener("click", () => {
    selectDialog.close();
});
 
export {updateLocalStorage};
