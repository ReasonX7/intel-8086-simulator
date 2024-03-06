const createListItemInsertionCall =
  (key: "unshift" | "push") =>
  <T>(list: T[], ...items: T[]) => {
    list[key](...items);
    return list;
  };

export const List = {
  unshift: createListItemInsertionCall("unshift"),
  push: createListItemInsertionCall("push"),
};
