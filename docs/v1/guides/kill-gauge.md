---
sidebar_position: 3
---

# Killing an out-of-range gauge

Bunni uses our [Uniswap Price-out-of-range oracle](https://github.com/timeless-fi/uniswap-poor-oracle) to determine if a gauge's position is out of range. If it is, then the gauge is killed and stops receiving oLIT rewards.

Killing an out-of-range gauge is a manual but simple process that can be done by anyone. The process is completely permissionless. Follow this guide to do so.

![](img/kill-gauge.png)

# Step 1: Start recording

Click "Start out-of-range recording" and submit the transaction in your wallet to start a recording.

If clicking the button does nothing, it may be because someone else has started a recording for this gauge that's currently active. Wait a bit to retry.

# Step 2: Finish recording

After between 60 and 90 minutes, click "Finish out-of-range recording" and submit the transaction in your wallet to finish the recording.

If the position was out-of-range for >50% of the recording, the oracle will mark it as out-of-range, and oLIT emissions to the gauge will automatically stop. In that case you should see "Current state" become "Out of range" after you finish the recording.