# Towers

*Written by Iyed Baassou*


> [English](statements/towers_en.pdf)  
> [Arabic](statements/towers_ar.pdf)  
> [Arabic (Algeria)](statements/towers_dz.pdf)  
> [French](statements/towers_fr.pdf)

## 1. Multi-source BFS
The first step is to compute the distance from every cell to its nearest tower.
- Push all towers into a queue initially.
- Perform BFS to fill `dist[x][y]` with the minimum distance from `(x, y)` to any tower.
This gives us, for each cell, how “safe” it is.


## 2. Binary Search on the Answer
We want the maximum minimum distance along a valid path. This can be solved with binary search:
- Let `mid` be a candidate minimum distance.
- Check if there exists a path from **V** to **J** using only cells where `dist[x][y] >= mid`.
- If yes, try a larger `mid`. Otherwise, try smaller.

The search range is from `0` to `n + m` (worst-case maximum Manhattan distance).


## 3. Checking the correctness (BFS again)
To test if a candidate `mid` works:
- Start BFS from **V** if its distance to the nearest tower is at least `mid`.
- Only move to cells with `dist[x][y] >= mid`.
- If we can reach **J**, then `mid` is feasible.


## Code

```cpp
#include <bits/stdc++.h>
using namespace std;

int dx[4] = {1, -1, 0, 0};
int dy[4] = {0, 0, 1, -1};

int main() {
    int n, m; cin >> n >> m;

    vector<vector<char>> grid(n, vector<char>(m));
    vector<vector<int>> dist(n, vector<int>(m, INT_MAX));

    queue<pair<int,int>> q;
    int sx, sy, ex, ey;

    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < m; ++j) {
            cin >> grid[i][j];
            if (grid[i][j] == '+') q.push({i, j}), dist[i][j] = 0;
            if (grid[i][j] == 'V') sx = i, sy = j;
            if (grid[i][j] == 'J') ex = i, ey = j;
        }
    }

    while (!q.empty()) {
        auto [x, y] = q.front(); q.pop();

        for (int k = 0; k < 4; ++k) {
            int nx = x + dx[k], ny = y + dy[k];
            
            if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
            
            if (dist[nx][ny] > dist[x][y] + 1) {
                dist[nx][ny] = dist[x][y] + 1;
                q.push({nx, ny});
            }
        }
    }

    int l = 0, r = n + m, ans = 0;
    while (l <= r) {
        int mid = (l + r) / 2;

        vector<vector<int>> vis(n, vector<int>(m, 0));
        while (!q.empty()) q.pop();

        if (dist[sx][sy] >= mid) {
            vis[sx][sy] = 1;
            q.push({sx, sy});
        }

        int ok = 0;
        while (!q.empty()) {
            auto [x, y] = q.front(); q.pop();
            
            if (x == ex && y == ey) {
                ok = 1;
                break;
            }
            
            for (int k = 0; k < 4; k++) {
                int nx = x + dx[k], ny = y + dy[k];
            
                if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
            
                if (!vis[nx][ny] && dist[nx][ny] >= mid) {
                    vis[nx][ny] = 1;
                    q.push({nx, ny});
                }
            }
        }

        if (ok) l = mid + 1;
        else r = mid - 1;
    }

    cout << l - 1 << "\n";

    return 0;
}

```

## Complexity
- Multi-source BFS: $O(n \cdot m)$
- Each feasibility check BFS: $O(n \cdot m)$
- Binary search tries at most $\log(n+m)$ values.

Overall: $O(n \cdot m \cdot \log(n+m))$, obviously enough for $n, m \leq 500$.