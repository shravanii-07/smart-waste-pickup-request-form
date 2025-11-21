const form = document.getElementById("pickupForm");
const recentList = document.getElementById("recentList");

function loadRequests() {
  let data = JSON.parse(localStorage.getItem("wasteRequests") || "[]");

  recentList.innerHTML = "";

  if (data.length === 0) {
    recentList.innerHTML = "<p class='empty-text'>No requests yet.</p>";
    return;
  }

  data
    .slice()
    .reverse()
    .forEach((req) => {
      let box = document.createElement("div");
      box.className = "item";
      box.innerHTML = `
            <b>${req.name}</b>  
            <br><small>${req.type} • ${req.date}</small><br>
            <small>${req.address}</small>
        `;
      recentList.appendChild(box);
    });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let req = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    type: document.getElementById("type").value,
    date: document.getElementById("date").value || "ASAP",
    notes: document.getElementById("notes").value,
  };

  let data = JSON.parse(localStorage.getItem("wasteRequests") || "[]");
  data.push(req);
  localStorage.setItem("wasteRequests", JSON.stringify(data));

  alert("Your pickup request has been submitted!");

  form.reset();
  loadRequests();
});

loadRequests();
