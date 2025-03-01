import { api } from "./api-config";

export const getAllCoupons = async (token) => {
  try {
    const response = await api.get("/discounts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createCoupon = async (token, formData) => {
  try {
    const response = await api.post("/discounts", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCoupon = async (token, coupon) => {
  try {
    const response = await api.delete(`/discounts/${coupon}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editCoupon = async (token, formData, couponName) => {
  try {
    const response = await api.put(`/discounts/${couponName}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
