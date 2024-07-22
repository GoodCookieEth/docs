---
title: BunniHook
hide_table_of_contents: false
sidebar_position: 2
---

# BunniHook

BunniHook is a Uniswap v4 hook responsible for handling swaps on Bunni. It implements auto-rebalancing executed via FloodPlain and uses am-AMM to recapture LVR & MEV.

## Structs and Enums

### BoolOverride

```solidity
enum BoolOverride {
    UNSET,
    TRUE,
    FALSE
}
```

### ObservationState

```solidity
struct ObservationState {
    uint32 index;
    uint32 cardinality;
    uint32 cardinalityNext;
    Oracle.Observation intermediateObservation;
}
```

### RebalanceOrderHookArgs

```solidity
struct RebalanceOrderHookArgs {
    PoolKey key;
    RebalanceOrderPreHookArgs preHookArgs;
    RebalanceOrderPostHookArgs postHookArgs;
}
```

### RebalanceOrderPreHookArgs

```solidity
struct RebalanceOrderPreHookArgs {
    Currency currency;
    uint256 amount;
}
```

### RebalanceOrderPostHookArgs

```solidity
struct RebalanceOrderPostHookArgs {
    Currency currency;
}
```

## Functions

### getObservation

```solidity
function getObservation(
    PoolKey calldata key,
    uint256 index
) external view returns (Oracle.Observation memory observation)
```

Returns the observation for the given pool key and observation index.

#### Parameters:

| Name    | Type           | Description              |
| ------- | -------------- | ------------------------ |
| `key`   | struct PoolKey | The pool key             |
| `index` | uint256        | The observation index    |

#### Return Value:

| Name          | Type                  | Description            |
| ------------- | --------------------- | ---------------------- |
| `observation` | Oracle.Observation    | The observation struct |

### getState

```solidity
function getState(
    PoolKey calldata key
) external view returns (ObservationState memory state)
```

Returns the TWAP oracle observation state for the given pool key.

#### Parameters:

| Name  | Type           | Description  |
| ----- | -------------- | ------------ |
| `key` | struct PoolKey | The pool key |

#### Return Value:

| Name    | Type              | Description     |
| ------- | ----------------- | --------------- |
| `state` | ObservationState  | The state struct |

### observe

```solidity
function observe(
    PoolKey calldata key,
    uint32[] calldata secondsAgos
) external view returns (int56[] memory tickCumulatives)
```

Observe the given pool for the timestamps.

#### Parameters:

| Name          | Type           | Description                    |
| ------------- | -------------- | ------------------------------ |
| `key`         | struct PoolKey | The pool key                   |
| `secondsAgos` | uint32[]       | The timestamps to observe      |

#### Return Value:

| Name              | Type    | Description                                    |
| ----------------- | ------- | ---------------------------------------------- |
| `tickCumulatives` | int56[] | The tick cumulatives for the given timestamps |

### isValidParams

```solidity
function isValidParams(
    bytes calldata hookParams
) external view returns (bool)
```

Validates if the given hook params are valid.

#### Parameters:

| Name         | Type    | Description       |
| ------------ | ------- | ----------------- |
| `hookParams` | bytes   | The hook params   |

#### Return Value:

| Name      | Type | Description                              |
| --------- | ---- | ---------------------------------------- |
| `isValid` | bool | True if the hook params are valid        |

### ldfStates

```solidity
function ldfStates(
    PoolId id
) external view returns (bytes32)
```

The LDF state of a given pool. Used for evaluating the LDF.

#### Parameters:

| Name | Type   | Description |
| ---- | ------ | ----------- |
| `id` | PoolId | The pool id |

#### Return Value:

| Type    | Description     |
| ------- | --------------- |
| bytes32 | The LDF state   |

### slot0s

```solidity
function slot0s(
    PoolId id
) external view returns (
    uint160 sqrtPriceX96,
    int24 tick,
    uint32 lastSwapTimestamp,
    uint32 lastSurgeTimestamp
)
```

