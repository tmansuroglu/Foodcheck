const APP_ID = "850e6676";
const APP_KEY = "f6e0e48a8808d3019c4f14524ba3c23f";

export const querySearch = async string => {
    // const url = BASE_URL + string;
    const url = `https://trackapi.nutritionix.com/v2/search/instant?query=${string}&self=false&branded=false&detailed=true`;
    try {
        const resp = await fetch(url, {
            method: "GET",
            headers: {
                "x-app-id": APP_ID,
                "x-app-key": APP_KEY,
            },
        });
        const data = await resp.json();
        //console.log(data.common);
        return data.common;
    } catch (err) {
        alert(err);
    }
};
