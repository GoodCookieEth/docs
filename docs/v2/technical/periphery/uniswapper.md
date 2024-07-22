---
title: Uniswapper
hide_table_of_contents: true
sidebar_position: 3
---

# Uniswapper

`Uniswapper` is a contract that facilitates swaps on Uniswap V4 pools. It implements the `IUnlockCallback` interface to interact with the Uniswap V4 pool manager. It's only used during testing and for testnet deployments that don't have the official Uniswap v4 router available.

## Constructor

```solidity
constructor(IPoolManager poolManager_)
```

Initializes the contract with the given pool manager address.

### Parameters:

| Name           | Type         | Description                     |
| -------------- | ------------ | ------------------------------- |
| `poolManager_` | IPoolManager | The address of the pool manager |

## Functions

### swap

```solidity
function swap(
    PoolKey memory key,
    IPoolManager.SwapParams memory params,
    uint256 maxInput,
    uint256 minOutput
) external payable
```

Initiates a swap operation on a Uniswap V4 pool.

#### Parameters:

| Name        | Type                     | Description                                    |
| ----------- | ------------------------ | ---------------------------------------------- |
| `key`       | PoolKey                  | The key identifying the pool                   |
| `params`    | IPoolManager.SwapParams  | The parameters for the swap                    |
| `maxInput`  | uint256                  | The maximum input amount allowed for the swap  |
| `minOutput` | uint256                  | The minimum output amount required for the swap |

### unlockCallback

```solidity
function unlockCallback(bytes calldata data) external override returns (bytes memory)
```

Callback function called by the pool manager during the unlock process. It executes the swap and settles the currencies.

#### Parameters:

| Name   | Type  | Description                                        |
| ------ | ----- | -------------------------------------------------- |
| `data` | bytes | Encoded data containing swap details and limits    |

#### Returns:

| Type  | Description                      |
| ----- | -------------------------------- |
| bytes | Empty bytes (required by interface) |

## Usage

The `Uniswapper` contract provides a simple interface for users to execute swaps on Uniswap V4 pools. Here's how it works:

1. Users call the `swap` function with the desired pool key, swap parameters, and slippage protection limits (maxInput and minOutput).
2. The contract initiates the unlock process with the pool manager.
3. In the `unlockCallback`, the contract:
   - Executes the swap
   - Checks if the swap results are within the specified limits
   - Settles the currency transfers between the user and the pool manager
4. If the swap is successful and within limits, the currencies are transferred accordingly.

This contract ensures that swaps are executed safely within the specified limits and handles the complex interaction with the Uniswap V4 pool manager, including the lock/unlock mechanism and currency settlements.