const API_URL = "/api";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await res.text();
      alert(result.includes("taken") ? result : "Registered successfully");
      if (!result.includes("taken")) window.location.href = "login.html";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        alert("Login successful!");
        window.location.href = "courses.html";
      } else {
        alert("Invalid credentials");
      }
    });
  }
});

async function fetchCourses(category = "") {
  const res = await fetch(
    category ? `${API_URL}/courses/category/${category}` : `${API_URL}/courses/all`
  );
  const courses = await res.json();

  const courseList = document.getElementById("courseList");
  courseList.innerHTML = "";
  courses.forEach((course) => {
    const li = document.createElement("li");
    li.textContent = `${course.title} (${course.category}) - ${course.description}`;
    courseList.appendChild(li);
  });
}

async function fetchEnrollment() {
  const res = await fetch(`${API_URL}/courses/enrolled-count`);
  const data = await res.json();

  const courseList = document.getElementById("courseList");
  courseList.innerHTML = "";
  for (const [title, count] of Object.entries(data)) {
    const li = document.createElement("li");
    li.textContent = `${title}: ${count} enrolled`;
    courseList.appendChild(li);
  }
}
