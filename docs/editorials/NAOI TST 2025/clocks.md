# Clocks

Written by _Omar Abdelkafi Ykrelef_.

## Problem Statement

- [English](statements/clocks.pdf)
- [Arabic](statements/clocks (ar_DZ).pdf)

## Solution

We have 9 clocks arranged in a $3 \times 3$ grid, and we are given 9 numbers in a $3 \times 3$ array.
Each number describes the current time expression of the corresponding clock:

* $0 \rightarrow$ O’clock (12:00)
* $1 \rightarrow$ Quarter past (3:00)
* $2 \rightarrow$ Half past (6:00)
* $3 \rightarrow$ Quarter to (9:00)

So each clock is like a **counter modulo 4**.

---

## Moves

There are **9 possible moves**.
Each move rotates a certain subset of clocks to the next expression (i.e., rotates them $90^\circ$ clockwise).

This means it **adds $+1 \pmod{4}$** to the values of those clocks.
We are allowed to apply each move multiple times.

---

## Goal

Our goal is to apply moves so that **all clocks show 12:00 (0)**, while minimizing the number of moves used.

---

## Key Observations

* We will have to use a move at most **3 times**, because applying a move 4 times returns the affected clocks back to their original state.

* We can apply the moves in **any order**, since the order does not matter (they just add values modulo 4).

---

## Approach

We can represent the solution using an **array of size 9** (the number of moves).
Each entry in this array stores the number of times we use that move.

Since each move can be used at most 3 times, there are 4 possibilities for each move ($0, 1, 2, 3$).

So in total, we need to check:

$$
4^9 = 262{,}144
$$

possible answers.

---

## Idea: Base-4 Counter

We can generate all possibilities using a **base-4 counter**:

* Start with $[0,0,0,0,0,0,0,0,0]$.
* Add $+1$ to the first index.
* If it becomes 4, reset it to 0 and carry over to the next index.
* Repeat this process to generate all $4^9$ possibilities.

For each generated sequence, we apply the moves to the initial state of the clocks and check:

* Do all clocks become 0?
* If yes, count the total number of moves used.
* Keep track of the sequence with the least total moves.

---

## Complexity Analysis

$$
\text{Total time complexity } = O(4^9)
$$

---

## Implementation

```cpp
#include <bits/stdc++.h>
using namespace std;

// Move 1
void move0(vector<vector<int>>& a){
    a[0][0] = (a[0][0] + 1) % 4;
    a[0][1] = (a[0][1] + 1) % 4;
    a[1][0] = (a[1][0] + 1) % 4;
    a[1][1] = (a[1][1] + 1) % 4;
}

// Move 2
void move1(vector<vector<int>>& a){
    a[0][0] = (a[0][0] + 1) % 4;
    a[0][1] = (a[0][1] + 1) % 4;
    a[0][2] = (a[0][2] + 1) % 4;
}

// Move 3
void move2(vector<vector<int>>& a){
    a[0][1] = (a[0][1] + 1) % 4;
    a[0][2] = (a[0][2] + 1) % 4;
    a[1][1] = (a[1][1] + 1) % 4;
    a[1][2] = (a[1][2] + 1) % 4;
}

// Move 4
void move3(vector<vector<int>>& a){
    a[0][0] = (a[0][0] + 1) % 4;
    a[1][0] = (a[1][0] + 1) % 4;
    a[2][0] = (a[2][0] + 1) % 4;
}

// Move 5
void move4(vector<vector<int>>& a){
    a[0][1] = (a[0][1] + 1) % 4;
    a[1][0] = (a[1][0] + 1) % 4;
    a[1][1] = (a[1][1] + 1) % 4;
    a[1][2] = (a[1][2] + 1) % 4;
    a[2][1] = (a[2][1] + 1) % 4;
}

// Move 6
void move5(vector<vector<int>>& a){
    a[0][2] = (a[0][2] + 1) % 4;
    a[1][2] = (a[1][2] + 1) % 4;
    a[2][2] = (a[2][2] + 1) % 4;
}

// Move 7
void move6(vector<vector<int>>& a){
    a[1][0] = (a[1][0] + 1) % 4;
    a[1][1] = (a[1][1] + 1) % 4;
    a[2][0] = (a[2][0] + 1) % 4;
    a[2][1] = (a[2][1] + 1) % 4;
}

// Move 8
void move7(vector<vector<int>>& a){
    a[2][0] = (a[2][0] + 1) % 4;
    a[2][1] = (a[2][1] + 1) % 4;
    a[2][2] = (a[2][2] + 1) % 4;
}

// Move 9
void move8(vector<vector<int>>& a){
    a[1][1] = (a[1][1] + 1) % 4;
    a[1][2] = (a[1][2] + 1) % 4;
    a[2][1] = (a[2][1] + 1) % 4;
    a[2][2] = (a[2][2] + 1) % 4;
}

int main() {
    vector<vector<int>> clocks(3, vector<int>(3));

    // Input initial clock states
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            cin >> clocks[i][j];

    int res = INT_MAX;          // minimum number of moves
    vector<int> ans(9);         // best move sequence
    vector<int> counter(10, 0); // base-4 counter (size 10 to simplify carry)

    // Target (all clocks at 0)
    vector<vector<int>> target(3, vector<int>(3, 0));

    while (counter[9] < 1) {
        // Copy the initial grid
        vector<vector<int>> cur = clocks;

        // Apply moves according to counter[]
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < counter[i]; j++) {
                if (i == 0) move0(cur);
                if (i == 1) move1(cur);
                if (i == 2) move2(cur);
                if (i == 3) move3(cur);
                if (i == 4) move4(cur);
                if (i == 5) move5(cur);
                if (i == 6) move6(cur);
                if (i == 7) move7(cur);
                if (i == 8) move8(cur);
            }
        }

        // Check if solved
        if (cur == target) {
            int cres = 0;
            for (int i : counter) cres += i;

            if (cres < res) {
                res = cres;
                ans = counter;
            }
        }

        // Increment base-4 counter
        int i = 0;
        counter[i]++;
        while (counter[i] == 4) {
            counter[i] = 0;
            i++;
            counter[i]++;
        }
    }

    // Print answer (moves used)
    for (int i = 0; i < 9; i++) {
        while (ans[i] > 0) {
            ans[i]--;
            cout << i + 1 << " ";
        }
    }
    cout << "\n";
}
```