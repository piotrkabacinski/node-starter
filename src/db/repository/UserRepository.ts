import { User } from "src/db/entity/User";
import { AppDataSource } from "src/db";

const userRepository = AppDataSource.getRepository(User);

export const createUser = (email: User["email"]) => {
  return userRepository.insert({
    email,
    created_at: new Date(),
  });
};

export const getUsers = () => {
  return userRepository.find();
};

export const getUserByEmail = (email: User["email"]) => {
  return userRepository.findOneBy({
    email,
  });
};

export const getUserById = (id: User["id"]) => {
  return userRepository.findOneBy({
    id,
  });
};

export const deleteUser = (id: User["id"]) => {
  return userRepository.delete({
    id,
  });
};
