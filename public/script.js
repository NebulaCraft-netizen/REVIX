document.getElementById("loginBtn").addEventListener("click", () => {
  window.location.href = "/auth/google";
});

fetch("/auth/status")
  .then(res => res.json())
  .then(user => {
    if (user.name) {
      document.getElementById("userInfo").innerHTML = `
        <h3>👋 Logged in as ${user.name}</h3>
        <p>Email: ${user.email}</p>
        <img src="${user.picture}" width="60" style="border-radius: 50%;" />
      `;
    } else {
      document.getElementById("userInfo").innerHTML = "You're not logged in.";
    }
  })
  .catch(() => {
    document.getElementById("userInfo").innerHTML = "You're not logged in.";
  });
