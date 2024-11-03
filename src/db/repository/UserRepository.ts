import { User } from "src/db/entity/User";
import { getAppDataSourceInstance } from "src/db";

const userRepository = async () => (await getAppDataSourceInstance()).getRepository(User);

export const createUser = async (email: User["email"]) => {
  return (await userRepository()).insert({
    email,
    created_at: new Date(),
  });
};

export const getUsers = async () => {
  return (await userRepository()).find();
};

export const getUserByEmail = async (email: User["email"]) => {
  return (await userRepository()).findOneBy({
    email,
  });
};

export const getUserById = async (id: User["id"]) => {
  return (await userRepository()).findOneBy({
    id,
  });
};

export const deleteUser = async (id: User["id"]) => {
  return (await userRepository()).delete({
    id,
  });
};
