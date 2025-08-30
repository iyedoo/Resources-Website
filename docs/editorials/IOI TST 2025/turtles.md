# Turtles

## Problem Statement
- [English](statements/turtles (en).pdf)
- [French](statements/turtles (fr).pdf)
- [Arabic](statements/turtles (ar_DZ).pdf)

## Solution

We have two arrays and we want to make them equal with the minimum
number of operations.
Operation: change current number to its greatest proper divisor (largest
divisor smaller than it).

## Subtask 1: 8 points

Brute force all possible arrays, check minimum operations.

## Subtask 2: 12 points

All numbers are prime or $1$.
- Greatest proper divisor of a prime is $1$.
- Count occurrences of each prime in both arrays.
- Answer = sum of absolute differences.

Example:

- $ A $ = `1 1 2 3 5 5`

- $ B $ = `1 2 2 5 7 11`

- Answer = $ | occA[p] - occB[p]| $ summed over primes.

## Subtask 3: 10 points

All numbers are powers of two.

- Sort both arrays.

- For each $i$, divide larger of $A_i, B_i$ until it matches smaller, counting steps.

- GPD of power of two is always half.

## Subtask 5: 100 points

(Skipping subtask 4).

Greedy approach: 
- Need fast GPD calculation → precompute with sieve.

- Use priority queues for A and B.

- While not empty:

- Compare max of both.

- If equal → pop both.

- Else → replace larger with its GPD, increment ops.

Time complexity: $ O(C \log{C} ) $, where $ C \leq 10^6 $.
