let mode = "signup";

// SWITCH LOGIN / SIGNUP MODE
function setMode(selected) {
  mode = selected;
  document.getElementById("modeTitle").innerText =
    selected === "signin" ? "Welcome Back 👋" : "Create Account ✨";
  document.getElementById("mainBtn").innerText =
    selected === "signin" ? "Login" : "Sign Up";
}

// SIGNUP / LOGIN
function submitAuth() {
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  if (!phone || !password) return alert("Enter all fields");

  let users = JSON.parse(localStorage.getItem("users")) || {};

  // SIGN UP
  if (mode === "signup") {
    if (users[phone]) return alert("Account already exists");

    users[phone] = { password, points: 0, plastic: 0, aluminum: 0, glass: 0 };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created! Please login.");
    return;
  }

  // LOGIN
  if (!users[phone] || users[phone].password !== password)
    return alert("Wrong login details");

  localStorage.setItem("currentUser", phone);
  window.location = "dashboard.html";
}

// FORGOT PASSWORD
function forgotPassword() {
  const phone = prompt("Enter your phone number:");
  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (!users[phone]) return alert("User not found");

  const newPass = prompt("Enter new password:");
  users[phone].password = newPass;
  localStorage.setItem("users", JSON.stringify(users));
  alert("Password updated!");
}

// LOAD DASHBOARD
function loadDashboard() {
  const phone = localStorage.getItem("currentUser");
  if (!phone) return (window.location = "auth.html");

  const users = JSON.parse(localStorage.getItem("users"));
  const user = users[phone];

  document.getElementById("userPhone").innerText = "User: " + phone;
  document.getElementById("points").innerText = user.points;
  document.getElementById("items").innerText =
    user.plastic + user.aluminum + user.glass;

  updateProgress(user.points);
  updateBadges(user);
}

// ADD REWARD
function addReward(type) {
  const phone = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users"));
  const user = users[phone];

  const pts = Math.floor(Math.random() * 10) + 5;
  user.points += pts;
  user[type] += 1;

  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("points").innerText = user.points;
  document.getElementById("items").innerText =
    user.plastic + user.aluminum + user.glass;

  updateProgress(user.points);
  updateBadges(user);

  alert("+" + pts + " points earned!");
}

// PROGRESS BAR
function updateProgress(points) {
  let percent = points % 100;
  document.getElementById("progressFill").style.width = percent + "%";
}

// BADGES
function updateBadges(user) {
  const badgeList = document.getElementById("badgeList");
  badgeList.innerHTML = "";

  const badgeRules = [
    { name: "🌱 Plastic Starter", count: user.plastic, need: 3 },
    { name: "🥤 Aluminum Saver", count: user.aluminum, need: 3 },
    { name: "🍾 Glass Guardian", count: user.glass, need: 3 },
  ];

  badgeRules.forEach(b => {
    const div = document.createElement("div");
    div.className = "badge " + (b.count >= b.need ? "" : "locked");
    div.innerText = `${b.name} (${b.count}/${b.need})`;
    badgeList.appendChild(div);
  });
}

// LOGOUT
function logout() {
  localStorage.removeItem("currentUser");
  window.location = "auth.html";
}
