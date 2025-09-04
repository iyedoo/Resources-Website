# Jump

Written by _Omar Abdelkafi Ykrelef_.


## Problem Statement

- [English](statements/jump.pdf)
- [Arabic](statements/jump (ar_DZ).pdf)

## Solution


We are given an $n \times n$ grid where each cell contains a number between **0–9**.
This number determines how many cells we can move either **to the right** or **downward**.

* If the number is **0**, the cell is a **dead end**.
* The goal is to count the number of ways to move from the upper-left corner $(0,0)$ to the lower-right corner $(n-1,n-1)$.

---

## 70 Points Approach

To solve **70%** of the problem, we can use **dynamic programming**.

Define a 2D array:

$$
dp[i][j] = \text{number of ways to reach cell } (i,j) \text{ from } (0,0).
$$

* Initialize all cells with $0$, except:

$$
dp[0][0] = 1
$$

* For each cell $(i,j)$, let:

$$
k = a[i][j]
$$

* If $k \neq 0$:

  * Add $dp[i][j]$ to $dp[i+k][j]$ (moving **down**)
  * Add $dp[i][j]$ to $dp[i][j+k]$ (moving **right**)
  * But only if those positions are **inside the grid**.

At the end:

$$
\text{Answer} = dp[n-1][n-1]
$$

---

## 100 Points Approach

For the full score, we need to handle **very large numbers** that cannot fit in standard integer types.

* Instead of integers, store **strings** in the DP table.
* Initialize all cells with `"0"`, except:

$$
dp[0][0] = "1"
$$

* Write a **string addition function** to add big integers.

---

### Implementing String Addition

The idea is the same as manual addition:

1. Start from the **last digit** of both strings.
2. Add them together.
3. If the sum is greater than 9, carry 1 to the next digit.
4. Continue until all digits are processed.

This way, we can correctly handle very large values of $dp[i][j]$.


## Implementation

```cpp
#include <bits/stdc++.h>
using namespace std;

int n;

// Function to add two big integers stored as reversed strings
// (digits are stored least significant first, e.g. "123" means 321)
string add(string a, string b) {
    string res(150, '0'); // result buffer initialized with '0'
    
    // copy digits of a into res
    for (int i = 0; i < a.size(); i++) {
        res[i] = a[i];
    }

    // add digits of b into res
    for (int i = 0; i < b.size(); i++) {
        char to = res[i] + (b[i] - '0'); // add corresponding digits
        int j = 1;
        // handle carry if sum > '9'
        while (to > '9') {
            res[i + j - 1] = (to % '9') + ('0' - 1); // set current digit
            to = res[i + j] + 1; // carry to next digit
            j++;
        }
        res[i + j - 1] = to; // store final digit
    }
    return res;
}

// Check if coordinates (i, j) are inside the n x n grid
bool in(int i, int j) {
    return (i < n && i >= 0 && j < n && j >= 0);
}

int main() {
    cin >> n;

    // input grid (each cell contains number of steps to move)
    vector<vector<int>> a(n, vector<int>(n));

    // dp[i][j] = number of ways to reach (i, j), stored as string
    vector<vector<string>> dp(n, vector<string>(n, "0"));
    dp[0][0] = "1"; // start position has exactly 1 way

    // read input grid
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cin >> a[i][j];
        }
    }

    // fill DP table
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            int k = a[i][j]; // step size from (i, j)
            if (k == 0) continue; // dead cell, skip

            // move right
            if (in(i, j + k)) {
                int J = j + k;
                dp[i][J] = add(dp[i][j], dp[i][J]);
            }

            // move down
            if (in(i + k, j)) {
                int I = i + k;
                dp[I][j] = add(dp[i][j], dp[I][j]);
            }
        }
    }

    // final result = ways to reach bottom-right cell
    string res = dp[n - 1][n - 1];

    // reverse string back to normal order
    reverse(res.begin(), res.end());

    // print result without leading zeros
    bool ok = false;
    for (int i = 0; i < res.size(); i++) {
        if (res[i] != '0') ok = true;
        if (ok) cout << res[i];
    }
    if (!ok) cout << 0;
}
```
