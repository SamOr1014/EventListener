document.querySelector("#apply-now").addEventListener("click", function (event) {
  event.preventDefault();
  console.log("hi");
});

window.onload = () => {
  loadEventDetails();
};

async function loadEventDetails() {
  const resp = await fetch("./event");
  const events = await resp.json();
  let htmlStr = "";
  for (const event of events) {
    htmlStr += /*html */ `<div class="event-detailsInfo">
    <div class="event-name">Event Name:</div>
    <div id="event-content-text">
      <div class="time">Time:</div>
      <ul>
        <li></li>
      </ul>
      <div class="venue">Venue</div>
      <ul>
        <li></li>
      </ul>
      <div class="fee">Fee</div>
      <ul>
        <li></li>
      </ul>
      <div class="max-pp">Max-participants</div>
      <ul>
        <li></li>
      </ul>

      <div class="description">Description</div>
    </div>
  </div>
</div>
</div>`;
  }
  document.querySelector(".event-detailsInfo").innerHTML = htmlStr;
}
