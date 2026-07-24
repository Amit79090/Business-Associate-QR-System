// Get Gate Pass Number from URL
const params = new URLSearchParams(window.location.search);
const gatePass = params.get("id");

// Load JSON Data
fetch("data.json")
.then(response => response.json())
.then(data => {

    // Find Business Associate
    const person = data.find(item => item.gatepass == gatePass);

    if (!person) {

        document.body.innerHTML = `
        <div style="font-family:Segoe UI;
                    text-align:center;
                    margin-top:100px;">

            <h1 style="color:#b71c1c;">
                Business Associate Not Found
            </h1>

            <p>
                Please check the QR Code or Gate Pass Number.
            </p>

        </div>
        `;

        return;

    }

    // Fill Details

    document.getElementById("name").innerText = person.name;

    document.getElementById("designation").innerText = person.designation;

    document.getElementById("designation2").innerText = person.designation;

    document.getElementById("gatepass").innerText = person.gatepass;

    document.getElementById("department").innerText = person.department;

    document.getElementById("blood").innerText = person.blood;

    document.getElementById("mobile").innerText = person.mobile;

    document.getElementById("email").innerText = person.email;


    // Status Badge

    const status = document.getElementById("status");

    if(person.status.toLowerCase()=="active"){

        status.innerHTML="🟢 ACTIVE";

        status.classList.remove("expired");

        status.classList.add("active");

    }

    else{

        status.innerHTML="🔴 EXPIRED";

        status.classList.remove("active");

        status.classList.add("expired");

    }


    // Call Button

    document.getElementById("callBtn").href =
    "tel:" + person.mobile;


    // Email Button

    document.getElementById("emailBtn").href =
    "mailto:" + person.email;


})
.catch(error => {

    console.error(error);

    document.body.innerHTML=`
    <div style="font-family:Segoe UI;
                text-align:center;
                margin-top:100px;">

        <h2 style="color:red;">
            Unable to Load Data
        </h2>

    </div>
    `;

});
