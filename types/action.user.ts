export type UserFormErrors = {
  name?: string[];
  age?: string[];
  phone?: string[];
  _form?: string[];
};

export type UserActionState =
  | null
  | {
      success: false;
      errors: UserFormErrors;
    }
  | {
      success: true;
    };