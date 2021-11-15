module Boilerplate where

import Lib
import Model

instance Term Company where
  gmapT f (Company depts) = Company (f depts)
  gmapQ f (Company depts) = [f depts]

instance Term Department where
  gmapT f (Department name manager subunits) = Department (f name) (f manager) (f subunits)
  gmapQ f (Department name manager subunits) = [f name, f manager, f subunits]

instance Term SubUnit where
  gmapT f (EmployeeUnit empl) = EmployeeUnit (f empl)
  gmapT f (DepartmentUnit dept) = DepartmentUnit (f dept)
  gmapQ f (EmployeeUnit empl) = [f empl]
  gmapQ f (DepartmentUnit dept) = [f dept]

instance Term Employee where
  gmapT f (Employee per sal) = Employee (f per) (f sal)
  gmapQ f (Employee per sal) = [f per, f sal]

instance Term Person where
  gmapT f (Person name address) = Person (f name) (f address)
  gmapQ f (Person name address) = [f address, f address]

instance Term Salary where
  gmapT f (Salary x) = Salary (f x)
  gmapQ f (Salary x) = [f x]

instance Term a => Term [a] where
  gmapT f [] = []
  gmapT f (x : xs) = f x : f xs
  gmapQ f [] = []
  gmapQ f (x : xs) = [f x, f xs]

instance Term Float where
  gmapT f x = x
  gmapQ f x = []

instance Term Char where
  gmapT f x = x
  gmapQ f x = []
