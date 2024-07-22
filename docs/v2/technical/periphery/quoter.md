---
title: BunniQuoter
hide_table_of_contents: true
sidebar_position: 2
---

# BunniQuoter

BunniQuoter is a contract that provides quote functions for swaps, deposits, and withdrawals in the Bunni v2. It allows users to simulate these operations and get expected results without actually executing the transactions.

## Functions

### quoteSwap

```solidity
function quoteSwap(
    PoolKey memory key,
    IPoolManager.SwapParams memory params
) external view returns (
    bool success,
    uint160 updatedSqrtPriceX96,
    int24 updatedTick,
    uint256 inputAmount,
    uint256 outputAmount,
    uint24 swapFee,
    uint256 totalLiquidity
)
```

Simulates a swap operation and returns the expected results.

#### Parameters:

| Name     | Type                      | Description                       |
| -------- | ------------------------- | --------------------------------- |
| `key`    | struct PoolKey            | The pool key                      |
| `params` | IPoolManager.SwapParams   | The swap parameters               |

#### Return Values:

| Name                 | Type    | Description                                               |
| -------------------- | ------- | --------------------------------------------------------- |
| `success`            | bool    | Whether the swap simulation was successful                |
| `updatedSqrtPriceX96`| uint160 | The updated square root price after the simulated swap    |
| `updatedTick`        | int24   | The updated tick after the simulated swap                 |
| `inputAmount`        | uint256 | The amount of input token for the swap                    |
| `outputAmount`       | uint256 | The amount of output token from the swap                  |
| `swapFee`            | uint24  | The swap fee applied                                      |
| `totalLiquidity`     | uint256 | The total liquidity in the pool after the simulated swap  |

### quoteDeposit

```solidity
function quoteDeposit(
    IBunniHub.DepositParams calldata params
) external view returns (
    uint256 shares,
    uint256 amount0,
    uint256 amount1
)
```

Simulates a deposit operation and returns the expected results.

#### Parameters:

| Name     | Type                      | Description           |
| -------- | ------------------------- | --------------------- |
| `params` | IBunniHub.DepositParams   | The deposit parameters |

#### Return Values:

| Name      | Type    | Description                                          |
| --------- | ------- | ---------------------------------------------------- |
| `shares`  | uint256 | The expected number of shares to be minted           |
| `amount0` | uint256 | The expected amount of token0 to be deposited        |
| `amount1` | uint256 | The expected amount of token1 to be deposited        |

### quoteWithdraw

```solidity
function quoteWithdraw(
    IBunniHub.WithdrawParams calldata params
) external view returns (
    uint256 amount0,
    uint256 amount1
)
```

Simulates a withdrawal operation and returns the expected results.

#### Parameters:

| Name     | Type                       | Description            |
| -------- | -------------------------- | ---------------------- |
| `params` | IBunniHub.WithdrawParams   | The withdraw parameters |

#### Return Values:

| Name      | Type    | Description                                    |
| --------- | ------- | ---------------------------------------------- |
| `amount0` | uint256 | The expected amount of token0 to be withdrawn  |
| `amount1` | uint256 | The expected amount of token1 to be withdrawn  |