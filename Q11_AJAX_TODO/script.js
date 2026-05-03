document.getElementById("reg-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let mobile = document.getElementById("mobile").value;
    let dob = document.getElementById("dob").value;
    let city = document.getElementById("city").value;
    let address = document.getElementById("address").value;
    let password = document.getElementById("password").value;

    // Basuc Validation of the Form 
    if (name.length < 3) {
        alert("name should be length of greathe then the 5 length ");
        return;
    }
    //check for the emal 
    if (!email.includes("@")) {
        alert("Email Should Contains the @ (Symbol)");
        return;
    }
    
    // now send REques to the ajax 
    if (mobile.length < 10) {
        alert("Mobile number should be of 10 digit ");
        return;
    }
    //Define the object doe the data storage 
    let userObj = { name, email, mobile, dob, city, address, password };

    let users = JSON.parse(localStorage.getItem("users")) || []
    users.push(userObj);

    localStorage.setItem("users", JSON.stringify(users));

    //now conncet to the Ajax 
    // 
    // Fatch there ate four contains 1. fake api 2. method  3. data 4. hrader fiole 
    fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify(users),
        headers: {
            "content-type": "application/json"
        }
    }
    )
        .then(res =>  res.json())
        .then(data => console.log("Registration DAta : " + data));
    alert("REgistration Scomplted ");
    window.location.href = "data.html";
});