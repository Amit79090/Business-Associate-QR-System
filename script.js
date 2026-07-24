// ===============================
// Business Associate Safety Card
// ===============================

// Get Gate Pass Number from URL
const params = new URLSearchParams(window.location.search);
const gatepass = params.get("id");

if (!gatepass) {

    document.body.innerHTML = `
        <h2 style="text-align:center;margin-top:100px;">
            Invalid QR Code
        </h2>
    `;

    throw new Error("Gate Pass Number Missing");

}

// Load JSON
fetch("./business_associates.json")

.then(response => {

    if (!response.ok) {

        throw new Error("Unable to load business_associates.json");

    }

    return response.json();

})

.then(data => {

    const person = data.find(p => p.gatepass === gatepass);

    if (!person) {

        document.body.innerHTML = `
            <h2 style="text-align:center;margin-top:100px;">
                Business Associate Not Found
            </h2>
        `;

        return;

    }

    // Browser Title
    document.title = person.name + " | Business Associate";

    // Photo
    const photo = document.getElementById("photo");

    if(photo){

        photo.src = person.image || "images/default.jpg";

        photo.onerror = function(){

            this.src = "images/default.jpg";

        };

    }

    // Personal Details
    document.getElementById("name").textContent = person.name;

    document.getElementById("designation").textContent = person.designation;

    document.getElementById("designation2").textContent = person.designation;

    document.getElementById("gatepass").textContent = person.gatepass || "-";

    document.getElementById("department").textContent = person.department;

    document.getElementById("blood").textContent = person.blood || "-";

    document.getElementById("mobile").innerHTML =
        `<a href="tel:${person.mobile}">${person.mobile}</a>`;

    document.getElementById("email").innerHTML =
        `<a href="mailto:${person.email}">${person.email}</a>`;

    // Status
    const status = document.getElementById("status");

    status.textContent = person.status || "ACTIVE";

    if ((person.status || "").toLowerCase() === "active") {

        status.className = "status active";

    } else {

        status.className = "status inactive";

    }

    // Buttons
    document.getElementById("callBtn").href =
        "tel:" + person.mobile;

    document.getElementById("emailBtn").href =
        "mailto:" + person.email;

})

.catch(error => {

    console.error(error);

    document.body.innerHTML = `
        <h2 style="text-align:center;margin-top:100px;">
            Unable to Load Business Associate Data
        </h2>
    `;

});
