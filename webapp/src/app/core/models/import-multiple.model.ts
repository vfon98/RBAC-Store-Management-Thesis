export class IImportMultiple {
  storeId: string;
  products: IImportedProduct[]
}

export class IImportedProduct {
  productId: string;
  importedQuantity: number;
}
