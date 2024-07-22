---
sidebar_position: 6
---

# Rehypothecation

Rehypothecation is a feature in Bunni v2 that allows pools to earn additional yield by depositing idle assets into external protocols. This mechanism maximizes the efficiency of capital within the pool, potentially increasing returns for liquidity providers (LPs).

## What is Rehypothecation?

In the context of Bunni v2, rehypothecation refers to the process of depositing a portion of a pool's token reserves into external yield-generating protocols. This allows the pool to earn additional yield on assets that would otherwise be sitting idle.

Bunni v2 implements rehypothecation using [ERC-4626](https://eips.ethereum.org/EIPS/eip-4626) vaults. These standardized yield-bearing vaults allow for a flexible and composable approach to earning yield on idle assets.

### Supported Protocols

Yield-generating protocols that can be used for rehypothecation include (but not limited to):

- [Aave](https://aave.com/)
- [Yearn](https://yearn.fi/)
- [Gearbox](https://gearbox.fi/)
- [Morpho](https://morpho.org/)

Pool creators can specify which protocol(s) to use for rehypothecation when setting up the pool.

## How Rehypothecation Works

1. **Reserve Split**: When rehypothecation is enabled for a token, a portion of the pool's reserves for that token is stored in the specified ERC-4626 vault, while the rest is kept as raw tokens to facilitate swaps.

2. **Rebalancing**: After each swap, the pool potentially rebalances tokens between the vault reserves and the raw tokens based on predefined parameters.

3. **Rebalance Parameters**: For each token with rehypothecation enabled, there are three parameters that define its rebalance behavior:
   - $\phi_{min}$: Minimum ratio of raw tokens to total balance
   - $\phi_{max}$: Maximum ratio of raw tokens to total balance
   - $\phi_{target}$: Target ratio of raw tokens to total balance

4. **Rebalance Trigger**: When the ratio $\phi = \frac{rawTokenBalance}{totalBalance}$ goes outside the range $[\phi_{min}, \phi_{max}]$, the token is rebalanced between the vault reserves and the raw tokens so that $\phi = \phi_{target}$.

## Advantages

1. **Increased Yields**: LPs can earn additional yield on their deposited assets, potentially increasing overall returns.

2. **Capital Efficiency**: Idle assets are put to work, maximizing the efficiency of capital within the pool.

3. **Flexibility**: Pool creators can choose which tokens to rehypothecate and which protocols to use, allowing for customized strategies.

4. **Seamless Integration**: The use of ERC-4626 vaults allows for easy integration with a wide range of yield-generating protocols.

5. **Gas Cost Management**: By keeping a portion of assets as raw tokens, the pool can still facilitate swaps without frequent, expensive vault operations.

## Considerations

1. **Smart Contract Risk**: Using external protocols introduces additional smart contract risk. It's important to choose reputable, audited protocols for rehypothecation.

2. **Gas Costs**: Rebalancing between vault reserves and raw tokens incurs gas costs. The rebalance parameters should be set to balance yield generation with gas efficiency.

3. **Liquidity**: The portion of assets kept as raw tokens should be sufficient to handle expected swap volumes to avoid frequent rebalancing.

## Interaction with Other Bunni v2 Features

- [**Autonomous Rebalancing**](./rebalancing): Pools using rehypothecation should generally enable autonomous rebalancing to maximize token utilization.

- [**Surge Fees**](./surge): Pools using rehypothecation for both tokens should enable surge fees, as total liquidity will increase over time as yield accrues.

- [**Shapeshifting**](./shapeshifting): Rehypothecation can be particularly powerful when combined with shapeshifting strategies, allowing for dynamic allocation of capital based on market conditions.

By implementing rehypothecation, Bunni v2 provides LPs with a powerful tool to maximize returns on their deposited assets, further differentiating it from traditional AMM designs.