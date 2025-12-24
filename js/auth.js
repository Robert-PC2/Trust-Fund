// ---------------- MULTIPLE USERS / PASSWORDS ----------------
// Change or add as many users as you want
const USERS = {
    "Myers42": {  // Main / default user
        dashboard: "dashboard.html",
        profile: "profile.html"
    },
    "Sandy42": {  // Password for User 1
        dashboard: "dashboard-User1.html",
        profile: "profile-User1.html"
    },

    // Add more users here, e.g.:
    // "Secret123": { dashboard: "dashboard-vip.html", profile: "profile-vip.html" }
};

// ---------------- LOGIN ----------------
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const input = document.getElementById("password").value.trim();
        const errorMsg = document.getElementById("errorMsg");

        if (USERS[input]) {
            // Save authentication and user info
            sessionStorage.setItem("vipAuthenticated", "true");
            sessionStorage.setItem("userDashboard", USERS[input].dashboard);
            sessionStorage.setItem("userProfile", USERS[input].profile);

            // Redirect to their specific dashboard
            window.location.href = USERS[input].dashboard;
        } else {
            errorMsg.classList.remove("d-none");
            document.getElementById("password").value = "";
        }
    });
}

// ---------------- PROTECT ALL DASHBOARDS & PROFILES ----------------
const currentPath = window.location.pathname;
const isDashboard = currentPath.includes("dashboard");
const isProfile = currentPath.includes("profile");

if (isDashboard || isProfile) {
    if (sessionStorage.getItem("vipAuthenticated") !== "true") {
        window.location.href = "index.html";
    }
}

// ---------------- NAVIGATION BETWEEN DASHBOARD & PROFILE ----------------
// Add correct links in navbar dropdown (runs on dashboard & profile pages)
if (isDashboard || isProfile) {
    const userDashboard = sessionStorage.getItem("userDashboard") || "dashboard.html";
    const userProfile = sessionStorage.getItem("userProfile") || "profile.html";

    // Update Profile link in dropdown (if exists)
    const profileLink = document.querySelector('a.dropdown-item[href*="profile"]');
    if (profileLink) {
        profileLink.href = userProfile;
    }

    // Update Dashboard link in navbar brand (if needed)
    const dashboardLink = document.querySelector('a.navbar-brand');
    if (dashboardLink) {
        dashboardLink.href = userDashboard;
    }
}

// ---------------- SILENT LOGOUT ----------------
function logout() {
    sessionStorage.removeItem("vipAuthenticated");
    sessionStorage.removeItem("userDashboard");
    sessionStorage.removeItem("userProfile");
    window.location.href = "index.html";
}

// ---------------- AUTO LOGOUT (SILENT) ----------------
const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes

let inactivityTimer;

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logout, INACTIVITY_TIMEOUT);
}

// Start timer on load for protected pages
window.addEventListener('load', function () {
    if (isDashboard || isProfile) {
        resetInactivityTimer();
    }
});

// Reset on activity
window.addEventListener("mousemove", resetInactivityTimer);
window.addEventListener("mousedown", resetInactivityTimer);
window.addEventListener("keypress", resetInactivityTimer);
window.addEventListener("scroll", resetInactivityTimer);
window.addEventListener("touchstart", resetInactivityTimer);
window.addEventListener("click", resetInactivityTimer);