const generateSKU = (productName, category) => {
    const namePart = productName.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
    const categoryPart = category.charAt(0).toUpperCase();
    const randomPart = Math.floor(Math.random() * 10000);
    return `${categoryPart}-${namePart}-${randomPart}`;
  };
  
  module.exports = generateSKU;
  