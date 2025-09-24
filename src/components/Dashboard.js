import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { UserService } from "./UserService";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { Pagination } from "./Pagination";
import { UserTable } from "./UserTable";
import { UserForm } from "./UserForm";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [userFormOpen, setUserFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const transformUser = (user) => {
    const nameParts = user.name.split(" ");
    return {
      id: user.id,
      firstName: nameParts[0] || "",
      lastName: nameParts.slice(1).join(" ") || "",
      email: user.email,
      department: user.company.name,
    };
  };

  const filteredUsers = useMemo(() => {
    return users
      .map(transformUser)
      .filter((user) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            user.firstName.toLowerCase().includes(query) ||
            user.lastName.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.department.toLowerCase().includes(query) ||
            user.id.toString().includes(query)
        );
      });
  }, [users, searchQuery]);


  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const loadUsers = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await UserService.getAllUsers();
      setUsers(fetchedUsers);
    } catch {
      toast.error("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, itemsPerPage]);

  const handleCreateUser = async (userData) => {
    try {
      const newUser = await UserService.createUser(userData);
      const simulatedUser = {
        ...newUser,
        id: Math.max(...users.map((u) => u.id), 0) + 1,
        username: userData.name.toLowerCase().replace(/\s+/g, "."),
        phone: "1-555-0000",
        website: "example.com",
        company: {
          name: userData.company.name,
          catchPhrase: "Innovative solutions",
          bs: "synergize dynamic partnerships",
        },
        address: {
          street: "123 Main St",
          suite: "Apt. 1",
          city: "Anytown",
          zipcode: "12345",
          geo: { lat: "0", lng: "0" },
        },
      };
      setUsers((prev) => [simulatedUser, ...prev]);
    } catch (error) {
      throw error;
    }
  };

  const handleEditUser = async (userData) => {
    if (!editingUser) return;
    try {
      await UserService.updateUser(editingUser.id, userData);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                name: userData.name,
                email: userData.email,
                company: {
                  ...user.company,
                  name: userData.company.name,
                },
              }
            : user
        )
      );
      setEditingUser(null);
    } catch (error) {
      throw error;
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setUserFormOpen(true);
  };

  const handleDeleteClick = userId => {
    const deleteFilteredUsers = users.filter(user => user.id !== userId)
    setUsers(deleteFilteredUsers)
  }

  return (
    <div className="min-h-screen bg-dashboard-bg relative">
      <div className="container mx-auto p-6 space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-sans tracking-wider uppercase">
              User Management
            </h1>
            <p className="text-muted-foreground">Manage your users with ease</p>
          </div>
          <nav className="flex items-center gap-2">
            <button
              onClick={() => {
                setEditingUser(null);
                setUserFormOpen(true);
              }}
              className="bg-green-400 flex items-center hover:bg-primary/90 p-2 text-white rounded"
            >
              <FaPlus className="h-4 w-4 mr-2" />
              Add User
            </button>
          </nav>
        </header>

        {/* Stats */}
        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-lg border bg-card p-6 bg-gradient-to-r from-cyan-500 to-blue-500">
            <header className="flex justify-between items-center pb-2">
              <h2 className="text-sm font-medium">Total Users</h2>
              <img src="https://res.cloudinary.com/dksgsqhdk/image/upload/v1758462314/profile-2user_pfcnmz.png" alt="Users" className="h-4 w-4 text-muted-foreground" />
            </header>
            <div className="text-2xl font-bold">{users.length}</div>
          </article>

          <article className="rounded-lg border bg-card p-6 bg-gradient-to-r from-cyan-500 to-blue-500">
            <header className="flex justify-between items-center pb-2">
              <h2 className="text-sm font-medium">Filtered Results</h2>
              <img src="https://res.cloudinary.com/dksgsqhdk/image/upload/v1758462314/profile-2user_pfcnmz.png" alt="Users" className="h-4 w-4 text-muted-foreground" />
            </header>
            <div className="text-2xl font-bold">{filteredUsers.length}</div>
          </article>

          <article className="rounded-lg border bg-card p-6 bg-gradient-to-r from-cyan-500 to-blue-500">
            <header className="flex justify-between items-center pb-2">
              <h2 className="text-sm font-medium">Current Page</h2>
              <img src="https://res.cloudinary.com/dksgsqhdk/image/upload/v1758462314/profile-2user_pfcnmz.png" alt="Users" className="h-4 w-4 text-muted-foreground" />
            </header>
            <div className="text-2xl font-bold">{currentPage} of {totalPages || 1}</div>
          </article>
        </section>

        {/* Search */}
        <div className="rounded-lg border bg-card bg-red-100 p-6">
          <header>
            <h2 className="text-xl font-semibold">Search Users</h2>
            <p className="text-sm text-muted-foreground">Search by name, email, department, or ID</p>
          </header>
          <div>
        <div className="relative flex items-center border-2 border-solid rounded mt-2">
        <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground w-100 "/>
            <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 cursor-pointer outline-none w-full"
            />
        </div>
        </div>
          </div>
        </div>

        {/* User Table */}
        <UserTable
          users={paginatedUsers}
          onEdit={handleEditClick}
          loading={loading}
          onDelete={handleDeleteClick}
        />

        {/* Pagination */}
        {!loading && filteredUsers.length > 0 && (
          <section className="rounded-lg border bg-card bg-yellow-200 p-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={filteredUsers.length}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </section>
        )}
      </div>

      {/* Modal at root level, overlays all content */}
      {userFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            <UserForm
              open={userFormOpen}
              onOpenChange={setUserFormOpen}
              onSubmit={editingUser ? handleEditUser : handleCreateUser}
              initialData={editingUser}
              mode={editingUser ? "edit" : "create"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

        
        
        

      