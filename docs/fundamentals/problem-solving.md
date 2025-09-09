# Problem-Solving Guide

Mastering competitive programming isn't about memorizing algorithms — it's about developing **systematic thinking habits** and **disciplined problem-solving techniques**. This guide provides a proven framework that transforms chaotic problem-solving into a structured, repeatable process.

---

## 🎯 The Golden Rule: Think First, Code Last

**90% of your time should be spent understanding and planning. Only 10% should be spent coding.**

Most programmers fail because they rush to code before they truly understand the problem. This guide will teach you to resist that urge and develop the discipline of top-tier competitive programmers.

---

## Phase 1: 📖 Deep Problem Understanding

### Step 1: The Two-Read Rule
- **First read**: Get the general idea. Don't worry about details yet.
- **Second read**: Focus on specifics. Underline or highlight key information.

### Step 2: Extract the Core Elements
Ask these questions and write down the answers:

**Input Analysis:**
- What exactly am I given?
- What's the format? (single line, multiple test cases, etc.)
- What are the data types? (integers, strings, arrays, etc.)

**Output Analysis:**
- What exactly should I produce?
- What's the exact format? (spaces between numbers? newlines? case-sensitive?)
- Are there special cases for the output?

**Constraints Analysis:**
- What are the limits on input size?
- What are the value ranges?
- How much time do I have? (usually 1-2 seconds)

### Step 3: Constraint-Driven Complexity Planning
Use this table to guide your approach:

| Size | Time Complexity | Approach |
|--------|-------------------|----------------------|
| n ≤ 10 | Any approach works | Brute force, recursion |
| n ≤ 100 | O(n²) or O(n³) | Nested loops, simple DP |
| n ≤ 1,000 | O(n²) | Two nested loops max |
| n ≤ 10,000 | O(n log n) or O(n√n) | Sorting, optimized algorithms |
| n ≤ 100,000 | O(n log n) | Sorting, segment trees, binary search |
| n ≤ 1,000,000 | O(n) or O(n log log n) | Linear algorithms, sieve |
| n > 1,000,000 | O(log n) or O(1) | Math formulas, precomputation |

---

## Phase 2: ✍️ Paper-Based Problem Solving

**This is where champions are made.** Never skip this phase.

### Step 1: Restate the Problem
Write the problem in your own words in 1-2 sentences. This forces true understanding.

*Example: "Given an array of integers, find the second-largest unique value."*

### Step 2: Manual Sample Tracing
For each given example:
1. Write the input clearly
2. Step through your mental process
3. Verify you get the expected output
4. If not, re-read the problem—you misunderstood something

### Step 3: Create Your Own Test Cases
Design cases that could break your solution:

**Essential Test Cases:**
- **Minimum case**: Smallest possible valid input
- **Maximum case**: Largest input within constraints
- **Edge cases**: Boundary conditions, special values
- **Corner cases**: Empty inputs, all same values, negative numbers
- **Stress cases**: Random large inputs (if time permits)

### Step 4: Algorithm Design on Paper
1. **Start with brute force**: How would you solve this if efficiency didn't matter?
2. **Analyze the brute force**: Count the operations. Too slow?
3. **Optimize step by step**: What repeated work can you eliminate?
4. **Write pseudocode**: High-level steps, not actual code

---

## Phase 3: 🔍 Strategic Problem Analysis

### Pattern Recognition Checklist

**Is this a known problem type?**
- Sorting/Searching problem?
- Graph traversal (BFS/DFS)?
- Dynamic programming (optimal substructure)?
- Greedy algorithm (local optimal → global optimal)?
- Mathematical formula/pattern?
- Data structure problem (stack, queue, priority queue)?

**Problem Transformation Techniques:**
- Can I reduce this to a simpler problem?
- Can I solve the reverse/opposite problem?
- Can I solve a smaller version first?
- Are there symmetries I can exploit?
- Can I precompute something to make queries faster?

If you find yourself stuck, don't get obssessed with a single idea and try these approaches:
1. **Simplify**: Solve for n=1, n=2, n=3 and look for patterns
2. **Visualize**: Draw the problem if possible
3. **Transform**: Change variables, coordinate systems, or perspective

---

## Phase 4: 📝 Systematic Implementation

### Pre-Coding Checklist
- I have a clear algorithm written in pseudocode
- I've traced through my algorithm on paper
- I know the time and space complexity
- I know which data structures I'll use

### Implementation Strategy

**1. Template First**
Start with input/output scaffolding:
```
// Read input
// Process
// Output result
```

**2. Build Incrementally**
- Implement one function/section at a time
- Test each piece before moving on
- Use placeholder values to test structure

**3. Defensive Programming**
- Use meaningful variable names
- Add comments for complex logic
- Consider integer overflow issues

### Common Implementation Pitfalls
- **Off-by-one errors**: Double-check array indices and loop bounds
- **Integer overflow**: Use long long if values can exceed 10⁹
- **Precision issues**: Use appropriate data types for floating-point
- **Case sensitivity**: Match output format exactly
- **Trailing spaces/newlines**: Follow format specifications precisely

---

## Phase 5: ✅ Rigorous Testing and Debugging

### Testing Protocol

**Level 1: Sample Tests**
- Run all provided examples
- If any fail, debug immediately—don't proceed

**Level 2: Edge Case Tests**
- Test your manually created edge cases
- Pay special attention to boundary values

**Level 3: Stress Testing (if time permits)**
- Generate random test cases
- Compare with brute force solution
- Look for patterns in failures

### Debugging Methodology

**When Wrong Answer:**
1. **Re-read the problem**: 50% of wrong answers are misunderstandings
2. **Check sample cases**: Trace through manually again
3. **Print intermediate values**: See where logic diverges from expectation
4. **Simplify the input**: Use smaller cases to isolate the bug

**When Time Limit Exceeded:**
1. **Verify complexity**: Count operations in your algorithm
2. **Look for infinite loops**: Check loop termination conditions
3. **Optimize bottlenecks**: Profile which parts are slowest
4. **Consider algorithm change**: Sometimes you need a fundamentally different approach

**When Runtime Error:**
1. **Array bounds**: Check all array accesses
2. **Null pointers**: Verify pointer/reference validity
3. **Stack overflow**: Check recursion depth
4. **Division by zero**: Verify denominators

More advice on debugging is available in the [Debugging Practices](debugging.md) guide.

---

## Phase 6: 🔄 Post-Solution Reflection

### Learning Extraction Process

**Immediately After Solving:**
- What was the key insight that led to the solution?
- Which part took the longest? (reading, thinking, coding, debugging)
- What would I do differently next time?

**After Reading Editorial (if available):**
- Was there a simpler solution I missed?
- What techniques did the editorial use that I didn't know?
- How can I recognize similar problems in the future?

### Personal Problem Database
Keep a log with:
- Problem name and difficulty
- Key techniques used
- Time spent on each phase
- Mistakes made and lessons learned

---

## 🚀 The Mindset of Champions

**Remember:** Programming contests reward **systematic thinking** and **careful execution**, not just algorithmic knowledge.

**The 90/10 Principle:** If you spend 90% of your time thinking and planning, the remaining 10% (coding) becomes almost trivial.

**Consistency beats intensity:** Daily practice for 30 minutes is better than weekend marathons.

**Mistakes are data:** Every wrong submission teaches you something about your thought process.

**Patience pays off:** The best problem solvers take their time to understand fully before coding.

