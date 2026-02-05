"use client"; // Enable client-side rendering for this dashboard component

import { useState, useEffect } from "react"; // Import React hooks for state and lifecycle management
import Link from "next/link"; // Import Link for client-side navigation between pages

// Type definition for a note object
interface Note { // Interface to enforce structure for note data
  id: string; // Unique identifier for each note
  title: string; // Title or heading of the note
  content: string; // The main text body of the note
  createdAt: string; // ISO date string of creation time
} // End of Note interface

export default function StudentDashboard() { // Main component for the student dashboard
  // State for managing all notes fetched from database
  const [notes, setNotes] = useState<Note[]>([]); // Array to hold the list of user notes

  // State for controlling form visibility
  const [showNoteForm, setShowNoteForm] = useState(false); // Boolean toggle for showing the add/edit form
  
  // State for the current note being created or edited
  const [newNote, setNewNote] = useState({ title: "", content: "" }); // Object to hold current form input values
  
  // State for tracking which note is being edited (null if creating new)
  const [editingId, setEditingId] = useState<string | null>(null); // Stores the ID of the note being edited
  
  // State for tracking which note is being deleted (confirmation)
  const [deleteId, setDeleteId] = useState<string | null>(null); // Stores ID of note pending deletion
  
  // State for managing loading and error states
  const [loading, setLoading] = useState(true); // Boolean to track if data is currently being fetched
  const [error, setError] = useState<string | null>(null); // String to store any error messages

  // Fetch notes from the API when component mounts
  useEffect(() => { // Hook to trigger data fetch on component load
    fetchNotes(); // Call the fetch function
  }, []); // Empty dependency array means this runs once on mount

  // Function to fetch all notes from the API for the current user
  const fetchNotes = async () => { // Async function to handle API communication
    try { // Start error handling block
      setLoading(true); // Show loading indicator
      setError(null); // Clear any previous errors
      const response = await fetch("/api/notes", { cache: 'no-store' }); // Fetch notes from the server API
      
      if (!response.ok) { // Check if the response status is successful
        throw new Error("Failed to fetch notes"); // Throw error if request failed
      } // End if response check
      
      const data = await response.json(); // Parse the response body as JSON
      setNotes(data); // Update the notes state with the fetched data
    } catch (err) { // Handle any exceptions
      setError(err instanceof Error ? err.message : "An error occurred"); // Set error message for UI
    } finally { // Always execute after try or catch
      setLoading(false); // Hide the loading indicator
    } // End try-catch-finally block
  }; // End fetchNotes function

  // Handle adding a new note or updating an existing one
  const handleAddNote = async (e: React.FormEvent) => { // Form submission handler
    e.preventDefault(); // Stop the page from reloading on submit
    if (!newNote.title || !newNote.content) return; // Don't proceed if inputs are empty

    try { // Start operations block
      setError(null); // Clear previous errors
      
      if (editingId) { // Check if we are in edit mode
        // Update existing note via PUT endpoint
        const response = await fetch(`/api/notes/${editingId}`, { // Send PUT request to specific note ID
          method: "PUT", // Set HTTP method to update
          headers: { "Content-Type": "application/json" }, // Set JSON content header
          body: JSON.stringify({ // Send updated title and content
            title: newNote.title, // Use current title from state
            content: newNote.content, // Use current content from state
          }), // End body
        }); // End fetch

        if (!response.ok) { // Check for update failure
          throw new Error("Failed to update note"); // Throw error if not successful
        } // End check

        const updatedNote = await response.json(); // Get the updated note object from response
        
        // Replace the old note with the updated one in local state
        setNotes(notes.map((note) => (note.id === editingId ? updatedNote : note))); // Map over notes and replace target
        setEditingId(null); // Reset editing state
      } else { // Case for creating a new note
        // Create new note via POST endpoint
        const response = await fetch("/api/notes", { // Send POST request to general notes endpoint
          method: "POST", // Set HTTP method to create
          headers: { "Content-Type": "application/json" }, // Set content headers
          body: JSON.stringify({ // Send new note data
            title: newNote.title, // Title from state
            content: newNote.content, // Content from state
          }), // End body
        }); // End fetch

        if (!response.ok) { // Check for creation failure
          throw new Error("Failed to create note"); // Alert if failed
        } // End check

        const createdNote = await response.json(); // Get the new note object from server
        
        // Add the new note to the beginning of the list in local state
        setNotes([createdNote, ...notes]); // Spread existing notes after the new one
      } // End edit/create conditional
      
      // Reset form and close it
      setNewNote({ title: "", content: "" }); // Clear input values
      setShowNoteForm(false); // Close the input form UI
    } catch (err) { // Handle submission errors
      setError(err instanceof Error ? err.message : "An error occurred"); // Set error state
    } // End try-catch
  }; // End handleAddNote

  // Handle opening the form to edit an existing note
  const handleEditNote = (note: Note) => { // Triggered when edit button is clicked
    setNewNote({ title: note.title, content: note.content }); // Populate form with note data
    setEditingId(note.id); // Mark this note ID as the one being edited
    setShowNoteForm(true); // Open the form view
  }; // End handleEditNote

  // Handle deleting a note
  const handleDeleteNote = async (id: string) => { // Async function for removal
    try { // Start removal block
      setError(null); // Reset errors
      const response = await fetch(`/api/notes/${id}`, { // Send DELETE request to API
        method: "DELETE", // Use DELETE verb
      }); // End fetch

      if (!response.ok) { // Check if server deleted it
        throw new Error("Failed to delete note"); // Inform if failure
      } // End check

      // Remove the deleted note from the list in local state
      setNotes(notes.filter((note) => note.id !== id)); // Filter out the ID from current array
      setDeleteId(null); // Reset deletion state
    } catch (err) { // Catch removal errors
      setError(err instanceof Error ? err.message : "An error occurred"); // Show error
    } // End try-catch
  }; // End handleDeleteNote

  // Handle closing the form without saving
  const handleCloseForm = () => { // Cancel handler
    setShowNoteForm(false); // Hide the form UI
    setNewNote({ title: "", content: "" }); // Reset inputs
    setEditingId(null); // Clear editing ID
  }; // End handleCloseForm

  return ( // Component render output
    <main className="min-h-screen bg-background pt-20 pb-10"> {/* Main page wrapper with layout classes */}
      <div className="max-w-7xl mx-auto px-4"> {/* Responsive width container */}
        {/* Dashboard Header Section */}
        <div className="mb-12"> {/* Spacing margin */}
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back, Student! 👋</h1> {/* Main title */}
          <p className="text-gray-400">Manage your notes and stay updated with latest blog posts</p> {/* Description */}
        </div> {/* End header */}

        {/* Error notification banner - only shows if error state exists */}
        {error && ( // Conditional render for error messages
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400"> {/* Red error alert */}
            {error} {/* Display the error string */}
          </div> // End error div
        )} {/* End error check */}

        {/* Main Dashboard Layout Grid */}
        <div className="grid lg:grid-cols-3 gap-8"> {/* 3-column grid for large screens */}
          {/* Left Sidebar Section - Primary Navigation */}
          <div className="lg:col-span-1"> {/* Takes 1 column of the grid */}
            <div className="bg-secondary border border-primary/20 rounded-lg p-6 sticky top-20"> {/* Sidebar card */}
              <h3 className="text-lg font-bold text-foreground mb-6">Navigation</h3> {/* Nav title */}
              <nav className="space-y-3"> {/* Vertical stack of links */}
                <Link // Active dashboard link
                  href="/dashboard/student" // Target URL
                  className="flex items-center gap-3 px-4 py-2 bg-primary text-white rounded-lg transition" // Styling
                >
                  <span>📚</span> My Dashboard {/* Link label with emoji */}
                </Link>
                <Link // Link to courses
                  href="/courses" // Target URL
                  className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-secondary border border-primary/10 rounded-lg transition" // Styling
                >
                  <span>🎓</span> Browse Courses {/* Label */}
                </Link>
                <Link // Link to blog
                  href="/blog" // Target URL
                  className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-secondary border border-primary/10 rounded-lg transition" // Styling
                >
                  <span>📰</span> Read Blogs {/* Label */}
                </Link>
              </nav> {/* End navigation */}

              {/* Quick Summary Statistics */}
              <div className="mt-8 pt-6 border-t border-primary/10"> {/* Section wrapper with divider */}
                <h4 className="text-sm font-semibold text-gray-400 mb-4">Quick Stats</h4> {/* Stats title */}
                <div className="space-y-3"> {/* Stacked layout for stats */}
                  <div className="bg-primary/10 p-3 rounded-lg"> {/* Individual stat card */}
                    <p className="text-xs text-gray-400">Total Notes</p> {/* Stat label */}
                    <p className="text-2xl font-bold text-primary">{notes.length}</p> {/* Dynamic count */}
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg"> {/* Another stat card */}
                    <p className="text-xs text-gray-400">Blog Posts Read</p> {/* Label */}
                    <p className="text-2xl font-bold text-primary">5</p> {/* Static placeholder for demo */}
                  </div>
                </div> {/* End stats container */}
              </div> {/* End quick stats section */}
            </div> {/* End sidebar card */}
          </div> {/* End sidebar column */}

          {/* Right Main Content Area - Notes List and Management */}
          <div className="lg:col-span-2 space-y-8"> {/* Takes 2 columns of the grid */}
            {/* Notes Management Section */}
            <section> {/* Section for note actions and list */}
              <div className="flex items-center justify-between mb-6"> {/* Horizontal header layout */}
                <h2 className="text-2xl font-bold text-foreground">My Notes</h2> {/* Section title */}
                <button // Button to open the add note form
                  onClick={() => { // Click event
                    setShowNoteForm(!showNoteForm); // Toggle form state
                    if (showNoteForm) handleCloseForm(); // Close cleanly if already open
                  }} // End onClick
                  className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition" // Styles
                >
                  {showNoteForm ? "Cancel" : "+ Add Note"} {/* Dynamic button label */}
                </button>
              </div> {/* End notes header */}

              {/* Add/Edit Note Form UI - Conditionally Rendered */}
              {showNoteForm && ( // Check if form should be visible
                <form onSubmit={handleAddNote} className="mb-6 bg-secondary border border-primary/20 rounded-lg p-6 shadow-xl"> {/* Form container */}
                  <div className="mb-4"> {/* Title field wrapper */}
                    <label className="block text-sm font-semibold text-gray-300 mb-2"> {/* Label */}
                      Note Title
                    </label>
                    <input // Title input
                      type="text" // Input type
                      value={newNote.title} // Bind to state
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} // Update state
                      placeholder="Enter note title" // Placeholder
                      className="w-full px-4 py-2 bg-background border border-primary/20 rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:border-primary transition" // Styles
                    />
                  </div> {/* End title field */}
                  <div className="mb-4"> {/* Content field wrapper */}
                    <label className="block text-sm font-semibold text-gray-300 mb-2"> {/* Label */}
                      Note Content
                    </label>
                    <textarea // Content textarea
                      value={newNote.content} // Bind to state
                      onChange={(e) => setNewNote({ ...newNote, content: e.target.value })} // Update state
                      placeholder="Write your notes here..." // Hint
                      rows={4} // Default height
                      className="w-full px-4 py-2 bg-background border border-primary/20 rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:border-primary transition resize-none" // Styles
                    ></textarea>
                  </div> {/* End content field */}
                  <button // Save/Update submit button
                    type="submit" // Form submit type
                    className="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition" // Styles
                  >
                    {editingId ? "Update Note" : "Save Note"} {/* Dynamic button text */}
                  </button>
                </form> // End form
              )} {/* End form conditional */}

              {/* Notes List Rendering Section */}
              {loading ? ( // Check if data is still being loaded
                <div className="text-center py-12 bg-secondary border border-primary/10 rounded-lg"> {/* Loading UI */}
                  <p className="text-gray-400">Loading your notes...</p> {/* Status message */}
                </div> // End loading state
              ) : notes.length === 0 ? ( // Check if user has no notes
                <div className="text-center py-12 bg-secondary border border-primary/10 rounded-lg"> {/* Empty state UI */}
                  <p className="text-gray-400">No notes yet. Create your first note!</p> {/* Helpful hint */}
                </div> // End empty state
              ) : ( // Render the actual list of notes
                <div className="space-y-4"> {/* Container with vertical spacing */}
                  {notes.map((note) => ( // Iterate through notes array
                    <div // Individual note card
                      key={note.id} // React unique key requirement
                      className="bg-secondary border border-primary/20 rounded-lg p-6 hover:border-primary/50 transition group shadow-md" // Styling and hover effects
                    >
                      <div className="flex items-start justify-between mb-3"> {/* Header of the note card */}
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition"> {/* Note title */}
                          {note.title}
                        </h3>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition"> {/* Action buttons visible on hover */}
                          <button // Edit button icon
                            onClick={() => handleEditNote(note)} // Trigger edit
                            className="text-gray-500 hover:text-blue-400 transition" // Styles
                            title="Edit note" // Browser tooltip
                          >
                            ✎ {/* Edit emoji/icon */}
                          </button>
                          <button // Delete button icon
                            onClick={() => setDeleteId(note.id)} // Trigger delete confirm
                            className="text-gray-500 hover:text-red-400 transition" // Styles
                            title="Delete note" // Tooltip
                          >
                            ✕ {/* Close/Delete icon */}
                          </button>
                        </div> {/* End action buttons */}
                      </div> {/* End note card header */}

                      {/* Confirm Deletion Sub-menu - Only shows for the targeted note */}
                      {deleteId === note.id && ( // Check if this note is pending deletion
                        <div className="mb-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-2 animate-pulse"> {/* Warning UI */}
                          <button // The actual confirm delete button
                            onClick={() => handleDeleteNote(note.id)} // Perform delete
                            className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition" // Styles
                          >
                            Confirm Delete
                          </button>
                          <button // The cancel deletion button
                            onClick={() => setDeleteId(null)} // Close confirmation
                            className="text-xs bg-secondary border border-primary/20 text-gray-300 px-3 py-1 rounded hover:border-primary transition" // Styles
                          >
                            Cancel
                          </button>
                        </div> // End delete UI
                      )} {/* End delete check */}

                      <p className="text-gray-300 mb-3 leading-relaxed whitespace-pre-wrap">{note.content}</p> {/* Note content with formatting support */}
                      <p className="text-xs text-gray-500"> {/* Metadata timestamp */}
                        Created: {new Date(note.createdAt).toLocaleDateString("en-US", { // Format date nicely
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div> // End individual note card
                  ))} {/* End notes map */}
                </div> // End notes list container
              )} {/* End loading/empty/data conditional */}
            </section> {/* End notes section */}
          </div> {/* End content column */}
        </div> {/* End main grid */}
      </div> {/* End page wrapper */}
    </main> // End main element
  ); // End return statement
} // End StudentDashboard function
