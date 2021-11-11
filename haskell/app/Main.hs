module Main where

import Boilerplate
import Lib
import Model

main :: IO ()
main = do
  print genCom
  print $ increase 0.1 genCom
  print $ increase' 0.1 genCom

genCom :: Company
genCom =
  Company
    [ Department "Research" ralf [EmployeeUnit joost, EmployeeUnit marlow],
      Department "Strategy" blair []
    ]

ralf, joost, marlow, blair :: Employee
ralf = Employee (Person "Ralf" "Amsterdam") (Salary 8000)
joost = Employee (Person "Joost" "Amsterdam") (Salary 1000)
marlow = Employee (Person "Marlow" "Cambridge") (Salary 2000)
blair = Employee (Person "Blair" "London") (Salary 100000)

increase :: Float -> Company -> Company
increase k (Company ds) = Company (map (incDepartment k) ds)

increase' :: Float -> Company -> Company
increase' k = everywhere (mkT (increaseSalary k))

incDepartment :: Float -> Department -> Department
incDepartment k (Department nm mgr us) = Department nm (increaseEmployee k mgr) (map (increaseSubUnit k) us)

increaseSubUnit :: Float -> SubUnit -> SubUnit
increaseSubUnit k (EmployeeUnit e) = EmployeeUnit (increaseEmployee k e)
increaseSubUnit k (DepartmentUnit d) = DepartmentUnit (incDepartment k d)

increaseEmployee :: Float -> Employee -> Employee
increaseEmployee k (Employee p s) = Employee p (increaseSalary k s)

increaseSalary :: Float -> Salary -> Salary
increaseSalary k (Salary s) = Salary (s * (1 + k))
