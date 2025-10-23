async function getCalcium(foodName) {
    const apiKey = "T9FzNXwDoIYWj1RXHziMzwV8DfSSMzYOH57mGOzZ"
    const res = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodName}&api_key=${apiKey}`
    );
    const data = await res.json();

    const nutrients = data.foods[0]?.foodNutrients;
    const calcium = nutrients?.find((n) => n.nutrientName === "Calcium, Ca");
    return calcium ? calcium.value + " mg/100g" : "Not found";
}

getCalcium("beef burger").then(console.log);