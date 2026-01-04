"use client";

import { useActionState } from "react";
import { createBlog } from "@/actions/blogActions";
import SubmitButton from "@/components/SubmitButton";

export default function CreateBlogPage() {
const [state, action] = useActionState(
  createBlog,
  null
);

  return (
    <form
      action={action}
      className="max-w-xl mx-auto mt-10 space-y-4"
    >
      <div>
        <input
          name="title"
          placeholder="Blog Title"
          className="w-full border p-2"
        />
        {state?.errors?.title && (
          <p className="text-red-500">{state.errors.title[0]}</p>
        )}
      </div>

      <div>
        <textarea
          name="content"
          placeholder="Blog Content"
          rows={6}
          className="w-full border p-2"
        />
        {state?.errors?.content && (
          <p className="text-red-500">{state.errors.content[0]}</p>
        )}
      </div>

      <div>
        <input
          name="author"
          placeholder="Author Name"
          className="w-full border p-2"
        />
        {state?.errors?.author && (
          <p className="text-red-500">{state.errors.author[0]}</p>
        )}
      </div>

      {state?.errors?._form && (
        <p className="text-red-600">{state.errors._form[0]}</p>
      )}

      <SubmitButton>
        Publish Blog
      </SubmitButton>
    </form>
  );
}
