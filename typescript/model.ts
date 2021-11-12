export interface Company {
  type: "company";
  departments: Department[];
}

export interface Department {
  type: "department";
  name: Name;
  manager: Manager;
  subunits: SubUnit[];
}

export type Manager = Employee;

export interface SubUnit {
  type: "subunit";
  unit: Employee | Department;
}

export interface Employee {
  type: "employee";
  person: Person;
  salary: Salary;
}

export interface Person {
  type: "person";
  name: Name;
  address: Address;
}

export interface Salary {
  type: "salary";
  value: number;
}

export type Name = string;
export type Address = string;
