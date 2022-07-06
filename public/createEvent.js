console.log("testing")




function disableFee(fee) {
    if (fee.value == 0) {
        document.getElementById('fee').disabled = false
    } else {
        document.getElementById('fee').disabled = true
    }
}

document.querySelector('#createEvent').addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData();
    formData.append("eventName", form.eventName.value);
    formData.append("type", form.type.value);
    formData.append("participants", form.participants.value);
    formData.append("venue", form.venue.value);
    formData.append("Fee", form.Fee.value);
    formData.append("content", form.content.value)
    formData.append("image", form.image.files[0])

    console.log(formData)

    const res = await fetch ('/createEvent', {
      method:"POST",
      body: formData,
    })

    const result = await res.json()
    if (result.success) {
      alert("Event Created");
    } else {
      alert("Fail")
    }
})




