module Boilerplate where

import Lib
import Model

instance Term Company where
  gmapT f (Company depts) = Company (f depts)

instance Term Department where
  gmapT f (Department name manager subunits) = Department (f name) (f manager) (f subunits)

instance Term SubUnit where
  gmapT f (EmployeeUnit empl) = EmployeeUnit (f empl)
  gmapT f (DepartmentUnit dept) = DepartmentUnit (f dept)

instance Term Employee where
  gmapT f (Employee per sal) = Employee (f per) (f sal)

instance Term Person where
  gmapT f (Person name address) = Person (f name) (f address)

instance Term Salary where
  gmapT f (Salary x) = Salary (f x)

instance Term a => Term [a] where
  gmapT f [] = []
  gmapT f (x : xs) = f x : f xs

instance Term Float where
  gmapT f x = x

instance Term Char where
  gmapT f x = x
