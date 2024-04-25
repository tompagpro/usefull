
const api: string = import.meta.env.VITE_LOCAL_BACKEND_URL;

export const getCategoriesApi = async (token: string | null) => {
  try {


    const response = await fetch(`${api}/categories`, {
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "http://localhost:5173",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    // console.log("data, api", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getCategoriesWithToReadApi = async (token: string | null) => {
  try {

    const response = await fetch(`${api}/categories/toread`, {
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "http://localhost:5173",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    // console.log("data, api", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
