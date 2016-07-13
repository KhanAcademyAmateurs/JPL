# JPL
JPL: **J**PL **P**rogramming **L**anguage

JPL is a simple programming language designed to be lightweight and mergeable with other projects/frameworks, especially KASH & node.
-----
# Specs

Single line comments start with `$`.
Multiline comments are not included in the specification, as they make the language heavier.

There are no "operators"; there are only functions, some of which are built in.

This example shows how to call a function, create a variable, create a function, and how to use all the built-in operators in the node implementation. (NOTE: Built-ins may vary based on the implementation. The KASH verison is intended to include system calls.)

```
$ Implicitly prints 7 (3 + 4). The function is +, and the arguments are separated by a space:
+ 3 4
$ Prints 12 (3 + 4 + 5). The outermost scope's args are separated by a space, while the next scope's are separated by a comma:
+ 3 +,4,5
$ Explicity prints -3 (3 - 6). Because it's explicit, it doesn't print a newline:
p -,3,6
$ Prints 24 (3 * 8). First it stores it in a variable named A (variable & function names must be uppercase):
s A *,3,8
A
$ Prints 2 (floor(8 / 3)). It defines a function to compute floor(x / y), then runs it.
$ First we define the function, arity (number of arguments = 2), and arg types in array (N-umber, N-umber).
$ Then we specify the code the function runs (floor the division of A and B, then return). The arguments start at A and end at Z. The arity is set at 2, so only the arguments A and B are defined.
$ The r function returns the value of the expression above it.
$ Then we end the function with e.
$ You cannot have 2 scopes nested within each other; therefore you cannot have two functions within each other.
$ Then we simply print.
d F 2 a,N,N
    f /,A,B
    r
e
F 8 3
```
