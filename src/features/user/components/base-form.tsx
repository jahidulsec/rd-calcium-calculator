import { Select } from "@/components/select/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UpdateUserFormType, UserFormType } from "@/schema/user";
import React from "react";
import { UseFormReturn } from "react-hook-form";

const genderList = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];

const ageList = [
  {
    label: "1-3 years",
    value: "0",
  },
  {
    label: "4-8 years",
    value: "1",
  },
  {
    label: "9-18 years",
    value: "2",
  },
  {
    label: "19-50 years",
    value: "3",
  },
  {
    label: "50 years or more",
    value: "4",
  },
];

export default function BaseForm({
  form,
}: {
  form: UseFormReturn<UserFormType | UpdateUserFormType >;
}) {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="John Doe" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gender</FormLabel>
            <FormControl>
              <Select
                className="w-full"
                data={genderList}
                onValueChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="age"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Age</FormLabel>
            <FormControl>
              <Select
                className="w-full"
                data={ageList}
                onValueChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="district"
        render={({ field }) => (
          <FormItem>
            <FormLabel>District</FormLabel>
            <FormControl>
              <Input {...field} placeholder="eg. Dhaka" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
