// "use server";

export async function getCalcium(foodName: string) {
  const apiKey = process.env.NEXT_PUBLIC_USDA_API_KEY;
  const res = await fetch(
    `https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodName}&api_key=${apiKey}&pageSize=2`,
  );

  if (res.status === 404) throw new Error("Check the food name spelling for better result")

  if (!res.ok) throw new Error('Please try again or try with another name');

  const data = await res.json();

  const nutrients1 = data.foods[0]?.foodNutrients;
  const nutrients2 = data.foods?.[1]?.foodNutrients;
  const calcium1 = nutrients1?.find((n: any) => n.nutrientName === "Calcium, Ca");
  const calcium2 = nutrients2?.find((n: any) => n.nutrientName === "Calcium, Ca");

  let value = calcium1.value

  if (calcium2 && calcium2.value > calcium1.value) {
    value = calcium2.value
  }

  return value ? value : null;
}

export const searchFood = async (search: string) => {
  try {
    // const search = formData.get("search");

    if (!search) throw new Error("Search must be contain at least 2 characters");

    const res = await getCalcium(search as string);

    console.log(res);

    return {
      success: true,
      message: "Get search data from cloud successfully",
      data: res,
    };
  } catch (error) {
    console.error(error);

    const message = (error as Error).message.split('\n').pop();
    return {
      success: false,
      message: message,
      data: null,
    };
  }
};
