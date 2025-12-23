// CHANGE THIS TO YOUR DESIRED ACCESS CODE
const CORRECT_CODE = "Myers42";  // ← Share this with your VIP members

// Only run on login page
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", function(e) {
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

// Protect dashboard
if (window.location.pathname.includes("dashboard.html")) {
    if (sessionStorage.getItem("vipAuthenticated") !== "true") {
        window.location.href = "index.html";
    }
}

// Logout function
// Improved logout function – inside js/auth.js
function logout() {
    // Clear the authentication
    sessionStorage.removeItem("vipAuthenticated");
    
    // Optional: Show a quick message (you can remove if you don't want it)
    alert("You have been logged out successfully.");
    
    // Redirect to login page
    window.location.href = "index.html";
}

// Auto-logout after inactivity
const INACTIVITY_TIMEOUT = 10 * 60 * 1000;  // 30 minutes in milliseconds (change as needed: 15 * 60 * 1000 = 15 min)

let inactivityTimer;

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logout, INACTIVITY_TIMEOUT);
}

function logoutDueToInactivity() {
    alert("Session expired due to inactivity. Please log in again.");
    logout();  // Uses your existing logout function
}

// Reset timer on user activity
window.addEventListener('mousemove', resetInactivityTimer);
window.addEventListener('mousedown', resetInactivityTimer);
window.addEventListener('keypress', resetInactivityTimer);
window.addEventListener('scroll', resetInactivityTimer);
window.addEventListener('touchstart', resetInactivityTimer);  // For mobile

// Start timer when page loads (only on protected pages)
if (window.location.pathname.includes("dashboard.html") || window.location.pathname.includes("profile.html")) {
    resetInactivityTimer();
}