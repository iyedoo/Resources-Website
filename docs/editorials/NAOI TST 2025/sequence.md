# Sequence

## Problem Statement
- [English](statements/sequence.pdf)
- [Arabic](statements/sequence%20(ar_DZ).pdf)

## Solution

We start with a sequence of numbers:

$$
a_1, a_2, \dots, a_n
$$

We can do the following operation:

* Pick two neighbors $a_i, a_{i+1}$
* Replace them with one number $\max(a_i, a_{i+1})$
* Pay a cost of $\max(a_i, a_{i+1})$.

After $n-1$ operations, only one number remains.
We want the **minimum possible total cost**.

---

### The Answer

It turns out the answer is very simple:

$$
\text{Optimal Cost} = \sum_{i=1}^{n-1} \max(a_i, a_{i+1})
$$

---

### Why This Works

We need to explain two things:

1. **Why we can’t do better than this sum** (lower bound).
2. **Why we can actually achieve it** (upper bound).

---

#### Step 1. Why we can’t do better

Think about the **boundaries** between elements:

$$
(a_1|a_2), (a_2|a_3), \dots, (a_{n-1}|a_n)
$$

Each boundary “disappears” when those two sides finally get merged.

When $a_i$ and $a_{i+1}$ are merged for the first time, we must pay

$$
\max(a_i, a_{i+1}).
$$

This happens **once per boundary**, no matter what order we pick.

👉 That means the total cost is **at least**

$$
\sum_{i=1}^{n-1} \max(a_i, a_{i+1}).
$$

---

#### Step 2. Why this sum is achievable

Now we show we can actually reach this exact value.

The trick: always merge the pair with the **smallest possible max** (a "minimum reduce").

Why is this safe? Because:

* If you merge that pair, the neighbors on the left and right are at least as big, so the surrounding maxima don’t change.
* The total "sum of max’s of neighbors" decreases by exactly the cost you just paid.

So after each merge:

$$
\text{New optimal cost sum} = \text{Old sum} - \text{cost of merge}.
$$

If you repeat this until one element is left, you’ll have paid **exactly** the total sum of maxima from the beginning.

---

## Implementation

By _Iyed Baassou_.

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n; cin >> n;

    vector<int> a(n);
    for (int i = 0; i < n; ++i) cin >> a[i];

    ll res = 0;

    for (int i = 1; i < n; ++i) {
        res += max(a[i], a[i - 1]);
    }

    cout << res << "\n";
    return 0;
}
```