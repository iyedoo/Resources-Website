## Problem Statement

- [English](statements/quantum%20(en).pdf)

- [French](statements/quantum%20(fr).pdf)

- [Arabic](statements/quantum%20(ar\_DZ).pdf)


## Solution



We have an $n \\times m $ grid, initially empty. We will be given
$C$ points. Each time we add a point, we must choose a point $(x,y)$ in
the grid such that the sum of distances from all added points to $(x,y)$
is minimized.



------------------------------------------------------------------------



##Subtask 1: 5 points



Grid is $ 1 \\times 2 $. Just check whether $(1,1)$ or $(1,2)$ is
better.



------------------------------------------------------------------------



##Subtask 2: 15 points



Use a 2D array initialized to zeros.  
For each new point $(x,y)$:

* Add distance to all cells.
* Take minimum.

Time complexity: $ O( n \\times m \\times c ) $.

------------------------------------------------------------------------



##Subtask 3: 30 points



We use a greedy/median idea.

For 1D: given $ X\_1, X\_2, \\dots $, to minimize $ \\sum|X\_i - v| $,
pick median.  
So:

* Maintain arrays of $ x $'s and $ y $'s separately.
* Each time, sort them, pick median, compute sum of distances.

Time complexity: $ O( c^2 \\log{c} ) $.



------------------------------------------------------------------------


##Subtask 4: 100 points



Optimize subtask 3 with data structures:

* Ordered set → find median in $ O( \\log{c} ) $.
* Lazy segment tree → range update/query for sums.

Final complexity: $ O(c \\times ( \\log{c} + \\log{n} +
\\log{m} )  ) $ .

## Implementation

```cpp
#include <bits/stdc++.h>
#include <filesystem>
using namespace std;
using ll = long long;

// Segment tree for sum over a fixed range [1..N]
struct SegTree {
    int n;
    vector<ll> t;
    SegTree(int _n): n(_n), t(4*n, 0) {}
    void update(int idx, ll val, int v, int tl, int tr) {
        if (tl == tr) {
            t[v] += val;
        } else {
            int tm = (tl + tr) >> 1;
            if (idx <= tm) update(idx, val, v<<1, tl, tm);
            else          update(idx, val, v<<1|1, tm+1, tr);
            t[v] = t[v<<1] + t[v<<1|1];
        }
    }
    void update(int idx, ll val) { update(idx, val, 1, 1, n); }
    ll query(int l, int r, int v, int tl, int tr) {
        if (l > r) return 0;
        if (l == tl && r == tr) return t[v];
        int tm = (tl + tr) >> 1;
        return query(l, min(r, tm), v<<1, tl, tm)
             + query(max(l, tm+1), r, v<<1|1, tm+1, tr);
    }
    ll query(int l, int r) { return query(l, r, 1, 1, n); }
};

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m, C;
    cin >> n >> m >> C;
    vector<int> xs(C), ys(C);
    for(int i=0;i<C;i++) cin>>xs[i]>>ys[i];

    // Create segment trees for X and Y: counts and sums
    SegTree cntX(n), sumX(n);
    SegTree cntY(m), sumY(m);

    vector<ll> ans(C);

    for(int k=1;k<=C;k++){
        int x = xs[k-1], y = ys[k-1];
        cntX.update(x, 1);
        sumX.update(x, x);
        cntY.update(y, 1);
        sumY.update(y, y);

        // total count and sum
        ll totalX = sumX.query(1, n);
        ll totalCntX = cntX.query(1, n);
        auto costX = [&](int X){
            ll leftCnt  = cntX.query(1, X);
            ll leftSum  = sumX.query(1, X);
            ll rightCnt = totalCntX - leftCnt;
            ll rightSum = totalX - leftSum;
            return X*leftCnt - leftSum + rightSum - X*rightCnt;
        };

        // Ternary search on [1..n]
        int l = 1, r = n;
        while(r - l > 3){
            int m1 = l + (r - l)/3;
            int m2 = r - (r - l)/3;
            if(costX(m1) > costX(m2)) l = m1;
            else r = m2;
        }
        ll bestX = LLONG_MAX;
        for(int X=l; X<=r; ++X) bestX = min(bestX, costX(X));

        // Similarly for Y
        ll totalY = sumY.query(1, m);
        ll totalCntY = cntY.query(1, m);
        auto costY = [&](int Y){
            ll lc = cntY.query(1, Y);
            ll ls = sumY.query(1, Y);
            ll rc = totalCntY - lc;
            ll rs = totalY - ls;
            return Y*lc - ls + rs - Y*rc;
        };
        l = 1; r = m;
        while(r - l > 3){
            int m1 = l + (r - l)/3;
            int m2 = r - (r - l)/3;
            if(costY(m1) > costY(m2)) l = m1;
            else r = m2;
        }
        ll bestY = LLONG_MAX;
        for(int Y=l; Y<=r; ++Y) bestY = min(bestY, costY(Y));

        ans[k-1] = bestX + bestY;
    }

    for(ll v: ans) cout<<v<<"\n";
    return 0;
}
```

