---
title: AmAmm
hide_table_of_contents: false
sidebar_position: 5
---

# AmAmm

`AmAmm` is an implementation of the Auction-Managed Automated Market Maker (am-AMM) system.

In Bunni v2 the `AmAmm` contract is inherited by [`BunniHook`](./hook), so function calls should be made on the [`BunniHook`](./hook) contract. The token used to pay for rent is the LP token of the specific Bunni v2 pool.

The source code for `AmAmm` can be found in the [Biddog](https://github.com/Bunniapp/biddog) repo.

## Structs

### Bid

```solidity
struct Bid {
    address manager;
    uint40 epoch;
    bytes7 payload;
    uint128 rent;
    uint128 deposit;
}
```

Represents a bid in the am-AMM system.

| Field   | Type    | Description                                                      |
| ------- | ------- | ---------------------------------------------------------------- |
| manager | address | The address of the bid manager                                   |
| epoch   | uint40  | The epoch when the bid was created or last charged rent          |
| payload | bytes7  | Payload specifying parameters the manager wants (e.g., swap fee) |
| rent    | uint128 | Rent per hour                                                    |
| deposit | uint128 | Rent deposit amount                                              |

## `BunniHook` Payload Format

The [`BunniHook`](./hook) bid payload is a `bytes7` value that encodes three parameters used to configure pool behavior.

### Payload Encoding

The `bytes7` payload is encoded as follows:

```
| swapFee0For1 (3 bytes) | swapFee1For0 (3 bytes) | enableSurgeFee (1 byte) |
```

- **swapFee0For1** (3 bytes): A `uint24` value representing the swap fee for token0 -> token1 swaps. 6 decimals.
- **swapFee1For0** (3 bytes): A `uint24` value representing the swap fee for token1 -> token0 swaps. 6 decimals.
- **enableSurgeFee** (1 byte): A `uint8` value (0 or 1) indicating whether the surge fee is enabled.

### Important Notes

1. The swap fees are represented as `uint24` values, allowing for a wide range of fee settings.
2. The surge fee is enabled if the last byte of the payload is non-zero.
3. When encoding the payload, ensure that the swap fee values do not exceed the maximum value for swap fees (`1e6`).

### Example Usage

Here's an example of how to encode/decode the payload:

```solidity
function encodeAmAmmPayload(
    uint24 swapFee0For1,
    uint24 swapFee1For0,
    bool enableSurgeFee
) pure returns (bytes7) {
    return bytes7(
        abi.encodePacked(swapFee0For1, swapFee1For0, enableSurgeFee)
    );
}

function decodeAmAmmPayload(bytes7 payload)
    pure
    returns (uint24 swapFee0For1, uint24 swapFee1For0, bool enableSurgeFee)
{
    swapFee0For1 = uint24(bytes3(payload));
    swapFee1For0 = uint24(bytes3(payload << 24));
    enableSurgeFee = uint8(payload[6]) != 0;
}
```

## Functions

### bid

```solidity
function bid(
    PoolId id,
    address manager,
    bytes7 payload,
    uint128 rent,
    uint128 deposit
) external;
```

Places a bid to become the manager of a pool.

Will transfer `deposit` LP tokens of the Bunni v2 pool specified by `id` from `msg.sender`, so ERC-20 approval should have been given prior to calling this function.

#### Parameters:

| Name    | Type    | Description                                                                         |
| ------- | ------- | ----------------------------------------------------------------------------------- |
| id      | PoolId  | The unique identifier of the pool                                                   |
| manager | address | The address of the account that will manage the pool if bid wins                    |
| payload | bytes7  | Encoded data specifying parameters the manager wants (e.g., swap fee)               |
| rent    | uint128 | The amount of rent per hour the manager is willing to pay                           |
| deposit | uint128 | The initial deposit amount, must be a multiple of rent and cover rent for ≥K epochs |

### depositIntoTopBid

```solidity
function depositIntoTopBid(PoolId id, uint128 amount) external;
```

Adds deposit to the top bid. Only callable by the current top bid manager.

Will transfer `amount` LP tokens of the Bunni v2 pool specified by `id` from `msg.sender`, so ERC-20 approval should have been given prior to calling this function.

#### Parameters:

| Name   | Type    | Description                                       |
| ------ | ------- | ------------------------------------------------- |
| id     | PoolId  | The unique identifier of the pool                 |
| amount | uint128 | The amount to deposit, must be a multiple of rent |

### withdrawFromTopBid

```solidity
function withdrawFromTopBid(
    PoolId id,
    uint128 amount,
    address recipient
) external;
```

Withdraws from the deposit of the top bid. Only callable by the current top bid manager. Reverts if `deposit / rent < K` after the function returns

#### Parameters:

| Name      | Type    | Description                                                                     |
| --------- | ------- | ------------------------------------------------------------------------------- |
| id        | PoolId  | The unique identifier of the pool                                               |
| amount    | uint128 | The amount to withdraw, must be a multiple of rent and leave deposit / rent ≥ K |
| recipient | address | The address that will receive the withdrawn amount                              |

### depositIntoNextBid

```solidity
function depositIntoNextBid(PoolId id, uint128 amount) external;
```

Adds deposit to the next bid. Only callable by the next bid manager.

Will transfer `amount` LP tokens of the Bunni v2 pool specified by `id` from `msg.sender`, so ERC-20 approval should have been given prior to calling this function.

#### Parameters:

| Name   | Type    | Description                                       |
| ------ | ------- | ------------------------------------------------- |
| id     | PoolId  | The unique identifier of the pool                 |
| amount | uint128 | The amount to deposit, must be a multiple of rent |

### withdrawFromNextBid

```solidity
function withdrawFromNextBid(
    PoolId id,
    uint128 amount,
    address recipient
) external;
```

Withdraws from the deposit of the next bid. Only callable by the next bid manager. Reverts if `deposit / rent < K` after the function returns.

#### Parameters:

| Name      | Type    | Description                                                                     |
| --------- | ------- | ------------------------------------------------------------------------------- |
| id        | PoolId  | The unique identifier of the pool                                               |
| amount    | uint128 | The amount to withdraw, must be a multiple of rent and leave deposit / rent ≥ K |
| recipient | address | The address that will receive the withdrawn amount                              |

### cancelNextBid

```solidity
function cancelNextBid(PoolId id, address recipient) external returns (uint256 refund);
```

Cancels the next bid. Only callable by the next bid manager.

#### Parameters:

| Name      | Type    | Description                                        |
| --------- | ------- | -------------------------------------------------- |
| id        | PoolId  | The unique identifier of the pool                  |
| recipient | address | The address that will receive the refunded deposit |

#### Returns:

| Type    | Description                    |
| ------- | ------------------------------ |
| uint256 | The amount of deposit refunded |

### claimRefund

```solidity
function claimRefund(PoolId id, address recipient) external returns (uint256 refund);
```

Claims the refundable deposit of a pool owed to the caller.

#### Parameters:

| Name      | Type    | Description                              |
| --------- | ------- | ---------------------------------------- |
| id        | PoolId  | The unique identifier of the pool        |
| recipient | address | The address that will receive the refund |

#### Returns:

| Type    | Description                  |
| ------- | ---------------------------- |
| uint256 | The amount of refund claimed |

### claimFees

```solidity
function claimFees(Currency currency, address recipient) external returns (uint256 fees);
```

Claims the accrued fees of the caller for a specific currency.

#### Parameters:

| Name      | Type     | Description                            |
| --------- | -------- | -------------------------------------- |
| currency  | Currency | The currency of the fees to be claimed |
| recipient | address  | The address that will receive the fees |

#### Returns:

| Type    | Description                |
| ------- | -------------------------- |
| uint256 | The amount of fees claimed |

### setBidPayload

```solidity
function setBidPayload(PoolId id, bytes7 payload, bool topBid) external;
```

Sets the payload of a pool. Only callable by the manager of either the top bid or the next bid.

#### Parameters:

| Name    | Type   | Description                                                        |
| ------- | ------ | ------------------------------------------------------------------ |
| id      | PoolId | The unique identifier of the pool                                  |
| payload | bytes7 | The new payload specifying parameters (e.g., swap fee)             |
| topBid  | bool   | True if setting for the top bid, false if setting for the next bid |

### getTopBid

```solidity
function getTopBid(PoolId id) external view returns (Bid memory);
```

Retrieves the current top bid for a pool.

#### Parameters:

| Name | Type   | Description                       |
| ---- | ------ | --------------------------------- |
| id   | PoolId | The unique identifier of the pool |

#### Returns:

| Type | Description                                    |
| ---- | ---------------------------------------------- |
| Bid  | A struct containing the details of the top bid |

### getTopBidWrite

```solidity
function getTopBidWrite(PoolId id) external returns (Bid memory);
```

Updates the am-AMM state of a pool and then retrieves the top bid.

#### Parameters:

| Name | Type   | Description                       |
| ---- | ------ | --------------------------------- |
| id   | PoolId | The unique identifier of the pool |

#### Returns:

| Type | Description                                    |
| ---- | ---------------------------------------------- |
| Bid  | A struct containing the details of the top bid |

### getNextBid

```solidity
function getNextBid(PoolId id) external view returns (Bid memory);
```

Retrieves the current next bid for a pool.

#### Parameters:

| Name | Type   | Description                       |
| ---- | ------ | --------------------------------- |
| id   | PoolId | The unique identifier of the pool |

#### Returns:

| Type | Description                                     |
| ---- | ----------------------------------------------- |
| Bid  | A struct containing the details of the next bid |

### getNextBidWrite

```solidity
function getNextBidWrite(PoolId id) external returns (Bid memory);
```

Updates the am-AMM state of a pool and then retrieves the next bid.

#### Parameters:

| Name | Type   | Description                       |
| ---- | ------ | --------------------------------- |
| id   | PoolId | The unique identifier of the pool |

#### Returns:

| Type | Description                                     |
| ---- | ----------------------------------------------- |
| Bid  | A struct containing the details of the next bid |

### getRefund

```solidity
function getRefund(address manager, PoolId id) external view returns (uint256);
```

Retrieves the refundable deposit amount for a specific manager in a pool.

#### Parameters:

| Name    | Type    | Description                       |
| ------- | ------- | --------------------------------- |
| manager | address | The address of the manager        |
| id      | PoolId  | The unique identifier of the pool |

#### Returns:

| Type    | Description                      |
| ------- | -------------------------------- |
| uint256 | The amount of refundable deposit |

### getRefundWrite

```solidity
function getRefundWrite(address manager, PoolId id) external returns (uint256);
```

Updates the am-AMM state of a pool and then retrieves the refundable deposit amount for a specific manager.

#### Parameters:

| Name    | Type    | Description                       |
| ------- | ------- | --------------------------------- |
| manager | address | The address of the manager        |
| id      | PoolId  | The unique identifier of the pool |

#### Returns:

| Type    | Description                      |
| ------- | -------------------------------- |
| uint256 | The amount of refundable deposit |

### getFees

```solidity
function getFees(address manager, Currency currency) external view returns (uint256);
```

Retrieves the amount of fees accrued by a manager for a specific currency.

#### Parameters:

| Name     | Type     | Description                |
| -------- | -------- | -------------------------- |
| manager  | address  | The address of the manager |
| currency | Currency | The currency of the fees   |

#### Returns:

| Type    | Description                |
| ------- | -------------------------- |
| uint256 | The amount of accrued fees |

### updateStateMachine

```solidity
function updateStateMachine(PoolId id) external;
```

Triggers a state machine update for the given pool.

#### Parameters:

| Name | Type   | Description                       |
| ---- | ------ | --------------------------------- |
| id   | PoolId | The unique identifier of the pool |

## Events

### SubmitBid

```solidity
event SubmitBid(
    PoolId indexed id,
    address indexed manager,
    uint40 indexed epoch,
    bytes7 payload,
    uint128 rent,
    uint128 deposit
)
```

Emitted when a new bid is submitted.

#### Parameters:

| Name    | Type    | Indexed | Description                                   |
| ------- | ------- | ------- | --------------------------------------------- |
| id      | PoolId  | Yes     | The ID of the pool                            |
| manager | address | Yes     | The address of the manager submitting the bid |
| epoch   | uint40  | Yes     | The epoch when the bid was submitted          |
| payload | bytes7  | No      | The payload specifying bid parameters         |
| rent    | uint128 | No      | The rent amount per hour                      |
| deposit | uint128 | No      | The deposit amount for the bid                |

### DepositIntoTopBid

```solidity
event DepositIntoTopBid(PoolId indexed id, address indexed manager, uint128 amount)
```

Emitted when a deposit is made into the top bid.

#### Parameters:

| Name    | Type    | Indexed | Description                                   |
| ------- | ------- | ------- | --------------------------------------------- |
| id      | PoolId  | Yes     | The ID of the pool                            |
| manager | address | Yes     | The address of the manager making the deposit |
| amount  | uint128 | No      | The amount deposited                          |

### WithdrawFromTopBid

```solidity
event WithdrawFromTopBid(PoolId indexed id, address indexed manager, address indexed recipient, uint128 amount)
```

Emitted when a withdrawal is made from the top bid.

#### Parameters:

| Name      | Type    | Indexed | Description                                      |
| --------- | ------- | ------- | ------------------------------------------------ |
| id        | PoolId  | Yes     | The ID of the pool                               |
| manager   | address | Yes     | The address of the manager making the withdrawal |
| recipient | address | Yes     | The address receiving the withdrawn amount       |
| amount    | uint128 | No      | The amount withdrawn                             |

### DepositIntoNextBid

```solidity
event DepositIntoNextBid(PoolId indexed id, address indexed manager, uint128 amount)
```

Emitted when a deposit is made into the next bid.

#### Parameters:

| Name    | Type    | Indexed | Description                                   |
| ------- | ------- | ------- | --------------------------------------------- |
| id      | PoolId  | Yes     | The ID of the pool                            |
| manager | address | Yes     | The address of the manager making the deposit |
| amount  | uint128 | No      | The amount deposited                          |

### WithdrawFromNextBid

```solidity
event WithdrawFromNextBid(PoolId indexed id, address indexed manager, address indexed recipient, uint128 amount)
```

Emitted when a withdrawal is made from the next bid.

#### Parameters:

| Name      | Type    | Indexed | Description                                      |
| --------- | ------- | ------- | ------------------------------------------------ |
| id        | PoolId  | Yes     | The ID of the pool                               |
| manager   | address | Yes     | The address of the manager making the withdrawal |
| recipient | address | Yes     | The address receiving the withdrawn amount       |
| amount    | uint128 | No      | The amount withdrawn                             |

### CancelNextBid

```solidity
event CancelNextBid(PoolId indexed id, address indexed manager, address indexed recipient, uint256 refund)
```

Emitted when the next bid is cancelled.

#### Parameters:

| Name      | Type    | Indexed | Description                                   |
| --------- | ------- | ------- | --------------------------------------------- |
| id        | PoolId  | Yes     | The ID of the pool                            |
| manager   | address | Yes     | The address of the manager cancelling the bid |
| recipient | address | Yes     | The address receiving the refund              |
| refund    | uint256 | No      | The amount refunded                           |

### ClaimRefund

```solidity
event ClaimRefund(PoolId indexed id, address indexed manager, address indexed recipient, uint256 refund)
```

Emitted when a refund is claimed.

#### Parameters:

| Name      | Type    | Indexed | Description                                    |
| --------- | ------- | ------- | ---------------------------------------------- |
| id        | PoolId  | Yes     | The ID of the pool                             |
| manager   | address | Yes     | The address of the manager claiming the refund |
| recipient | address | Yes     | The address receiving the refund               |
| refund    | uint256 | No      | The amount refunded                            |

### ClaimFees

```solidity
event ClaimFees(Currency indexed currency, address indexed manager, address indexed recipient, uint256 fees)
```

Emitted when fees are claimed.

#### Parameters:

| Name      | Type     | Indexed | Description                                  |
| --------- | -------- | ------- | -------------------------------------------- |
| currency  | Currency | Yes     | The currency of the claimed fees             |
| manager   | address  | Yes     | The address of the manager claiming the fees |
| recipient | address  | Yes     | The address receiving the fees               |
| fees      | uint256  | No      | The amount of fees claimed                   |

### SetBidPayload

```solidity
event SetBidPayload(PoolId indexed id, address indexed manager, bytes7 payload, bool topBid)
```

Emitted when a bid payload is set.

#### Parameters:

| Name    | Type    | Indexed | Description                                    |
| ------- | ------- | ------- | ---------------------------------------------- |
| id      | PoolId  | Yes     | The ID of the pool                             |
| manager | address | Yes     | The address of the manager setting the payload |
| payload | bytes7  | No      | The new payload                                |
| topBid  | bool    | No      | Whether this is for the top bid or next bid    |

## Errors

The interface defines several custom errors:

- `AmAmm__BidLocked()`
- `AmAmm__InvalidBid()`
- `AmAmm__NotEnabled()`
- `AmAmm__Unauthorized()`
- `AmAmm__InvalidDepositAmount()`

These errors are used to provide more specific information about failures in the am-AMM system.
