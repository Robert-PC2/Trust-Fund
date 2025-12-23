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