/**
 * X (Twitter) Unfollower Script
 * 
 * INSTRUCTIONS:
 * 1. Go to https://x.com/YOUR_USERNAME/following
 * 2. Open Developer Tools (F12 or Right Click > Inspect).
 * 3. Go to the "Console" tab.
 * 4. Copy and paste this entire script into the console and press Enter.
 * 
 * SAFETY WARNING:
 * - Running this too fast can get your account flagged or temporarily locked.
 * - The `MAX_UNFOLLOWS` variable limits how many actions are taken per run.
 * - Refresh the page to stop the script immediately.
 */

(function() {
    const CONFIG = {
        MAX_UNFOLLOWS: 50,      // Stop after this many unfollows
        SCROLL_DELAY: 2000,     // Time to wait after scrolling (ms)
        ACTION_DELAY: 1000,     // Time to wait between actions (ms)
        SKIP_FOLLOWERS: true    // If true, only unfollows those who DON'T follow you back
    };

    let unfollowedCount = 0;
    
    // Helper to sleep
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    async function processUserCells() {
        if (unfollowedCount >= CONFIG.MAX_UNFOLLOWS) {
            console.log("✅ Reached maximum unfollow limit. Stopping.");
            return;
        }

        // Select all user cells on the current view
        // Identifying selectors can be tricky as X changes generic class names.
        // We look for the "UserCell" container.
        const userCells = Array.from(document.querySelectorAll('[data-testid="UserCell"]'));

        console.log(`🔍 Found ${userCells.length} users on screen...`);

        for (const cell of userCells) {
            if (unfollowedCount >= CONFIG.MAX_UNFOLLOWS) break;

            try {
                // Check if they follow you
                // The "Follows you" badge usually determines this.
                // We look for the text "Follows you" within the cell.
                const cellText = cell.innerText || "";
                const followsYou = cellText.includes("Follows you") || cellText.includes("Te sigue");

                if (CONFIG.SKIP_FOLLOWERS && followsYou) {
                    console.log("Skipping user (Follows you).");
                    continue;
                }

                // Find the Unfollow button.
                // On the "Following" page, the button usually says "Following" or "Siguiendo".
                // When hovered/clicked it triggers the unfollow modal.
                // Depending on the state, we look for the button element.
                const button = cell.querySelector('[data-testid$="-unfollow"]') || cell.querySelector('[aria-label*="Following"]');
                
                if (button) {
                    // Click the button to initiate unfollow
                    button.click();
                    await sleep(500); // Wait for modal

                    // Confirm unfollow in the modal
                    // The confirmation button usually has a specific testid
                    const confirmButton = document.querySelector('[data-testid="confirmationSheetConfirm"]');
                    if (confirmButton) {
                        confirmButton.click();
                        unfollowedCount++;
                        console.log(`🚫 Unfollowed user #${unfollowedCount}`);
                        await sleep(CONFIG.ACTION_DELAY);
                    } else {
                        console.log("Could not find confirmation button.");
                    }
                }
            } catch (err) {
                console.error("Error processing user:", err);
            }
        }

        // Scroll down to load more
        window.scrollBy(0, window.innerHeight);
        await sleep(CONFIG.SCROLL_DELAY);

        // Recursive call to keep going
        processUserCells();
    }

    console.log("🚀 Starting Unfollower Script...");
    processUserCells();

})();
