import { Salary } from "./model";

export const salaryMatcher = (data: unknown): data is Salary =>
  typeof data === "object" &&
  !!data &&
  (data as any).type === "salary" &&
  typeof (data as any).value === "number";
