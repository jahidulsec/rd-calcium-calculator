import { Select } from "@/components/select/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DictionaryType } from "@/lib/dictionaries";
import { UpdateUserFormType, UserFormType } from "@/schema/user";
import React from "react";
import { UseFormReturn } from "react-hook-form";

const genderList = [
  {
    label: "Male",
    value: "MALE",
  },
  {
    label: "Female",
    value: "FEMALE",
  },
];

const ageList = [
  {
    label: "1-3 years",
    value: "TODDLER",
  },
  {
    label: "4-8 years",
    value: "CHILD",
  },
  {
    label: "9-18 years",
    value: "TEENAGER",
  },
  {
    label: "19-50 years",
    value: "ADULT",
  },
  {
    label: "50 years or more",
    value: "OLD",
  },
];

export default function BaseForm({
  form,
  data,
}: {
  form: UseFormReturn<UserFormType | UpdateUserFormType>;
  data: DictionaryType["profileForm"];
}) {
  return (
    <>
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{data.name}</FormLabel>
            <FormControl>
              <Input {...field} placeholder="John Doe" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='gender'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{data.gender}</FormLabel>
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
            <FormLabel>{data.age}</FormLabel>
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
            <FormLabel>{data.district}</FormLabel>
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
