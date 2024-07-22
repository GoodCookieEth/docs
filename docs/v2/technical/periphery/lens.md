---
title: BunniLens
hide_table_of_contents: true
sidebar_position: 1
---

# BunniLens

BunniLens is a contract that provides view functions for analyzing the state of Bunni pools. It allows users to query additional information about pool liquidity and pricing that is not directly exposed by other contracts.

## Immutable parameters

### hub

```solidity
IBunniHub public immutable hub;
```

The address of the BunniHub contract.

## Constructor

```solidity
constructor(IBunniHub hub_)
```

Initializes the BunniLens contract with the address of the BunniHub contract.

#### Parameters:

| Name   | Type      | Description                    |
| ------ | --------- | ------------------------------ |
| `hub_` | IBunniHub | The address of the BunniHub contract |

## Functions

### getExcessLiquidity

```solidity
function getExcessLiquidity(PoolKey calldata key)
    external
    view
    returns (
        uint256 excessLiquidity0,
        uint256 excessLiquidity1,
        uint256 totalLiquidity
    )
```

Calculates the excess liquidity and total liquidity for a given pool.

#### Parameters:

| Name  | Type           | Description                       |
| ----- | -------------- | --------------------------------- |
| `key` | struct PoolKey | The key of the pool to analyze    |

#### Return Values:

| Name               | Type    | Description                                               |
| ------------------ | ------- | --------------------------------------------------------- |
| `excessLiquidity0` | uint256 | The excess liquidity of token0                            |
| `excessLiquidity1` | uint256 | The excess liquidity of token1                            |
| `totalLiquidity`   | uint256 | The total liquidity in the pool                           |

## Usage

The BunniLens contract provides a way to analyze the state of Bunni pools, particularly focusing on liquidity calculations. Here are some key points about its usage:

1. It uses the BunniHub contract to access pool states and other necessary information.
2. The `getExcessLiquidity` function is the main external function that users can call to get information about a pool's liquidity state.
3. It calculates excess liquidity for both tokens in the pool, which represents the amount of liquidity that exceeds what's currently active in the pool based on the current price and liquidity distribution function (LDF).
4. The contract also calculates the total liquidity in the pool, which includes both active and excess liquidity.
5. It uses Time-Weighted Average Price (TWAP) for certain calculations when specified in the pool's configuration.

This contract is particularly useful for:
- Analyzing the efficiency of liquidity provision in a pool
- Understanding the distribution of liquidity across different price ranges
- Helping liquidity providers make informed decisions about their positions

Note that this contract is for view-only operations and does not modify any state.