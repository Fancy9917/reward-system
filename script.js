let mode = "signup";

function switchMode(m) {
  mode = m;
  document.getElementById("loginBtn").classList.toggle("active", m==="login");
  document.getElementById("signupBtn").classList.toggle("active", m==="signup");
}

function submitAuth() {
  const phone = phone.value;
  const pass = password.value;
  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (mode === "signup") {
    if (users[phone]) return alert("User exists");
    users[phone] = { password: pass, points: 0, plastic:0, aluminum:0, glass:0 };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created!");
  }

  if (mode === "login") {
    if (!users[phone] || users[phone].password !== pass) return alert("Wrong login");
    localStorage.setItem("currentUser", phone);
    window.location = "dashboard.html";
  }
}

function forgotPassword() {
  const phone = prompt("Phone number:");
  let users = JSON.parse(localStorage.getItem("users")) || {};
  if (!users[phone]) return alert("Not found");
  users[phone].password = prompt("New password:");
  localStorage.setItem("users", JSON.stringify(users));
  alert("Updated!");
}

function loadDashboard() {
  const phone = localStorage.getItem("currentUser");
  let users = JSON.parse(localStorage.getItem("users"));
  let user = users[phone];

  userPhone.innerText = phone;
  points.innerText = user.points;
  items.innerText = user.plastic + user.aluminum + user.glass;

  let progress = (user.points % 100);
  progressFill.style.width = progress + "%";

  badgeList.innerHTML = `
    <div class="badge">Plastic: ${user.plastic}</div>
    <div class="badge">Aluminum: ${user.aluminum}</div>
    <div class="badge">Glass: ${user.glass}</div>
  `;
}

function addReward(material) {
  let phone = localStorage.getItem("currentUser");
  let users = JSON.parse(localStorage.getItem("users"));
  let user = users[phone];

  let rewardTypes = ["Cash", "Coupon", "Bonus Points"];
  let reward = rewardTypes[Math.floor(Math.random()*3)];

  let value = Math.floor(Math.random()*20)+5;
  user.points += value;
  user[material] += 1;

  localStorage.setItem("users", JSON.stringify(users));

  alert(`🎉 Reward: ${reward} - ${value} Baht/Points`);
  loadDashboard();
}

function logout(){
  localStorage.removeItem("currentUser");
  window.location="auth.html";
}
