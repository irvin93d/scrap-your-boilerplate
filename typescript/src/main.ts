import { billNew } from "./bill-new";
import { billOld } from "./bill-old";
import data from "./data";
import { increaseNew } from "./increase-new";
import { increaseOld } from "./increase-old";

console.info(JSON.stringify(data, undefined, 2));
console.info(JSON.stringify(increaseOld(0.1)(data), undefined, 2));
console.info(JSON.stringify(increaseNew(0.1)(data), undefined, 2));
console.info(billNew(data));
console.info(billOld(data));
