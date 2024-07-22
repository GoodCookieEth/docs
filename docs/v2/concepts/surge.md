---
sidebar_position: 5
---

# Surge Fee

**Surge fee** is an innovative mechanism in Bunni v2 designed to protect liquidity providers (LPs) from sandwiching attacks during autonomous liquidity modifications. This feature is crucial for maintaining the security and profitability of Bunni v2 pools, especially those that frequently update their liquidity distribution.

## The Problem: Sandwiching Attacks

When a pool's liquidity is autonomously updated (a "surge" occurs), whether due to [LDF](./ldf) updates, [rehypothecation](./rehypothication) yields, or [autonomous rebalances](./rebalancing), it can create a sandwiching opportunity. An attacker could potentially sandwich the update with two swaps and make a profit at the expense of the LPs.

## The Solution: Surge Fee

Bunni v2 addresses this issue by implementing a dynamic fee mechanism called Surge fee. Essentially, Bunni v2 starts a Dutch auction every time a pool surges, where the swap fee is initially set to a high value and gradually decreases over time back to normal.

## How Surge Fee Works

The surge fee is calculated using the following formula:

$$f_{surge} = f_{sMax} \cdot 2^{-\frac{t - \min(t_{surge}, t_{swap} + \tau_{auto})}{\tau}}$$

Where:
- $f_{surge}$ is the current surge fee
- $f_{sMax}$ is the maximum surge fee
- $t$ is the current timestamp
- $t_{surge}$ is the timestamp of the most recent surge
- $t_{swap}$ is the timestamp of the most recent swap
- $\tau_{auto}$ is the surge autostart time
- $\tau$ is the surge half-life

The actual swap fee is then computed as:

$$f = \max(f_{surge}, f_0)$$

Where $f_0$ is the regular swap fee.

## Key Components of Surge Fee

1. **Dutch Auction**: The fee starts high and decreases exponentially, allowing the market to determine the fair price for the MEV opportunity.

2. **Autostart Mechanism**: The $\min(t_{surge}, t_{swap} + \tau_{auto})$ term ensures that the surge fee automatically begins decreasing after $\tau_{auto}$ seconds since the last swap, preventing the pool from halting swaps indefinitely.

3. **Exponential Decay**: The use of exponential decay (with half-life $\tau$) allows for a rapid initial decrease in fee, followed by a more gradual approach to the normal fee level.

## Benefits of Surge Fee

1. **MEV Protection**: By capturing the majority of the potential MEV, surge fee protects LPs from losses due to sandwiching attacks.

2. **Efficiency**: The Dutch auction mechanism allows the market to efficiently price the MEV opportunity.

3. **Flexibility**: Pool creators can adjust parameters like $f_{sMax}$, $\tau_{auto}$, and $\tau$ to suit their specific needs and risk tolerance.

4. **Continuous Operation**: The autostart mechanism ensures that the pool continues to function even if no swaps occur immediately after a surge.

## Interaction with am-AMM

In pools where an [am-AMM](./amamm) manager is present, the manager has the option to enable or disable surge fees. This is because the am-AMM mechanism itself can help recapture MEV, potentially making surge fees unnecessary in some cases.

By implementing surge fee, Bunni v2 provides a robust defense against MEV extraction during liquidity updates, ensuring that LPs can confidently use advanced features like [shapeshifting](./shapeshifting) and [autonomous rebalancing](./rebalancing) without fear of exploitation.