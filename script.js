let mode = "signup";

function switchMode(type) {
  mode = type;
  document.getElementById("loginBtn").classList.remove("active");
  document.getElementById("signupBtn").classList.remove("active");

  if (type === "login") {
    document.getElementById("loginBtn").classList.add("active");
  } else {
    document.getElementById("signupBtn").classList.add("active");
  }
}

function submitAuth() {
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  if (!phone || !password) {
    alert("Enter phone and password");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if (mode === "signup") {
    if (users[phone]) {
      alert("Account exists, please login");
      return;
    }

    users[phone] = {
      password: password,
      points: 0,
      items: 0
    };

    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created!");
  }

  if (mode === "login") {
    if (!users[phone] || users[phone].password !== password) {
      alert("Wrong phone or password");
      return;
    }
  }

  localStorage.setItem("currentUser", phone);
  window.location.href = "dashboard.html";
}

function forgotPassword() {
  const phone = prompt("Enter your phone number");
  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if (!users[phone]) {
    alert("User not found");
    return;
  }

  const newPass = prompt("Enter new password");
  users[phone].password = newPass;
  localStorage.setItem("users", JSON.stringify(users));
  alert("Password updated!");
}

/* ---------------- DASHBOARD ---------------- */

function loadDashboard() {
  const phone = localStorage.getItem("currentUser");
  if (!phone) {
    window.location.href = "index.html";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users"));
  const user = users[phone];

  document.getElementById("userPhone").innerText = "User: " + phone;
  document.getElementById("points").innerText = user.points;
  document.getElementById("items").innerText = user.items;

  updateBadges(user.points);
  updateProgress(user.points);
}

function simulateMachineInput() {
  const phone = localStorage.getItem("currentUser");
  let users = JSON.parse(localStorage.getItem("users"));
  let user = users[phone];

  const randomPoints = Math.floor(Math.random() * 10) + 5;
  user.points += randomPoints;
  user.items += 1;

  users[phone] = user;
  localStorage.setItem("users", JSON.stringify(users));

  alert("Machine added " + randomPoints + " points!");
  loadDashboard();
}

function updateProgress(points) {
  const progress = (points % 30) / 30 * 100;
  document.getElementById("progressFill").style.width = progress + "%";
}

function updateBadges(points) {
  const badgeList = document.getElementById("badgeList");
  badgeList.innerHTML = "";

  let rewards = [
    { level: 30, reward: "💰 30 Baht Cash" },
    { level: 60, reward: "🎁 Random Gift" },
    { level: 100, reward: "🏆 Super Recycler Badge" }
  ];

  rewards.forEach(r => {
    let div = document.createElement("div");
    div.className = "badge";

    if (points >= r.level) {
      div.innerHTML = "✅ " + r.reward;
    } else {
      div.innerHTML = "🔒 Unlock at " + r.level + " points";
      div.classList.add("locked");
    }

    badgeList.appendChild(div);
  });
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
