# Zeckendorf

## Problem Statement
- [English](statements/zeckendorf (en).pdf)
- [French](statements/zeckendorf (fr).pdf)
- [Arabic](statements/zeckendorf (ar_DZ).pdf)

---
let $Z(i)$ be the zeckendorf representation of $i>0$ and $F_0 = 1$

### Subtask 1

Since $N_i \leq 10$, we can solve each case by hand and hardcode the results.  

- Observation: $10 < F_6 = 13$, so at most 5 digits are needed for $Z(N_i)$.  
- Strategy: brute force all possible binary strings of length $\leq 5$, checking whether they correspond to valid Zeckendorf representations.  
- Complexity: $O(Q \cdot 2^x \cdot x)$ for $x$ digits, which is feasible for $x = 5$.

---

### Subtask 2

We extend the idea of Subtask 1. Instead of checking all $2^n$ binary strings, we **only generate valid ones** via recursion.  

- Fact: the number of valid binary strings of length $n$ with no two consecutive $1$s is $F_{n+1}$ (with our shifted definition).  
- Thus, the complexity is  

$$
O(Q \cdot F_{n+1} \cdot n).
$$

---

### Full Solution

We use a **greedy approach**:

1. Given $N > 0$, find the largest Fibonacci number $F_k \leq N$.  
2. Set digit $d_k := 1$, and update $N := N - F_k$.  
3. Repeat until $N = 0$.  

This procedure constructs the Zeckendorf representation of $N$.  

---

### Proof of Correctness

Let $F_k$ be the largest Fibonacci number $\leq N$. Then:  

- By definition, $F_{k+1} > N$.  
- Since $F_{k+1} = F_k + F_{k-1}$, we have  

$$
N < F_k + F_{k-1} \implies N - F_k < F_{k-1}.
$$  

Thus, after subtracting $F_k$, the remainder $N'$ is strictly smaller than $F_{k-1}$, meaning we will **never need $F_{k-1}$**.  
This guarantees that the greedy algorithm avoids consecutive Fibonacci numbers and always produces a valid representation.  

Uniqueness follows from the same inequality: if another representation existed with different largest Fibonacci number, it would contradict the maximality of $F_k$.  

---

### Algorithm

1. Precompute Fibonacci numbers up to the largest $F_k \leq \max(N_i)$.  
2. For each query $N$:  
   - Start with the largest Fibonacci number $\leq N$.  
   - Subtract it and mark its digit as $1$.  
   - Repeat until $N = 0$.  
3. Output the resulting binary string.  

Complexity:  
- Precomputation: $O(\log N_{\max})$.  
- Each query: $O(\log N)$ since each subtraction reduces $N$ by at least half in size.  
- Total: $O(Q \log N)$.  

## Implementation

```cpp
#include <bits/stdc++.h>
typedef long long ll;
using namespace std;

vector<ll> fibo = {1, 2};

string zeckendorf(ll n)
{

   while(fibo.back() < n){
      fibo.push_back(fibo[fibo.size()-1] + fibo[fibo.size()-2]);
   }

   ll p = fibo.size() - 1;
   while(fibo[p] > n) p--;
   string res = "";
   while(p >= 0){
      if(fibo[p] <= n){
         res += "1";
         n -= fibo[p];
      }else{
         res += "0";
      }
      p--;
   }

   return res;
}

signed main()
{
   ios::sync_with_stdio(false);
   cin.tie(0);
   ll q;
   cin >> q;
   while (q--)
   {
      ll n;
      cin >> n;
      cout << zeckendorf(n) << '\n';
   }
}
```
