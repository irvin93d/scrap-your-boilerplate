# Scrap your boilerplate

> TBD: Some short intro should go here.

## Typical boilerplate

<!-- Throw reader directly in an understandable data structure -->

Let's consider a simple data structure to store information about a company. It has a name and a set of departments. Each department has a name and a set of sub-units. A sub-unit may either be an employee or another department. An employee is a person and has a salary. We can define with the following Haskell schema:

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

This schema can easily be translated into a document format like XML.

<!-- Page 27, ref 35 if we want to include tools for conversion -->

If we want to increase the salary by a factor of `k` for every employee in the company, we define a function `increase`:

```haskell
increase :: Float -> Company -> Company
increase k (C ds) = C (map (incD k) ds)
```

<!-- Show the typical code to give an idea of tedious boilerplate (transformer) -->

I.e., we increase the salary by the factor `k` individually for every department at the company. Now, we must also define `incD` and another set of helper functions:

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
> If I'd expand the names of the code above to make it more readable, what names would I expand? Would it be easier to follow if I strip down the schema to something simpler than the original paper uses?

Looking at the code above, the only intereresting bit is `incS`. In `incS` we find the code that actually increases `Salary`. The rest is repetitive code to traverse the data structure. This repetive code is what we call "boilerplate".

If we want to compute the sum of all payed salaries at the company, the code would be almost identical. We define `bill`:

<!-- Provide another example (query) to show that this is a recurring pattern. At this point the reader will be convinced. -->

```haskell
bill :: Company -> Float
bill (C ds) = foldl (\v d -> v + billD d) 0 ds

billD :: Department -> Float
billD (Department nm mgr us) = foldl (\v d -> v + billU d) (billE mgr) us

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

All of this boilerplate raises another concern. If the schema describing the company changes, so does all of the functions we have defined. That means we would have to rewrite huge parts of the boilerplate!

## The solution

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

We can accomplish this by fundamentally changing the way we traverse the data structure. Looking back at the initial `increase` implentation and all of its helper functions, we can identify that they do two things:

1. Define how traverse some schema `data :: a`.
2. Define how to transform some data `f :: a -> a`

For 1., the initial implementation only traverses parts of the data structure that are relevant to be able to apply whatever function given by 2, leaving anything irrelevant untouched. SYB suggests that instead of exclusively traversing relevant data, one can achieve the same result by traversing _all the data_. Then by using type casting in runtime on each sub-part of the data, one would apply the transforming function in 2 to any part the casts successfully. This is easiest explained by example:

Recall our function `incS`
```haskell
incS :: Float -> Salary -> Salary
incS k (S s) = S (s * (1+k))
```

We give everywhere something of type `Salary`:

```haskell
x :: Salary
x = S 1000

y :: Salary
y = everywhere (mkT (incS 0.10)) x
```

The type of `x` is matching the type of `incS`. The type cast is therefore successful and the transformer function `incS` is applied. `y` will now have value `1100`.

We give everywhere something not of type `Salary`:

```haskell
x :: Name
x = "Bill"

y :: Name
y = everywhere (mkT (incS 0.10)) x
```

Since `x` is now not of type `Salary`, the type-cast will fail. `x` will remain untouched, resulting in `y == x`.

Now to the more interesting case:

```haskell
p :: Person
p = P "Bill" "Medina"

s :: salary
s = S 1000

x :: Employee
x = E p s

y :: Employee
y = everywhere (mkT (incS 0.10)) x
```

Now, `x` fails to cast into `Salary`. But it has some internal data that can be traversed, `p` and `s`. `p` is traversed the same way, also failing to type cast. So does its inner data values `"Bill"` and `"Medina"`. Everything about `p` is therefore left unchanged. However, `s` type casts into `Salary`, so we apply the transformer `incS`. Now, `y` is identical to `x`, but with an updated salary.

## Where did the boilerplate go?

We saw in the previous section a hypothetical interface would reduce the amount of handwritten code. However, we left out two parts:
1. How does the type cast happen?
2. How does haskell know how to traverse the data?

We won't go into the details here, but for 1. the type cast and the traversing itself would be handled by a library providing functions such as `everything`, `everywhere`, `mkT` and `mkQ`. 

For 2., it would be left to the developer to define how to traverse the data. It would done by defining two functions via a class instance:
```haskell
instance Term Employee where
  gmapT f (Employee per sal) = Employee (f per) (f sal)
  gmapQ f (Employee per sal) = [f per, f sal]
```
Here, `gmapT` (generic map transform) deconstructs `Employee`, applies the function `f` to each inner data value and then constructs a new `Employee` from the result.

Similarily, `gmapQ` (generic map query) deconstructs `Employee`, applies the function `f` to each inner data value, then constructs a list of partial results. SYB goes into more details and more general functions that these two, but the point here is that these instances are trivial to implement and could in fact even be generated.

## 2-rank type systems

> TBD: this is some of the prio work that was needed.

## Alt approaches that doesn't work

> TBD: Discuss how it's too strict and why. How it's target purely generic, whatever that means.

> TBD: Discuss how generalized fold just makes another type of boiler plate

> TBD: Discuss The non-recursive map trick

> TBD: Discuss the visitor pattern.

## Derived work

> TBD: There is some cool future work that will be added here.

## References

> TBD: I will for sure have at least for references here.
