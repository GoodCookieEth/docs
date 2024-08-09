---
title: IERC20Lockable
hide_table_of_contents: false
sidebar_position: 6
---

## Introduction

Bunni v2 introduces a lockable token system through the `IERC20Lockable` and `IERC20Unlocker` interfaces. This system enables advanced functionality like transfer-less staking while maintaining compatibility with existing ERC20 systems. The lockable token feature allows users to "lock" their tokens in place without transferring them to another contract, providing gas efficiency and improved user experience for certain DeFi applications.

This feature is necessary for building staking reward contracts that don't affect referrer scores in Bunni's [referral system](../../concepts/referral).

## Key Components

1. `IERC20Lockable`: An interface implemented by the token contract, allowing accounts to be locked and unlocked.
2. `IERC20Unlocker`: An interface implemented by contracts that can unlock locked accounts and receive callbacks.

## IERC20Lockable

### Functions

#### lock

```solidity
function lock(IERC20Unlocker unlocker, bytes calldata data) external;
```

Locks the caller's account, preventing any transfers from the account until it's unlocked.

| Parameter | Type           | Description                                         |
| --------- | -------------- | --------------------------------------------------- |
| unlocker  | IERC20Unlocker | The address that will be able to unlock the account |
| data      | bytes          | Additional data with no specified format            |

- Behavior:
  - Emits a `Lock` event
  - Calls `lockCallback` on the `unlocker` contract
  - Reverts if the account is already locked (`AlreadyLocked` error)

#### unlock

```solidity
function unlock(address account) external;
```

Unlocks a previously locked account.

| Parameter | Type    | Description           |
| --------- | ------- | --------------------- |
| account   | address | The account to unlock |

- Behavior:
  - Can only be called by the designated unlocker for the account
  - Emits an `Unlock` event
  - Reverts if the account is not locked (`AlreadyUnlocked` error) or if called by an address that is not the unlocker (`NotUnlocker` error)

#### isLocked

```solidity
function isLocked(address account) external view returns (bool);
```

Checks if an account is locked.

| Parameter | Type    | Description          |
| --------- | ------- | -------------------- |
| account   | address | The account to check |

**Returns:** `bool` - True if the account is locked, false otherwise

#### unlockerOf

```solidity
function unlockerOf(address account) external view returns (IERC20Unlocker unlocker);
```

Returns the unlocker of an account.

| Parameter | Type    | Description                                  |
| --------- | ------- | -------------------------------------------- |
| account   | address | The account whose unlocker is to be returned |

**Returns:** `IERC20Unlocker` - The unlocker of the account

### Events

```solidity
event Lock(address indexed account, IERC20Unlocker indexed unlocker);
event Unlock(address indexed account, IERC20Unlocker indexed unlocker);
```

### Errors

```solidity
error AlreadyLocked();
error AlreadyUnlocked();
error NotUnlocker();
error AccountLocked();
```

## IERC20Unlocker

### Functions

#### lockCallback

```solidity
function lockCallback(address account, uint256 balance, bytes calldata data) external;
```

Called when an account calls `IERC20Lockable.lock()` and specifies this contract as the unlocker.

| Parameter | Type    | Description                                     |
| --------- | ------- | ----------------------------------------------- |
| account   | address | The account that called `IERC20Lockable.lock()` |
| balance   | uint256 | The balance of the account after the lock       |
| data      | bytes   | The data passed to `IERC20Lockable.lock()`      |

#### lockedUserReceiveCallback

```solidity
function lockedUserReceiveCallback(address account, uint256 receiveAmount) external;
```

Called when a locked account with this contract as the unlocker receives tokens.

| Parameter     | Type    | Description                      |
| ------------- | ------- | -------------------------------- |
| account       | address | The account that received tokens |
| receiveAmount | uint256 | The amount of tokens received    |

## Usage Example

### Transfer-less Staking

1. Implement a staking contract that implements `IERC20Unlocker`:

```solidity
contract StakingContract is IERC20Unlocker {
    IERC20Lockable public immutable stakingToken;
    mapping(address account => uint256) public stakedBalance;

    constructor(IERC20Lockable _stakingToken) {
        stakingToken = _stakingToken;
    }

    function lockCallback(address account, uint256 balance, bytes calldata data) external override {
        require(msg.sender == address(stakingToken), "Only staking token");

        // Staking logic here
        stakedBalance[account] = balance;
    }

    function unstake() external {
        // Unstaking logic here
        require(stakedBalance[msg.sender] != 0, "Not staker");
        stakedBalance[msg.sender] = 0;

        // Unlock tokens
        stakingToken.unlock(msg.sender);
    }

    function lockedUserReceiveCallback(address account, uint256 receiveAmount) external override {
        // Handle additional tokens received by the staker
        stakedBalance[account] += receiveAmount;
    }
}
```

2. Users interact with the staking system:

```solidity
// User locks their tokens, specifying the staking contract as the unlocker
stakingToken.lock(stakingContract, bytes(""));

// User unstakes by calling the staking contract
stakingContract.unstake();
```

This approach allows users to stake tokens without actually transferring them, reducing gas costs and simplifying the user experience. It enables staking contracts compatible with Bunni's [referral system](../../concepts/referral).

## Security Considerations

1. **Authorized Unlockers**: Ensure that only trusted contracts can be set as unlockers. Malicious unlockers could potentially prevent users from accessing their tokens.
2. **Unlocking Logic**: Implement robust checks in the unlocking logic to prevent unauthorized token releases. For example, in a staking contract, ensure that users can only unlock if they have previously staked.
3. **Locked Account Interactions**: Consider how locked accounts should interact with other parts of your system. For example, should locked accounts be able to participate in governance?
4. **Callback Security**: Implement proper access controls and validation in the `IERC20Unlocker` callbacks to prevent potential exploits.
5. **Gas Considerations**: While locking can save gas compared to token transfers, be aware of the gas costs associated with locking and unlocking, especially in contracts that might handle many users.
