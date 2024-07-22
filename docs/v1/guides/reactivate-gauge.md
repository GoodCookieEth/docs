---
sidebar_position: 4
---

# Reactivating a killed gauge

It's possible to reactivate a gauge that was killed due to being out-of-range but is now back in range. It uses the same process as killing an out-of-range gauge. It involves updating our [Uniswap Price-out-of-range oracle](https://github.com/timeless-fi/uniswap-poor-oracle) to show that the gauge's Uniswap position has now come back into range.

![](img/kill-gauge.png)

# Step 1: Start recording

Click "Start out-of-range recording" and submit the transaction in your wallet to start a recording.

If clicking the button does nothing, it may be because someone else has started a recording for this gauge that's currently active. Wait a bit to retry.

# Step 2: Finish recording

After between 60 and 90 minutes, click "Finish out-of-range recording" and submit the transaction in your wallet to finish the recording.

If the position was in-range for >50% of the recording, the oracle will mark it as in-range, and oLIT emissions to the gauge will automatically resume. In that case you should see "Current state" become "In range" after you finish the recording.