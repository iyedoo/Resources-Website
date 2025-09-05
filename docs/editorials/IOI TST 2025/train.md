# Train

## Problem Statement
- [English](statements/train (en).pdf)
- [French](statements/train (fr).pdf)
- [Arabic](statements/train (ar_DZ).pdf)

---

## Full Solution

Let $a_1, a_2, \dots, a_C$ be the weights of the cargo, sorted from largest to smallest. Extend this sequence by adding zeros until we have $2W$ terms, i.e.,  

$a_{C+1} = a_{C+2} = \dots = a_{2W} = 0.$  

Then the minimum imbalance, $I_{\min}$, is  

$I_{\min} = |A - (a_1 + a_{2W})| + |A - (a_2 + a_{2W-1})| + \dots + |A - (a_W + a_{W+1})|,$  

which corresponds to the imbalance resulting from putting $(a_i, a_{2W+1-i})$ in the $i$th cargo, for $1 \le i \le W$. (If $j > C$, the spot is left empty.)

---

We now show that this partition gives the minimum. Suppose two cargos contain $a_i, a_j, a_k, a_l$ in some partition, with  

$a_i \ge a_j \ge a_k \ge a_l.$  

Let  

$S = \frac{a_i + a_j + a_k + a_l}{2}, \quad U = \left|\frac{X_1 - X_2}{2}\right|.$  

Then the total imbalance is  

$|A + S + U| + |A + S - U|.$  

Notice that this function, as a function of $U$, is increasing for $U \in [0, +\infty)$. Therefore, the smaller $U$ is, the smaller the imbalance. It is clear that the partition  

$(a_i, a_l), \quad (a_j, a_k)$  

minimizes $U$.

---

### Proof of minimization

There are three possible partitions of four elements:  

$(a_i, a_j), (a_k, a_l)$,  
$(a_i, a_k), (a_j, a_l)$,  
$(a_i, a_l), (a_j, a_k)$.  

These give  

$U_1 = a_i + a_j - a_k - a_l, \quad  
U_2 = |a_i - a_j + a_k - a_l|, \quad  
U_3 = |a_i - a_j - (a_k - a_l)|.$  

Hence, $U$ is minimized by the last partition, seeing as $U_1 \geq U_2 \geq U_3$.

---

Taking any two wagons, we can improve the total imbalance by adjusting the partition of the four elements in $W_1 \cup W_2$ according to the lemma. Consider the wagon containing $a_1$ and the wagon containing $a_{2W}$. If they are distinct, applying the partition lemma shows it is optimal for the wagon with $a_1$ to contain $a_{2W}$. Otherwise, we skip this step.

---

### Induction step

Assume the wagons containing $a_1, \dots, a_{i-1}$ already contain $a_{2W}, \dots, a_{2W+2-i}$ as their second cargo, respectively. If the wagon containing $a_i$ does not contain $a_{2W+1-i}$, we swap contents with the wagon that does. By the partition lemma, this is optimal. By induction, we reach the proposed initial partition, which is unique.

---

### Algorithm

1. Create a vector containing all cargo weights and add zeros until its length is $2W$.
2. Sort the vector.
3. Compute the average  

   $A = \frac{\text{sum of all elements}}{C}.$  

4. Initialize $ans = 0$. For $i = 0$ to $W-1$, increase $ans$ by  

   $|a_i + a_{2W-1-i} - A|.$  

5. Output $ans$ as the minimum imbalance.

This algorithm runs in $O(2W \log(2W))$, which can be optimized to $O(C \log C)$ by sorting first and then adding zeros in reverse order.

---

## Subtasks

- **Subtask 1:** Using backtracking, iterate through all possible distributions and find the one with minimum imbalance.  
  Complexity: $O(C W^C)$.

## Implementation

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int W, C;
    cin >> W >> C;
    vector<long long> M;
    M.reserve(2 * W);
    long long sum = 0;
    for (int i = 0; i < C; ++i) {
        long long x;
        cin >> x;
        M.push_back(x);
        sum += x;
    }
    // Pad with zeros to have exactly 2W elements
    while ((int)M.size() < 2 * W) {
        M.push_back(0);
    }
    sort(M.begin(), M.end());

    long long A = sum / W;
    long long imbalance = 0;
    for (int i = 0; i < W; ++i) {
        long long load = M[i] + M[2 * W - 1 - i];
        imbalance += llabs(load - A);
    }

    cout << imbalance << '\n';
    return 0;
}
```