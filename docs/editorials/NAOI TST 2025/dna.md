# DNA

Written by _Kimouche Taki_



## Problem statement :
- [English](statements/dna.pdf)


## Solution :

### Subtask I:  $1 \leq N \leq 100,\quad R \leq 10$

- For this we loop over all substrings of the given string at cost of $O(N^2)$ time (aka $\binom{N}{2}$), and for each substring we check whether we satisfy the requirements in $O(N \cdot R)$ time. Then we keep the minimum length.  
  _(We must handle the impossibility condition too.)_

**Time complexity**: $O(N^3 \cdot R)$ — too slow for larger input sizes 😐  
**Space complexity**: $O(1)$ extra space aside from the input string.



### Subtask II: $1 \leq N \leq 4000,\quad R \leq 10$

To speed things up, we use prefix sums of each required character's occurrences to query in $O(1)$ the frequency of each character $x$ in our set of required characters.

To implement this, we create a `map <int, vector <int>> mp` where `mp[x]` is the prefix sum vector of the occurrences of character `x`.

**Time complexity**:  
- Looping over all substrings: $O(N^2)$  
- Checking all characters: $O(R \log R)$  
- Building prefix sums: $O(NR)$  
- **Total**: $O(N^2 R \log R)$

**Space complexity**: $O(NR)$ extra space due to prefix sum build.  
_(You can mitigate the log factor by using `unordered_map` with a good hash function.)_

Still slow though... 😅

---

### Subtask IV: $1 \leq N \leq 200{,}000$

To solve this final subtask (and thus the entire problem), we use a **greedy strategy**: the **two-pointer technique** (aka sliding window).

The goal is to catch a segment of minimal length that satisfies all $R$ requirements.

We initialize two pointers `l, r = 0` and a frequency map/array. We expand the window by incrementing the frequency of `array[r]`.

Instead of prefix sums, we use a `satisfied` variable that only increments when a condition from the $R$ requirements is fulfilled. This avoids the $O(NR)$ factor and gives a major optimization.

Whenever `satisfied == R`, we try to shrink the window from the left (`l`) while maintaining the condition, and we always track the minimum segment length.

**Time complexity**: $O(N)$ — both `l` and `r` move at most $N$ times.  
**Space complexity**: $O($# distinct characters$)$

We are finally done........

## Implementation

```cpp

#include <bits/stdc++.h>

using namespace std;
typedef long long ll;

#define pb push_back
#define sz(x) (int) x.size()

// hopeful
int main(){

    ios::sync_with_stdio(NULL); cin.tie(0);

    int n , r , k; cin >> n >> k >> r;
    vector <int> vec(n); 
    for (int i = 0 ; i < n ; ++i){
        cin >> vec[i];
    }
    unordered_map <int , int> quant;
    for (int i = 0 ; i < r ; ++i){
        int c , q; cin >> c >> q;
        quant[c] = q;
    }

    int L = 0 , R = 0 , satis = 0 , mn = INT_MAX;
    unordered_map <int , int> freq;

    while (L <= R && R < n && L < n){
    
        ++freq[vec[R]];
        if (quant.count(vec[R]) && freq[vec[R]] == quant[vec[R]]) ++satis;


        while (satis == r){
            mn = min(mn , R - L + 1);

            int basis = vec[L];
            --freq[basis];
            if (freq[basis] < quant[basis] && quant.count(basis)) satis--;
            if (!freq[basis]) freq.erase(basis);
        
            ++L;           
        }
    
        ++R;
    }


    if (mn == INT_MAX || !mn) {
        cout << "impossible" << "\n";
        return 0;
    }

    cout << mn << "\n";

    return 0;
}
```

Hope you learnt something along the way :)