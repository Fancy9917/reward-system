let mode = "signin";

/* AUTH MODE */
function setMode(m) {
  mode = m;
  document.getElementById("signinBtn").classList.toggle("active", m === "signin");
  document.getElementById("signupBtn").classList.toggle("active", m === "signup");
  document.getElementById("modeTitle").innerText =
    m === "signin" ? "Welcome Back" : "Create New Account";
  document.getElementById("mainBtn").innerText =
    m === "signin" ? "Sign In" : "Sign Up";
  document.getElementById("msg").innerText = "";
}

/* LOGIN / SIGNUP */
function submitAuth() {
  const phone = document.getElementById("phone").value.trim();
  const msg = document.getElementById("msg");

  if (!phone) {
    msg.innerText = "Phone number required";
    return;
  }

  if (mode === "signup") {
    if (localStorage.getItem(phone)) {
      msg.innerText = "User already exists";
      return;
    }

    localStorage.setItem(phone, JSON.stringify({
      points: 0,
      items: 0,
      materials: { plastic: 0, aluminum: 0, glass: 0 }
    }));
  } else {
    if (!localStorage.getItem(phone)) {
      msg.innerText = "User not found";
      return;
    }
  }

  localStorage.setItem("currentUser", phone);
  window.location.href = "dashboard.html";
}

/* LOAD USER DATA */
const currentUser = localStorage.getItem("currentUser");

if (currentUser && document.getElementById("points")) {
  const data = JSON.parse(localStorage.getItem(currentUser));
  document.getElementById("userPhone").innerText = "User: " + currentUser;
  document.getElementById("points").innerText = data.points;
  document.getElementById("items").innerText = data.items;
  updateProgress(data.points);
  updateBadges(data);
}

/* BADGES */
function updateBadges(data) {
  updateBadge("plasticBadge", data.materials.plastic, 5);
  updateBadge("aluminumBadge", data.materials.aluminum, 3);
  updateBadge("glassBadge", data.materials.glass, 2);
}

function updateBadge(id, count, goal) {
  const badge = document.getElementById(id);
  badge.innerHTML = badge.innerHTML.split("(")[0] + `(${count} / ${goal})</span>`;
  if (count >= goal) badge.classList.remove("locked");
}

/* PROGRESS */
function updateProgress(points) {
  document.getElementById("progressFill").style.width =
    Math.min(points, 100) + "%";
}

/* LOGOUT */
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "auth.html";
}
