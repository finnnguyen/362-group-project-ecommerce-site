
export function isValidProduct(category, subcategory=null) {
    for (const cat of allowedCategories) {
        if (cat[0] === category && !subcategory) {
            return true;
        }
        else if (cat[0] === category && cat[1].includes(subcategory)) {
            return true;
        }
    }
    return false;
}

export const allowedCategories = [
    ["neckties", ["classic", "skinny", "clip-on"]], 
    ["bowties", ["pre-tied", "self-tie"]], 
    ["accessories", ["tie-clips", "scarves", "tie-care"]]
];