The slot0 state of a given pool.

#### Parameters:

| Name | Type   | Description |
| ---- | ------ | ----------- |
| `id` | PoolId | The pool id |

#### Return Values:

| Name                 | Type    | Description                           |
| -------------------- | ------- | ------------------------------------- |
| `sqrtPriceX96`       | uint160 | The square root price                 |
| `tick`               | int24   | The tick of the pool                  |
| `lastSwapTimestamp`  | uint32  | The timestamp of the last swap        |
| `lastSurgeTimestamp` | uint32  | The timestamp of the last surge       |

### vaultSharePricesAtLastSwap

```solidity
function vaultSharePricesAtLastSwap(
    PoolId id
) external view returns (
    bool initialized,
    uint120 sharePrice0,
    uint120 sharePrice1
)
```

The share prices of the vaults used by the pool at the last swap.

#### Parameters:

| Name | Type   | Description |
| ---- | ------ | ----------- |
| `id` | PoolId | The pool id |

#### Return Values:

| Name          | Type    | Description                                                                    |
| ------------- | ------- | ------------------------------------------------------------------------------ |
| `initialized` | bool    | True if the share prices have been initialized                                 |
| `sharePrice0` | uint120 | The underlying assets each share of vault0 represents, scaled by 1e18          |
| `sharePrice1` | uint120 | The underlying assets each share of vault1 represents, scaled by 1e18          |

### getAmAmmEnabled

```solidity
function getAmAmmEnabled(
    PoolId id
) external view returns (bool)
```

Returns whether am-AMM is enabled for the given pool.

#### Parameters:

| Name | Type   | Description |
| ---- | ------ | ----------- |
| `id` | PoolId | The pool id |

#### Return Value:

| Type | Description                                |
| ---- | ------------------------------------------ |
| bool | True if am-AMM is enabled for the pool     |

### increaseCardinalityNext

```solidity
function increaseCardinalityNext(
    PoolKey calldata key,
    uint32 cardinalityNext
) external returns (
    uint32 cardinalityNextOld,
    uint32 cardinalityNextNew
)
```

Increase the cardinality target for the given pool.

#### Parameters:

| Name               | Type           | Description                  |
| ------------------ | -------------- | ---------------------------- |
| `key`              | struct PoolKey | The pool key                 |
| `cardinalityNext`  | uint32         | The new cardinality target   |

#### Return Values:

| Name                  | Type   | Description                    |
| --------------------- | ------ | ------------------------------ |
| `cardinalityNextOld`  | uint32 | The old cardinality target     |
| `cardinalityNextNew`  | uint32 | The new cardinality target     |

### updateLdfState

```solidity
function updateLdfState(
    PoolId id,
    bytes32 newState
) external
```

Update the LDF state of the given pool. Only callable by BunniHub.

#### Parameters:

| Name       | Type    | Description        |
| ---------- | ------- | ------------------ |
| `id`       | PoolId  | The pool id        |
| `newState` | bytes32 | The new LDF state  |

### claimProtocolFees

```solidity
function claimProtocolFees(
    Currency[] calldata currencyList,
    address recipient
) external
```

Claim protocol fees for the given currency list. Only callable by the owner.

#### Parameters:

| Name           | Type       | Description                           |
| -------------- | ---------- | ------------------------------------- |
| `currencyList` | Currency[] | The list of currencies to claim fees for |
| `recipient`    | address    | The recipient of the fees             |

### setZone

```solidity
function setZone(
    IZone zone
) external
```

Set the FloodZone contract address. Only callable by the owner.

#### Parameters:

| Name   | Type  | Description                           |
| ------ | ----- | ------------------------------------- |
| `zone` | IZone | The new FloodZone contract address    |

### setModifiers

```solidity
function setModifiers(
    uint32 newHookFeeModifier,
    uint32 newReferralRewardModifier
) external
```

