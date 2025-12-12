# How to Use the Unfollower Script (JavaScript)

This guide explains how to use the `unfollow_script.js` to unfollow users who do not follow you back on X (Twitter). This method runs directly in your browser and does not require API keys.

## ⚠️ Important Warning
**Use this script responsibly.** Running automation tools too fast or too frequently can trigger X's anti-spam systems, leading to temporary account locks or suspensions.
- The script is set to process a limited number of users per run (default: 50).
- Do not run this script multiple times in rapid succession.

## Step-by-Step Guide

### 1. Open Your "Following" Page
1.  Log in to [X.com](https://x.com).
2.  Go to your profile.
3.  Click on **Following** to see the list of people you follow (`https://x.com/YOUR_USERNAME/following`).

### 2. Open Developer Tools
You need to open the browser's Developer Console interact with the page.
- **Windows/Linux**: Press `F12` or `Ctrl + Shift + I`.
- **Mac**: Press `Cmd + Opt + I`.
- **Alternatively**: Right-click anywhere on the page and select **Inspect**.

Once open, click on the **Console** tab at the top of the Developer Tools window.

### 3. Copy the Script
Open the file `unfollow_script.js` in this repository and copy **all** of its content.

### 4. Run the Script
1.  Paste the copied code into the **Console** area.
2.  Press **Enter**.

### 5. Watch it Work
- The script will start scanning the users passing by on your screen.
- It looks for the "Follows you" badge / text.
- If a user **does not** follow you back, it will click the "Following" button and confirm the unfollow action.
- It will automatically scroll down to load more users.

### How to Stop
To stop the script immediately, simply **refresh the page** (`F5` or `Cmd + R`).

## Configuration (Optional)
If you want to change the settings, you can edit the `CONFIG` object at the top of the script before pasting it:

```javascript
const CONFIG = {
    MAX_UNFOLLOWS: 999999,  // Default: Run until done (effectively infinite)
    BATCH_SIZE: 50,         // Unfollow this many, then wait
    BATCH_COOLDOWN: 1800000, // Time to wait between batches (ms) - 30 minutes
    SCROLL_DELAY: 2000,     // Wait time after scrolling (ms)
    ACTION_DELAY: 1000,     // Wait time between unfollows (ms)
    SKIP_FOLLOWERS: true    // Set to false if you want to unfollow EVERYONE
};
```
