---
sidebar_position: 3
---

# Swaps

Swaps are a fundamental operation in any Automated Market Maker (AMM), and Bunni v2 introduces significant improvements to how they are executed. This section will explain the key features and benefits of Bunni v2's swap mechanism.

## Key Features

1. **Constant Gas Costs**: Unlike many other AMMs, the gas cost for swaps in Bunni v2 remains constant regardless of the number of ticks crossed.

2. **Efficient Large Swaps**: Bunni v2 is particularly efficient for large swaps that cross many ticks, making it attractive for high-volume traders.

3. **Liquidity Density Function (LDF) Integration**: Swaps in Bunni v2 leverage the power of LDFs to process trades efficiently.

## How Swaps Work

At a high level, the swap process in Bunni v2 can be broken down into these steps:

1. **Update Token Reserves**: The pool's balance of the input token is increased (or the output token decreased, for exact output swaps).

2. **Compute New Price**: Using the Inverse Cumulative Amount Function (ICAF), the pool calculates the new price after the swap.

3. **Determine Liquidity Distribution**: The pool queries the LDF at the new price to determine how liquidity should be distributed.

4. **Calculate Token Amounts**: Based on the new liquidity distribution, the pool calculates the new balances of both tokens.

5. **Finalize Swap**: The difference between the initial and final balances determines the actual input and output amounts of the swap.

## Advantages

### 1. Gas Efficiency

By using LDFs and ICAFs, Bunni v2 can process swaps across multiple ticks in a single operation. This results in constant gas costs, making Bunni v2 particularly efficient for large swaps.

### 2. Improved Liquidity Utilization

The integration with LDFs allows Bunni v2 to make optimal use of the available liquidity based on the current market conditions and liquidity provider preferences.

### 3. Flexibility

The swap mechanism in Bunni v2 works seamlessly with other features like shapeshifting and autonomous rebalancing, allowing for more sophisticated liquidity provision strategies.

### 4. Predictable Execution

The constant gas cost and efficient processing of large swaps make trade execution more predictable, which can be beneficial for traders implementing complex strategies.

## Price Impact and Slippage

The price impact of a swap in Bunni v2 is determined by the shape of the LDF. Generally:

- Pools with more concentrated liquidity around the current price will have lower price impact for small to medium-sized swaps.
- Very large swaps may experience higher slippage if they exhaust the concentrated liquidity.

Traders can estimate price impact before executing a trade by querying the pool's LDF and current state.

## Interaction with Other Bunni v2 Features

Swaps in Bunni v2 interact seamlessly with other protocol features:

- [**Shapeshifting**](./shapeshifting): The swap mechanism adapts automatically to changes in the liquidity distribution.
- [**Autonomous Rebalancing**](./rebalancing): Swaps can trigger rebalancing if they cause the token ratio to deviate significantly from the target.
- [**Surge Fees**](./surge): During periods of high volatility or after significant liquidity changes, swaps may incur surge fees to protect liquidity providers.

By redesigning how swaps are executed, Bunni v2 offers a more efficient, flexible, and powerful trading experience compared to traditional AMMs. This innovative approach to swaps is a key factor in Bunni v2's ability to provide superior liquidity and trading conditions.