export const allowedCategories = {
    "neckties": ["classic", "skinny", "wide", "clip-on", "kids"],
    "bowties": ["pre-tied", "self-tie", "kids"],
    "accessories": ["tie-clips", "scarves", "tie-care"]
  };
  
  export function isValidProduct(category, subcategory = null) {
    return (
      (allowedCategories[category] && !subcategory) ||
      (allowedCategories[category] && allowedCategories[category].includes(subcategory))
    );
  }