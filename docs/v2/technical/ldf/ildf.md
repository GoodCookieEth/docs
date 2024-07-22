---
title: ILiquidityDensityFunction
hide_table_of_contents: false
sidebar_position: 2
---

# ILiquidityDensityFunction

ILiquidityDensityFunction is an interface for liquidity density functions (LDFs) that dictate how liquidity is distributed over a pool's rounded ticks. Each rounded tick is identified by its leftmost tick, which is a multiple of `tickSpacing`. The liquidity density of all rounded ticks should add up to 1, similar to probability density functions (PDFs). It enables arbitrary liquidity shapes, shifting liquidity across ticks, and switching from one liquidity shape to another.

## Functions

### query

```solidity
function query(
    PoolKey calldata key,
    int24 roundedTick,
    int24 twapTick,
    int24 spotPriceTick,
    bytes32 ldfParams,
    bytes32 ldfState
) external view returns (
    uint256 liquidityDensityX96,
    uint256 cumulativeAmount0DensityX96,
    uint256 cumulativeAmount1DensityX96,
    bytes32 newLdfState,
    bool shouldSurge
)
```

Queries the liquidity density function for the given pool and rounded tick.

#### Parameters:

| Name            | Type           | Description                                         |
| --------------- | -------------- | --------------------------------------------------- |
| `key`           | struct PoolKey | The key of the Uniswap v4 pool                      |
| `roundedTick`   | int24          | The rounded tick to query                           |
| `twapTick`      | int24          | The TWAP tick. Is 0 if `twapSecondsAgo` is 0        |
| `spotPriceTick` | int24          | The spot price tick                                 |
| `ldfParams`     | bytes32        | The parameters for the liquidity density function   |
| `ldfState`      | bytes32        | The current state of the liquidity density function |

#### Return Values:

| Name                          | Type    | Description                                                                                              |
| ----------------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `liquidityDensityX96`         | uint256 | The density of the rounded tick, scaled by Q96                                                           |
| `cumulativeAmount0DensityX96` | uint256 | The cumulative token0 density in rounded ticks [roundedTick + tickSpacing, maxUsableTick], scaled by Q96 |
| `cumulativeAmount1DensityX96` | uint256 | The cumulative token1 density in rounded ticks [minUsableTick, roundedTick - tickSpacing], scaled by Q96 |
| `newLdfState`                 | bytes32 | The new state of the liquidity density function                                                          |
| `shouldSurge`                 | bool    | Whether the pool should surge. Usually corresponds to whether the LDF has shifted / changed shape        |

### computeSwap

```solidity
function computeSwap(
    PoolKey calldata key,
    uint256 inverseCumulativeAmountInput,
    uint256 totalLiquidity,
    bool zeroForOne,
    bool exactIn,
    int24 twapTick,
    int24 spotPriceTick,
    bytes32 ldfParams,
    bytes32 ldfState
) external view returns (
    bool success,
    int24 roundedTick,
    uint256 cumulativeAmount,
    uint256 swapLiquidity
)
```

Aggregates LDF queries used during a swap.

A Bunni swap uses the inverseCumulativeAmount function to compute the rounded tick for which the cumulativeAmount is the closest to `inverseCumulativeAmountInput` and <= `inverseCumulativeAmountInput`. This rounded tick is the starting point for swapping the remaining tokens, which is done via Uniswap math (not done in this function though). `cumulativeAmount` is the closest to `inverseCumulativeAmountInput` and <= `inverseCumulativeAmountInput`. `swapLiquidity` is the liquidity used for the remainder swap.

#### Parameters:

| Name                           | Type           | Description                                              |
| ------------------------------ | -------------- | -------------------------------------------------------- |
| `key`                          | struct PoolKey | The key of the Uniswap v4 pool                           |
| `inverseCumulativeAmountInput` | uint256        | The input to the inverseCumulativeAmount function        |
| `totalLiquidity`               | uint256        | The total liquidity in the pool                          |
| `zeroForOne`                   | bool           | Whether the input token is token0                        |
| `exactIn`                      | bool           | Whether it's an exact input swap or an exact output swap |
| `twapTick`                     | int24          | The TWAP tick. Is 0 if `twapSecondsAgo` is 0             |
| `spotPriceTick`                | int24          | The spot price tick                                      |
| `ldfParams`                    | bytes32        | The parameters for the liquidity density function        |
| `ldfState`                     | bytes32        | The current state of the liquidity density function      |

#### Return Values:

