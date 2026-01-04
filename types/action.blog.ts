export type BlogFormErrors = {
  title?: string[];
  content?: string[];
  author?: string[];
  _form?: string[];
};

export type BlogActionState =
  | null
  | {
      success: false;
      errors: BlogFormErrors;
    };
