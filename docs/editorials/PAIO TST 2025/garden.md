# Garden

Written by *Kian Abolghasemi*.

## Problem Statement
- [English](statements/garden.en.pdf)
- [French](statements/garden.fr.pdf)
- [Arabic](statements/garden.ar_DZ.pdf)

## Full Solution

The first thing one should notice is that after we trim the branches, all the leaves would be left at a distance

$$
d < \max_{i=0}^{n-1} \mathrm{dist}(0,i) < n .
$$

So if we find a way to calculate the minimum number of operations it takes to trim the tree to a length $i$ for all $0<i \leq \max_{i=0}^{n-1} \mathrm{dist}(0,i)$, then we can pick the minimum of all the minima. 

---

Notice that to trim a tree to a length $d$, it is clear we must remove any nodes with distances from the root more than $d$. After doing so, there will be "branches" whose leaves are less than $d$ away from the roots. We should clearly remove those too, so any node that doesn't have a leaf of distance at least $d$ from the root in their subtree should be removed as well. 

These must be removed for the condition "All leaves are of length $d$" to be satisfied, so the minimum is at least the number of leaves we have to remove mentioned above. Now removing those is sufficient, because for every node now, it has a subtree that has a leaf of distance at least $d$ from the root, and since we remove all nodes of distance more than $d$, then it has a leaf of distance $d$, so all the leaves are of distance $d$.

---

Thus, for a distance $i$, the number of leaves we should remove is:

- the number of leaves of distance more than $i$, plus
- the number of leaves whose maximum subtree leaf distance from the root is less than $i$.

We can first use a DFS search to get the distance from $0$ for all the nodes, then we could keep a frequency array for how many nodes are of distance $i$ for all $i$, from which we could build a prefix array to get the number of nodes of distance more than $i$.

---

We then make a vector of leaves (the nodes with degree 1, which we can calculate from the input) and sort them from furthest to closest to the root. For each leaf in this vector, we keep assigning their distance as the maximum subtree leaf distance to their parents, until we meet a node with a higher maximum subtree leaf distance. Thus we have for each node the maximum subtree leaf distance, which we could again store in a frequency array, then a prefix sum array to get the number of nodes with maximum subtree leaf distance less than $i$. 

Therefore, for any $i$, the minimum number of operations can be found in $O(1)$ with $O(n \log n)$ precomputation. Hence the overall algorithm is $O(n \log n)$.


## Implementation

```cpp
#include <bits/stdc++.h>
using namespace std;

vector<long long> dist;
vector<vector<long long>> edge;

// DFS to get distances
void dfs(long long node, long long prev)
{
    for (auto child : edge[node])
    {
        if (child == prev)
            continue;
        dist[child] = dist[node] + 1;
        dfs(child, node);
    }
}

int main()
{
    long long n;
    cin >> n;
    vector<long long> deg, mxd, par;
    deg.assign(n, 0);
    dist.assign(n, 0);
    mxd.assign(n, 0);
    par.assign(n, 0);
    cin >> par[0];
    for (long long i = 1; i < n; i++)
    {
        cin >> par[i];
        deg[i]++;
        deg[par[i]]++;
    }
    edge.assign(n, {});
    for (long long i = 1; i < n; i++)
    {
        edge[i].push_back(par[i]);
        edge[par[i]].push_back(i);
    }
    dfs(0, -1);
    vector<pair<long long, long long>> leaf;
    for (long long i = 1; i < n; i++)
        if (deg[i] == 1)
            leaf.push_back({dist[i], i});
    sort(leaf.begin(), leaf.end());
    reverse(leaf.begin(), leaf.end());
    for (long long i = 0; i < leaf.size(); i++)
    {
        long long ind = leaf[i].second;
        while (mxd[ind] < leaf[i].first)
        {
            mxd[ind] = leaf[i].first;
            ind = par[ind];
            if (ind == -1)
                break;
        }
    }
    long long ans = n + 1;
    vector<long long> cmxd, cd;
    cmxd.assign(n + 1, 0);
    cd.assign(n + 1, 0);
    for (long long i = 0; i < n + 1; i++)
        cd[i] = 0, cmxd[i] = 0;
    for (long long i = 0; i < n; i++)
    {
        cmxd[mxd[i]]++;
        cd[dist[i]]++;
    }
    vector<long long> premxd, pred;
    premxd.assign(n + 2, 0);
    pred.assign(n + 2, 0);
    for (long long i = 1; i < n + 2; i++)
    {
        premxd[i] = premxd[i - 1] + cmxd[i - 1];
        pred[i] = pred[i - 1] + cd[i - 1];
    }
    for (long long i = 1; i <= n; i++)
    {
        ans = min(ans, premxd[i] + n - pred[i + 1]);
    }
    cout << ans;
}
```

---

## Subtasks

- **Subtask 1:**  
  We check for the distance of all leaves. If they are not all equal, the answer is greater than 0, thus it is 1. Otherwise, the answer is 0.  
  **Complexity:** $O(n)$

- **Subtask 2:**  
  The condition implies that the only node that has a degree more than 2 is 0, and for all other nodes they are just in one of the straight paths that start from 0 and end at the only leaf in that path. Thus, for any distance $i$, to trim the tree to $i$ is to reduce every path longer than $i$ to $i$, and every path less than $i$ to 0.  
  We can iterate for each $i$ from 1 to $n$, calculating each time the number of operations we need by going over all the distinct paths and reducing them by the amount needed and increasing a counter by the reduction amount. Taking the minimum of all the final counters from 1 to $n$ gives the answer.  
  **Complexity:** $O(n^2)$

- **Subtask 3:**  
  The same condition holds, but our algorithm must be optimized since $n$ is no longer small enough. The optimization is: for every path, take the distance of the leaf and insert all these leaves into a vector, sorted by distance.  
  Now trimming to a distance $i$ not equal to the original distance of any leaf is futile, since we could do fewer operations by trimming to the distance of the leaf with least distance more than $i$. So we iterate for each leaf, from smallest to largest, and notice that the number of nodes left is the distance of the leaf we chose times the number of leaves with distance larger than its own.  
  So the number of operations is  

  $$
  n - (n-i) \cdot \mathrm{dist}(0,\text{leaf}_i).
  $$

  We take the minimum of all the values as the answer.  
  **Complexity:** $O(n \log n)$

- **Subtask 4:**  
  Since the number of leaves is less than 10, we can brute force. Each time, choose a leaf, and let the goal distance be its distance from the root. For every other leaf, keep trimming until it either is no longer a leaf, or its distance equals that of the chosen leaf. Keeping an operations counter, we choose the minimum value.  
  **Complexity:** $O(n)$
