module Model where

newtype Company = Company [Department] deriving (Show)

data Department = Department Name Manager [SubUnit] deriving (Show)

type Manager = Employee

data SubUnit = EmployeeUnit Employee | DepartmentUnit Department deriving (Show)

data Employee = Employee Person Salary deriving (Show)

data Person = Person Name Address deriving (Show)

newtype Salary = Salary Float deriving (Show)

type Name = String

type Address = String
