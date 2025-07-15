import { updateLocalStorage, reloadFromStorage } from "./index";

class Item {
    constructor(title, description, dueDate, priority, checked = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = checked;
    }
}

function addProject(name) {
    const myProjects = JSON.parse(localStorage.getItem("myProjects")) || [];
    myProjects.push({ name, arr: [] });
    localStorage.setItem("myProjects", JSON.stringify(myProjects));
}

function addItem(projectName, item) {
    const myProjects = JSON.parse(localStorage.getItem("myProjects")) || [];
    const project = myProjects.find(p => p.name === projectName);
    if (project) {
        project.arr.push(item);
        localStorage.setItem("myProjects", JSON.stringify(myProjects));
    }
}

function renderItems(item, table) {
    const row = document.createElement("tr");

    // Set priority text color
    const priorityColor = item.priority === "High" ? "red" : "green";

    // Dim row if completed
    if (item.checked) {
        row.style.backgroundColor = "#444";
        row.style.opacity = "0.6";
    }

    row.innerHTML = `
        <td>${item.title}</td>
        <td>${item.description}</td>
        <td>${item.dueDate}</td>
        <td style="color:${priorityColor}; font-weight:bold">${item.priority}</td>
        <td><input type="checkbox" ${item.checked ? "checked" : ""}></td>
        <td><button class="delete-btn">X</button></td>
    `;

    // Checkbox toggle
    const checkbox = row.querySelector("input[type=checkbox]");
    checkbox.addEventListener("change", () => {
        item.checked = checkbox.checked;

        // Update live memory data
        const myProjects = JSON.parse(localStorage.getItem("myProjects"));
        for (const project of myProjects) {
            const match = project.arr.find(i =>
                i.title === item.title &&
                i.description === item.description &&
                i.dueDate === item.dueDate
            );
            if (match) {
                match.checked = item.checked;
                break;
            }
        }

        updateLocalStorage();

        if (item.checked) {
            row.style.backgroundColor = "#444";
            row.style.opacity = "0.6";
        } else {
            row.style.backgroundColor = "";
            row.style.opacity = "1";
        }
    });

    // Delete logic
    row.querySelector(".delete-btn").addEventListener("click", () => {
        const myProjects = JSON.parse(localStorage.getItem("myProjects"));
        for (const project of myProjects) {
            const index = project.arr.findIndex(i =>
                i.title === item.title &&
                i.description === item.description &&
                i.dueDate === item.dueDate
            );
            if (index !== -1) {
                project.arr.splice(index, 1);
                break;
            }
        }

        localStorage.setItem("myProjects", JSON.stringify(myProjects));
        reloadFromStorage(); 
        updateLocalStorage();
        row.remove(); 
    });


    table.appendChild(row);
}


function updateItemCheckedState(updatedItem) {
    const myProjects = JSON.parse(localStorage.getItem("myProjects")) || [];
    for (let project of myProjects) {
        const match = project.arr.find(item =>
            item.title === updatedItem.title &&
            item.description === updatedItem.description &&
            item.dueDate === updatedItem.dueDate
        );
        if (match) {
            match.checked = updatedItem.checked;
            break;
        }
    }
    localStorage.setItem("myProjects", JSON.stringify(myProjects));
}

function removeItem(itemToRemove) {
    const myProjects = JSON.parse(localStorage.getItem("myProjects")) || [];

    for (let project of myProjects) {
        const index = project.arr.findIndex(item =>
            item.title === itemToRemove.title &&
            item.description === itemToRemove.description &&
            item.dueDate === itemToRemove.dueDate
        );
        if (index !== -1) {
            project.arr.splice(index, 1);
            break;
        }
    }

    localStorage.setItem("myProjects", JSON.stringify(myProjects));
}

export { renderItems, addItem, addProject, Item };


/*
import {updateLocalStorage} from "./index.js";

function Item(title, description, dueDate, priority, checked = false) {
    if (!new.target)throw Error("add new keyword to create");
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checked = checked;
}

function addItem(name, obj){
    const projects = JSON.parse(localStorage.getItem("myProjects"));
    for (let i in projects){
        if (i.name === name){
            i.arr.push(obj);
            break;
        }
    }
    localStorage.setItem("myProjects", JSON.stringify(projects));
}

function addProject(x){
    const projects = JSON.parse(localStorage.getItem("myProjects"));
    projects.push({name: x, arr: []});
    localStorage.setItem("myProjects", JSON.stringify(projects));
}

function renderItems(obj, table){
    const row = document.createElement("tr");
    const cellOne = document.createElement("td");
    const cellTwo = document.createElement("td");
    const cellThree = document.createElement("td");
    const cellFour = document.createElement("td");
    const cellFive = document.createElement("td");
    const cellSix = document.createElement("td");

    const checkbox = document.createElement("input"); 
    checkbox.type = "checkbox"; 
    checkbox.checked = obj.checked;

    const button = document.createElement("button");
    button.textContent = "remove";

    button.addEventListener("click", () => {
        const projects = JSON.parse(localStorage.getItem("myProjects"));
        
        for (let i of projects){
            for (let j in i.arr){
                if (i.arr[j].title === obj.title){
                    i.arr.splice(j, 1);
                    break;
                }
            }
        }
        localStorage.setItem("myProjects", JSON.stringify(projects));
        updateLocalStorage();
        row.remove(); 
    });

    checkbox.addEventListener("change", () => {
        obj.checked = checkbox.checked;
        row.style.backgroundColor = checkbox.checked ? "green" : "grey";

        const projects = JSON.parse(localStorage.getItem("myProjects"));
        
        for (let i of projects){
            for (let j of i.arr){
                if (j.title === obj.title){
                    j.checked = checkbox.checked;
                    break;
                }
            }
        }
        localStorage.setItem("myProjects", JSON.stringify(projects));
    });
    
    row.style.backgroundColor = checkbox.checked ? "green" : "grey";

    cellSix.appendChild(button);
    cellFive.appendChild(checkbox);
    cellOne.textContent = obj.title;
    cellTwo.textContent = obj.description;
    cellThree.textContent = obj.dueDate;
    cellFour.textContent = obj.priority;
    if (obj.priority == "High")cellFour.style.backgroundColor = "red";
    row.appendChild(cellOne);
    row.appendChild(cellTwo);
    row.appendChild(cellThree);
    row.appendChild(cellFour);
    row.appendChild(cellFive);
    row.appendChild(cellSix);
    table.appendChild(row);
}

export {renderItems, addItem, addProject, Item}
*/