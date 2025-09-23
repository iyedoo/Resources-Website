---
title: Dox Taurus Cows
created: '2025-05-07T12:52:26.448Z'
modified: '2025-09-23T15:06:55.172Z'
---

# Dox Taurus Cows

By Sultan Alaiban

## 1. Subtask 3 ($N,M ≤ 50, Q ≤ 20,000$)

We can simply generate all of the squares. For each square, we will maintain the number of cows in it. For each update, we can go through all the squares and check if the given cell is in it. For each query, we can go through all the squares and get the maximum. This works since there at most $N + M$ squares. This can be done in $\mathcal{O}((N + M) \cdot Q)$

## 2. Subtask 4 ($N$ is a multiple of $M$)

Since $N$ is a multiple of $M$, there will be $\frac{N}{M}$ squares. Cell $(i,j)$ will be contained in square $\lfloor \frac{j}{M} \rfloor$. Therefore, we can maintain the number of cells in each square with a `std::map` and maintain the maximum with a `std::multiset`.

Let $p = \lfloor \frac{j}{M} \rfloor$. To update, we will remove the `map[p]` from the multiset, increment/decrement `map[p]`, then reinsert `map[p]`.

To query, we can simply get the maximum value in the multiset, which we can do with `multiset.rbegin()`.

This can be done in $\mathcal{O}(Q \log Q)$.

## Full solution

To solve the problem, we will generalize the previous solution. If $N > M$, then there will be a group of $\lfloor \frac{N}{M} \rfloor$ squares of size $M$, and the rest of the grid will have $N' = N \bmod M$ rows and $M$ columns. The situation with $N ≤ M$ is similar.

For each group of squares, we can maintain the number of cows in each square like in Subtask 4. We will now show the number of groups we will generate in the end is $\mathcal{O}(log N + log M)$.

Assume $a > b$. Then, $a \bmod b ≤ a - b$. Moreover, $a \bmod b < b$ by definition. This means: $$a \bmod b < \min(b, a - b + 1)$$

By pigeonhole principle, $\min(b, a-b+1) ≤ \frac{a+1}{2}$, therefore: $$a \bmod b < \frac{a+1}{2}$$

Since $N$ can be halved at most $\log_2{N}$ times before reaching $0$, and $M$ can be halved at most $\log_2{M}$ times before reaching $0$, there at most $\log_2{N} + \log_2{M}$ groups of squares.

Updating and querying are similar to Subtask 4's solution, with an additional $\log N + \log M$ factor for locating the cell.

Total complexity is $\mathcal{O}(Q \log Q (\log N + \log M))$.
