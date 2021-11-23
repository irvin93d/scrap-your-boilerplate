# Scrap your boilerplate

This will be a summary of scrap your boilerplate! Now, let's go and do it!

## The problem

<!-- Throw reader directly in an understandable data structure -->

Let's consider a simple data structure to store information about a company. It has a name and a set of departments. Each department has a name and a set of sub-units. A sub-unit may either be an employee or another department. An employee is a person and has a salary.

```haskell
data Company    = C [Dept]
data Dept       = D Name Manager [SubUnit]
data SubUnit    = PU Employee | DU Dept
data Employee   = E Person Salary
data Person     = P Name Address
data Salary     = S Float
type Manager    = Employee
type Name       = String
type Address    = String
```

This schema could easily be translated into a document format like XML.

<!-- Page 27, ref 35 if we want to include tools for conversion -->

If we would want to increase the salary by a factor of `k` for every employee in the company, we would define a function `increase`:

```haskell
increase :: Float -> Company -> Company
increase k (C ds) = C (map (incD k) ds)
```

<!-- Show the typical code to give an idea of tedious boilerplate (transformer) -->

I.e., we would increase the salary by the factor `k` individually for every department at the company. Now we must also define `incD` and another set of helper functions:

```haskell
incD :: Float -> Dept -> Dept
incD k (D nm mgr us) = D nm (incE k mgr) (map (incU k) us)

incU :: Float -> SubUnit -> SubUnit
incU k (PU e) = PU (incE k e)
incU k (DU d) = DU (incD k d)

incE :: Float -> Employee -> Employee
incE k (E p s) = E p (incS k s)

incS :: Float -> Salary -> Salary
incS k (S s) = S (s * (1+k))
```

> Question for the reader:
> If I'd expand the names of the code above to make it more readable, what names would I expand?

Looking at the code above, the only intereresting bit is `incS`. In `incS` we find the code that actually increases `Salary`. The rest is repetitive code to traverse the data structure. This repetive code is what we call "boilerplate".

If we would compute the sum of all payed salaries at the company, the code would be almost identical. We define `bill`:

<!-- Provide another example (query) to show that this is a recurring pattern. At this point the reader will be convinced. -->

```haskell
bill :: Company -> Float
bill (C ds) = foldl (\v d -> v + billD d) 0 ds

billD :: Department -> Float
billD (Department nm mgr us) =
 foldl (\v d -> v + billU d) (billE mgr) us

billU :: SubUnit -> Float
billU (PU e) = billE e
billU (DU d) = billD d

billE :: Employee -> Float
billE (E p s) = billS s

billS :: Salary -> Float
billS (S v) = v
```

<!-- Describe what happens if the data structure changes. This will make it obvious why this is a serious problem and isn't just an annyoing one-off thing -->

Writing this boilerplate is not just tedious. As we can see, it has to be repeated for a new functionality that traverses the data. As the complexity of the data increases, so does also the ratio of boilerplate.

All of this boilerplate also raises another concern. If the schema describing the company changes, so does all of the functions recursing the data. That means we would have to rewrite huge parts of the boilerplate!

## The fix

"Scrap your boilerplate: A Practical Design for Generic Programming" (herein after referred to as _SYB_) presents an approach to this problem which reduces the manually written programming code for `increase` to:

```haskell
increase :: Float -> Company -> Company
increase k = everywhere (mkT (incS k))

incS :: Float -> Salary -> Salary
incS k (S s) = S (s * (1+k))
```

Here, `mkT` stands for _make transformation_. Hence, we can read the code as "Everywhere, make the transformation increase salary by `k`". Or, in a more human-friendly sentence, "increase every salary by `k`"

Similarily, the `bill` function would be written as:

```haskell
bill :: Company -> Float
bill = everything (+) (0 `mkQ` billS)

billS :: Salary -> Float
billS (S v) = v
```

In this case, `mkQ` stands for _make query_ and the code reads "Query every salary and add them together with the plus-operator, with a starting value 0". Or again, as human-friendly sentence, "Sum all salaries".

<!--
  Provide a theoretical example of what an interface could look like.
  In this case, one example with everywhere and one example with everything.
  At this point the reader should become curious and think "wait what, how can we do that?"
-->

Describe how it works in a short but complete way. This should cover what wasn't covered in the intro.

## What about polytypic programming

It's too strict.

- Describe why.
- Check if there's anything else we need to add

## Cool, now what?

Read the other papers that came after. What cool stuff happened there?

## Instructions

Your goal is to write a short article suitable for your fellow students, which will enable them to quickly learn about the topic. Write a summary of the paper’s key ideas and relate them to the other papers you have read.

- What problem your main paper of choice is solving
- Why this problem is important
- The key ideas in the paper
- Why this paper is important (with reference to the papers that came before and after).
- Limited to 5 pages (not including references)

## Quick links

Canvas
https://chalmers.instructure.com/courses/16005

Exercise
https://chalmers.instructure.com/courses/16005/pages/summary-exercise

Fire
https://css-lp2-21.fire.cse.chalmers.se/labs/3

## Deadlines

Draft: Nov 24
First revision: Nov 30
Peer review: Dec 6
Final version: Dec 10
