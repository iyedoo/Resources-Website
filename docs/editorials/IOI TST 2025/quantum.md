\## Problem Statement

\- \[English](statements/quantum (en).pdf)

\- \[French](statements/quantum (fr).pdf)

\- \[Arabic](statements/quantum (ar\_DZ).pdf)



\## Solution



We have an $n \\times m $ grid, initially empty. We will be given
$C$ points. Each time we add a point, we must choose a point $(x,y)$ in
the grid such that the sum of distances from all added points to $(x,y)$
is minimized.



------------------------------------------------------------------------



\##Subtask 1: 5 points



Grid is $ 1 \\times 2 $. Just check whether $(1,1)$ or $(1,2)$ is
better.



------------------------------------------------------------------------



\##Subtask 2: 15 points



Use a 2D array initialized to zeros.  
For each new point $(x,y)$:

* Add distance to all cells.
* Take minimum.

Time complexity: $ O( n \\times m \\times c ) $.

------------------------------------------------------------------------



\##Subtask 3: 30 points



We use a greedy/median idea.

For 1D: given $ X\_1, X\_2, \\dots $, to minimize $ \\sum|X\_i - v| $,
pick median.  
So:

* Maintain arrays of $ x $'s and $ y $'s separately.
* Each time, sort them, pick median, compute sum of distances.

Time complexity: $ O( c^2 \\log{c} ) $.



------------------------------------------------------------------------



\##Subtask 4: 100 points



Optimize subtask 3 with data structures:

* Ordered set → find median in $ O( \\log{c} ) $.
* Lazy segment tree → range update/query for sums.

Final complexity: $ O(c \\times ( \\log{c} + \\log{n} +
\\log{m} )  ) $ .

