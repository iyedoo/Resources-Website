# Temperature

## Problem Statement
- [English](statements/temperature (en).pdf)
- [French](statements/temperature (fr).pdf)
- [Arabic](statements/temperature (ar_DZ).pdf)

## Solution

We have the values of $V$ and we want to compute the values of $T$ as
follows:

$$
T_i =
\begin{cases}
0 & \text{if } i = 0 \\
T_{i-1} + V_{i-1} & \text{if } i \geq 1
\end{cases}
$$

Once we compute the values of $T$, we want the final answer:

$ mx = \max_{0 \leq i < j \leq n} T_j - T_i $

------------------------------------------------------------------------

## Subtask 1 & 2: 60 points

We can use two nested loops and find the maximum among all pairs $ (i,
j) $ in the array $T$.

------------------------------------------------------------------------

## Subtask 3: 100 points

To maximize the answer for any $j$ from 1 to $n-1$, we need to subtract
it from the minimum value in the range $ [0, j-1] $.
We can maintain this minimum value while iterating.

Let: 

- `mn` = minimum value seen so far (initially $ 1e18 $).

- `mx` = best answer so far (initially 0)

For each $i$: 

- $ mn = \min(mn, T_i) $.

- $ mx = \max(mx, T_i - mn) $.

At the end, the answer is in `mx`.

Print `mx` and congrats, you got 100 points!
