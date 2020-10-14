const APP_ID = "df9d1aa1";
const APP_KEY = "0f3c465f6a6ce5a0ef1f34be21932da5";

// const APP_ID = "850e6676";
// const APP_KEY = "f6e0e48a8808d3019c4f14524ba3c23f";
export const querySearch = async food => {
    // const url = BASE_URL + string;
    const queryUrl = `https://trackapi.nutritionix.com/v2/search/instant?query=${food}&self=false&branded=false&detailed=true`;

    try {
        if (food) {
            const resp = await fetch(queryUrl, {
                method: "GET",
                headers: {
                    "x-app-id": APP_ID,
                    "x-app-key": APP_KEY,
                },
            });
            const data = await resp.json();

            //console.log(data.common);
            return data.common;
        }
    } catch (err) {
        return err;
    }
};

export const getDetails = async food => {
    //console.log("string is", food,typeof food);
    const detailsUrl = "https://trackapi.nutritionix.com/v2/natural/nutrients";

    try {
        if (food) {
            const resp = await fetch(detailsUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-app-id": APP_ID,
                    "x-app-key": APP_KEY,
                },
                body: JSON.stringify({
                    query: food,
                }),
            });
            //console.log("resp is",resp)
            const data = await resp.json();
            //console.log("data is", data)

            console.log(data.foods[0]);
            return data.foods[0];
        }
    } catch (err) {
        return err;
    }
};
