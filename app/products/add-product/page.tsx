"use client";

import { addProductAction } from "@/actions/productActions";
import SubmitButton from "@/components/SubmitButton";
import { useActionState } from "react";

const AddProduct = () => {
  const [state, action] = useActionState(addProductAction, null);

  return (
    <form action={action} className="max-w-xl mx-auto mt-10 space-y-4">
      <div>
        <input
          type="text"
          required
          name="name"
          placeholder="Product Name"
          className="w-full border p-2"
        />
        {state?.errors?.name && (
          <p className="text-red-500">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <textarea
          name="description"
          required
          placeholder="Product description"
          rows={6}
          className="w-full border p-2"
        />
        {state?.errors?.description && (
          <p className="text-red-500">{state.errors.description[0]}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          required
          name="brand"
          placeholder="Brand Name"
          className="w-full border p-2"
        />
        {state?.errors?.brand && (
          <p className="text-red-500">{state.errors.brand[0]}</p>
        )}
      </div>
      <div>
        <input
          type="number"
          required
          name="price"
          placeholder="Price of product"
          className="w-full border p-2"
        />
        {state?.errors?.price && (
          <p className="text-red-500">{state.errors.price[0]}</p>
        )}
      </div>

      {state?.errors?._form && (
        <p className="text-red-600">{state.errors._form[0]}</p>
      )}

      <SubmitButton >Add Product</SubmitButton>
    </form>
  );
};

export default AddProduct;
