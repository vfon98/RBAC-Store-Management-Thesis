export const numberComparator = (columnName: string) => {
  return (a: any, b: any) => Number(a[columnName]) - Number(b[columnName]);
}

export const NzSorter = {
  numberComparator: (columnName: string) => {
    return (a: any, b: any) => Number(a[columnName]) - Number(b[columnName])
  },
  stringComparator: (columnName: string) => {
    return (a: any, b: any) => a[columnName]?.toString()?.localeCompare(b[columnName]?.toString);
  },
  predefinedOrder: (order = []) => {
    const exampleOrder = ["wipe", "fly", "iris", "flip", "cube",
        "blur", "zoom", "fade", "glow", "rotate"];
    return (a: any, b: any) => order.indexOf(a.type) - order.indexOf(b.type);
  }
}

