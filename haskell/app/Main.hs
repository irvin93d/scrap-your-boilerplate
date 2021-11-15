module Main where

import Boilerplate
import Lib
import Model

main :: IO ()
main = do
  print genCom
  print $ increase 0.1 genCom
  print $ increase' 0.1 genCom
  print $ salaryBill genCom
  print $ salaryBill' genCom

salaryBill :: Company -> Float
salaryBill (Company ds) = sum $ map salaryBillDepartment ds

salaryBill' :: Company -> Float
salaryBill' = everything (+) (0 `mkQ` salaryBillSalary)

salaryBillDepartment :: Department -> Float
salaryBillDepartment (Department _ manager subunits) =
  salaryBillEmployee manager + sum (map salaryBillSubUnit subunits)

salaryBillSubUnit :: SubUnit -> Float
salaryBillSubUnit (EmployeeUnit employee) = salaryBillEmployee employee
salaryBillSubUnit (DepartmentUnit department) = salaryBillDepartment department

salaryBillEmployee :: Employee -> Float
salaryBillEmployee (Employee _ salary) = salaryBillSalary salary

salaryBillSalary :: Salary -> Float
salaryBillSalary (Salary value) = value

increase :: Float -> Company -> Company
increase k (Company ds) = Company (map (incDepartment k) ds)

increase' :: Float -> Company -> Company
increase' k = everywhere (mkT (increaseSalary k))

increaseSalary :: Float -> Salary -> Salary
increaseSalary k (Salary s) = Salary (s * (1 + k))

genCom :: Company
genCom =
  Company
    [ Department "Research" ralf [EmployeeUnit joost, EmployeeUnit marlow, DepartmentUnit boilerscrap],
      Department "Strategy" blair []
    ]

ralf, joost, marlow, blair, bill :: Employee
ralf = Employee (Person "Ralf" "Amsterdam") (Salary 8000)
joost = Employee (Person "Joost" "Amsterdam") (Salary 1000)
marlow = Employee (Person "Marlow" "Cambridge") (Salary 2000)
blair = Employee (Person "Blair" "London") (Salary 100000)
bill = Employee (Person "Bill Gates" "Medina") (Salary 1000000)

boilerscrap :: Department
boilerscrap = Department "Boilerplate Scraping" bill []

incDepartment :: Float -> Department -> Department
incDepartment k (Department nm mgr us) = Department nm (increaseEmployee k mgr) (map (increaseSubUnit k) us)

increaseSubUnit :: Float -> SubUnit -> SubUnit
increaseSubUnit k (EmployeeUnit e) = EmployeeUnit (increaseEmployee k e)
increaseSubUnit k (DepartmentUnit d) = DepartmentUnit (incDepartment k d)

increaseEmployee :: Float -> Employee -> Employee
increaseEmployee k (Employee p s) = Employee p (increaseSalary k s)
