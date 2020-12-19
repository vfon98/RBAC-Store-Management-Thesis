export const numberComparator = (columnName: string) => {
  return (a: any, b: any) => Number(a[columnName]) - Number(b[columnName]);
}
