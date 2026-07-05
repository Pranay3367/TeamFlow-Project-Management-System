const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const response = await fetch(API + "/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if(response.ok){

            localStorage.setItem("token",data.access_token);

            const email=document.getElementById("email").value;

            localStorage.setItem("username",email);

            window.location.href="dashboard.html";


        } else {

            document.getElementById("message").innerHTML = data.detail;

        }

    });

}



const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value;

        const email = document.getElementById("email").value;

        const password = document.getElementById("password").value;

        const response = await fetch(API + "/users/", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                name,
                email,
                password

            })

        });

        const data = await response.json();

        if (response.ok) {

            document.getElementById("message").innerHTML =
                "<span class='text-success'>Registration Successful! Redirecting...</span>";

            setTimeout(() => {

                window.location.href = "login.html";

            }, 1500);

        } else {

            document.getElementById("message").innerHTML =
                "<span class='text-danger'>" +
                (data.detail || "Registration Failed") +
                "</span>";

        }

    });

}