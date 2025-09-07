# Temperature

## Problem Statement
- [English](statements/temperature%20(en).pdf)
- [French](statements/temperature%20(fr).pdf)
- [Arabic](statements/temperature%20(ar_DZ).pdf)

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

$$mx = \max_{0 \leq i < j \leq n} T_j - T_i$$

------------------------------------------------------------------------

## Subtask 1 & 2: 60 points

We can use two nested loops and find the maximum among all pairs $(i, j)$ in the array $T$.

------------------------------------------------------------------------

## Subtask 3: 100 points

To maximize the answer for any $j$ from 1 to $n-1$, we need to subtract
it from the minimum value in the range $[0, j-1]$.
We can maintain this minimum value while iterating.

Let: 

- `mn` = minimum value seen so far (initially $1 \times 10^{18}$).

- `mx` = best answer so far (initially 0)

For each $i$:

- $mn = \min(mn, T_i)$.

- $mx = \max(mx, T_i - mn)$.

At the end, the answer is in `mx`.

Print `mx` and congrats, you got 100 points!

## Implementation

```cpp
#include <bits/stdc++.h>
typedef long long ll;
using namespace std;
signed main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);

    ll n;
    cin >> n;
    vector<ll> a(n+1, 0);
    for(ll i = 1; i <= n; i++) cin >> a[i];
    ll mini = 0;
    ll current = 0;
    ll res = 0;
    for(auto t : a){
        current += t;
        res = max(res, current - mini);
        mini = min(current, mini);
    }
    cout << res << '\n';

}
```
