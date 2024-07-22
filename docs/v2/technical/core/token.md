---
title: BunniToken
hide_table_of_contents: false
sidebar_position: 3
---

# BunniToken

BunniToken is an ERC20 token contract that represents a user's Liquidity Provider (LP) position in the Bunni ecosystem. It extends the standard ERC20 functionality with additional features such as referral rewards, account locking, and metadata management.

## Inheritance

BunniToken inherits from the following interfaces:

- IERC20: Standard ERC20 interface
- IERC20Referrer: Interface for tracking referrers of token holders
- IERC20Lockable: Interface for account locking, which is useful for implementing transferless staking contracts
- IOwnable: Interface for ownership management
- IUnlockCallback: Uniswap v4 unlock callback interface

## State Variables

### metadataURI

```solidity
string public metadataURI;
```

A URI pointing to the metadata associated with this token.

## Functions

### hub

```solidity
function hub() external view returns (IBunniHub);
```

Returns the address of the BunniHub contract associated with this token.

### token0

```solidity
function token0() external view returns (Currency);
```

Returns the address of the first token in the pair.

### token1

```solidity
function token1() external view returns (Currency);
```

Returns the address of the second token in the pair.

### poolManager

```solidity
function poolManager() external view returns (IPoolManager);
```

Returns the address of the Uniswap v4 PoolManager contract associated with this token.

### mint

```solidity
function mint(address to, uint256 amount, uint24 referrer) external;
```

Mints new tokens to the specified address. Can only be called by the BunniHub contract.

| Parameter | Type    | Description                                         |
| --------- | ------- | --------------------------------------------------- |
| to        | address | The address to receive the minted tokens            |
| amount    | uint256 | The amount of tokens to mint                        |
| referrer  | uint24  | The referrer ID associated with this mint operation |

### burn (from BunniHub)

```solidity
function burn(address from, uint256 amount) external;
```

Burns tokens from a specified address. Can only be called by the BunniHub contract.

| Parameter | Type    | Description                     |
| --------- | ------- | ------------------------------- |
| from      | address | The address to burn tokens from |
| amount    | uint256 | The amount of tokens to burn    |

### burn (from user)

```solidity
function burn(uint256 amount) external;
```

Burns tokens from the caller's address.

| Parameter | Type    | Description                  |
| --------- | ------- | ---------------------------- |
| amount    | uint256 | The amount of tokens to burn |

### initialize

```solidity
function initialize(address owner_, string calldata metadataURI_) external;
```

Initializes the BunniToken contract. Can only be called once, typically by the BunniHub contract during deployment.

| Parameter     | Type    | Description                            |
| ------------- | ------- | -------------------------------------- |
| owner\_       | address | The initial owner of the contract      |
| metadataURI\_ | string  | The initial metadata URI for the token |

### setMetadataURI

```solidity
function setMetadataURI(string calldata metadataURI_) external;
```

Sets the metadata URI for the token. Can only be called by the contract owner.

| Parameter     | Type   | Description                    |
| ------------- | ------ | ------------------------------ |
| metadataURI\_ | string | The new URI for token metadata |

### distributeReferralRewards

```solidity
function distributeReferralRewards(bool isToken0, uint256 amount) external;
```

Distributes referral rewards to all referrers. Can be called by anyone, but typically called by the hook contract.

| Parameter | Type    | Description                                 |
| --------- | ------- | ------------------------------------------- |
| isToken0  | bool    | Whether the rewards are in token0 or token1 |
| amount    | uint256 | The amount of rewards to distribute         |

### claimReferralRewards

```solidity
function claimReferralRewards(uint24 referrer) external returns (uint256 reward0, uint256 reward1);
```

Claims referral rewards for a given referrer ID. Can be called by anyone.

| Parameter | Type   | Description                          |
| --------- | ------ | ------------------------------------ |
| referrer  | uint24 | The referrer ID to claim rewards for |

Returns:

- `reward0`: The amount of token0 rewards claimed
- `reward1`: The amount of token1 rewards claimed

### getClaimableReferralRewards

```solidity
function getClaimableReferralRewards(uint24 referrer) external view returns (uint256 reward0, uint256 reward1);
```

Returns the amount of referral rewards claimable by a given referrer ID.

| Parameter | Type   | Description                          |
| --------- | ------ | ------------------------------------ |
| referrer  | uint24 | The referrer ID to check rewards for |

Returns:

- `reward0`: The amount of token0 rewards claimable
- `reward1`: The amount of token1 rewards claimable

### scoreOf

```solidity
function scoreOf(uint24 referrer) external view returns (uint256 score);
```

Returns the score of a referrer. The score is the sum of all balances of accounts that have the referrer as their referrer.

| Parameter | Type   | Description                                |
| --------- | ------ | ------------------------------------------ |
| referrer  | uint24 | The referrer whose score is to be returned |

Returns:

- `score`: The score of the referrer

### referrerOf

```solidity
function referrerOf(address account) external view returns (uint24 referrer);
```

Returns the referrer of an account. Default referrer is 0.

| Parameter | Type    | Description                                  |
| --------- | ------- | -------------------------------------------- |
| account   | address | The account whose referrer is to be returned |

Returns:

- `referrer`: The referrer of the account

### lock

```solidity
function lock(IERC20Unlocker unlocker, bytes calldata data) external;
```

Locks the caller's account, preventing any transfers from the account until it's unlocked.

| Parameter | Type           | Description                                         |
| --------- | -------------- | --------------------------------------------------- |
| unlocker  | IERC20Unlocker | The address that will be able to unlock the account |
| data      | bytes          | Additional data with no specified format            |

### unlock

```solidity
function unlock(address account) external;
```

Unlocks a previously locked account. Can only be called by the designated unlocker for the account.

| Parameter | Type    | Description           |
| --------- | ------- | --------------------- |
| account   | address | The account to unlock |

### isLocked

```solidity
function isLocked(address account) external view returns (bool);
```

Checks if an account is locked.

| Parameter | Type    | Description          |
| --------- | ------- | -------------------- |
| account   | address | The account to check |

Returns:

- `bool`: True if the account is locked, false otherwise

### unlockerOf

```solidity
function unlockerOf(address account) external view returns (IERC20Unlocker unlocker);
```

Returns the unlocker of an account.

| Parameter | Type    | Description                                  |
| --------- | ------- | -------------------------------------------- |
| account   | address | The account whose unlocker is to be returned |

Returns:

- `unlocker`: The unlocker of the account

## Events

### SetMetadataURI

```solidity
event SetMetadataURI(string newURI);
```

Emitted when the metadata URI is updated.

| Parameter | Type   | Description          |
| --------- | ------ | -------------------- |
| newURI    | string | The new metadata URI |

### Lock

```solidity
event Lock(address indexed account, IERC20Unlocker indexed unlocker);
```

Emitted when an account is locked.

| Parameter | Type           | Indexed | Description                                            |
| --------- | -------------- | ------- | ------------------------------------------------------ |
| account   | address        | Yes     | The account that was locked                            |
| unlocker  | IERC20Unlocker | Yes     | The address designated as the unlocker for the account |

### Unlock

```solidity
event Unlock(address indexed account, IERC20Unlocker indexed unlocker);
```

Emitted when an account is unlocked.

| Parameter | Type           | Indexed | Description                                     |
| --------- | -------------- | ------- | ----------------------------------------------- |
| account   | address        | Yes     | The account that was unlocked                   |
| unlocker  | IERC20Unlocker | Yes     | The address that performed the unlock operation |
