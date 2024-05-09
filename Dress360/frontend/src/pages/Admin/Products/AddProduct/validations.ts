export const validateProductName = (productName: string): string | null => {
  if (!productName.trim()) {
    return 'Product name is required';
  }
  return null;
};

export const validateProductDescription = (
  productDescription: string
): string | null => {
  if (!productDescription.trim()) {
    return 'Product Description is required';
  }
  return null;
};

export const validateProductBrand = (productBrand: string): string | null => {
  if (!productBrand.trim()) {
    return 'Product Brand is required';
  }
  return null;
};

export const validateProductPrice = (productPrice: number): string | null => {
  if (!productPrice && productPrice !== 0) {
    return 'Price is required';
  }
  if (productPrice < 1) {
    return 'Price cannot be Zero or Negative';
  }
  return null;
};

export const validateProductDiscount = (
  productDiscount: number
): string | null => {
  if (productDiscount < 0) {
    return 'Discount cannot be Negative';
  }
  if (productDiscount > 100) {
    return 'Discount cannot be exceed 100 percent';
  }
  return null;
};


export const validateProductCategory = (productCategory: string): string | null => {
  if (!productCategory.trim()) {
    return 'Product Category is required';
  }
  return null;
};
