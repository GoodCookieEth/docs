---
sidebar_position: 7
---

# am-AMM

The **Auction-Managed Automated Market Maker (am-AMM)** is a key feature of Bunni v2 that addresses two critical challenges in AMM design: reducing losses to informed orderflow and maximizing revenue from uninformed orderflow. This mechanism, based on the work of [Adams et al.](https://arxiv.org/abs/2403.03367), allows Bunni v2 to recapture MEV (Miner Extractable Value) and optimize swap fee revenue.

## Key Components

1. **MEV Recapture**: Enables Bunni v2 to recapture MEV by giving a privileged position to a manager selected via competitive auction.

2. **Swap Fee Optimization**: Allows the am-AMM manager to set and adjust swap fees to maximize revenue.

3. **Withdrawal Delay**: Implements a mechanism to prevent strategic liquidity withdrawals that could harm the am-AMM manager's income.

## How am-AMM Works

### MEV Recapture

1. A competitive auction is held to select the am-AMM manager for a pool.
2. The winning manager gets a privileged position in capturing MEV from arbitrages and rebalancing swaps.
3. LPs indirectly receive the MEV via the auction proceeds.

### Swap Fee Optimization

1. The am-AMM manager receives all swap fee revenue from the pool.
2. The manager has the ability to set and adjust the swap fee value.
3. Bunni v2 allows for directional swap fees, where fees can differ based on the swap direction.

### Withdrawal Delay

To prevent strategic withdrawals that could harm the am-AMM manager's income, Bunni v2 implements a withdrawal delay:

1. When an LP initiates a withdrawal, it enters a queue.
2. The withdrawal is executed after a short delay (a few blocks).
3. This delay allows the am-AMM manager to monitor withdrawal transactions and execute necessary arbitrages.

## Benefits

1. **MEV Recapture**: LPs benefit from MEV that would otherwise be captured by external arbitrageurs.
2. **Optimized Fees**: The am-AMM manager is incentivized to set optimal fees, maximizing revenue for both the manager and LPs.
3. **Flexible Fee Structure**: The ability to set directional fees allows for more nuanced and efficient pricing.

## Considerations for LPs

While the am-AMM mechanism provides significant benefits, LPs should be aware of the following:

1. The effectiveness of the am-AMM depends on the competitiveness of the manager auction.
2. There is a short withdrawal delay when removing liquidity from the pool.
3. The am-AMM manager has significant control over the pool's fee structure and MEV capture strategies.

## Interaction with Other Bunni v2 Features

- [**Surge Fees**](./surge): The am-AMM manager of a pool may enable or disable surge fees based on their strategy and market conditions.
- [**Autonomous Rebalancing**](./rebalancing): The am-AMM manager is automatically whitelisted to execute rebalance swaps for their pool.
- [**Shapeshifting**](./shapeshifting): The am-AMM mechanism can help protect against MEV losses that might occur during shapeshifting operations.

By implementing the am-AMM mechanism, Bunni v2 creates a more efficient and profitable environment for LPs, aligning incentives between the protocol, LPs, and arbitrageurs.
