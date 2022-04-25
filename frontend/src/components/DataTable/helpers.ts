export const descendingComparator = (
  a: Record<string, any>,
  b: Record<string, any>,
  orderBy: string
) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = (order: "asc" | "desc", orderBy: string) => {
  return order === "desc"
    ? (a: Record<string, any>, b: Record<string, any>) =>
        descendingComparator(a, b, orderBy)
    : (a: Record<string, any>, b: Record<string, any>) =>
        -descendingComparator(a, b, orderBy);
};

export const sortTable = (
  list: Array<Record<string, any>>,
  comparator: any
) => {
  const stabilizedThis = list.map((el, index) => [el, index]);
  stabilizedThis.sort((a: Record<string, any>, b: Record<string, any>) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};
