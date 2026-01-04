export type ProductFormErrors = {
  name?: string[];
  description?: string[];
  brand?: string[];
  price?: string[];
  _form?: string[];
};

export type ProductActionState =
  | null
  | {
      success: false;
      errors: ProductFormErrors;
    };
