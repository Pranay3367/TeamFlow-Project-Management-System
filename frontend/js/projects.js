let editingProject = null;

let modal = null;

window.onload = () => {

    modal = new bootstrap.Modal(
        document.getElementById("projectModal")
    );

    loadProjects();

};

async function loadProjects() {

    const response = await fetch(API + "/projects");

    const data = await response.json();

    let html = "";

    if (data.length === 0) {

        html = `
        <tr>
            <td colspan="4" class="text-center">
                No Projects Found
            </td>
        </tr>
        `;

    }

    data.forEach(project => {

        html += `

<tr>

<td>${project.id}</td>

<td>${project.title}</td>

<td>${project.description}</td>

<td>

<button
class="btn btn-warning btn-sm me-2"
onclick="editProject(
${project.id},
'${project.title.replace(/'/g,"\\'")}',
'${project.description.replace(/'/g,"\\'")}'
)">

Edit

</button>

<button
class="btn btn-danger btn-sm"
onclick="deleteProject(${project.id})">

Delete

</button>

</td>

</tr>

`;

    });

    document.getElementById("projectTable").innerHTML = html;

}

function openAddModal() {

    editingProject = null;

    document.getElementById("modalTitle").innerHTML = "Add Project";

    document.getElementById("title").value = "";

    document.getElementById("description").value = "";

    modal.show();

}

function editProject(id, title, description) {

    editingProject = id;

    document.getElementById("modalTitle").innerHTML = "Edit Project";

    document.getElementById("title").value = title;

    document.getElementById("description").value = description;

    modal.show();

}

async function saveProject() {

    const project = {

        title: document.getElementById("title").value,

        description: document.getElementById("description").value

    };

    if (editingProject == null) {

        await fetch(API + "/projects/", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(project)

        });

    }

    else {

        await fetch(API + "/projects/" + editingProject, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(project)

        });

    }

    modal.hide();

    loadProjects();

}

async function deleteProject(id) {

    if (!confirm("Are you sure you want to delete this project?"))

        return;

    await fetch(API + "/projects/" + id, {

        method: "DELETE"

    });

    loadProjects();

}

function logout() {

    localStorage.clear();

    window.location.href = "login.html";

}