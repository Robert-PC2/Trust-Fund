// growth.js - Auto-growing balance using your existing numbers

document.addEventListener("DOMContentLoaded", function () {
    // === CONFIG - Based on your current dashboard ===
    const PRINCIPAL = 35000;        // Total Invested (fixed)
    const CURRENT_START = 48520;     // Current Balance when cycle begins
    const TARGET_BALANCE = 70000;    // Grow to this amount (you can change)
    const DURATION_DAYS = 14;        // 14-day growth cycle
    // ================================================

    const STORAGE_KEY = "vipGrowthProgress";

    // Elements
    const balanceEl = document.getElementById("currentBalance");
    const returnsEl = document.getElementById("totalReturns");
    const growthEl = document.getElementById("monthlyGrowth");

    if (!balanceEl || !returnsEl) return;

    // Load saved progress or start new cycle
    let progress = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!progress || progress.target !== TARGET_BALANCE) {
        // Start fresh cycle
        progress = {
            startDate: new Date().getTime(),
            startBalance: CURRENT_START,
            targetBalance: TARGET_BALANCE,
            principal: PRINCIPAL,
            durationMs: DURATION_DAYS * 24 * 60 * 60 * 1000
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }

    function updateDisplay() {
        const now = new Date().getTime();
        const elapsed = now - progress.startDate;
        const ratio = Math.min(elapsed / progress.durationMs, 1); // 0 to 1

        // Linear growth
        const currentBalance = progress.startBalance + (progress.targetBalance - progress.startBalance) * ratio;
        const earnedReturns = currentBalance - progress.principal;

        // Update text smoothly
        balanceEl.textContent = "$" + currentBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        returnsEl.textContent = "$" + earnedReturns.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});

        // Update percentage
        const roiPercent = ((earnedReturns / progress.principal) * 100).toFixed(1);
        growthEl.textContent = `+${roiPercent}% this cycle`;

        // Update Chart if exists
        if (window.returnsChart) {
            const data = window.returnsChart.data.datasets[0].data;
            const lastIndex = data.length - 1;
            if (lastIndex >= 0) {
                data[lastIndex] = currentBalance;
                window.returnsChart.update('quiet');
            }
        }

        // When cycle complete
        if (ratio >= 1) {
            growthEl.textContent = "Growth Cycle Complete!";
            growthEl.classList.add("text-success");
            clearInterval(updateInterval);
        }
    }

    // Run immediately + every 3 seconds for smooth live feel
    updateDisplay();
    const updateInterval = setInterval(updateDisplay, 3000);

    // Optional: Reset for testing (remove later)
    // document.body.insertAdjacentHTML('beforeend', '<button onclick="localStorage.removeItem(\'vipGrowthProgress\');location.reload()" style="position:fixed;bottom:10px;left:10px;z-index:999;background:red;color:white;padding:10px;">Reset Growth</button>');
});