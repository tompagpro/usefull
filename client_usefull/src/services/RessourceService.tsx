const api: string = import.meta.env.VITE_LOCAL_BACKEND_URL;

export const getResourcesByCategoryApi = async (
  token: string | null,
  categoryId: string
) => {
  try {
    const response = await fetch(`${api}/resources/category/${categoryId}`, {
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

export const getResourcesByTagApi = async (
  token: string | null,
  tagId: string
) => {
  try {
    const response = await fetch(`${api}/resources/tag/${tagId}`, {
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "http://localhost:5173",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("getResourcesByTagapi", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createResourceApi = async (
  token: string | null,
  url: string,
  category: string,
  title: string,
  tags: string[],
  alreadyRead: boolean
) => {
  try {
    const response = await fetch(`${api}/resources`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ url, category, title, tags, alreadyRead }),
    });
    const data = await response.json();
    console.log("data create resource => ", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getTitleApi = async (token: string | null, url: string) => {
  try {
    const response = await fetch(`${api}/resources/scrape/getTitle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    console.log("title resource service after json", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteResourceApi = async (
  token: string | null,
  resourceId: string
) => {
  try {
    const res = await fetch(
      `${api}/resources/376758ff-1561-4d44-9e4d-86d9cb3283a5`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "http://localhost:5173",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // TODO : handle error and success
    if (!res.ok) {
      const errorText = await res.text(); // ou res.json() selon le backend
      throw new Error(`Erreur API: ${res.status} - ${errorText}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
