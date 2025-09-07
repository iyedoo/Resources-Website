# Plane

Written by *Haithem Djefel*.

## Problem Statement
- [English](statements/plane.en.pdf)
- [French](statements/plane.fr.pdf)
- [Arabic](statements/plane.ar_DZ.pdf)

# Solution

We can use a dynamic programming approach, let $dp_i$ denote the minimum cost for omar to survive until minute $T_i$, our base case is $dp_{-1} = 0$, and our transition will be the following: 

For each $i \in \{0, 1,..., n - 1\}$, $dp_i = min(dp_{i - 1} + p, dp_{k - 1} + q)$, where k is the index of the smallest $T_j$ such that $T_j + m - 1 \leq T_i$. 

We visit each state exactly once, and at each state, we can find $dp_{i - 1}$ in $O(1)$, and $dp_{k - 1}$ can be found in $O(\log n)$ using a binary search since the array $T$ is sorted.
our final answer will be $dp_{n - 1}$. 

Now for the construction (i.e. finding the optimal way Omar should use the masks or perfume), this might seem tricky at first, but it could be done with just slight additions to our approach. 

We can treat our dp states as a DAG (directed acyclic graph), where each state is a node, and the parent for a state is the state that leads to it (i.e. choosing the mask or perfume); this way, we can start at state $n - 1$ and continue traversing its parents until its first ancestor (state 0).

Total time complexity: $O(n\log n)$.

# Implementation

Below is an implementation of the aforementioned idea using a bottom-up dp approach:

```cpp
cpp
// PAIO TST solution code for planes by Haithem Djefel
#include<bits/stdc++.h>
using namespace std;

typedef long long ll;

#define Algerian ios::sync_with_stdio(0);
#define OI cin.tie(0);

int main() {
    Algerian OI

    ll n, m, p, q; 
    cin >> n >> m >> p >> q;
    vector<ll> t(n);

    for (ll i = 0; i < n; i++) cin >> t[i];
    
    vector<ll> dp(n);
    vector<ll> par(n);

    for (ll i = 0; i < n; i++) {
        dp[i] = (i > 0 ? dp[i - 1] : 0) + p;
        auto it = lower_bound(t.begin(), t.end(), t[i] - m + 1);
        
        ll val = 0;
        if (it != t.begin()) {
            ll idx = (--it) - t.begin();

            val = dp[idx];
        }
        val += q;

        if (val <= dp[i]) {
            par[i] = 2;
            dp[i] = val;
        } else {
            par[i] = 1;
        }
    }

    cout << dp[n - 1] << "\n";

    ll x = n - 1;

    vector<ll> res(n);
    

    while (x >= 0) {
        if (par[x] == 1) {
            res[x] = 1;
            x--;
        } else if (par[x] == 2) {
            auto it = lower_bound(t.begin(), t.end(), t[x] - m + 1);
            ll idx = it - t.begin();
            res[idx] = 2;
            x = idx - 1;
        }
    }

    for (ll i = 0; i < n; i++) cout << res[i] << " \n"[i == n - 1];
}
```
