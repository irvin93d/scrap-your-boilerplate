import { Company, Department, Employee, Salary } from "./model";

export const increaseOld =
  (k: number) =>
  ({ departments, ...rest }: Company): Company => ({
    ...rest,
    departments: departments.map(increaseDepartment(k)),
  });

const increaseDepartment =
  (k: number) =>
  ({ manager, subunits, ...rest }: Department): Department => ({
    ...rest,
    manager: increaseEmployee(k)(manager),
    subunits: subunits.map(({ unit, ...rest }) => {
      switch (unit.type) {
        case "employee":
          return {
            ...rest,
            unit: increaseEmployee(k)(unit),
          };
        case "department":
          return {
            ...rest,
            unit: increaseDepartment(k)(unit),
          };
        default:
          return switchFallback(unit);
      }
    }),
  });

const increaseEmployee =
  (k: number) =>
  ({ salary, ...rest }: Employee): Employee => ({
    ...rest,
    salary: increaseSalary(k)(salary),
  });

const increaseSalary =
  (k: number) =>
  ({ value, ...rest }: Salary): Salary => ({
    ...rest,
    value: value * (1 + k),
  });

const switchFallback = (fallback: never) => fallback;
