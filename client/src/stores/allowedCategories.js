
export function isValidProduct(category, subcategory=null) {
    if (allowedCategories[category] && !subcategory || 
        allowedCategories[category] && allowedCategories[category].includes(subcategory)
    ) {
        return true;
    }
    return false;
}

export const allowedCategories = {
    "neckties": ["classic", "skinny", "clip-on"], 
    "bowties": ["pre-tied", "self-tie"], 
    "accessories": ["tie-clips", "scarves", "tie-care"]
};

