import { salaryMatcher } from "./boilerplate";
import { everything } from "./lib";
import { Company } from "./model";

export const billNew = (company: Company): number =>
  everything({
    data: company,
    matcher: salaryMatcher,
    query: ({ value }) => value,
    reducer: (a, b) => a + b,
    zeroValue: 0,
  });
