import axios from "axios";
import type { User } from "../types/user.type";
const URL = "https://6863d24a88359a373e967374.mockapi.io/";

async function getUsers(): Promise<User[]> {
  const response = await axios.get<User[]>(`${URL}data`);

  return response.data;
}

async function updateUserName(userId: string, name: string): Promise<User> {
  const response = await axios.put<User>(`${URL}data/${userId}`, { name });

  return response.data;
}

async function deleteUser(userId: string): Promise<User> {
  const response = await axios.delete<User>(`${URL}data/${userId}`);

  return response.data;
}

export const api = {
  getUsers,
  updateUserName,
  deleteUser
};