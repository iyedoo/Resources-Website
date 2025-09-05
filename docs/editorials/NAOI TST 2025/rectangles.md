# Rectangles

Written by _Raouf Ould Ali_.


## Problem Statement

- [English](statements/rectangles.pdf)

## Solution

We are given `N` axis-aligned rectangles inside the box `[0..xmax] × [0..ymax]`.
We want to choose a point **B** on the **top** (`(x,ymax)`) or **right** (`(xmax,y)`) border, so that the segment from **(0,0)** to **B** crosses the maximum number of rectangles.

---

### 1. Key observation

* Each rectangle corresponds to an **interval of slopes** for which the ray from `(0,0)` intersects it.
* Example: If the ray goes through `(x,y)`, then its slope is `y/x`. For a rectangle `(a,b,c,d)`, the ray hits it if the slope is between the slopes of corners `(a,d)` and `(c,b)`.

Thus, the problem reduces to:
👉 Find the slope with the **maximum number of covering intervals**.

---

### 2. From slopes to boundary points

Instead of working with fractions `y/x`, we can map every slope to a **unique boundary point B**:

* If the slope hits the **top border** first, that’s some `(X,ymax)`.
* If it hits the **right border** first, that’s some `(xmax,Y)`.

This way, every slope corresponds to exactly one candidate point `B`.

---

### 3. Sweeping

For each rectangle:

* Compute the **entry point** (when the ray starts intersecting it).
* Compute the **exit point** (when the ray stops intersecting it).
* Add a `+1` event at the entry point, and a `-1` event at the exit point.

Now we sort all events in increasing slope order.
While sweeping through them, we keep a running counter of active rectangles.
The maximum of this counter is the answer.

---

### 4. Implementation tricks

* To avoid floating-point errors, we work entirely in integers:

  * Using formulas like `(a*ymax + d - 1)/d` for ceiling division.
  * Distinguishing between hitting the top or right border depending on whether the projected x-coordinate ≤ `xmax`.
* A custom comparator orders border points in the same order as increasing slopes.
* Multiple valid answers may exist; output any.

---

### 5. Complexity

* Each rectangle contributes 2 events → `O(N)` events.
* Sorting events: `O(N log N)`.
* Sweeping: `O(N)`.

Total complexity: `O(N log N)`, efficient for `N ≤ 10^4`.

## Implementation

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

struct cmp {
    bool operator()(const pair<ll, ll> &a, const pair<ll, ll> &b) const {
        if (a.second != b.second)
            return a.second > b.second;
        return a.first < b.first;
    }
};

signed main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    ll xmax, ymax, n;
    cin >> xmax >> ymax >> n;

    map<pair<ll, ll>, ll, cmp> hi;

    for (ll i = 0; i < n; i++) {
        ll a, b, c, d;
        cin >> a >> b >> c >> d;
        // begin : a,d
        // end : c,b
        if (a == 0) {
            hi[{0, ymax}]++;
        } else if ((a * ymax + d - 1) / d <= xmax) {
            hi[{(a * ymax + d - 1) / d, ymax}]++;
        } else {
            hi[{xmax, (d * xmax) / a}]++;
        }

        if (b == 0) {
            hi[{xmax, -1}]--;
        } else if ((c * ymax + b - 1) / b <= xmax) {
            hi[{(c * ymax + b) / b, ymax}]--;
        } else {
            hi[{xmax, (b * xmax - 1) / c}]--;
        }
    }

    pair<ll, ll> maxipair = {0, 0};
    ll maxi = -1;

    ll current = 0;
    for (auto c : hi) {
        current += c.second;
        if (current > maxi) {
            maxi = current;
            maxipair = c.first;
        }
    }

    cout << maxi << ' ' << maxipair.first << ' ' << maxipair.second << '\n';
}
```