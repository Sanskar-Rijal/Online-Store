const API_URL = "http://127.0.0.1:3000";

//getting all products
export async function getAllProducts({ category }) {
  let url = "/api/v1/products";
  if (category) {
    url += `?category=${category}`;
  }
  const response = await fetch(`${API_URL}${url}`);
  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually.
  //  This will then go into the catch block, where the message is set
  if (!response.ok) throw Error("Failed to Fetch Products ");
  const data = await response.json();
  return data;
}
