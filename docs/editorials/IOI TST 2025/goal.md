\## Problem Statement



\- \[English](statements/goal (en).pdf)



\- \[French](statements/goal (fr).pdf)



\- \[Arabic](statements/goal (ar\_DZ).pdf)



\## Solution



In this problem we have to find the shortest path to get to the final
cell.

We have an $n \\times m $ grid and we will start in the cell
$ (1,1) $ and we want to get into the final cell which is $ (n,m) $.

Each cell is one of the following:

When you end a row in the grid, you start in the beginning of the next
row.

Find the shortest path from the point $ (1,1) $ to the point $ (n,m) $ or
print $ -1 $ if there is no such path.

A general idea before we go to the solution: we can get rid of the grid
and make a 1D line.



------------------------------------------------------------------------



\##Subtask 1: 15 points



Each cell is either an empty cell or an obstacle.

* If there is an obstacle, the answer is $-1$ because we won't be able
  to reach the cell $ (n,m) $.
* Otherwise, the answer is $ n \\times m - 1 $.



------------------------------------------------------------------------



\##Subtask 2: 20 points



Not sure what the intended solution is, but maybe try all ways using DFS
(likely TLE).



------------------------------------------------------------------------





\##Subtask 3: 25 points



This idea covers subtasks 2 and 3.

We can go from the end and solve it using DP:

* Empty cell → move forward by 1 step.
* Obstacle → push 2 cells backward.
* Booster cell  → jump forward by the digit (if valid), or
  move 1 step forward.

If booster goes out of grid, ignore it.  
Base case: $ dp(n \\times m - 1) = 0 $.  
Answer: $ dp(0) $.  
Time complexity: $ O(n \\times m ) $.



------------------------------------------------------------------------



\##Subtask 4: 100 points



Run BFS from the start cell.

* Check if visited.
* Maintain number of steps in BFS.
* Answer is in $ (n,m) $ or $ -1 $ if unreachable.

Time complexity: $ O(n \\times m ) $.



