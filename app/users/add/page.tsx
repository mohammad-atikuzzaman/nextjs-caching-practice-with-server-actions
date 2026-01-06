"use client";

import { addUserAction } from "@/actions/addUserAction";
import SubmitButton from "@/components/SubmitButton";
import { useActionState } from "react";


export default function Page() {
  const [state, formAction] = useActionState(addUserAction, null);

  return (
    <form action={formAction} className="max-w-xl mx-auto mt-10 space-y-4">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border p-2 w-full"
        />
        {state?.success === false && state.errors.name && (
          <p className="text-red-500 text-xs">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <input
          type="number"
          name="age"
          placeholder="Age"
          className="border p-2 w-full"
        />
        {state?.success === false && state.errors.age && (
          <p className="text-red-500 text-xs">{state.errors.age[0]}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="border p-2 w-full"
        />
        {state?.success === false && state.errors.phone && (
          <p className="text-red-500 text-xs">{state.errors.phone[0]}</p>
        )}
      </div>

      {/* Form-level error */}
      {state?.success === false && state.errors._form && (
        <p className="text-red-500 text-sm">{state.errors._form[0]}</p>
      )}

      <SubmitButton>Add User</SubmitButton>

      {/* Success message */}
      {state?.success === true && (
        <p className="text-green-600 text-sm">User created successfully ✅</p>
      )}
    </form>
  );
}
