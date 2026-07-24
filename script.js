// Get Gate Pass Number from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Load JSON data
fetch("data.json")
.then(response => response.json())
.then(data => {

    const person = data.find(item => item.gatepass === id);

    if(!person){
        document.body.innerHTML = "<h2 style='text-align:center;margin-top:100px;'>Business Associate Not Found</h2>";
        return;
    }

    document.getElementById("name").textContent = person.name;
    document.getElementById("designation").textContent = person.designation;
    document.getElementById("designation2").textContent = person.designation;
    document.getElementById("gatepass").textContent = person.gatepass;
    document.getElementById("department").textContent = person.department;
    document.getElementById("blood").textContent = person.blood;
    document.getElementById("mobile").textContent = person.mobile;
    document.getElementById("email").textContent = person.email;

    const badge = document.getElementById("status");

    if(person.status.toLowerCase() === "active"){
        badge.textContent = "🟢 ACTIVE";
        badge.classList.add("active");
    }
    else{
        badge.textContent = "🔴 EXPIRED";
        badge.classList.remove("active");
        badge.classList.add("expired");
    }

});
