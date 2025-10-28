async function getCalcium(foodName) {
    const apiKey = "T9FzNXwDoIYWj1RXHziMzwV8DfSSMzYOH57mGOzZ";

    const res = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(
            foodName
        )}&dataType=Foundation,SR%20Legacy&pageSize=10&api_key=${apiKey}`
    );

    const data = await res.json();
    if (!data.foods?.length) return "No results found";

    // Try to find first result that has calcium
    for (const food of data.foods) {
        const nutrients = food.foodNutrients || [];
        const calcium = nutrients.find(
            (n) => n.nutrientName.toLowerCase() === "calcium, ca"
        );
        if (calcium) {
            return `${food.description}: ${calcium.value} ${calcium.unitName}/100g`;
        }
    }

    return "Calcium not found in available entries";
}

getCalcium("banana dalquiri").then(console.log);