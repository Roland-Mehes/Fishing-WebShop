export type DataTableColumnType<T> = {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
};

export type FilterOption = {
  label: string;
  value: string;
};

export type SelectFilterProps = {
  placeholder: string;
  paramName: string;
  options: FilterOption[];
};
