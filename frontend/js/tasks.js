let editingTask = null;
let modal = null;
let allTasks = [];

window.onload = () => {

    modal = new bootstrap.Modal(document.getElementById("taskModal"));

    loadTasks();

    loadProjectsDropdown();

    loadUsersDropdown();

};
async function loadProjectsDropdown(){

    const response = await fetch(API + "/projects/");

    const projects = await response.json();

    let html = '<option value="">Select Project</option>';

    projects.forEach(project=>{

        html += `
        <option value="${project.id}">
            ${project.title}
        </option>
        `;

    });

    document.getElementById("project_id").innerHTML = html;

}

async function loadUsersDropdown(){

    const response = await fetch(API + "/users/");

    const users = await response.json();

    let html = '<option value="">Select User</option>';

    users.forEach(user=>{

        html += `
        <option value="${user.id}">
            ${user.name}
        </option>
        `;

    });

    document.getElementById("assignee_id").innerHTML = html;

}
async function loadTasks() {

    const response = await fetch(API + "/tasks/");
    allTasks = await response.json();

    renderTasks(allTasks);
}

function renderTasks(tasks) {

    let html = "";

    if (tasks.length === 0) {

        html = `
        <tr>
            <td colspan="7" class="text-center">
                No Tasks Found
            </td>
        </tr>
        `;

        document.getElementById("taskTable").innerHTML = html;
        return;
    }

    tasks.forEach(task => {

        let priorityBadge = "bg-success";

        if (task.priority === "High")
            priorityBadge = "bg-danger";

        if (task.priority === "Medium")
            priorityBadge = "bg-warning text-dark";

        let statusBadge =
            task.status === "Completed"
                ? "bg-success"
                : "bg-secondary";

        html += `

<tr>

<td>${task.title}</td>

<td>
<span class="badge ${priorityBadge}">
${task.priority}
</span>
</td>

<td>
<span class="badge ${statusBadge}">
${task.status}
</span>
</td>

<td>${task.due_date}</td>

<td>${task.project.title}</td>

<td>${task.assignee.name}</td>

<td>

<button
class="btn btn-warning btn-sm me-2"
onclick="editTask(${task.id})">

Edit

</button>

<button
class="btn btn-danger btn-sm"
onclick="deleteTask(${task.id})">

Delete

</button>

</td>

</tr>

`;

    });

    document.getElementById("taskTable").innerHTML = html;
}

function openAddModal() {

    editingTask = null;

    document.getElementById("modalTitle").innerHTML = "Add Task";

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("priority").value = "High";
    document.getElementById("status").value = "Pending";
    document.getElementById("due_date").value = "";
    document.getElementById("project_id").value = "";
    document.getElementById("assignee_id").value = "";

    modal.show();
}

function editTask(id) {

    const task = allTasks.find(t => t.id === id);

    if (!task) return;

    editingTask = id;

    document.getElementById("modalTitle").innerHTML = "Edit Task";

    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;
    document.getElementById("priority").value = task.priority;
    document.getElementById("status").value = task.status;
    document.getElementById("due_date").value = task.due_date;
    document.getElementById("project_id").value = task.project.id;

document.getElementById("assignee_id").value = task.assignee.id;

    modal.show();
}

async function saveTask() {

    const task = {

        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value,
        status: document.getElementById("status").value,
        due_date: document.getElementById("due_date").value,
        project_id: parseInt(document.getElementById("project_id").value),
        assignee_id: parseInt(document.getElementById("assignee_id").value)

    };

    if (editingTask == null) {

        await fetch(API + "/tasks/", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(task)

        });

    } else {

        await fetch(API + "/tasks/" + editingTask, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(task)

        });

    }

    modal.hide();

    loadTasks();
}

async function deleteTask(id) {

    if (!confirm("Delete this task?"))
        return;

    await fetch(API + "/tasks/" + id, {

        method: "DELETE"

    });

    loadTasks();
}

function searchTasks() {

    const keyword =
        document.getElementById("searchTask").value.toLowerCase();

    const status =
        document.getElementById("filterStatus").value;

    const priority =
        document.getElementById("filterPriority").value;

    const filtered = allTasks.filter(task => {

        const titleMatch =
            task.title.toLowerCase().includes(keyword);

        const statusMatch =
            status === "" || task.status === status;

        const priorityMatch =
            priority === "" || task.priority === priority;

        return titleMatch && statusMatch && priorityMatch;

    });

    renderTasks(filtered);
}

function logout() {

    localStorage.clear();

    window.location.href = "login.html";
}