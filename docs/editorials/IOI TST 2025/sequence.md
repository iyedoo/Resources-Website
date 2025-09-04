# Sequence

## Problem Statement
- [English](statements/sequence (en).pdf)  
- [French](statements/sequence (fr).pdf)  
- [Arabic](statements/sequence (ar_DZ).pdf)  

---

## Full Solution

### Step 1: Split the array
Divide $A$ into two halves:

- $a$ = first $\lceil N/2 \rceil$ elements  
- $b$ = last $\lfloor N/2 \rfloor$ elements  

We will enumerate all subsequences of $a$ and $b$ separately.

---

### Step 2: Enumerate subsequences with states
For each subset of a half:

- Compute its sum.  
- Track the number of **consecutive negatives**.  
- Track whether the subsequence started with negatives (important for merging).  

Specifically, we maintain:

- `con_neg`: the maximum run of consecutive negatives inside the subsequence.  
- `first_neg`: number of negatives before the first positive (so we know how many negatives "lead" the subsequence).  

If `con_neg` $\leq 3$, the subsequence is valid for its half.  
We insert its sum into a container indexed by `first_neg`.  

---

### Step 3: Meet in the middle
Now, when enumerating subsets of $b$, we again compute `con_neg` and how the sequence ends (trailing negatives).  
To combine with a subset from $a$, we must ensure that the run of negatives crossing the boundary does not exceed 3.  

Thus:

- If $b$ ends with $x$ negatives, we can only merge with subsets of $a$ that **begin with $\leq 3 - x$ negatives**.  

This check guarantees the global subsequence never contains 4 consecutive negatives.

---

### Step 4: Minimization
For each valid sum from $b$, we search in the precomputed sums of $a$ (stored in sets for fast lookup).  
We want the smallest `sum_a` $+$ `sum_b` $\geq S$.  
This is done with a lower bound query.

---

### Step 5: Answer

- If no valid pair was found, print `Impossible`.  
- Otherwise, print the minimum sum found.

---

### Complexity
$O(N \cdot 2^{\frac{N}{2}})$

---

## Subtasks
- **Subtask 1 (15 pts):** Elements are only $1$ or $-1$. Can brute force all subsequences.  
- **Subtask 2 (15 pts):** $N \leq 5$. Exhaustive $2^N$ works.  
- **Subtask 3 (30 pts):** $N \leq 18$. Direct brute force over the array is feasible.  
