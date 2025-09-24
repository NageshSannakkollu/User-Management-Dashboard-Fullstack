import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export function UserForm({ open, onOpenChange, onSubmit, initialData, mode }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: { name: "" },
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData({
        name: `${initialData.firstName} ${initialData.lastName}`,
        email: initialData.email,
        company: { name: initialData.department },
      });
    } else {
      setFormData({
        name: "",
        email: "",
        company: { name: "" },
      });
    }
    setErrors({});
  }, [initialData, mode, open]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.company.name.trim()) {
      newErrors.department = "Department is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
      onOpenChange(false);
      toast({
        title: "Success",
        description: `User ${mode === "create" ? "created" : "updated"} successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${mode} user. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === "department") {
      setFormData((prev) => ({
        ...prev,
        company: { name: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  return (
    <div open={open} onOpenChange={onOpenChange}>
      <div className="sm:max-w-[425px]">
        <header className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
          <h2 className="text-2xl uppercase font-bold leading-none tracking-tight">{mode === "create" ? "Add New User" : "Edit User"}</h2>
          <p className="text-sm font-semibold text-muted-foreground">
            {mode === "create"
              ? "Fill in the details to create a new user."
              : "Update the user information below."}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter full name"
              className={errors.name ? "border-destructive" : "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"}
            />
            {errors.name && <p className="text-sm text-red-700 text-destructive">{errors.name}</p>}
          </div>

          <div className="grid gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter email address"
              className={errors.email ? "border-destructive" : "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"}
            />
            {errors.email && <p className="text-sm text-red-700 text-destructive">{errors.email}</p>}
          </div>

          <div className="grid gap-2">
            <label htmlFor="department">Department</label>
            <input
              id="department"
              value={formData.company.name}
              onChange={(e) => handleInputChange("department", e.target.value)}
              placeholder="Enter department"
              className={errors.department ? "border-destructive" : "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"}
            />
            {errors.department && (
              <p className="text-sm  text-red-700 text-destructive">{errors.department}</p>
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <button type="button" onClick={() => onOpenChange(false)} disabled={loading} className="bg-red-600 text-white pr-3 pl-3 rounded" >
              Cancel
            </button>
            <button type="submit" disabled={loading} className="bg-cyan-600 text-white pr-3 pl-3 pt-2 pb-2 rounded">
              {loading
                ? "Saving..." 
                : mode === "create"
                ? "Create User"
                : "Update User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
