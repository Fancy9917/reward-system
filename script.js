let mode = "signup";

function switchMode(m) {
  mode = m;
  document.getElementById("loginBtn").classList.remove("active");
  document.getElementById("signupBtn").classList.remove("active");
  document.getElementById(m + "Btn").classList.add("active");
}

function submitAuth() {
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  if (!phone || !password) return alert("Enter phone & password");

  if (mode === "signup") {
    if (localStorage.getItem(phone)) return alert("Account exists!");

    const user = { phone, password, points: 0, items: 0, cash: 0 };
    localStorage.setItem(phone, JSON.stringify(user));
    localStorage.setItem("currentUser", JSON.stringify(user));
    location.href = "dashboard.html";

  } else {
    const user = JSON.parse(localStorage.getItem(phone));
    if (!user || user.password !== password) return alert("Wrong login");

    localStorage.setItem("currentUser", JSON.stringify(user));
    location.href = "dashboard.html";
  }
}

function forgotPassword() {
  const phone = prompt("Enter phone number");
  const user = JSON.parse(localStorage.getItem(phone));
  if (!user) return alert("No account found");
  alert("Your password is: " + user.password);
}

function loadDashboard() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) location.href = "index.html";

  document.getElementById("userPhone").innerText = "User: " + user.phone;
  updateUI(user);
}

function simulateMachine() {
  // Machine randomly sends data
  let user = JSON.parse(localStorage.getItem("currentUser"));

  const pointsEarned = Math.floor(Math.random() * 10) + 5;
  user.points += pointsEarned;
  user.items += 1;

  // 30 points = 30 Baht
  if (user.points >= 30) {
    user.cash += 30;
    alert("🎉 You earned 30 Baht reward!");
    user.points -= 30;
  }

  // Random gift
  if (Math.random() > 0.7) {
    alert("🎁 You won a random eco gift!");
  }

  localStorage.setItem(user.phone, JSON.stringify(user));
  localStorage.setItem("currentUser", JSON.stringify(user));
  updateUI(user);
}

function updateUI(user) {
  document.getElementById("points").innerText = user.points;
  document.getElementById("items").innerText = user.items;

  let progress = (user.points / 30) * 100;
  document.getElementById("progressFill").style.width = progress + "%";

  showBadges(user);
}

function showBadges(user) {
  let list = document.getElementById("badgeList");
  list.innerHTML = "";

  if (user.items >= 1) list.innerHTML += "🥉 Plastic Starter<br>";
  if (user.items >= 5) list.innerHTML += "🥈 Recycling Supporter<br>";
  if (user.cash >= 30) list.innerHTML += "💰 Cash Reward Badge<br>";
  if (user.items >= 10) list.innerHTML += "🏆 Green Hero<br>";
}

function logout() {
  localStorage.removeItem("currentUser");
  location.href = "index.html";
}