Set the hook fee & referral reward params. Only callable by the owner.

#### Parameters:

| Name                        | Type   | Description                                |
| --------------------------- | ------ | ------------------------------------------ |
| `newHookFeeModifier`        | uint32 | The new hook fee modifier. 6 decimals.     |
| `newReferralRewardModifier` | uint32 | The new referral reward modifier. 6 decimals. |

### setAmAmmEnabledOverride

```solidity
function setAmAmmEnabledOverride(
    PoolId id,
    BoolOverride boolOverride
) external
```

Overrides amAmmEnabled for the given pool. Only callable by the owner.

#### Parameters:

| Name           | Type         | Description             |
| -------------- | ------------ | ----------------------- |
| `id`           | PoolId       | The pool id             |
| `boolOverride` | BoolOverride | The new override value  |

### setGlobalAmAmmEnabledOverride

```solidity
function setGlobalAmAmmEnabledOverride(
    BoolOverride boolOverride
) external
```

Overrides amAmmEnabled for all pools. Only callable by the owner.

#### Parameters:

| Name           | Type         | Description             |
| -------------- | ------------ | ----------------------- |
| `boolOverride` | BoolOverride | The new override value  |

### rebalanceOrderPreHook

```solidity
function rebalanceOrderPreHook(
    RebalanceOrderHookArgs calldata hookArgs
) external
```

Called by the FloodPlain contract prior to executing a rebalance order. Should ensure the hook has exactly `hookArgs.preHookArgs.amount` tokens of `hookArgs.preHookArgs.currency` upon return.

#### Parameters:

| Name       | Type                      | Description                           |
| ---------- | ------------------------- | ------------------------------------- |
| `hookArgs` | RebalanceOrderHookArgs    | The rebalance order hook arguments    |

### rebalanceOrderPostHook

```solidity
function rebalanceOrderPostHook(
    RebalanceOrderHookArgs calldata hookArgs
) external
```

Called by the FloodPlain contract after executing a rebalance order. Should transfer any output tokens from the order to BunniHub and update pool balances.

#### Parameters:

| Name       | Type                      | Description                           |
| ---------- | ------------------------- | ------------------------------------- |
| `hookArgs` | RebalanceOrderHookArgs    | The rebalance order hook arguments    |

## Events

### Swap

```solidity
event Swap(
    PoolId indexed id,
    address indexed sender,
    bool zeroForOne,
    uint256 inputAmount,
    uint256 outputAmount,
    uint160 sqrtPriceX96,
    int24 tick,
    uint24 fee,
    uint256 totalLiquidity
)
```

Emitted for swaps between currency0 and currency1.

#### Parameters:

| Name             | Type    | Description                                                              |
| ---------------- | ------- | ------------------------------------------------------------------------ |
| `id`             | PoolId  | The abi encoded hash of the pool key struct for the pool that was modified |
| `sender`         | address | The address that initiated the swap call, and that received the callback |
| `zeroForOne`     | bool    | True if swapping token0 for token1, false otherwise                      |
| `inputAmount`    | uint256 | The input token amount                                                   |
| `outputAmount`   | uint256 | The output token amount                                                  |
| `sqrtPriceX96`   | uint160 | The sqrt(price) of the pool after the swap, as a Q64.96                  |
| `tick`           | int24   | The log base 1.0001 of the price of the pool after the swap              |
| `fee`            | uint24  | The swap fee rate charged, 6 decimals                                    |
| `totalLiquidity` | uint256 | The total virtual liquidity of the pool during and after the swap        |

### SetZone

```solidity
event SetZone(IZone zone)
```

Emitted when the FloodZone contract address is set.

#### Parameters:

| Name   | Type  | Description                        |
| ------ | ----- | ---------------------------------- |
| `zone` | IZone | The new FloodZone contract address |

### SetModifiers

