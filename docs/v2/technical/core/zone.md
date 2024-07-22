---
title: BunnZone
hide_table_of_contents: true
sidebar_position: 4
---

# BunniZone

`BunniZone` is a contract that validates orders for the Flood protocol, specifically for autonomously rebalancing Bunni pools. It's used to restrict executing rebalance swap orders to a whitelisted set of fulfillers as well as the am-AMM manager of a pool.

## State Variables

### isWhitelisted

```solidity
mapping(address => bool) public isWhitelisted;
```

A mapping that stores whether an address is whitelisted or not.

## Constructor

```solidity
constructor(address initialOwner)
```

Initializes the contract with the given initial owner.

### Parameters:

| Name           | Type    | Description                      |
| -------------- | ------- | -------------------------------- |
| `initialOwner` | address | The address of the initial owner |

## Functions

### setIsWhitelisted

```solidity
function setIsWhitelisted(address account, bool isWhitelisted_) external onlyOwner
```

Sets the whitelist status for a given account. Only callable by the owner.

#### Parameters:

| Name             | Type    | Description                                 |
| ---------------- | ------- | ------------------------------------------- |
| `account`        | address | The address to set the whitelist status for |
| `isWhitelisted_` | bool    | The new whitelist status                    |

### validate

```solidity
function validate(IFloodPlain.Order calldata order, address fulfiller) external view returns (bool)
```

Validates an order for the Flood protocol. Only allows whitelisted fulfillers and the am-AMM manager of the pool to fulfill orders.

#### Parameters:

| Name        | Type              | Description                                 |
| ----------- | ----------------- | ------------------------------------------- |
| `order`     | IFloodPlain.Order | The order to validate                       |
| `fulfiller` | address           | The address attempting to fulfill the order |

#### Returns:

| Type | Description                                       |
| ---- | ------------------------------------------------- |
| bool | True if the fulfiller is allowed, false otherwise |

### fee

```solidity
function fee(IFloodPlain.Order calldata, address) external pure returns (IZone.FeeInfo memory)
```

Returns the fee information for an order. In this implementation, it always returns zero fees.

#### Parameters:

| Name    | Type              | Description      |
| ------- | ----------------- | ---------------- |
| `order` | IFloodPlain.Order | The order        |
| `-`     | address           | Unused parameter |

#### Returns:

| Type          | Description                                              |
| ------------- | -------------------------------------------------------- |
| IZone.FeeInfo | The fee information (always zero in this implementation) |

## Events

### SetIsWhitelisted

```solidity
event SetIsWhitelisted(address indexed account, bool indexed isWhitelisted)
```

Emitted when the whitelist status of an account is changed.

#### Parameters:

| Name            | Type    | Indexed | Description                      |
| --------------- | ------- | ------- | -------------------------------- |
| `account`       | address | Yes     | The address whose status changed |
| `isWhitelisted` | bool    | Yes     | The new whitelist status         |
