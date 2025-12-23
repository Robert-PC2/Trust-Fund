document.addEventListener("DOMContentLoaded", function() {
    const ctx = document.getElementById('returnsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Portfolio Value ($)',
                data: [10000, 12000, 15000, 18000, 22000, 26000, 30000, 34000, 38000, 42000, 46000, 48520],
                borderColor: '#3bf6b8ff',
                backgroundColor: 'rgba(59, 246, 206, 0.2)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: false, grid: { color: '#334155' } },
                x: { grid: { color: '#334155' } }
            },
            plugins: {
                legend: { labels: { color: '#e2e8f0' } }
            }
        }
    });
});

// Real-time Date & Time
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    document.getElementById('realTimeDate').innerHTML = 
        `<i class="fas fa-calendar-alt me-2"></i>${now.toLocaleDateString('en-US', options)}`;
}

document.addEventListener("DOMContentLoaded", function() {
    // Existing chart code...
    updateDateTime();
    setInterval(updateDateTime, 1000); // Update every second

    // Chart initialization (already here)
});

// Withdrawal submission (fake success alert)
function submitWithdrawal() {
    const amount = document.getElementById('amount').value;
    if (amount < 100) {
        alert("Minimum withdrawal is $100");
        return;
    }
    if (confirm(`Submit withdrawal request for $${amount}?\nThis will be processed within 24-48 hours.`)) {
        alert("Withdrawal request submitted successfully!\nYou will receive confirmation via email.");
        bootstrap.Modal.getInstance(document.getElementById('withdrawalModal')).hide();
        document.getElementById('withdrawalForm').reset();
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
