# 1.The Trial of Order and Chaos

## Problem Statement
- [English](statements/chaos.en.pdf)
- [French](statements/chaos.fr.pdf)
- [Arabic](statements/chaos.ar_DZ.pdf)


## Solution 
```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
typedef __int128 int128;

int main() {
    int n, m; 
    cin >> n >> m;
    
    vector<ll> a(n);
    for (int i = 0; i < n; ++i) cin >> a[i];

    // --- Ritual 1 ---
    vector<int> pre(n), alt_pre(n);
    for (int i = 0; i < n; ++i) {
        ll curr = 0;
        if (i % 2 == 0) for (int j = 0; j <= i; j++) curr += a[j];
        else {
            int sign = 1;
            for (int j = i; j >= 0; --j) {
                curr += sign * a[j];
                sign *= -1;
            }
        }
        if (i % 2) alt_pre[i] = ((curr % m) + m) % m;
        else pre[i] = curr % m;
    }

    for (int i = 0; i < n; ++i) {
        if (i % 2) a[i] = alt_pre[i];
        else a[i] = pre[i];
        cout << a[i] << " ";
    }
    cout << "\n";

    // --- Ritual 2 ---
    vector<ll> b;
    for (int i = 0; i < n - 2; ++i) {
        for (int j = i + 1; j < n - 1; ++j) {
            for (int k = j + 1; k < n; ++k) {
                ll val = (a[i] + a[j] + a[k]) % m;
                if (val % 2 == 0) b.push_back(val);
                else {
                    int128 sq = 1LL * val * val;
                    sq %= m;
                    b.push_back((ll)sq);
                }
            }
        }
    }

    for (ll x: b) cout << x << " ";
    cout << "\n";

    // --- Ritual 3 ---
    sort(b.begin(), b.end());
    for (int i = 0; i * 3 < (int)b.size(); i++) {
        if (i % 2 == 1) reverse(b.begin() + i * 3, b.begin() + min((int)b.size(), i * 3 + 3));
    }

    for (ll x: b) cout << x << " ";
    cout << "\n";

    // --- Ritual 4 ---
    sort(b.begin(), b.end());
    b.erase(unique(b.begin(), b.end()), b.end());

    vector<ll> add;
    set<ll> B(b.begin(), b.end());
    for (int t = 0; t < m; t++) {
        if (B.count(t) == 0 && B.count(t + 1) == 1) add.push_back(t);
    }
    for (ll x: add) b.push_back(x);

    sort(b.begin(), b.end());
    b.erase(unique(b.begin(), b.end()), b.end());

    for (ll x: b) cout << x << " ";
    cout << "\n";

    // --- Ritual 5 ---
    vector<ll> c;
    for (ll x: b) {
        if (x % 3 == 0) c.push_back((x / 3) % m);
        else if (x % 3 == 1) c.push_back((x * 2 + 1) % m);
        else c.push_back(((x * x - 1) % m + m) % m);
    }

    for (ll x: c) if (x % 2 == 0) cout << x << " ";
    for (ll x: c) if (x % 2 == 1) cout << x << " ";
    cout << "\n";


    return 0;
}
```