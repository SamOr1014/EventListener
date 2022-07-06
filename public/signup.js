console.log("testing")


document.querySelector('#createAc').addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const form = event.target;
    
    const FirstName = form.firstName.value;
    const LastName = form.lastName.value;
    const Gender = form.Gender.value;
    const DOA = form.birthday.value;
    const Phone = form.phoneNumber.value;
    const Email = form.email.value;
    const password = form.password.value;

    const res = await fetch ('/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ FirstName,LastName,Gender,DOA,Phone,Email,password}),
    })
    const result = await res.json()
    if (result.success) {
      console.log("Success")
    } else {
      console.log("Fail")
    }
  })

  document.querySelector('#login').addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const form = event.target;
    const Email = form.email.value;
    const password = form.password.value;

    const res = await fetch ('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email,password}),
    })
    
    const result = await res.json()
    if (result.success) {
      alert("Login Success")
    } else {
      alert("Login failed")
    }

   
  })
  