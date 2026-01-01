import {
  BASE_URL,
  GET_MY_DETAILS,
  LOGIN_USER,
  LOGOUT_USER,
} from "../utils/Constants";

//Login user
export async function loginUser({ email, password }) {
  const response = await fetch(`${BASE_URL}${LOGIN_USER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", //save cookies
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Login Failed, Please try again later");
  }
  const data = await response.json();
  return data;
}

//Logout User
export async function logoutUser() {
  const response = await fetch(`${BASE_URL}${LOGOUT_USER}`, {
    method: "POST",
    credentials: "include", //send cookies
  });
  if (!response.ok) {
    throw new Error("Logout Failed, Please try again later");
  }
  const data = await response.json();
  return data;
}

//get my details
export async function getMyDetails() {
  const response = await fetch(`${BASE_URL}${GET_MY_DETAILS}`, {
    method: "GET",
    credentials: "include", //send cookies
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }
  const data = await response.json();
  return data;
}
