import { DashboardHeader } from "@/components/section/section";
import { DashbaordHeading } from "@/components/typography/heading";
import AddFoodButton from "@/features/foods/components/add-food-button";
import { IconListDetails } from "@tabler/icons-react";
import React from "react";

export default function FoodPage() {
  return (
    <>
      <DashboardHeader>
        <DashbaordHeading>
          <IconListDetails /> Foods
        </DashbaordHeading>

        <AddFoodButton />
      </DashboardHeader>
    </>
  );
}
