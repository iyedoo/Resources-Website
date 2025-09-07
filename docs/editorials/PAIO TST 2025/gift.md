Written by *Raouf Ould Ali*.
 
## Problem Statement
- [English](statements/gift.en.pdf)
- [French](statements/gift.fr.pdf)
- [Arabic](statements/gift.ar_DZ.pdf)

We are given an array $A$ of size $N$ and an integer $K$.

We start with $B = [0,0,\ldots,0]$ and want to transform it into $A$ using operations of the form:
* Choose any integer $X > 0$
* Choose **exactly $K$ distinct positions** $P_1, P_2, \ldots, P_K$
* Add $X$ to all $B[P_j]$

The task is to either produce a valid sequence of operations with $M \cdot K \leq 3 \cdot 10^6$, or decide that it is impossible.

---

## Step 1: Feasibility Conditions

Each operation increases the total sum of \$B\$ by \$X \cdot K\$.

* Thus,

  $$
  \text{sum} = \sum_{i=1}^N A[i]
  $$

  must be divisible by \$K\$.

* Let

  $$
  \text{lim} = \frac{\text{sum}}{K}
  $$

  be the required “height” of each group.

* If \$\max(A\[i]) > \text{lim}\$, then one element cannot fit into a single group, so the answer is **impossible**.

So feasibility requires:

$$
\text{sum} \bmod K = 0 \quad \text{and} \quad \max(A[i]) \leq \frac{\text{sum}}{K}.
$$

---

## Step 2: Grid Interpretation

Visualize a grid of size $\text{lim} \times K$:
* The grid has **height** $\text{lim}$ and **width** $K$.
* Each column corresponds to one bundle of size $\text{lim}$.
* We place each $A[i]$ **vertically**:
  * If it fits in the current column, it stays there.
  * If it overflows, it continues at the top of the next column.

Since $A[i] \leq \text{lim}$ for all $i$, a box never skips a column. At most it is split into **two consecutive columns**.

---

## Step 3: Sweeping for Operations

Instead of outputting one operation per row (which could be up to $\text{lim}$ rows), we notice that:
* Each column contains **one index at a time**.
* The index for a column only changes **when one $A[i]$ ends and another begins**.

Thus, while sweeping from bottom to top:
* We keep track of the current set of active indices for all $K$ columns.
* We only output an operation when this set changes.
* The operation covers all rows since the last change, so its increment is the **height difference** $\Delta h$.

---

## Step 4: Bound on Operations

* Each $A[i]$ can start once in a column and possibly wrap once into the next column.
* Therefore, each $A[i]$ contributes at most **two changes**.
* This means the total number of operations is at most $2N$, not $\text{lim}$.

This compression is what makes the solution efficient and ensures $M \cdot K \leq 3 \cdot 10^6$.

---

## Step 5: Correctness Argument

1. **Sum condition** ensures the total number of increments matches.
2. **Max condition** ensures no element overflows beyond a single column boundary.
3. Because $A[i] \leq \text{lim}$, there is no overlap in rows:
   * Every cell of the $\text{lim} \times K$ grid is covered by exactly one index.
4. The sweep construction outputs exactly the increments needed to reach $A$, with no waste.

Therefore, the algorithm always finds a valid solution if and only if it exists.

---

## Example

Input:

```
4 2
2 3 3 2
```

* $\text{sum} = 10$, $\text{lim} = 5$.
* Fill the $5 \times 2$ grid column by column:

```
Column 1: [1, 1, 2, 2, 2]
Column 2: [3, 3, 3, 4, 4]
```

![](./grid_example.png)

* Sweep rows:

  * Rows 1–2: active {1,3} → operation (2, 1 3)
  * Row 3: active {2,3} → operation (1, 2 3)
  * Rows 4–5: active {2,4} → operation (2, 2 4)

Output:

```
3
2 1 3
1 2 3
2 2 4
```


## Implementation
```cpp
#include <bits/stdc++.h>
typedef long long ll;
using namespace std;
signed main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    ll n, k;
    cin >> n >> k;

    vector<ll> a(n);
    for (int i = 0; i < n; i++)
        cin >> a[i];
    ll sum = 0;
    ll max_ai = 0;
    for (int i = 0; i < n; i++) {
        sum += a[i];
        max_ai = max(max_ai, a[i]);
    }
    
    if(sum%k != 0 or max_ai > sum/k){
        cout << "-1\n";
        return 0;
    }

    ll max_height = sum/k;
    ll current_height = 0LL;
    ll current_column = 0LL;

    vector<vector<ll>> result;
    vector<tuple<ll, ll, ll>> cache; // height, column, index
    for (int i = 0; i < n; i++){
        cache.push_back({current_height, current_column, i+1});
        current_height += a[i];
        if(current_height >= max_height){
            current_height -= max_height;
            current_column += 1;
            if(current_column < k)
                cache.push_back({0, current_column, i+1});
        }
    }

    cache.push_back({max_height, 0, 0});

    sort(cache.begin(), cache.end());

    current_height = 0LL;
    vector<ll> current_move(k+1, 0);

    for(auto &[height, column, index] : cache){
        if(height != current_height){
            current_move[0] = height - current_height;
            result.push_back(vector<ll>(current_move.begin(), current_move.end()));
            current_height = height;
        }

        current_move[column+1] = index;
    }

    cout << result.size() << '\n';
    for(auto &x : result)
    {
        for(auto y : x) cout << y << ' ';
        cout << '\n';
    }
}
```