```solidity
event SetModifiers(uint32 indexed hookFeeModifier, uint32 indexed referrerRewardModifier)
```

Emitted when the hook fee and referral reward modifiers are set.

#### Parameters:

| Name                     | Type   | Description                      |
| ------------------------ | ------ | -------------------------------- |
| `hookFeeModifier`        | uint32 | The new hook fee modifier        |
| `referrerRewardModifier` | uint32 | The new referral reward modifier |

### SetAmAmmEnabledOverride

```solidity
event SetAmAmmEnabledOverride(PoolId indexed id, BoolOverride indexed boolOverride)
```

Emitted when the am-AMM enabled override is set for a specific pool.

#### Parameters:

| Name           | Type         | Description             |
| -------------- | ------------ | ----------------------- |
| `id`           | PoolId       | The pool id             |
| `boolOverride` | BoolOverride | The new override value  |

### SetGlobalAmAmmEnabledOverride

```solidity
event SetGlobalAmAmmEnabledOverride(BoolOverride indexed boolOverride)
```

Emitted when the global am-AMM enabled override is set.

#### Parameters:

| Name           | Type         | Description             |
| -------------- | ------------ | ----------------------- |
| `boolOverride` | BoolOverride | The new override value  |

### Swap

```solidity
event Swap(
    PoolId indexed id,
    address indexed sender,
    bool zeroForOne,
    uint256 inputAmount,
    uint256 outputAmount,
    uint160 sqrtPriceX96,
    int24 tick,
    uint24 fee,
    uint256 totalLiquidity
)
```

Emitted for swaps between currency0 and currency1.

#### Parameters:

| Name             | Type    | Description                                                              |
| ---------------- | ------- | ------------------------------------------------------------------------ |
| `id`             | PoolId  | The abi encoded hash of the pool key struct for the pool that was modified |
| `sender`         | address | The address that initiated the swap call, and that received the callback |
| `zeroForOne`     | bool    | True if swapping token0 for token1, false otherwise                      |
| `inputAmount`    | uint256 | The input token amount                                                   |
| `outputAmount`   | uint256 | The output token amount                                                  |
| `sqrtPriceX96`   | uint160 | The sqrt(price) of the pool after the swap, as a Q64.96                  |
| `tick`           | int24   | The log base 1.0001 of the price of the pool after the swap              |
| `fee`            | uint24  | The swap fee rate charged, 6 decimals                                    |
| `totalLiquidity` | uint256 | The total virtual liquidity of the pool during and after the swap        |

### SetZone

```solidity
event SetZone(IZone zone)
```

Emitted when the FloodZone contract address is set.

#### Parameters:

| Name   | Type  | Description                        |
| ------ | ----- | ---------------------------------- |
| `zone` | IZone | The new FloodZone contract address |

### SetHookFeeModifier

```solidity
event SetHookFeeModifier(uint88 indexed newModifier)
```

Emitted when the hook fee modifier is set.

#### Parameters:

| Name          | Type   | Description           |
| ------------- | ------ | --------------------- |
| `newModifier` | uint88 | The new fee modifier  |

### SetAmAmmEnabledOverride

```solidity
event SetAmAmmEnabledOverride(PoolId indexed id, BoolOverride indexed boolOverride)
```

Emitted when the am-AMM enabled override is set for a specific pool.

#### Parameters:

| Name           | Type         | Description             |
| -------------- | ------------ | ----------------------- |
| `id`           | PoolId       | The pool id             |
| `boolOverride` | BoolOverride | The new override value  |

### SetGlobalAmAmmEnabledOverride

```solidity
event SetGlobalAmAmmEnabledOverride(BoolOverride indexed boolOverride)
```

Emitted when the global am-AMM enabled override is set.

#### Parameters:

| Name           | Type         | Description             |
| -------------- | ------------ | ----------------------- |
| `boolOverride` | BoolOverride | The new override value  |