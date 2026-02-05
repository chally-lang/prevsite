"use client";

import { useState, useEffect } from "react";

interface DBNote {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export default function StaffDashboard() {
  // State for managing notes
  const [notes, setNotes] = useState<DBNote[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [editingNote, setEditingNote] = useState<DBNote | null>(null);
  const [noteFormData, setNoteFormData] = useState({
    title: "",
    content: "",
  });
  const [activeTab, setActiveTab] = useState<"notes">("notes");

  // Fetch notes from API
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

  // Load notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

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
          <h1 className="text-4xl font-bold text-foreground mb-2">Staff Dashboard 👨‍🏫</h1>
          <p className="text-gray-400">Manage your personal notes and teaching resources</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-1 gap-6 mb-12">
          <div className="bg-secondary border border-primary/20 rounded-lg p-6 max-w-xs">
            <p className="text-gray-400 text-sm mb-2">My Notes</p>
            <p className="text-3xl font-bold text-primary">{loadingNotes ? "..." : notes.length}</p>
          </div>
        </div>

        {/* Content */}
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
