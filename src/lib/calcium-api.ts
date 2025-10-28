"use server";

export async function getCalcium(foodName: string) {
  const apiKey = process.env.NEXT_PUBLIC_USDA_API_KEY;
  const res = await fetch(
    `https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodName}&api_key=${apiKey}`
  );
  const data = await res.json();

  const nutrients = data.foods[0]?.foodNutrients;
  const calcium = nutrients?.find((n: any) => n.nutrientName === "Calcium, Ca");
  return calcium ? calcium.value : null;
}

export const searchFood = async (prevData: unknown, formData: FormData) => {
  try {
    const search = formData.get("search");

    if (!search) throw new Error("input must be contain at least 2 characters");

    const res = await getCalcium(search as string);

    console.log(res);

    return {
      success: true,
      message: "Get search data from cloud successfully",
      data: res,
    };
  } catch (error) {
    console.error(error);

    const message = (error as Error).message.split("\n").pop();
    return {
      success: false,
      message: message === "fetch failed" ? "Please try again!" : message,
      data: null,
    };
  }
};
