import { ProductHistory } from "@/types/shopping";

const PRODUCTS_KEY = "shopping-products";

const loadProducts = (): ProductHistory[] => {
  const saved = localStorage.getItem(PRODUCTS_KEY);
  return saved ? JSON.parse(saved) : [];
};

const saveProducts = (products: ProductHistory[]): void => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

const fetchProducts = (): ProductHistory[] => {
  return loadProducts();
};

const createProduct = (text: string): ProductHistory => {
  const products = loadProducts();
  const normalizedText = text.trim().toLowerCase();
  const existing = products.find((p) => p.text.toLowerCase() === normalizedText);
  if (existing) {
    return updateProduct(text, existing.frequency + 1);
  }
  const newProduct: ProductHistory = { text, frequency: 1 };
  saveProducts([...products, newProduct]);
  return newProduct;
};

const updateProduct = (text: string, frequency: number): ProductHistory => {
  const products = loadProducts();
  const updatedProducts = products.map((product) =>
    product.text === text ? { ...product, frequency } : product
  );
  saveProducts(updatedProducts);
  return updatedProducts.find(p => p.text === text)!;
};

const deleteProduct = (text: string): void => {
  const products = loadProducts();
  const updatedProducts = products.filter((product) => product.text !== text);
  saveProducts(updatedProducts);
};

export const productService = {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
