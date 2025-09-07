# Cooling

Written by *Iyed Baassou*.
 
## Problem Statement
- [English](statements/cooling.en.pdf)
- [French](statements/cooling.fr.pdf)
- [Arabic](statements/cooling.ar_DZ.pdf)


## Solution
We can notice the low constraints of both $n$ ($1 \le n \le 20$) and $m$ ($1 \le m \le 10$) which guides us to using a bruteforce approach.
The bruteforce in this problem is finding all unique subsets of coolers and testing if they satisfy the conditions of the problem.

## Method used
In order to find all subsets we can use a recursive or iterative approach, we will cover both of them in this editorial.

#### Recursive approach:
We start at the first cooler and do the following:
- We use a `line` array to store the number of units that power each cell.
- At each cooler we can either:
	- Exclude it and move to the next cooler.
	- Include it, add its cost and cooling range to the line, and move to the next cooler
		- **Note:** Remember to backtrack (remove the cooling range) after the recursion call.
- When we find a subset, we need to check if the coolers cover all sections with enough units, we iterate over the intervals of each section and check if the power at each point in the interval is equal or greater than $C[i]$ ($C[i]$ is the units needed to cool the section $i$).
```cpp
#include <bits/stdc++.h>
using namespace std;

int n, m;
vector<vector<int>> sections, coolers;
int mn = INT_MAX;

vector<int> line(101, 0);

void solve(int i, int cost) {
    if (i == m) {
        for (auto s: sections) {
            for (int j = s[0]; j <= s[1]; j++) {
                if (line[j] < s[2]) return;
            }
        }
        mn = min(mn, cost);
        return;
    }

    // Exclude
    solve(i + 1, cost);

    // Include
    for (int j = coolers[i][0]; j <= coolers[i][1]; j++) {
	    line[j] += coolers[i][2];
    }
    solve(i + 1, cost + coolers[i][3]);
    for (int j = coolers[i][0]; j <= coolers[i][1]; j++) {
        line[j] -= coolers[i][2];
    }
}

int main() {
    cin >> n >> m;
    sections.assign(n, vector<int>(3));
    for (int i = 0; i < n; i++) for (int j = 0; j < 3; j++) cin >> sections[i][j];

    coolers.assign(m, vector<int>(4));
    for (int i = 0; i < m; i++) for (int j = 0; j < 4; j++) cin >> coolers[i][j];

    solve(0, 0);
    cout << mn << endl;
    
    return 0;
}

```

- **Time complexity analysis:**
	- Recursion: The number of subsets of an array of length m is $2^m$, our recursive function finds all these subsets causing a time complexity of $O(2^m)$, because at each of the $m$ coolers, we call the recursion twice.
	- Validation:
		- At each recursion call we add the cooling ranges to the `line` array, which is $O(100)$ worst-case.
		- When we find a subset and get the `line` array, we check if all sections are covered with enough units by iterating over all $n$ sections and iterating over their intervals, resulting in a time complexity of $O(100 \cdot n)$.

**Overall time complexity:** $O(2^m \cdot 100 \cdot n)$ which is feasible under problem constraints.

---
**Fun fact**: you can test if your code TLEs by finding time complexity and replacing the values with the upperbounds of constraints:
$2^m \cdot 100 \cdot n = 2^{10} \cdot 100 \cdot 20 = 2048000 \le 4 \cdot 10^8$
It works! ✅
#### Iterative approach:

Instead of recursion, we can iterate over **all subsets** of coolers using **bitmasking**.

- Each cooler can either be included or not, so we represent a subset of coolers with a bitmask of length `m` by denoting excluded as a non-set 0-bit and included as a set 1-bit.
- Similar to the recursive approach, for each subset:
    - Reset a `line` array (size `100`, since positions are bounded) to 0.
    - Add cooling power of the included coolers to their ranges.
    - Sum up the cost of included coolers.
    - Check if all sections are satisfied.
- Keep track of the minimum cost across all valid subsets.
```cpp
#include <bits/stdc++.h>
using namespace std;  

int main() {
	int n, m; cin >> n >> m;

	vector<vector<int>> sections(n, vector<int>(3));
	for (int i = 0; i < n; ++i) for (int j = 0; j < 3; ++j) cin >> sections[i][j];  

	vector<vector<int>> coolers(m, vector<int>(4));
	for (int i = 0; i < m; ++i) for (int j = 0; j < 4; ++j) cin >> coolers[i][j];
	 
	int mn = INT_MAX;
	for (int mask = 0; mask < (1 << m); ++mask) {
		vector<int> line(101, 0);

		int curr = 0;

		for (int i = 0; i < m; ++i) {
			if (mask & (1 << i)) {
				curr += coolers[i][3];
				for (int j = coolers[i][0]; j <= coolers[i][1]; ++j) {
					line[j] += coolers[i][2];
				}
			}
		}
		
		bool ok = 1;
		for (int i = 0; i < n; ++i) {
			for (int j = sections[i][0]; j <= sections[i][1]; ++j) {
				if (line[j] < sections[i][2]) ok = false;
			}
		}

		if (ok) mn = min(mn, curr);
	}

	cout << mn;
	return 0;
}
```
- **Time complexity analysis:**

	- **Subsets:** There are $2^m$ subsets of coolers.
    
	- **Processing a subset:**
    
	    - Adding chosen coolers’ power to `line`: each cooler can cover at most `100` positions. In worst case, all `m` coolers are included, so cost is $O(100 \cdot m)$.
	    - Checking all `n` sections: each section covers at most `100` positions, so validation is $O(100 \cdot n)$.

**Overall time complexity:** $O(2^m\cdot 100\cdot (m+n))$

---
- If $m = 10$ and $n = 20$:
$2^{10}\cdot 100 \cdot (10+30)=1024*3000=3.072 \cdot 10^6 \le 4 \cdot 10^8$
✅ Feasible within time limits.
