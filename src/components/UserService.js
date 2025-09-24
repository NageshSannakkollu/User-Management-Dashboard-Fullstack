const BASE_URL = "https://jsonplaceholder.typicode.com";

export class UserService {
  static async getAllUsers() {
    try {
      const response = await fetch(`${BASE_URL}/users`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  }

  static async getUserById(id) {
    try {
      const response = await fetch(`${BASE_URL}/users/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Failed to fetch user");
    }
  }

  static async createUser(userData) {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          company: userData.company,
          username: userData.name.toLowerCase().replace(/\s+/g, "."),
          phone: "1-555-0000",
          website: "example.com",
          address: {
            street: "123 Main St",
            suite: "Apt. 1",
            city: "Anytown",
            zipcode: "12345",
            geo: { lat: "0", lng: "0" }
          }
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  static async updateUser(id, userData) {
    try {
      const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name: userData.name,
          email: userData.email,
          company: userData.company,
          username: userData.name.toLowerCase().replace(/\s+/g, "."),
          phone: "1-555-0000",
          website: "example.com",
          address: {
            street: "123 Main St",
            suite: "Apt. 1",
            city: "Anytown",
            zipcode: "12345",
            geo: { lat: "0", lng: "0" }
          }
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Failed to update user");
    }
  }

  static async deleteUser(id) {
    try {
      const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Failed to delete user");
    }
  }
}
