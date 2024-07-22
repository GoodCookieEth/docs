---
sidebar_position: 8
---

# Volatility-based Swap Fee

Bunni v2 implements a volatility-based dynamic swap fee mechanism that adjusts fees based on the deviation of the spot price from the Time-Weighted Average Price (TWAP). This feature is designed to optimize fee revenue and protect liquidity providers (LPs) during periods of high volatility.

## Overview

The volatility-based swap fee is used in the absence of an am-AMM manager. It increases the swap fee quadratically as the pool's spot price deviates from the TWAP value, providing a simple yet effective way to adjust fees based on market conditions.

## Fee Calculation

![](img/swap-fee.svg)

The swap fee is calculated using the following formula:

$$f(p, \bar{p}) = \min(f_{min} + k \cdot (\frac{p}{\bar{p}} - 1)^2, f_{max})$$

Where:
- $f(p, \bar{p})$ is the fee percentage charged for a swap
- $p$ is the spot price of the pool after the swap
- $\bar{p}$ is the TWAP of the pool
- $f_{min}$ is the minimum fee
- $f_{max}$ is the maximum fee
- $k$ is a scaling factor

All parameters ($f_{min}$, $k$, $f_{max}$) are non-negative, and $f_{min} \leq f_{max}$.

## Key Features

1. **Quadratic Scaling**: The fee increases quadratically with the deviation from TWAP, providing a rapid response to volatility.

2. **Bounded Range**: The fee is bounded between $f_{min}$ and $f_{max}$, ensuring it remains within a reasonable range.

3. **Directional Sensitivity**: Higher fees are charged for swaps that push the spot price away from the TWAP, and lower fees for swaps that bring the price closer to TWAP.

4. **Rapid Volatility Response**: Large swaps that significantly deviate from TWAP immediately incur higher fees, protecting LPs during sudden price movements.

## Benefits

1. **Protection Against Volatility**: Higher fees during volatile periods help compensate LPs for increased risk.

2. **Improved Capital Efficiency**: Lower fees during stable periods can attract more volume and improve capital utilization.

3. **Automatic Adjustment**: The fee adjusts automatically based on market conditions without requiring manual intervention.

4. **Simplicity**: The mechanism is straightforward to implement and understand, requiring only the current price and TWAP as inputs.

## Considerations

1. **TWAP Window**: The effectiveness of this mechanism depends on choosing an appropriate TWAP window. A shorter window makes the fee more responsive to recent price changes, while a longer window provides more stability.

2. **Parameter Tuning**: The values of $f_{min}$, $f_{max}$, and $k$ need to be carefully chosen to balance fee revenue, LP protection, and competitiveness with other exchanges.

3. **Market Impact**: Very high fees during extreme volatility might deter some traders, potentially reducing volume during these periods.

4. **Complex Market Dynamics**: While this model provides a reasonable approximation of volatility, it may not capture all nuances of market behavior.

## Interaction with Other Bunni v2 Features

- **am-AMM**: The volatility-based swap fee is used only when an am-AMM manager is not present. If an am-AMM manager is active, they have full control over fee setting.

- **Autonomous Rebalancing**: The volatility-based fee can help protect the pool during rebalancing operations that occur during high volatility periods.

While the volatility-based swap fee provides a solid default mechanism for fee adjustment, it's worth noting that an am-AMM manager using sophisticated off-chain models could potentially achieve even better results. The volatility-based fee serves as a robust fallback when am-AMM is not in use.