import { api } from "./api-config";

export const getAllTypes = async () => {
  try {
    const response = await api.get("/types");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createType = async (name, token) => {
  try {
    const response = await api.post(
      "/types",
      { name: name },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteType = async (typeId, token) => {
  try {
    const response = await api.delete(`/types/${typeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editType = async (typeId, name, token) => {
  try {
    const response = await api.put(
      `/types/${typeId}`,
      { name },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