| Name               | Type    | Description                                                                                                  |
| ------------------ | ------- | ------------------------------------------------------------------------------------------------------------ |
| `success`          | bool    | Whether the swap computation was successful                                                                  |
| `roundedTick`      | int24   | The rounded tick to start the remainder swap from                                                            |
| `cumulativeAmount` | uint256 | The cumulative amount that's closest to `inverseCumulativeAmountInput` and <= `inverseCumulativeAmountInput` |
| `swapLiquidity`    | uint256 | The liquidity used for the remainder swap                                                                    |

### isValidParams

```solidity
function isValidParams(
    PoolKey calldata key,
    uint24 twapSecondsAgo,
    bytes32 ldfParams
) external view returns (bool)
```

Checks if the given LDF parameters are valid.

#### Parameters:

| Name             | Type           | Description                                       |
| ---------------- | -------------- | ------------------------------------------------- |
| `key`            | struct PoolKey | The key of the Uniswap v4 pool                    |
| `twapSecondsAgo` | uint24         | The time window for the TWAP                      |
| `ldfParams`      | bytes32        | The parameters for the liquidity density function |

#### Return Value:

| Type | Description                      |
| ---- | -------------------------------- |
| bool | Whether the parameters are valid |

### cumulativeAmount0

```solidity
function cumulativeAmount0(
    PoolKey calldata key,
    int24 roundedTick,
    uint256 totalLiquidity,
    int24 twapTick,
    int24 spotPriceTick,
    bytes32 ldfParams,
    bytes32 ldfState
) external view returns (uint256)
```

Computes the cumulative amount of token0 in the rounded ticks [roundedTick, maxUsableTick].

#### Parameters:

| Name             | Type           | Description                                         |
| ---------------- | -------------- | --------------------------------------------------- |
| `key`            | struct PoolKey | The key of the Uniswap v4 pool                      |
| `roundedTick`    | int24          | The rounded tick to query                           |
| `totalLiquidity` | uint256        | The total liquidity in the pool                     |
| `twapTick`       | int24          | The TWAP tick. Is 0 if `twapSecondsAgo` is 0        |
| `spotPriceTick`  | int24          | The spot price tick                                 |
| `ldfParams`      | bytes32        | The parameters for the liquidity density function   |
| `ldfState`       | bytes32        | The current state of the liquidity density function |

#### Return Value:

| Type    | Description                                                                       |
| ------- | --------------------------------------------------------------------------------- |
| uint256 | The cumulative amount of token0 in the rounded ticks [roundedTick, maxUsableTick] |

### cumulativeAmount1

```solidity
function cumulativeAmount1(
    PoolKey calldata key,
    int24 roundedTick,
    uint256 totalLiquidity,
    int24 twapTick,
    int24 spotPriceTick,
    bytes32 ldfParams,
    bytes32 ldfState
) external view returns (uint256)
```

Computes the cumulative amount of token1 in the rounded ticks [minUsableTick, roundedTick].

#### Parameters:

| Name             | Type           | Description                                         |
| ---------------- | -------------- | --------------------------------------------------- |
| `key`            | struct PoolKey | The key of the Uniswap v4 pool                      |
| `roundedTick`    | int24          | The rounded tick to query                           |
| `totalLiquidity` | uint256        | The total liquidity in the pool                     |
| `twapTick`       | int24          | The TWAP tick. Is 0 if `twapSecondsAgo` is 0        |
| `spotPriceTick`  | int24          | The spot price tick                                 |
| `ldfParams`      | bytes32        | The parameters for the liquidity density function   |
| `ldfState`       | bytes32        | The current state of the liquidity density function |

#### Return Value:

| Type    | Description                                                                       |
| ------- | --------------------------------------------------------------------------------- |
| uint256 | The cumulative amount of token1 in the rounded ticks [minUsableTick, roundedTick] |

## Usage

The ILiquidityDensityFunction interface provides a standardized way to define and interact with liquidity density functions in the Bunni ecosystem. Here are some key points about its usage:

1. It allows for the creation of arbitrary liquidity shapes, enabling complex strategies for liquidity provision.
2. The interface supports shifting liquidity across ticks and switching between different liquidity shapes.
3. It provides functions for querying the liquidity density at specific ticks and computing cumulative amounts of tokens across tick ranges.
4. The `computeSwap` function is crucial for determining how a swap should be executed given the current liquidity distribution.
5. It uses a combination of parameters and state to allow for dynamic and stateful liquidity density functions.

This interface is particularly useful for:

- Implementing custom liquidity distribution strategies
- Integrating with Bunni's swap mechanism
- Analyzing the distribution of liquidity in a pool
- Creating advanced automated market-making strategies

Developers implementing this interface should ensure that their implementation adheres to the expected behavior, particularly in terms of normalization (the sum of liquidity densities across all rounded ticks should equal 1) and the relationship between the query function and the cumulative amount functions.
