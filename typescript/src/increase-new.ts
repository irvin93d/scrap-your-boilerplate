import { salaryMatcher } from "./boilerplate";
import { everywhere } from "./lib";
import { Company } from "./model";

export const increaseNew =
  (k: number) =>
  (company: Company): Company =>
    everywhere({
      data: company,
      matcher: salaryMatcher,
      transformer: (salary) => ({ ...salary, value: salary.value * (k + 1) }),
    });
