Written by *Fares Khelif*.
 
## Problem Statement
- [English](statements/purchase.en.pdf)
- [French](statements/purchase.fr.pdf)
- [Arabic](statements/purchase.ar_DZ.pdf)

## Solution
Naive Approach :
  - For each suitcase, we compute the number of souvenirs we can fit with two nested for loops as shown in the pseudocode : 
```cpp
        vector<int> ans(M)
        for(each Suitcase(of index j) in S) {
         int elements = 0
         int sum = 0
                 for (each Souvenir(of index i) in P) {
                      if (we can fit all souvenirs of weight i in the Suitcase) {
                           // Put all of them inside of it
                           sum += the weight of all elements
                           elements += P[i]

                      }
                      else {
                           // Put as much as we can inside of it
                           sum += the maximum weight we can fit inside of it
                           elements += the number of elements corresponding the the maximum weight
                      }
                  }
                 ans[j] = elements
             }
```

- The main problem here is the time complexity :
      * For each Suitcase, we compute the maximum number of souvenirs we're able to put in it by iterating over all possible weights of the souvenirs
      * Since we have T Suitcases and M possible weights of the Souvenirs, this will result in a TC of $O(T \times M)$ which is insufficient with such constraints($10^5 \times 10^5 = 10^{10}$ (Too large!))
- Key Optimization :
    * Instead of reiterating over all possible weights in P for every Suitcase, we can see that if we sort the array S while keeping the index of each suitcase for the output, we won't have to recompute computed suitecases, since we always start from the smallest weight, the large suitcase is going to fit what the small suitcase fitted, and it will still have the capacity to fit other souvenirs, and that's only what the optimized algorithm is going to compute
    * As you can see the fully working code I wrote, which guarantees a 100%

- Time complexity: 
    * Since we don't recompute the previously computed weights, we have that i only does a single iteration over the array P which results in the fast : $O(T+M)$
    * Which is guaranteed to work since $T, M \leq 10^5$, thus we have $2 \times 10^5$ operations at most

```cpp
#include <bits/stdc++.h>
using namespace std;
#define endl '\n'
using ll  = long long;
using pll = pair<ll, ll>;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    //___________________________
    ll t, m; cin >> t >> m;
    vector<ll> s(t);
    vector<pll> p(m);
    for (ll i = 0; i < t; i++) cin >> s[i];
    for (ll i = 0; i < m; i++) cin >> p[i].first, p[i].second = i;  // Essential step  No.1

    sort(p.begin(), p.end());  // Essential step  No.2

    vector<ll> ans(m);
    ll i = 0; // Declare i as a global variable to not recompute computed values (avoids TLE)
    ll sum = 0, el = 0;
    for (ll j = 0; j < m; j++) {
        for (; i < t; i++) {  // We don't need to declare i every time
            if (p[j].first-sum >= s[i]*i) { // If we can put all the weights in the suitcase
                el += s[i];
                sum += s[i]*i;
                s[i] = 0;
            }
            else {  // If we can put some of it
                ll a = ((p[j].first-sum)/i);
                el += a;
                sum += a*i;
                s[i] -= a;
                break;
            }
        }
        ans[p[j].second] = el;  // Assign the answer to each suitcase
    }

    // Output the answers :
    for (auto c : ans) cout << c << ' ';
    cout << endl;
    return 0;
}
```
