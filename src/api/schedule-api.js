import { api } from "./api-config";

export const getAllSchedules = async () => {
  try {
    const response = await api.get("/schedule-ships");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createSchedule = async (token, formData) => {
  try {
    const response = await api.post("/schedule-ships", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteSchedule = async (scheduleId, token) => {
  try {
    const response = await api.delete(`/schedule-ships/${scheduleId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editSchedule = async (scheduleId, formData, token) => {
  try {
    const response = await api.put(`/schedule-ships/${scheduleId}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
