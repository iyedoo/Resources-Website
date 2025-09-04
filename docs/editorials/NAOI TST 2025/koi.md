# KOI

Written by _Haithem Djefel_.

## Problem Statement:
- [English](statements/koi.pdf)
- [Arabic](statements/koi%20(ar_DZ).pdf)

## Solution

We can use the following approach, for each task, calculate its value (i.e. the number of points assigned to it), we can initialize all problems with value n, and decrease it by 1 for each contestant who solved the task. 

then for each contestant calculate the score he/she got, after that we can sort the list of contestants and get the index of Kheira and the we’re done.

total time complexity: $O(N \times T)$.

## Implementation:

```cpp
// Problem solution by Haithem Djefel
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
typedef pair<ll, ll> pll;

const int MOD = 1000000007;
const ll LOG = 31;

#define db(x) cerr << #x << " = " << x << " | "
#define dbg(x) cerr << #x << " = " << x << "\n"

#define Algerian ios::sync_with_stdio(0);
#define OI cin.tie(NULL);

#define f first
#define s second

int main() {
    Algerian OI

    ll n, t, p;
    cin >> n >> t >> p;

    vector<vector<ll>> contestant(n);

    // initialize all tasks with value n
    vector<ll> tasks(t, n);
    
    for (ll i = 0; i < n; i++) {
        for (ll j = 0; j < t; j++) {
            ll c;
            cin >> c;

            if (c) {
                contestant[i].push_back(j);
                tasks[j]--;
            }
        }
    }

    vector<pair<pll, ll>> scores(n);

    for (ll i = 0; i < n; i++) {
        ll cur = 0;

        for (auto x : contestant[i]) cur += tasks[x];
        scores[i] = {{cur, contestant[i].size()}, i};
    }
    --p;

    // custom comparator to sort contestants acoording to the problem description
    auto cmp = [=](pair<pll, ll> a, pair<pll, ll> b) -> bool {
        if (a.f.f != b.f.f) return a.f.f > b.f.f;
        else if (a.f.s != b.f.s) return a.f.s > b.f.s;
        else return a.s < b.s;
    };

    sort(scores.begin(), scores.end(), cmp);

    ll idx, score;

    for (ll i = 0; i < n; i++) {
        if (scores[i].s == p) {
            idx = i;
            score = scores[i].f.f;
        }
    }

    // add 1 because our resault is 0-indexed
    cout << score << " " << idx + 1 << "\n";

    return 0;
}
```