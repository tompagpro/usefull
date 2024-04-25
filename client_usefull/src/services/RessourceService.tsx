const api: string = import.meta.env.VITE_LOCAL_BACKEND_URL;

export const getResourcesByCategoryApi = async (token: string | null, categoryId: string) => {
  try {
    const response = await fetch(`${api}/resources/${categoryId}`, {
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "http://localhost:5173",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("getResourcesByCategoryapi", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
