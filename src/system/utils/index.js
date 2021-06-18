import camelCase from "lodash/camelCase";
import { tokenMap } from "../tokens";

const getSpace = space => {
  const spaceName = camelCase(space);
  return tokenMap.space[spaceName] ? tokenMap.space[spaceName].value : 0;
};

export { getSpace };
