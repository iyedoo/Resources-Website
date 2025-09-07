# Goal

## Problem Statement



- [English](statements/goal%20(en).pdf)



- [French](statements/goal%20(fr).pdf)



- [Arabic](statements/goal%20(ar\_DZ).pdf)



## Solution



In this problem we have to find the shortest path to get to the final cell.

We have an $n \times m$ grid and we will start in the cell $(1,1)$ and we want to get into the final cell which is $(n,m)$.

Each cell is one of the following:

When you end a row in the grid, you start in the beginning of the next row.

Find the shortest path from the point $(1,1)$ to the point $(n,m)$ or print $-1$ if there is no such path.

A general idea before we go to the solution: we can get rid of the grid and make a 1D line.3



------------------------------------------------------------------------



## Subtask 1: 15 points



Each cell is either an empty cell or an obstacle.

* If there is an obstacle, the answer is $-1$ because we won't be able to reach the cell $(n,m)$.
* Otherwise, the answer is $n \times m - 1$.



------------------------------------------------------------------------



## Subtask 2: 20 points



Not sure what the intended solution is, but maybe try all ways using DFS
(likely TLE).



------------------------------------------------------------------------




## Subtask 3: 25 points

This idea covers subtasks 2 and 3.

We can go from the end and solve it using DP:
* Empty cell → move forward by 1 step.
* Obstacle → push 2 cells backward.
* Booster cell → jump forward by the digit (if valid), or move 1 step forward.

If booster goes out of grid, ignore it.

Base case: $dp(n \times m - 1) = 0$.

Answer: $dp(0)$.

Time complexity: $O(n \times m)$.

------------------------------------------------------------------------

## Subtask 4: 100 points

Run BFS from the start cell.
* Check if visited.
* Maintain number of steps in BFS.
* Answer is in $(n,m)$ or $-1$ if unreachable.

Time complexity: $O(n \times m)$.

## Implementation
```cpp
#include <bits/stdc++.h>
using namespace std;

#define pb push_back
#define ll long long

void solve() {  
    int n , m;
    cin >> n >> m;
    string s = {};
    for(int i = 0 ; i < n ; i ++) {
        string a;cin >> a; s += a;
    }
    vector < ll > d(n * m , 1e16);
    queue <ll> q; d[0] = 0;
    q.push(0);
    while(!q.empty()) {
        ll pos = q.front() ; q.pop();
        if(pos == n * m - 1) return void(cout << d[pos] << '\n');
        if(pos - 2 >= 0 && s[pos] == '#') {
            if(d[pos - 2] > d[pos] + 1)
                d[pos - 2] = d[pos] + 1 , q.push(pos - 2);
            continue;
        }
        if(pos + 1 < n * m)
            if(d[pos + 1] > d[pos] + 1)
                d[pos + 1] = d[pos] + 1 , q.push(pos + 1);
        if(s[pos] == '.') continue;
        int nex = pos + (s[pos] - '0');
        if(nex < n * m)
            if(d[nex] > d[pos] + 1)
                d[nex] = d[pos] + 1 , q.push(nex);        
    }
    cout << "-1";
}


int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    solve(); 
    return 0;
}
```

