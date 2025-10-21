"use client";

import { FormButton } from "@/components/buttons/button";
import { ImageInput } from "@/components/input/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { blog } from "@/generated/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { createBlog, updateBlog } from "../actions/blog";
import { toast } from "sonner";
import { BlogSchema, BlogSchemaType } from "@/schema/blog";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { MarkdownEditor } from "@/components/editor/markdown/editor";

export default function BlogForm({ blog }: { blog?: blog }) {
  const ref1 = React.useRef<MDXEditorMethods>(null);
  const [enDetails, setEnDetails] = React.useState(blog?.en_details ?? "");

  const ref2 = React.useRef<MDXEditorMethods>(null);
  const [bnDetails, setBnDetails] = React.useState(blog?.bn_details ?? "");

  const form = useForm<BlogSchemaType>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      en_title: blog?.en_title,
      bn_title: blog?.bn_title,
      en_description: blog?.en_description,
      bn_description: blog?.bn_description,
      en_details: blog?.en_details,
      bn_details: blog?.bn_details,
    },
  });

  // watch image upload
  const image = form.getValues("image");
  form.watch("image");

  async function onSubmit(values: BlogSchemaType) {
    const res = blog
      ? await updateBlog(blog.id, values)
      : await createBlog(values);
    toast[res.success ? "success" : "error"](res.message);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          name="en_title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title (English)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="bn_title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title (Bangla)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="en_description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (English)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="bn_description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Bangla)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="en_details"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Details (English)</FormLabel>
              <FormControl>
                <textarea
                  className="hidden"
                  name={field.name}
                  value={enDetails}
                
                />
              </FormControl>
              <MarkdownEditor
                ref={ref1}
                markdown={enDetails}
                onChange={(markdown, _) => {
                  setEnDetails(markdown);
                  field.onChange(markdown);
                }}
                placeholder="Write here..."
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="bn_details"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Details (Bangla)</FormLabel>
              <FormControl>
                <textarea
                  className="hidden"
                  name={field.name}
                  value={bnDetails}
                
                />
              </FormControl>
              <MarkdownEditor
                ref={ref2}
                markdown={bnDetails}
                onChange={(markdown, _) => {
                  setEnDetails(markdown);
                  field.onChange(markdown);
                }}
                placeholder="Write here..."
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="image"
          control={form.control}
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Image</FormLabel>
              <FormControl>
                <ImageInput
                  imageUrl={`/api/upload/food/${blog?.id}`}
                  id="image"
                  field={field}
                  formImage={image}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormButton
          className="w-fit min-w-[18rem]"
          isPending={form.formState.isSubmitting}
        >
          Save
        </FormButton>
      </form>
    </Form>
  );
}
