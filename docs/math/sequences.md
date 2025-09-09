# Sequences and Series

### 1. Why It Matters

In programming contests, sequences show up everywhere:

* **Efficiency checks** → how fast values grow, or if they stop at some point.
* **Spotting patterns** → arrays with constant steps (AP), doubling (GP), or recurrences.
* **While coding** → loops that generate terms, prefix sums, or noticing when numbers start repeating.

It’s not about memorizing math formulas — it’s about **seeing the pattern and coding it fast**.

---

### 2. The Basics You’ll Actually Use

* **Arithmetic progression (AP)** → adds the same number each time.

  * Formula:

    $$
    a_n = a_1 + (n-1)d
    $$
  * Example: $3, 7, 11, 15, \dots$ with step $d = 4$.
  * Why useful? Easy to generate in a loop, prefix sums are predictable.

* **Geometric progression (GP)** → multiplies by the same number each time.

  * Formula:

    $$
    a_n = a_1 \cdot r^{\,n-1}
    $$
  * Example: $2, 4, 8, 16, \dots$ with ratio $r = 2$.
  * Why useful? Models exponential growth (like binary splitting, doubling strategies).

* **Arithmetico-Geometric progression (AGP)** → mix of both.

  * Formula:

    $$
    a_n = \big(a + (n-1)d\big)\cdot r^{\,n-1}
    $$
  * Example: $n \cdot 2^{\,n-1}$.
  * Why useful? Shows up when you combine addition + multiplication (like recurrences with both).

---

### 3. Handy Properties

* **Monotonic** (always increasing or decreasing) → great for binary search or two-pointer tricks.
* **Bounded** (stays inside a limit) → helps know if loops end or numbers won’t overflow.
* **Periodic** (values repeat) → common with modulo operations, hashing, and state machines.

---

### 4. Resources to Explore

* [Brilliant – Sequences & Series (basics)](https://brilliant.org/wiki/terminology-of-sequences-and-series/)
* [Maths et Tiques – Suites Arithmétiques & Géométriques (FR PDF)](https://www.maths-et-tiques.fr/telech/SuitesAG.pdf)
* [Brilliant – Arithmetic–Geometric Progression](https://brilliant.org/wiki/arithmetic-geometric-progression/)
* [Wikipedia – Arithmetico–Geometric Sequence](https://en.wikipedia.org/wiki/Arithmetico-geometric_sequence)
* [Arithmeric Sequences - YouTube](https://www.youtube.com/watch?v=XZJdyPkCxuE)
* [Geometric Sequences - YouTube](https://www.youtube.com/watch?v=zRKZ0-kOUZM)
* [ALMO 2025 Handout – Sequences (Olympiad techniques)](Sequences_Handout.pdf)

