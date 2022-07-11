document.querySelector("#apply-now").addEventListener("click", function (event) {
  event.preventDefault();
  console.log("hi");
});

window.onload = () => {
  loadEventDetails();
};

async function loadEventDetails() {
  const resp = await fetch("./");
  const events = await resp.json();
  let htmlStr = "";
  htmlStr += /*html */ `<div class="event-detailsInfo">
    <div class="event-name">Event Name: ${events.eventName}</div>
    <div id="event-content-text">
      <div class="time">Time:${events.time}</div>
      <ul>
        <li></li>
      </ul>
      <div class="venue">Venue:${events.venue}</div>
      <ul>
        <li></li>
      </ul>
      <div class="fee">Fee:${events.fee}</div>
      <ul>
        <li></li>
      </ul>
      <div class="max-pp">Max-participants:${events.numberOfPart}</div>
      <ul>
        <li></li>
      </ul>

      <div class="description">Description: ${events.content}</div>
    </div>
  </div>
</div>
</div>`;
  document.querySelector(".event-detailsInfo").innerHTML = htmlStr;
}
