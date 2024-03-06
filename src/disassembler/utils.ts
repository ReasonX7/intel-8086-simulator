type AbstractList<T> = {
  unshift: (...items: T[]) => number;
  push: (...items: T[]) => number;
};

const createListItemInsertionCall = (key: "unshift" | "push") => {
  return <L extends AbstractList<T>, T>(list: L, ...items: T[]): L => {
    list[key](...items);
    return list;
  };
};

export const List = {
  unshift: createListItemInsertionCall("unshift"),
  push: createListItemInsertionCall("push"),
};
