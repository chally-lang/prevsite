"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface DBUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

interface DBBlog {
  id: string;
  title: string;
  content: string;
  photo: string | null;
  category: string | null;
  readTime: string | null;
  published: boolean;
  author: {
    name: string;
  };
  createdAt: string;
}

interface DBSubscriber {
  id: string;
  email: string;
  createdAt: string;
}

interface DBMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface DBNote {
  id: string;
  title: string;
  content: string;
  userId: string;
  user?: {
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  
  // State for managing users
  const [users, setUsers] = useState<DBUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // State for managing blogs
  const [blogs, setBlogs] = useState<DBBlog[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  // State for managing newsletter subscribers
  const [subscribers, setSubscribers] = useState<DBSubscriber[]>([]);
  const [loadingSubscribers, setLoadingSubscribers] = useState(true);

  // State for managing contact messages
  const [messages, setMessages] = useState<DBMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  // State for managing notes
  const [notes, setNotes] = useState<DBNote[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(true);

  // State for managing active tab in the dashboard
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "blogs" | "subscribers" | "messages" | "notes">("overview");
  const [showUserForm, setShowUserForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "STUDENT", password: "" });

  // Blog Form State
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<DBBlog | null>(null);
  const [blogFormData, setBlogFormData] = useState({
    title: "",
    content: "",
    category: "",
    photo: "",
    readTime: "5 min read",
    published: true,
  });

  // Note Form State
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [editingNote, setEditingNote] = useState<DBNote | null>(null);
  const [noteFormData, setNoteFormData] = useState({
    title: "",
    content: "",
  });

  // Fetch users from DB
  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const res = await fetch("/api/users", { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else {
        const errorData = await res.json().catch(() => ({ error: "Unknown error" }));
        console.error("Failed to fetch users:", res.status, errorData.error);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Fetch blogs from DB
  const fetchBlogs = async () => {
    try {
      setLoadingBlogs(true);
      const res = await fetch("/api/blogs?admin=true");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoadingBlogs(false);
    }
  };

  // Fetch newsletter subscribers from DB
  const fetchSubscribers = async () => {
    try {
      setLoadingSubscribers(true);
      const res = await fetch("/api/newsletter");
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data);
      }
    } catch (error) {
      console.error("Failed to fetch subscribers:", error);
    } finally {
      setLoadingSubscribers(false);
    }
  };

  // Fetch contact messages from DB
  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Fetch notes for current user
  const fetchNotes = async () => {
    try {
      setLoadingNotes(true);
      const res = await fetch("/api/notes", { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setNotes(data);
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    } finally {
      setLoadingNotes(false);
    }
  };

  // Effect hook to trigger initial data fetch
  useEffect(() => {
    fetchUsers();
    fetchBlogs();
    fetchSubscribers();
    fetchMessages();
    fetchNotes();
  }, []);

  // Handle adding a new user
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        fetchUsers();
        setNewUser({ name: "", email: "", role: "STUDENT", password: "" });
        setShowUserForm(false);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user");
    }
  };

  // Get status badge styling
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500/20 text-green-400";
      case "SUSPENDED":
        return "bg-red-500/20 text-red-400";
      case "INACTIVE":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  // Handle updating user status
  const handleUpdateUserStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setUsers(users.map((user) => user.id === id ? { ...user, status: newStatus } : user));
      } else {
        alert("Failed to update user status");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Handle Blog Submit
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      alert("You must be logged in to perform this action");
      return;
    }

    const url = editingBlog ? `/api/blogs/${editingBlog.id}` : "/api/blogs";
    const method = editingBlog ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...blogFormData,
          authorId: session.user.id,
        }),
      });

      if (res.ok) {
        fetchBlogs();
        setShowBlogForm(false);
        setEditingBlog(null);
        setBlogFormData({
          title: "",
          content: "",
          category: "",
          photo: "",
          readTime: "5 min read",
          published: true,
        });
      } else {
        const error = await res.json();
        alert(error.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog");
    }
  };

  // Handle Blog Delete
  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchBlogs();
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // Handle Publish Toggle
  const handlePublishToggle = async (blog: DBBlog) => {
    try {
      const res = await fetch(`/api/blogs/${blog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !blog.published }),
      });
      if (res.ok) {
        fetchBlogs();
      }
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };

  // Prepare Edit Blog
  const startEditBlog = (blog: DBBlog) => {
    setEditingBlog(blog);
    setBlogFormData({
      title: blog.title,
      content: blog.content,
      category: blog.category || "",
      photo: blog.photo || "",
      readTime: blog.readTime || "5 min read",
      published: blog.published,
    });
    setShowBlogForm(true);
  };

  // Handle Note Submit
  const handleNoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteFormData.title || !noteFormData.content) return;

    const url = editingNote ? `/api/notes/${editingNote.id}` : "/api/notes";
    const method = editingNote ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noteFormData),
      });

      if (res.ok) {
        fetchNotes();
        setShowNoteForm(false);
        setEditingNote(null);
        setNoteFormData({ title: "", content: "" });
        alert(editingNote ? "Note updated successfully!" : "Note created successfully!");
      } else {
        const error = await res.json();
        alert(error.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Failed to save note");
    }
  };

  // Handle Note Delete
  const handleDeleteNote = async (id: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchNotes();
        alert("Note deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Prepare Edit Note
  const startEditNote = (note: DBNote) => {
    setEditingNote(note);
    setNoteFormData({
      title: note.title,
      content: note.content,
    });
    setShowNoteForm(true);
  };

  return (
    <main className="min-h-screen bg-background pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard 👑</h1>
          <p className="text-gray-400">Complete control over users and content</p>
        </div>

        {/* Overview Stats */}
        {activeTab === "overview" && (
          <div>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-secondary border border-primary/20 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Total Users</p>
                <p className="text-3xl font-bold text-primary">
                  {loadingUsers ? <span className="text-gray-500 animate-pulse">Loading...</span> : users.length}
                </p>
              </div>
              <div className="bg-secondary border border-primary/20 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Published Blogs</p>
                <p className="text-3xl font-bold text-primary">
                  {loadingBlogs ? <span className="text-gray-500 animate-pulse">Loading...</span> : blogs.filter(b => b.published).length}
                </p>
              </div>
              <div className="bg-secondary border border-primary/20 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Subscribers</p>
                <p className="text-3xl font-bold text-primary">
                  {loadingSubscribers ? <span className="text-gray-500 animate-pulse">Loading...</span> : subscribers.length}
                </p>
              </div>
              <div className="bg-secondary border border-primary/20 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Your Notes</p>
                <p className="text-3xl font-bold text-primary">
                  {loadingNotes ? <span className="text-gray-500 animate-pulse">Loading...</span> : notes.length}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-1 gap-6">
              <div className="bg-secondary border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Recent Users</h3>
                <div className="space-y-3">
                  {loadingUsers ? (
                    <p className="text-gray-400 text-sm">Loading recent users...</p>
                  ) : users.length === 0 ? (
                    <p className="text-gray-400 text-sm">No users found.</p>
                  ) : (
                    users.slice(0, 3).map((user) => (
                      <div key={user.id} className="flex items-center justify-between pb-3 border-b border-primary/10">
                        <div>
                          <p className="font-semibold text-foreground">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">
                          {user.role}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-primary/20 overflow-x-auto whitespace-nowrap">
          {(["overview", "users", "blogs", "subscribers", "messages", "notes"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition border-b-2 capitalize ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-foreground"
              }`}
            >
              {tab === "overview" && "📊"} {tab === "users" && "👥"} {tab === "blogs" && "📝"} {tab === "subscribers" && "📧"} {tab === "messages" && "✉️"} {tab === "notes" && "📋"}
              {" "}{tab}
            </button>
          ))}
        </div>

        {/* Users Tab */}
        {activeTab === "users" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">User Management</h2>
              <button
                onClick={() => setShowUserForm(!showUserForm)}
                className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                {showUserForm ? "Cancel" : "+ Add User"}
              </button>
            </div>

            {/* Add User Form */}
            {showUserForm && (
              <form onSubmit={handleAddUser} className="mb-8 bg-secondary border border-primary/20 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      placeholder="Enter full name"
                      className="w-full px-4 py-2 bg-background border border-primary/20 rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:border-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="Enter email"
                      className="w-full px-4 py-2 bg-background border border-primary/20 rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:border-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Password (Optional)
                    </label>
                    <input
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      placeholder="Default: Welcome123!"
                      className="w-full px-4 py-2 bg-background border border-primary/20 rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:border-primary transition"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Role
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-primary/20 rounded-lg text-foreground focus:outline-none focus:border-primary transition cursor-pointer"
                  >
                    <option value="STUDENT">Student</option>
                    <option value="STAFF">Staff</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                  Add User
                </button>
              </form>
            )}

            {/* Users Table */}
            <div className="bg-secondary border border-primary/20 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary/10 border-b border-primary/20">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/10">
                    {loadingUsers ? (
                      <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400">Loading users...</td></tr>
                    ) : users.length === 0 ? (
                      <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400">No users found.</td></tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.id} className="hover:bg-primary/5 transition">
                          <td className="px-6 py-4 text-foreground font-medium">{user.name}</td>
                          <td className="px-6 py-4 text-gray-400">{user.email}</td>
                          <td className="px-6 py-4"><span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold">{user.role}</span></td>
                          <td className="px-6 py-4">
                            <select 
                              value={user.status} 
                              onChange={(e) => handleUpdateUserStatus(user.id, e.target.value)}
                              className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${getStatusStyles(user.status)} bg-opacity-30`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <option value="ACTIVE">ACTIVE</option>
                              <option value="INACTIVE">INACTIVE</option>
                              <option value="SUSPENDED">SUSPENDED</option>
                            </select>
                          </td>
                          <td className="px-6 py-4"><button onClick={(e) => { e.stopPropagation(); handleDeleteUser(user.id); }} className="text-red-400 hover:text-red-300 font-semibold transition text-sm">Delete</button></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Blogs Tab */}
        {activeTab === "blogs" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Blog Management</h2>
              <button
                onClick={() => {
                  setEditingBlog(null);
                  setBlogFormData({
                    title: "",
                    content: "",
                    category: "",
                    photo: "",
                    readTime: "5 min read",
                    published: true,
                  });
                  setShowBlogForm(!showBlogForm);
                }}
                className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                {showBlogForm ? "Cancel" : "+ Add Blog"}
              </button>
            </div>

            {/* Blog Form */}
            {showBlogForm && (
              <form onSubmit={handleBlogSubmit} className="mb-8 bg-secondary border border-primary/20 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Blog Title
                    </label>
                    <input
                      type="text"
                      value={blogFormData.title}
                      onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                      placeholder="Enter blog title"
                      className="w-full px-4 py-2 bg-background border border-primary/20 rounded-lg text-foreground focus:outline-none focus:border-primary transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      value={blogFormData.category}
                      onChange={(e) => setBlogFormData({ ...blogFormData, category: e.target.value })}
                      placeholder="e.g. Web Dev, AI"
                      className="w-full px-4 py-2 bg-background border border-primary/20 rounded-lg text-foreground focus:outline-none focus:border-primary transition"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Photo URL
                    </label>
                    <input
                      type="text"
                      value={blogFormData.photo}
                      onChange={(e) => setBlogFormData({ ...blogFormData, photo: e.target.value })}
                      placeholder="Image URL"
                      className="w-full px-4 py-2 bg-background border border-primary/20 rounded-lg text-foreground focus:outline-none focus:border-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Read Time
                    </label>
                    <input
                      type="text"
                      value={blogFormData.readTime}
                      onChange={(e) => setBlogFormData({ ...blogFormData, readTime: e.target.value })}
                      placeholder="e.g. 5 min read"
                      className="w-full px-4 py-2 bg-background border border-primary/20 rounded-lg text-foreground focus:outline-none focus:border-primary transition"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Content
                  </label>
                  <textarea
                    value={blogFormData.content}
                    onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                    placeholder="Write your blog content here..."
                    className="w-full px-4 py-2 bg-background border border-primary/20 rounded-lg text-foreground focus:outline-none focus:border-primary transition min-h-[200px]"
                    required
                  />
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <input
                    type="checkbox"
                    id="published"
                    checked={blogFormData.published}
                    onChange={(e) => setBlogFormData({ ...blogFormData, published: e.target.checked })}
                    className="w-4 h-4 text-primary bg-background border-primary/20 rounded focus:ring-primary"
                  />
                  <label htmlFor="published" className="text-sm font-semibold text-gray-300">
                    Publish immediately
                  </label>
                </div>

                <button
                  type="submit"
                  className="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                  {editingBlog ? "Update Blog" : "Create Blog"}
                </button>
              </form>
            )}

            <div className="space-y-4">
              {loadingBlogs ? (
                <p className="text-gray-400">Loading blogs...</p>
              ) : blogs.length === 0 ? (
                <p className="text-gray-400 text-center py-10 bg-secondary rounded-lg border border-primary/10">No blogs found. Create your first blog!</p>
              ) : (
                blogs.map((blog) => (
                  <div key={blog.id} className="bg-secondary border border-primary/20 rounded-lg p-6 hover:border-primary/50 transition">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-2">{blog.title}</h3>
                        <p className="text-gray-400 text-sm">By {blog.author?.name || "Unknown"} • {blog.category || "General"}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        blog.published 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {blog.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => startEditBlog(blog)}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition text-sm font-semibold"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handlePublishToggle(blog)}
                        className={`px-4 py-2 rounded-lg transition text-sm font-semibold ${
                          blog.published
                            ? "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
                            : "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                        }`}
                      >
                        {blog.published ? "Unpublish" : "Publish"}
                      </button>
                      <button 
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition text-sm font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Subscribers Tab */}
        {activeTab === "subscribers" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Newsletter Subscribers</h2>
              <button
                onClick={fetchSubscribers}
                className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
              >
                <svg className={`w-4 h-4 ${loadingSubscribers ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>

            <div className="space-y-4">
              {loadingSubscribers ? (
                <div className="text-center py-10 text-gray-400 bg-secondary rounded-lg border border-primary/20">
                  Loading subscribers...
                </div>
              ) : subscribers.length === 0 ? (
                <div className="text-center py-10 text-gray-400 bg-secondary rounded-lg border border-primary/20">
                  No subscribers yet.
                </div>
              ) : (
                <div className="bg-secondary border border-primary/20 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-primary/10 border-b border-primary/20">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Email</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Subscribed Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-primary/10">
                        {subscribers.map((sub) => (
                          <tr key={sub.id} className="hover:bg-primary/5 transition">
                            <td className="px-6 py-4 text-foreground font-medium">{sub.email}</td>
                            <td className="px-6 py-4 text-gray-400 text-sm">
                              {new Date(sub.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Contact Messages</h2>
              <button
                onClick={fetchMessages}
                className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
              >
                <svg className={`w-4 h-4 ${loadingMessages ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>

            <div className="space-y-4">
              {loadingMessages ? (
                <div className="text-center py-10 text-gray-400 bg-secondary rounded-lg border border-primary/20">
                  Loading messages...
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-10 text-gray-400 bg-secondary rounded-lg border border-primary/20">
                  No messages received yet.
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="bg-secondary border border-primary/20 rounded-xl p-6 hover:border-primary/40 transition-all shadow-lg">
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{msg.subject}</h3>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-primary font-semibold">{msg.name}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-400">{msg.email}</span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 bg-background/50 px-3 py-1 rounded-full border border-primary/10">
                        {new Date(msg.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="bg-background/40 rounded-lg p-4 text-gray-300 leading-relaxed border border-primary/5 whitespace-pre-wrap">
                      {msg.message}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === "notes" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">My Notes</h2>
              <button
                onClick={() => {
                  setEditingNote(null);
                  setNoteFormData({ title: "", content: "" });
                  setShowNoteForm(!showNoteForm);
                }}
                className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                {showNoteForm ? "Cancel" : "+ Create Note"}
              </button>
            </div>

            {/* Note Form */}
            {showNoteForm && (
              <form onSubmit={handleNoteSubmit} className="mb-8 bg-secondary border border-primary/20 rounded-lg p-6">
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Note Title
                  </label>
                  <input
                    type="text"
                    value={noteFormData.title}
                    onChange={(e) => setNoteFormData({ ...noteFormData, title: e.target.value })}
                    placeholder="Enter note title"
                    className="w-full px-4 py-2 bg-background border border-primary/20 rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:border-primary transition"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Note Content
                  </label>
                  <textarea
                    value={noteFormData.content}
                    onChange={(e) => setNoteFormData({ ...noteFormData, content: e.target.value })}
                    placeholder="Write your note content here..."
                    rows={8}
                    className="w-full px-4 py-2 bg-background border border-primary/20 rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:border-primary transition resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                  {editingNote ? "Update Note" : "Save Note"}
                </button>
              </form>
            )}

            {/* Notes List */}
            <div className="grid md:grid-cols-2 gap-6">
              {loadingNotes ? (
                <div className="col-span-2 text-center py-10 text-gray-400 bg-secondary rounded-lg border border-primary/20">
                  Loading notes...
                </div>
              ) : notes.length === 0 ? (
                <div className="col-span-2 text-center py-10 text-gray-400 bg-secondary rounded-lg border border-primary/20">
                  No notes yet. Create your first note!
                </div>
              ) : (
                notes.map((note) => (
                  <div key={note.id} className="bg-secondary border border-primary/20 rounded-lg p-6 hover:border-primary/50 transition flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-foreground mb-2">{note.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">{note.content}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                      <span className="text-xs text-gray-500">
                        {new Date(note.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditNote(note)}
                          className="px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition text-xs font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="px-3 py-1 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition text-xs font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
