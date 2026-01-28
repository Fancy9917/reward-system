let mode = "signin";

function setMode(selected) {
  mode = selected;
  document.getElementById("modeTitle").innerText =
    selected === "signin" ? "Welcome Back 👋" : "Create Account ✨";
  document.getElementById("mainBtn").innerText =
    selected === "signin" ? "Sign In" : "Sign Up";
}

// SIGN UP / LOGIN
function submitAuth() {
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  if (!phone || !password) return alert("Enter phone & password");

  const userData = JSON.parse(localStorage.getItem(phone));

  if (mode === "signup") {
    if (userData) return alert("Account exists!");

    const user = {
      phone,
      password,
      points: 0,
      badges: [],
    };

    localStorage.setItem(phone, JSON.stringify(user));
    alert("Account created!");
  } else {
    if (!userData || userData.password !== password)
      return alert("Wrong phone or password!");

    localStorage.setItem("currentUser", phone);
    window.location.href = "dashboard.html";
  }
}

// FORGOT PASSWORD
function forgotPassword() {
  const phone = document.getElementById("phone").value;
  const newPass = prompt("Enter new password:");

  if (!phone || !newPass) return;

  const user = JSON.parse(localStorage.getItem(phone));
  if (!user) return alert("Account not found");

  user.password = newPass;
  localStorage.setItem(phone, JSON.stringify(user));
  alert("Password updated!");
}

// DASHBOARD LOAD
function loadDashboard() {
  const phone = localStorage.getItem("currentUser");
  if (!phone) return (window.location.href = "auth.html");

  const user = JSON.parse(localStorage.getItem(phone));
  document.getElementById("userPhone").innerText = phone;
  updateUI(user);
}

// ADD RANDOM POINTS
function addPoints() {
  const phone = localStorage.getItem("currentUser");
  const user = JSON.parse(localStorage.getItem(phone));

  const randomPoints = Math.floor(Math.random() * 50) + 10;
  user.points += randomPoints;

  checkBadges(user);
  localStorage.setItem(phone, JSON.stringify(user));
  updateUI(user);

  alert("You earned " + randomPoints + " points!");
}

// BADGE SYSTEM
function checkBadges(user) {
  const rewards = [
    { pts: 100, name: "฿10 Reward" },
    { pts: 250, name: "฿25 Reward" },
    { pts: 500, name: "Eco Hero Badge 🌱" },
  ];

  rewards.forEach((reward) => {
    if (user.points >= reward.pts && !user.badges.includes(reward.name)) {
      user.badges.push(reward.name);
      alert("Unlocked: " + reward.name);
    }
  });
}

// UPDATE DASHBOARD UI
function updateUI(user) {
  document.getElementById("points").innerText = user.points;

  const progress = Math.min((user.points / 500) * 100, 100);
  document.getElementById("progressFill").style.width = progress + "%";

  const badgeBox = document.getElementById("badgeList");
  badgeBox.innerHTML = "";

  user.badges.forEach((b) => {
    badgeBox.innerHTML += `<div class="badge">${b}</div>`;
  });
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "auth.html";
}
