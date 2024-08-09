---
title: Hooklets
hide_table_of_contents: false
sidebar_position: 9
---

# Hooklets

Hooklets are a powerful feature in Bunni v2 that allow pool deployers to inject custom logic into various pool operations. This enables advanced strategies, customized behavior, and integration with external systems.

## Overview

Hooklets are smart contracts that implement the `IHooklet` interface. Each Bunni pool can have one hooklet attached to it. The least significant bits of the hooklet's address are used to flag which hooklet functions should be called.

## Key Features

1. **Operation Hooks**: Hooklets can execute custom logic before and after key operations like initialization, deposits, withdrawals, and swaps.
2. **Fee and Price Overrides**: Hooklets can override swap fees and spot prices before swaps, allowing for dynamic pricing strategies.
3. **Flexible Integration**: Pool deployers can implement custom strategies without modifying the core Bunni contracts.

## Hooklet Interface

### Initialize Hooks

```solidity
function beforeInitialize(address sender, IBunniHub.DeployBunniTokenParams calldata params)
    external
    returns (bytes4 selector);

function afterInitialize(
    address sender,
    IBunniHub.DeployBunniTokenParams calldata params,
    InitializeReturnData calldata returnData
) external returns (bytes4 selector);
```

These functions are called before and after a pool is initialized.

### Deposit Hooks

```solidity
function beforeDeposit(address sender, IBunniHub.DepositParams calldata params)
    external
    returns (bytes4 selector);

function afterDeposit(
    address sender,
    IBunniHub.DepositParams calldata params,
    DepositReturnData calldata returnData
) external returns (bytes4 selector);
```

These functions are called before and after a deposit operation.

### Withdraw Hooks

```solidity
function beforeWithdraw(address sender, IBunniHub.WithdrawParams calldata params)
    external
    returns (bytes4 selector);

function afterWithdraw(
    address sender,
    IBunniHub.WithdrawParams calldata params,
    WithdrawReturnData calldata returnData
) external returns (bytes4 selector);
```

These functions are called before and after a withdraw operation.

### Swap Hooks

```solidity
function beforeSwap(address sender, PoolKey calldata key, IPoolManager.SwapParams calldata params)
    external
    returns (bytes4 selector, bool feeOverriden, uint24 fee, bool priceOverridden, uint160 sqrtPriceX96);

function beforeSwapView(address sender, PoolKey calldata key, IPoolManager.SwapParams calldata params)
    external
    view
    returns (bytes4 selector, bool feeOverriden, uint24 fee, bool priceOverridden, uint160 sqrtPriceX96);

function afterSwap(
    address sender,
    PoolKey calldata key,
    IPoolManager.SwapParams calldata params,
    SwapReturnData calldata returnData
) external returns (bytes4 selector);
```

These functions are called before and after a swap operation. The `beforeSwap` function allows for overriding the swap fee and spot price. The `beforeSwapView` function is a view version used for computing swap quotes.

## Usage

To use a hooklet with a Bunni v2 pool:

1. Implement the `IHooklet` interface in your custom contract.
2. Set the appropriate flags in the least significant bits of your hooklet's address to indicate which functions should be called.
3. When deploying a new Bunni pool, specify the hooklet's address in the `DeployBunniTokenParams`.

## Hooklet Flags

The following flags are used to determine which hooklet functions are called:

```solidity
uint160 internal constant BEFORE_INITIALIZE_FLAG = 1 << 9;
uint160 internal constant AFTER_INITIALIZE_FLAG = 1 << 8;
uint160 internal constant BEFORE_DEPOSIT_FLAG = 1 << 7;
uint160 internal constant AFTER_DEPOSIT_FLAG = 1 << 6;
uint160 internal constant BEFORE_WITHDRAW_FLAG = 1 << 5;
uint160 internal constant AFTER_WITHDRAW_FLAG = 1 << 4;
uint160 internal constant BEFORE_SWAP_FLAG = 1 << 3;
uint160 internal constant BEFORE_SWAP_OVERRIDE_FEE_FLAG = 1 << 2;
uint160 internal constant BEFORE_SWAP_OVERRIDE_PRICE_FLAG = 1 << 1;
uint160 internal constant AFTER_SWAP_FLAG = 1;
```

## Important Considerations

1. Hooklets should be thoroughly tested and audited, as they can significantly impact pool behavior.
2. The `beforeSwap` and `beforeSwapView` functions should always return the same values for the same inputs to ensure consistency between quotes and actual swaps.
3. Fee and price overrides in the `beforeSwap` function are only applied if the corresponding permission flags are set.
4. Hooklet calls are subject to gas limits, so complex operations should be carefully optimized.

## Example Use Cases

1. **Dynamic Fee Adjustment**: Implement a hooklet that adjusts swap fees based on market volatility or other external factors.
2. **Price Oracles**: Use a hooklet to integrate external price feeds for more accurate pricing during low-liquidity periods.
3. **Trading Limits**: Implement deposit, withdrawal, or swap limits based on custom criteria.

By leveraging hooklets, Bunni v2 provides a flexible framework for customizing pool behavior and implementing advanced liquidity provision strategies.