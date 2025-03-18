export const getHighlightedAttributes = (comparedProducts) => {
    if (comparedProducts.length < 1) return {}; // No need to highlight if only 1 product
  
    const attributes = ["title", "brand", "category", "price", "discountPercentage","description"];
    let highlighted = {};
  
    attributes.forEach((attr) => {
      const uniqueValues = new Set(comparedProducts.map((product) => product[attr]));
      if (uniqueValues.size > 0) {
        highlighted[attr] = true;
      }
    });
  
    return highlighted;
  };
  