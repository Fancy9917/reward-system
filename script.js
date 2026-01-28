function loadDashboard() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return location.href = "index.html";

  document.getElementById("userPhone").innerText = "User: " + user.phone;
  updateUI(user);
}

// This function will be triggered by machine data in future
function receiveMachineData(pointsEarned, itemsAdded) {
  let user = JSON.parse(localStorage.getItem("currentUser"));

  user.points += pointsEarned;
  user.items += itemsAdded;

  localStorage.setItem("currentUser", JSON.stringify(user));
  localStorage.setItem(user.phone, JSON.stringify(user));

  updateUI(user);
}

function updateUI(user) {
  document.getElementById("points").innerText = user.points;
  document.getElementById("items").innerText = user.items;

  let progress = (user.points % 30) / 30 * 100;
  document.getElementById("progressFill").style.width = progress + "%";

  showBadges(user.points);
}

function showBadges(points) {
  let list = document.getElementById("badgeList");
  list.innerHTML = "";

  if (points >= 10) list.innerHTML += "🎖 Plastic Starter Badge<br>";
  if (points >= 20) list.innerHTML += "🥈 Recycling Supporter<br>";
  if (points >= 30) list.innerHTML += "💰 30 Baht Cash Reward<br>";
  if (points >= 40) list.innerHTML += "🎁 Random Eco Gift<br>";
  if (points >= 50) list.innerHTML += "🏆 Green Hero Badge<br>";
}

function logout() {
  localStorage.removeItem("currentUser");
  location.href = "index.html";
}
