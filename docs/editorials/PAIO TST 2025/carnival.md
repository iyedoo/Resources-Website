Written by *Raouf Ould Ali*.
 
## Problem Statement
- [English](statements/carnival.en.pdf)
- [French](statements/carnival.fr.pdf)
- [Arabic](statements/carnival.ar_DZ.pdf)


We are given $N$ lattice points ($3 \leq N < 100$), with the guarantee that no three points are collinear. For every triple of points $(A, B, C)$, these form a triangle. The score of this triangle is the number of points lying strictly inside it (excluding its vertices). The task is to output, for each possible score $i$, how many triangles contain exactly $i$ points.

---

## Key Observations

- **Naïve approach**
   For each triangle $(A, B, C)$, check every other point to see if it lies inside.

    * This is $O(N^4)$: there are $O(N^3)$ triangles, and each check costs $O(N)$.
    * With $N < 100$, this is too slow.

- **Sorting helps**
   The first step in the solution is to sort the points by their $(x, y)$-coordinates.

    * After sorting, any triangle $(i, j, k)$ with $i < j < k$ will have its vertices ordered with respect to the $x$ component.
    * This prevents double-counting and ensures that the `points_below[i][j]` values behave consistently when we combine them.

---

## Precomputation: Points under a segment

For two points $A_i$ and $A_j$ ($i < j$), consider the directed segment $(A_i \to A_j)$.
We count how many points with indices strictly between $i$ and $j$ lie strictly **to the right** of this line.

Formally:

$$
points\_ below[i][j] = \#\{ k : i < k < j, \; \text{cross}(A_j - A_i, A_k - A_i) < 0 \}
$$

This preprocessing costs $O(N^3)$.

---

## Using the precomputation for triangles

Now, for each triple $(i,j,k)$ with $i<j<k$, we want to compute the number of points inside the triangle $(A_i,A_j,A_k)$.

* If the orientation $(i,j,k)$ is **counter-clockwise**:

  $$
  \text{inside} = points\\_below[i][k] - points\\_below[i][j] - points\\_below[j][k] - 1
  $$

* If the orientation is **clockwise**:

  $$
  \text{inside} = points\\_below[i][j] + points\\_below[j][k] - points\\_below[i][k]
  $$

We then increment the counter:

$$
O[\text{inside}] += 1
$$

---

## Complexity Analysis

* Sorting: $O(N \log N)$
* Precomputation: $O(N^3)$ for filling `points_below`
* Triangle enumeration: $O(N^3)$
* Total: $O(N^3)$, which is efficient for $N \leq 100$.

Memory: $O(N^2)$ for `points_below`.

## Implementation
```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

int cross_product(int x1, int y1, int x2, int y2)
{
    return x1 * y2 - x2 * y1;
}

signed main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    int n;
    cin >> n;
    vector<pair<int, int>> point(n);
    for (int i = 0; i < n; i++)
        cin >> point[i].first >> point[i].second;

    sort(point.begin(), point.end());

    vector<vector<int>> points_below(n, vector<int>(n, 0));

    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
        {
            for (int k = i + 1; k < j; k++)
            {
                if (cross_product(point[j].first - point[i].first,
                                  point[j].second - point[i].second,
                                  point[k].first - point[i].first,
                                  point[k].second - point[i].second) < 0)
                {
                    points_below[i][j] += 1;
                }
            }
        }

    vector<int> O(n - 2, 0);

    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            for (int k = j + 1; k < n; k++)
            {
                if (cross_product(point[j].first - point[i].first,
                                  point[j].second - point[i].second,
                                  point[k].first - point[i].first,
                                  point[k].second - point[i].second) > 0)
                {
                    O[points_below[i][k] - points_below[i][j] - points_below[j][k] - 1] += 1;
                }
                else
                {
                    O[points_below[i][j] + points_below[j][k] - points_below[i][k]] += 1;
                }
            }

    for (int i = 0; i < n - 2; i++)
        cout << O[i] << ' ';
}
```