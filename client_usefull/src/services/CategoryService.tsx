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

export const createCategoryApi = async (token: string | null, name: string) => {
  try {
    const response = await fetch(`${api}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    console.log("res", response);
    if (response.status === 201) {
      const { id } = await response.json();
      return id;
    } else if (response.status === 409) {
      // TODO toast category already exist
    } else {
      throw new Error("Une erreur inconnue est survenue !");
    }
  } catch (error) {
    console.log("catch create category");

    // console.error(error);
  }
};
