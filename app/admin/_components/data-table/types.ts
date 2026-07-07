export type TableColumn<T> = {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
};
