# Alpacas

Written by *Omar Abdelkafi Ykrelef*.
 
## Problem Statement
- [English](statements/alpacas.en.pdf)
- [French](statements/alpacas.fr.pdf)
- [Arabic](statements/alpacas.ar_DZ.pdf)

## Solution

The problem naturally divides into two parts: **minimum moves** and **maximum moves**.

---

## Minimum number of moves

We want all alpacas to fit inside a consecutive block of length $n$.
If a block already contains $k$ alpacas, then the number of moves needed is:

$$
\text{moves} = n - k
$$

So we need to maximize $k$.

---

### Key idea

Each alpaca can act as a boundary of the block:

* If $A[i]$ is the **left endpoint**, the block is:

$$
[L, R] = [A[i], \; A[i] + n - 1]
$$

* If $A[i]$ is the **right endpoint**, the block is:

$$
[L, R] = [A[i] - n + 1, \; A[i]]
$$

---

### Algorithm

**Step 1: Sorting**

First, sort the alpaca positions:

$$
a = \text{sorted positions}
$$

Now $a$ is in increasing order. This makes it possible to use binary search.

---

**Step 2: Binary search**

To count how many alpacas lie inside $[L, R]$:

* `lower_bound(a.begin(), a.end(), L)`
  → gives the first index $\text{idx}_L$ where $a[\text{idx}_L] \geq L$.

* `upper_bound(a.begin(), a.end(), R)`
  → gives the first index *after* the last alpaca $\leq R$.
  → subtract 1 to get the last index $\text{idx}_R$ where $a[\text{idx}_R] \leq R$.

Now the alpacas inside $[L, R]$ are exactly from $a[\text{idx}_L]$ to $a[\text{idx}_R]$.

So the count is:

$$
\text{count} = \text{idx}_R - \text{idx}_L + 1
$$

---

**Step 3: Applying it to our problem**

For each alpaca $a[i]$, we consider two ranges:

1. **Treat $a[i]$ as the left endpoint**:

$$
L = a[i], \quad R = a[i] + n - 1
$$

Count how many alpacas are inside $[L, R]$.

2. **Treat $a[i]$ as the right endpoint**:

$$
L = a[i] - n + 1, \quad R = a[i]
$$

Count how many alpacas are inside $[L, R]$.

We do this with binary search for each alpaca, and keep the maximum count.

Finally:

$$
\text{minimum moves} = n - \max(\text{count})
$$

---

### Special case

If the formula gives `1` and the single empty position is at one end (either before the first alpaca or after the last alpaca), then the answer should be `2` (since you cannot solve it in a single move).

---

## Maximum number of moves

At first glance, you might think to count all free spots. However, alpacas cannot be moved all the way to the extreme ends.

Define:

$$
\text{total\_free} = (A[n] - A[1] + 1) - n
$$

(all empty spots between the first and last alpaca).

$$
\text{first\_gap} = A[2] - A[1] - 1
$$

$$
\text{last\_gap} = A[n] - A[n-1] - 1
$$

Then the maximum number of moves is:

$$
\max(\text{total\_free} - \text{first\_gap}, \; \text{total\_free} - \text{last\_gap})
$$

---

## Time complexity

* Finding minimum moves: $O(n \log n)$
* Finding maximum moves: $O(1)$

**Total time complexity:**

$$
O(n \log n)
$$


## Implementation

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<int> a(n+1);

    for (int i = 1; i <= n; i++) {
        cin >> a[i];
    }
    sort(a.begin(), a.end()); // sort alpaca positions

    int MIN = INT_MAX;

    // Try each alpaca as both left and right endpoint
    for (int i = 1; i <= n; i++) {
        int down = a[i] - n + 1; // block of length n ending at a[i]
        int up   = a[i] + n - 1; // block of length n starting at a[i]

        // d1 = index of first alpaca >= down
        int d1 = distance(a.begin(), lower_bound(a.begin(), a.end(), down));
        // d2 = index of last alpaca <= up
        int d2 = distance(a.begin(), upper_bound(a.begin(), a.end(), up)) - 1;

        // number of alpacas covered if we use "down" block
        int ans1 = n - (abs(i - d1) + 1);
        // number of alpacas covered if we use "up" block
        int ans2 = n - (abs(i - d2) + 1);

        // special case: if result = 1 and the empty spot is at the side → needs 2
        if (a[d1] != down && ans1 == 1) {
            ans1++;
        }
        if (a[d2] != up && ans2 == 1) {
            ans2++;
        }

        MIN = min(MIN, min(ans1, ans2));
    }
    int sum = (a[n] - a[1] + 1) - n; // total free spaces

    // maximum moves = max(total_free - first_gap, total_free - last_gap)
    int MAX = max(sum - (a[n] - a[n - 1] - 1) , sum - (a[2] - a[1] - 1));
    
    cout << MIN << '\n' << MAX << '\n';
}
```
