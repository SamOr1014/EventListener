document.querySelector("#apply-now").addEventListener("click", function (event) {
  event.preventDefault();
  console.log("hi");
});

window.onload = () => {
  initEventDetails();
};

async function initEventDetails() {
  // const form = e.target;
  const formData = new FormData();
  formData.append();
  formData.append();
  const resp = await fetch("/", {
    body: formData,
  });
}
