import { api } from "./api-config";

export const getAllFishes = async () => {
  try {
    const response = await api.get("/fish?sort=desc");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createFish = async (token, formData) => {
  try {
    const response = await api.post("/fish", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteFish = async (token, fishId) => {
  try {
    const response = await api.delete(`/fish/${fishId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editFish = async (token, fishId, formData) => {
  try {
    const response = await api.put(`/fish/${fishId}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editDiscount = async (token, fishId, discountData) => {
  try {
    const response = await api.put(`/fish/${fishId}`, discountData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
