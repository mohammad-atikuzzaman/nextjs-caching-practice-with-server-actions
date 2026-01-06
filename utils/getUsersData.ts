export interface User {
  _id: string;
  name: string;
  age: number;
  phone: string;
  createdAt: string;
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await fetch(
      "http://localhost:8000/persons"
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }

    const users: User[] = await response.json();

    return users;
  } catch (error) {
    console.error("getAllUsers error:", error);
    return [];
  }
}
