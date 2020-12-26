import apiRequest from "./apiRequest";

export const createTodoRequest = (
  userId: string | number,
  description: string
) => {
  return apiRequest.post(`/users/${userId}/todos`).send({ description });
};

export const createUserRequest = (email: string) => {
  return apiRequest.post("/users").send({ email });
};
