---
sidebar_position: 2
---

# Shapeshifting

**Shapeshifting** is a revolutionary feature of Bunni v2 that allows liquidity providers (LPs) to dynamically adjust their liquidity distribution. This feature makes AMM liquidity truly programmable, enabling developers and LPs to design liquidity strategies suited to their specific risk profiles and beliefs, as well as automatically respond to market changes.

## Types of Shapeshifting

Bunni v2 supports three types of shapeshifting:

1. **Shifting**: Changing the origin $\mu$ of the LDF, which shifts liquidity across the rick space.
   - Shifting can be enabled in both directions or be restricted to a single direction
2. **Morphing**: Modifying the parameters of the LDF to change the shape of the liquidity distribution.
3. **Switching**: Completely changing from one LDF to another.

## Examples of Shapeshifting Strategies

Here are some examples of how shapeshifting can be used:

- Automatically shift liquidity to concentrate around the market price to maximize swap fee revenue.
- Morph the liquidity distribution to decrease concentration when volatility is high and increase it when volatility is low.
- Switch between bearish and bullish LDFs to reflect changing beliefs in the market direction.

## Implementation Considerations

When implementing shapeshifting in a Bunni v2 pool, there are several factors to consider:

1. [**Autonomous Rebalancing**](./rebalancing): After shapeshifting, the ratio between the two tokens in the pool will likely be different from what the updated LDF specifies. Autonomous rebalancing is essential for such pools to maintain the desired token ratio.

2. **MEV Protection**: Shapeshifting potentially exposes MEV (Miner Extractable Value) to sandwich attackers. Bunni v2 uses surge fees and am-AMM to mitigate such losses.

3. **Gas Efficiency**: Thanks to the LDF design, shapeshifting operations in Bunni v2 have constant gas costs, regardless of the complexity of the liquidity distribution.

4. **Triggering Mechanisms**: Shapeshifting can be triggered manually by LPs or automatically based on various on-chain or off-chain signals (e.g., price oracles, volatility metrics, time-based rules).

By leveraging shapeshifting, Bunni v2 provides unprecedented flexibility and efficiency in liquidity management, allowing for sophisticated strategies that were previously impossible or impractical with traditional AMM designs.