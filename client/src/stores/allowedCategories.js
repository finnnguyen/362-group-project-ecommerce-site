
export function isValidProduct(category, subcategory=null) {
    if (allowedCategories[category] && !subcategory || 
        allowedCategories[category] && allowedCategories[category].includes(subcategory)
    ) {
        return true;
    }
    return false;
}

export const allowedCategories = {
    "neckties": ["classic", "skinny", "wide", "clip-on", "kids"], 
    "bowties": ["pre-tied", "self-tie", "kids"], 
    "accessories": ["tie-clips", "scarves", "tie-care"]
};

