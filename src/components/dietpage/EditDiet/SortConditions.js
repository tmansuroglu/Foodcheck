import {
    ascCalories,
    descCalories,
    ascFat,
    descFat,
    ascCarbo,
    descCarbo,
    ascName,
    descName,
    ascProtein,
    descProtein,
} from "./SortFunctions";

const sorter = (activeMealContent, sortType) => {
    let sortedContent = "";
    switch (sortType) {
        case "ascCalories":
            sortedContent = activeMealContent.sort(ascCalories);
            break;
        case "descCalories":
            sortedContent = activeMealContent.sort(descCalories);
            break;
        case "ascProtein":
            sortedContent = activeMealContent.sort(ascProtein);
            break;
        case "descProtein":
            sortedContent = activeMealContent.sort(descProtein);
            break;
        case "ascFat":
            sortedContent = activeMealContent.sort(ascFat);
            break;
        case "descFat":
            sortedContent = activeMealContent.sort(descFat);
            break;
        case "ascCarbo":
            sortedContent = activeMealContent.sort(ascCarbo);
            break;
        case "descCarbo":
            sortedContent = activeMealContent.sort(descCarbo);
            break;
        case "ascName":
            sortedContent = activeMealContent.sort(ascName);
            break;
        case "descName":
            sortedContent = activeMealContent.sort(descName);
            break;
        default:
            break;
    }
    return sortedContent;
};

export default sorter;
