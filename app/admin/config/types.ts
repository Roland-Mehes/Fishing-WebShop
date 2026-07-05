export type DataTableColumnType<T> = {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
};
