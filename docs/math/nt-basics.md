# Number Theory Basics

## Quick introduction
Hi again ! Time for some math ! We will dive into some basics of number theory that will help you solve competitive programming problems. Let's go !
Basically, number theory studies integers, based on the divisibility relation and its many properties, but...

## What is divisibility ?
Quick reminder from primary school, we say that an integer $a$ divides another integer $b$ whenever there exists some integer $k$ such that $ak = b$. For example $5$ divides $15$, $2$ divides $14$, $3$ divides $-3$, but $4$ doesn't divide $9$ and $0$ doesn't divide $984$. We can also use the notation $a \mid b$ which means $a$ divides $b$. For example $5 \mid 20$ but $5 \not\mid 13$.
The following expressions describe the same property :
- $a$ divides $b$.
- $a$ is a divisor of $b$.
- $b$ is a multiple of $a$.
- $b = ka$ for some integer $k$.

Here are some nice properties of divisibility :
- $x\mid x$ for all integers $x$.
- $1 \mid x$ and $x \mid 0$ for all integers $x$.
- $x \mid y$ and $y \mid z$ implies that $x \mid z$.
## Prime Numbers
We say that a positive integer is prime number if it has exactly $2$ positive divisors, $1$ and itself. For example $2,3,5,7,11$ are primes, but $1,4,6,8,9,10,33$ are not.

## Euclidean Division (Euclid’s Division Lemma)
Remember the Euclidean Division algorithm you studied at school ? He will become our best friend now !
Consider that you are dividing $37$ by $5$. You would obtain $7$ as a result, and $2$ as remainder, and just write $37 = 5 \times 7 + 2$.
Euclid's division lemma says that for any integers $b, a$, we can find unique integers $q, r$ such that $b = aq + r,\text{  } 0 ≤ r < a$. Pretty easy as you know this since primary school, but how can we use this to solve hard problems ?
You probably know that in C++ and Python, $b\%a$ gives us the remainder $r$, hence to check if a number is divisible by another one, we just have to compute the division remainder and check if it is equal to zero.

Hence we can find the positive divisors of a positive integer $N$ using the following algorithm :
```pascal
for i from 1 to N :
	if N%i == 0 :
		print(i)
```
Also we can check if a number is prime  by simply counting the number of divisors, and checking if it is equal to 2.

## On the divisors listing algorithm

There's obviously a better way to find all the positive divisors of a positive integer, notice that if we write $n = ab$, then we have one of the following cases :
- $a = b = \sqrt n$
- $a < \sqrt n < b$
- $b < \sqrt n < a$

Hence we can see we can list all the divisors of $n$ by simply listing the pairs $(d, {n\over d})$ such that $d$ divides $n$ and $d \leq \sqrt n$, giving us a better time complexity of about $O(\sqrt n)$.
```pascal
for i from 1 to floor(sqrt(N)) :
	if N%i == 0 :
		print(i)
		print(N/i)
```
Notice that they are not ordered, but you can easily fix this by storing the values in an array in an ordered way.

## GCD and LCM
- GCD stands for Greatest Common Divisor, such that $gcd(a,b)$ is the greatest integer that divides both $a$ and $b$. We also say that $a$ and $b$ are coprime when $gcd(a,b) = 1$. Example : $gcd(2,6) = 2$, $gcd(3,7) = 1$. $gcd(9,12) = 3$.

- LCM stands for Least Common Multiple, such that $lcm(a,b)$ is the smallest positive integer that is a multiple of both $a$ and $b$. Example : $gcd(2,6) = 6$, $gcd(3,7) = 21$. $gcd(9,12) = 36$.

- Nice property : $gcd(a,b) \times lcm(a,b) = a \times b$.

## Modular Arithmetic Basics

We write $a \equiv b \pmod n$ when the remainders obtained when dividing $a$ by $n$ and $b$ by $n$ are the same. Examples :
$7 \equiv 12 \pmod 5$
$32 \equiv 0 \pmod 2$
$22 \equiv 28 \pmod 3$

It has almost the same properties as algebraic equality :
- $a \equiv a \pmod n$
- $a \equiv b\pmod n$ and $b \equiv c\pmod n$ $\implies$ $a \equiv c\pmod n$
- $a \equiv b \pmod n$ and $c \equiv d \pmod n$ $\implies$ $a + c \equiv b +d \pmod n$
- $a \equiv b \pmod n$ and $c \equiv d \pmod n$ $\implies$ $a \times c \equiv b \times d \pmod n$

**Warning :** This does not always work for division, and involves modular inverses.

It follows from the definition that $a\mid b$ is the same as $b \equiv 0 \pmod a$, hence we get the formal definition : $a \equiv b \pmod n$ if and only if $n \mid a-b$.

#### Basic Example :
Show that if $a \equiv b \pmod{n}$ and $c \equiv d \pmod{n}$, then $a - c \equiv b - d \pmod{n}$ holds true.

As $-1 \equiv -1 \pmod n$, and $c \equiv d \pmod{n}$, then by multiplication  $-c \equiv -d \pmod{n}$. And since $a \equiv b \pmod{n}$, by addition we get that $a - c \equiv b - d \pmod{n}$.


## External Resources

### Books, Websites and Notes

- [Olympiad Number Theory Through Challenging Problems](https://drive.google.com/file/d/1tt5rx71MD6IZHGso3ev400GCl7BxtM1S/view)'s 2 first chapters.
- [Competitive Programmer’s Handbook](https://cses.fi/book/book.pdf)'s chapter 21.
- [The Art of Modular Arithmetic](https://aryansh-s.github.io/assets/pdf/The_Art_of_Modular_Arithmetic.pdf)
- [MODNT](https://drive.google.com/file/d/1BcJTLjQaelZ4w_70oHKyImC2I8zLfyrt/view)'s chapters 1 and 2
- [Mathraining.be (fr)](https://www.mathraining.be/sections/3) chapters 1 to 3

### Videos
- [Computations Modulo P in Competitive Programming - Errichto](https://www.youtube.com/watch?v=-OPohCQqi_E)
- [AMO Summer Camp 2023 - Number Theory Lecture](https://www.youtube.com/watch?v=gTD8QER55D4)
- [AMO Summer Camp 2023 - Number Theory Practice](https://www.youtube.com/watch?v=xG8YoyX6Bds)

## Training Problems
- https://codeforces.com/contest/1764/problem/B
- https://codeforces.com/problemset/problem/1526/B
- https://codeforces.com/problemset/problem/1909/B
- https://codeforces.com/problemset/problem/1864/C
- https://codeforces.com/problemset/problem/1876/B
- https://atcoder.jp/contests/abc191/tasks/abc191_f
