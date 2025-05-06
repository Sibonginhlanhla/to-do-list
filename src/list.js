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