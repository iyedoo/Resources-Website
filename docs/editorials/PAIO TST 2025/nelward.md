# Nelward

Written by *Redhouane Abdellah*.
 
## Problem Statement
- [English](statements/nelward.en.pdf)
- [French](statements/nelward.fr.pdf)
- [Arabic](statements/nelward.ar_DZ.pdf)

## Solution

-   Let $1 \leq i < j \leq n$ such that:

    -   $p_i > p_j$. Notice that $p_i$ has to be moved in front of $p_j$
        if we want to sort the permutation, meaning every element in
        front of $p_i$ also has to be moved.

-   Let $1 \leq k \leq n$ be the smallest index such that $p_k < p_l$
    for all $k < l \leq n$.
    
    The previous observation tells us that all elements before $p_k$
    have to be moved, i.e.Âthe answer is at least

    $$
    n - (n - k + 1) = k - 1
    $$

-   Notice how it is possible to move an element into any position when
    performing an operation on it.

    We can do the following $(k - 1)$ times: move the first element into
    a new position $x \geq k$ such that the suffix starting at $k$ stays
    sorted.

    Notice that after all operations the permutation is guaranteed to
    become sorted, hence the answer is always $(k - 1)$.

------------------------------------------------------------------------

## Implementation

-   We can implement this in $O(n)$ time and $O(n)$ space by doing the
    following:

    Traverse the array backwards starting from the $(n-1)$th element,
    and set $k = n$.

    As long as $p_i < p_{i+1}$ we keep traversing the array while
    decrementing $k$ each time.

    As soon as the condition isn't met we stop decrementing $k$ and
    traversing the array.

``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    int n; cin >> n;
    vector<int> p(n);
    for (auto &i : p) cin >> i;
    int k = n;
    for (int i = n-2; i >= 0; --i) {
        if (p[i] < p[i+1]) --k;
        else break;
    }
    cout << k-1;
}
```

-   We can reduce the space complexity to $O(1)$ by doing the following:

    Set $k = 1$, let $a = p_1$.

    Then for all $1 < i \leq n$: let $b = p_i$.

    If $a > b$, we set $k = i$ (because now the left endpoint of the
    longest increasing suffix is guaranteed to be $\geq i$), and then
    set $a = b$ before moving to $i+1$.

    Here's the code for it:

``` cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    int n; cin >> n;
    int a, b;
    cin >> a;
    int k = 1;
    for (int i = 2; i <= n; ++i) {
        cin >> b;
        if (a > b) k = i;
        a = b;
    }
    cout << k-1;
}
```
