// CHANGE THIS TO YOUR DESIRED ACCESS CODE
const CORRECT_CODE = "Myers42";

// ---------------- LOGIN ----------------
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const input = document.getElementById("password").value.trim();
        const errorMsg = document.getElementById("errorMsg");

        if (input === CORRECT_CODE) {
            sessionStorage.setItem("vipAuthenticated", "true");
            window.location.href = "dashboard.html";
        } else {
            errorMsg.classList.remove("d-none");
            document.getElementById("password").value = "";
        }
    });
}

// ---------------- PROTECT DASHBOARD ----------------
if (window.location.pathname.includes("dashboard.html")) {
    if (sessionStorage.getItem("vipAuthenticated") !== "true") {
        window.location.href = "index.html";
    }
}

// ---------------- SILENT LOGOUT ----------------
function logout() {
    sessionStorage.removeItem("vipAuthenticated");
    window.location.href = "index.html";
}

// ---------------- AUTO LOGOUT (SILENT) ----------------
const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes

let inactivityTimer;

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logout, INACTIVITY_TIMEOUT);
}

// Track user activity
window.addEventListener("mousemove", resetInactivityTimer);
window.addEventListener("mousedown", resetInactivityTimer);
window.addEventListener("keypress", resetInactivityTimer);
window.addEventListener("scroll", resetInactivityTimer);
window.addEventListener("touchstart", resetInactivityTimer);

// Start timer only on protected pages
if (
    window.location.pathname.includes("dashboard.html") ||
    window.location.pathname.includes("profile.html")
) {
    resetInactivityTimer();
}
