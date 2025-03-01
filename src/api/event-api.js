import { api } from "./api-config";

export const getAllEvents = async () => {
  try {
    const response = await api.get("/events");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createEvent = async (token, name) => {
  try {
    const response = await api.post(
      "/events",
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

export const deleteEvent = async (token, eventId) => {
  try {
    const response = await api.delete(`/events/${eventId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editEvent = async (token, eventId, name) => {
  try {
    const response = await api.put(
      `/events/${eventId}`,
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
