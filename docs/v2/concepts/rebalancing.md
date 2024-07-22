---
title: Autonomous Rebalancing
hide_table_of_contents: false
sidebar_position: 4
---

# Autonomous Rebalancing

**Autonomous rebalancing** is a key feature of Bunni v2 that enables pools to maintain optimal token ratios without requiring external keepers. This is particularly important for pools that use [shapeshifting](./shapeshifting) and/or [rehypothecation](./rehypothication).

## Why Autonomous Rebalancing?

When a Bunni v2 pool's [Liquidity Density Function (LDF)](./ldf) shifts or changes shape, the current ratio between the two tokens in the pool will likely be different from what the updated LDF specifies. Rebalancing is necessary to maximize the utilization rate of the token reserves and ensure that the pool can provide the best possible liquidity for swaps.

## How Autonomous Rebalancing Works

Bunni v2's autonomous rebalancing system consists of three main components:

1. Detecting imbalances
2. Determining rebalance parameters
3. Executing rebalance swaps

### Detecting Imbalances

After each swap, if the LDF has been updated since the previous swap, the pool computes the excess liquidity and initiates a rebalance if it is greater than a threshold proportion of the total liquidity.

The excess liquidity $e_i$ for token $i$ is defined as:

$$e_i = \frac{a_i}{\max_r \frac{A_i}{L}(r)}$$

where $a_i$ is the excess token amount and $\frac{A_i}{L}(r)$ is the cumulative amount function per total liquidity unit.

A rebalance is initiated if $\max(\frac{e_0}{L}, \frac{e_1}{L}) \geq \tau$, where $\tau$ is a threshold value.

### Determining Rebalance Parameters

When a rebalance is needed, the pool computes the optimal swap parameters using the following process:

1. Query the Time-Weighted Average Price (TWAP) oracle to get the average square root price $\bar{p}$ and the corresponding rick $\bar{r}$.

2. Compute total token densities using the TWAP value:
   $$t_0 = \frac{A_0}{L}(\bar{r} + w) + (\frac{1}{\bar{p}} - \frac{1}{p_{\bar{r}+w}})$$
   $$t_1 = \frac{A_1}{L}(\bar{r} - w) + (\bar{p} - p_{\bar{r}})$$

3. Compute target token amounts $g_0$ and $g_1$:
   $$g_0 = e_0t_0, g_1 = e_0t_1$$

4. Submit an intent to swap $a_0 - g_0$ of token₀ for at least $\gamma g_1$ of token₁, where $\gamma \in (0, 1]$ is the slippage parameter.

### Executing Rebalance Swaps

Bunni v2 uses [flood.bid](https://flood.bid), an intent-based DEX aggregator, to execute rebalance swaps. This allows the pool to broadcast a swap intent on-chain and let off-chain solvers provide optimal swap execution.

To protect against malicious solvers, Bunni v2 uses a whitelist of approved solvers. This whitelist is primarily set by governance, but the [am-AMM](./amamm) manager of a pool is also automatically part of the whitelist for that pool.

## Benefits

1. **Efficiency**: Maximizes the utilization of token reserves, ensuring optimal liquidity provision.
2. **Automation**: Eliminates the need for external keepers to monitor and rebalance pools.
3. **Flexibility**: Enables more dynamic liquidity strategies through shapeshifting without manual intervention.
4. **MEV Capture**: By using the [am-AMM](./amamm) mechanism, any MEV from rebalance swaps can be recaptured for the benefit of LPs.