// varibales
const signUpBtnLink = document.querySelector(".signUpBtn-link");
const signInBtnLink = document.querySelector(".signInBtn-link");
const userName = document.querySelector(".user-name");
const password = document.querySelector(".password");
const email = document.querySelector(".email");
const wrapper = document.querySelector(".wrapper");
const logIn = document.querySelector(".log-in");
const gallery = document.querySelector(".hero");
const rememberMe = document.querySelector(".remember-me");
const container = document.getElementById("container");
const uploadBtn = document.getElementById("upload");
const fileInput = document.getElementById("fileInput");
const API_KEY = "0e9a97b602aedd4564d423f011ead5e8";
const entryUserName = document.querySelector(".entry-user-name");
const entryPassword = document.querySelector(".entry-password");
const agreeTerms = document.querySelector(".agree-terms");
const rememberBox = document.querySelector(".remember-box");
const rememberMeName = document.querySelector(".r-name");
const rememberMePassword = document.querySelector(".r-password");
const signUpBtn = document.querySelector(".sign-up-btn");
const gotIt = document.querySelector(".got-it");
let currentIndex = container.children.length + 1;
// log In part
signUpBtn.addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.setItem(
    "userData",
    JSON.stringify({
      userName: entryUserName.value,
      password: entryPassword.value,
      email: email.value,
    })
  );
  localStorage.setItem("hasAccount", "true");

  alert("✅ Account created. Now login.");

  wrapper.classList.add("active");
});
// log in
signUpBtnLink.addEventListener("click", () => {
  wrapper.classList.toggle("active");
});
signInBtnLink.addEventListener("click", () => {
  wrapper.classList.toggle("active");
});

//========================= remember me ==================================

rememberMe.addEventListener("change", function () {
  if (this.checked) {
    const savedUser = JSON.parse(localStorage.getItem("userData"));

    if (savedUser) {
      rememberMeName.textContent = savedUser.userName;
      rememberMePassword.textContent = savedUser.password;

      wrapper.classList.add("hidden");
      rememberBox.classList.add("show");
    } else {
      alert("❌ No saved account");
      this.checked = false;
    }
  }
});

// =========got it===========
gotIt.addEventListener("click", function (e) {
  e.preventDefault();
  wrapper.classList.remove("hidden");
  rememberBox.classList.remove("show");
});

//========= log in ===========

logIn.addEventListener("click", function (e) {
  e.preventDefault();

  const savedUser = JSON.parse(localStorage.getItem("userData"));

  if (!savedUser) {
    alert("❌ No account found. Please sign up first.");
    return;
  }

  if (
    userName.value === savedUser.userName &&
    password.value === savedUser.password
  ) {
    localStorage.setItem("isLoggedIn", "true");

    wrapper.classList.add("hidden");
    gallery.classList.add("show");
  } else {
    alert("❌ Wrong username or password");
  }
});

// =============================upload part===========================

uploadBtn.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", (e) => {
  const files = Array.from(e.target.files);
  files.forEach((file) => {
    const formData = new FormData();
    formData.append("image", file);

    fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const span = document.createElement("span");
        span.style.setProperty("--i", currentIndex);
        currentIndex++;

        const img = document.createElement("img");
        img.src = data.data.display_url;
        span.appendChild(img);
        container.appendChild(span);
      })
      .catch((err) => console.error(err));
  });
  fileInput.value = "";
});
// ================== window load============================
window.addEventListener("load", () => {
  const savedUser = JSON.parse(localStorage.getItem("userData"));
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn && savedUser) {
    wrapper.classList.add("hidden");
    gallery.classList.add("show");
  } else {
    wrapper.classList.remove("hidden");
    gallery.classList.remove("show");
  }
  document.querySelectorAll("input").forEach((input) => (input.value = ""));
});

//===================log out =============================
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  wrapper.classList.remove("hidden");
  gallery.classList.remove("show");
  document.querySelectorAll("input").forEach((input) => (input.value = ""));
});
