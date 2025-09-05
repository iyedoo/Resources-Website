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

## Implementation

```cpp
#include <bits/stdc++.h>
using namespace std;
    
int main () {

  ios_base::sync_with_stdio(false);
  cin.tie(NULL);

  int n;
  long long s;
  cin >> n >> s;
  vector<int> a((n + 1) / 2), b(n / 2);
  for (int i = 0; i < (n + 1) / 2; ++i) {
    cin >> a[i];
  } 
  for (int i = 0; i < n / 2; ++i) {
    cin >> b[i];
  }
  swap(a, b);
  vector<set<long long>> meet(4);
  for (int mask = 0; mask < (1 << a.size()); ++mask) {
    int con_neg = 0, first_pos = 0, first_neg = 0, cur_neg = 0;
    long long sum = 0;
    for (int i = 0; i < a.size(); ++i) {
      if (mask >> i & 1) {
        sum += a[i];
        if (a[i] < 0) {
          if (!first_pos) {
            ++first_neg;
          }
          con_neg = max(con_neg, ++cur_neg);
        }
        else {
          first_pos = 1;
          con_neg = max(con_neg, cur_neg);
          cur_neg = 0;
        }
      }
    }
    if (con_neg <= 3) {
      meet[first_neg].insert(sum);
    }
  }
  long long ans = 9e18;
  for (int mask = 0; mask < (1 << b.size()); ++mask) {
    int con_neg = 0, cur_neg = 0;
    long long sum = 0;
    for (int i = 0; i < b.size(); ++i) {
      if (mask >> i & 1) {
        sum += b[i];
        if (b[i] < 0) {
          con_neg = max(con_neg, ++cur_neg);
        }
        else {
          con_neg = max(con_neg, cur_neg);
          cur_neg = 0;
        }
      }
    }
    if (con_neg <= 3) {
      for (int k = 0; k + cur_neg <= 3; ++k) {
        auto it = meet[k].lower_bound(s - sum);
        if (it != meet[k].end()) {
          ans = min(ans, sum + *it);
        }
      }
    }
  }
  if (ans == (long long)9e18) {
    cout << "Impossible";
  }
  else {
    cout << ans;
  }

  return 0;
}
```
