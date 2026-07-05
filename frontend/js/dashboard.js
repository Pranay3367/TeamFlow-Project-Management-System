const username = localStorage.getItem("username") || "User";

async function loadDashboard() {

    try {

        const projectResponse = await fetch(API + "/projects/");
        const projects = await projectResponse.json();

        const taskResponse = await fetch(API + "/tasks/");
        const tasks = await taskResponse.json();

        document.getElementById("projectCount").innerHTML = projects.length;
        document.getElementById("taskCount").innerHTML = tasks.length;

        let completed = 0;
        let pending = 0;

        tasks.forEach(task => {

            if (task.status === "Completed") {
                completed++;
            } else {
                pending++;
            }

        });

        document.getElementById("completedCount").innerHTML = completed;
        document.getElementById("pendingCount").innerHTML = pending;

        document.getElementById("welcomeUser").innerHTML =
            "Welcome, " + username + " 👋";

        loadRecentProjects(projects);

        loadRecentTasks(tasks);

    }

    catch (error) {

        console.log(error);

        alert("Unable to load dashboard");

    }

}

function loadRecentProjects(projects) {

    let html = "";

    projects.slice(0,5).forEach(project => {

        html += `
        <tr>
            <td>${project.id}</td>
            <td>${project.title}</td>
            <td>${project.description}</td>
        </tr>
        `;

    });

    document.getElementById("recentProjects").innerHTML = html;

}

function loadRecentTasks(tasks) {

    let html = "";

    tasks.slice(0,5).forEach(task => {

        html += `
        <tr>
            <td>${task.title}</td>
            <td>${task.status}</td>
            <td>${task.priority}</td>
            <td>${task.due_date}</td>
        </tr>
        `;

    });

    document.getElementById("recentTasks").innerHTML = html;

}

function logout(){

    localStorage.clear();

    window.location.href="login.html";

}

loadDashboard();