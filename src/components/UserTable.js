import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiDark, CiEdit } from "react-icons/ci";
import { RiArrowUpDownLine } from "react-icons/ri";


export function UserTable({ users, onEdit, onDelete, loading }) {
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");


  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      const comparison = aValue.localeCompare(bValue);
      return sortDirection === "asc" ? comparison : -comparison;
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const SortButton  = ({ field, children }) => (
    <button
      variant="ghost"
      onClick={() => handleSort(field)}
      className="h-auto p-0 hover:bg-transparent font-semibold text-foreground"
    >
      <span className="flex items-center gap-1">
        {children}
        <RiArrowUpDownLine className="h-4 w-4" />
      </span>
    </button>
  );

  if (loading) {
    return (
      <div>
        <div>
          <h2>Users</h2>
        </div>
        <div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-muted animate-pulse rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-orange-100">
      <div className="flex flex-col space-y-1.5 p-6">
        <h2 className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Users ({users.length})</h1>
        </h2>
      </div>
      <div className="p-6 pt-0">
        <div className="rounded-md border">
          <table className="w-full caption-bottom text-sm">
            <thead className="w-fll">
              <tr className="border-b transition-colors flex justify-between hover:bg-muted/50 p-5 bg-green-200">
                <th className="w-[100px]">
                  <SortButton field="id">ID</SortButton>
                </th>
                <th>
                  <SortButton field="firstName">First Name</SortButton>
                </th>
                <th>
                  <SortButton field="lastName">Last Name</SortButton>
                </th>
                <th>
                  <SortButton field="email">Email</SortButton>
                </th>
                <th>
                  <SortButton field="department">Department</SortButton>
                </th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="w-full caption-bottom text-sm">
              {sortedUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted-foreground py-8">
                    No users found
                  </td>
                </tr>
              ) : (
                sortedUsers.map((user) => (
                  <tr key={user.id} className="flex justify-between p-5 bg-gray-200">
                    <td className="font-medium">
                      <div variant="outline">{user.id}</div>
                    </td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td className="text-primary">{user.email}</td>
                    <td>
                      <div variant="secondary">{user.department}</div>
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(user)}
                          className="h-8 w-8 p-0 hover:bg-primary/10"
                        >
                          <CiEdit className="h-4 w-4" />
                        </button>
                        <button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(user.id)}
                          className="h-8 w-8 p-0 hover:bg-destructive/10 text-destructive hover:text-destructive"
                        >
                          <FaRegTrashAlt className="h-4 w-4 text-red-800" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
