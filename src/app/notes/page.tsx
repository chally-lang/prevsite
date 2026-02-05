"use client"; // Enable client-side rendering for this component

import { useState, useEffect } from "react"; // Import React hooks for state and side effects
import { useSession } from "next-auth/react"; // Import useSession for user authentication details
import { useRouter } from "next/navigation"; // Import useRouter for client-side navigation

interface DBNote { // Define interface for note data from database
  id: string; // Unique identifier for the note
  title: string; // Title of the note
  content: string; // Main content text of the note
  userId: string; // ID of the user who owns this note
  createdAt: string; // Timestamp of when the note was created
  updatedAt: string; // Timestamp of the last update to the note
} // End of DBNote interface

export default function NotesPage() { // Main component for the notes page
  const { data: session } = useSession(); // Destructure session data from next-auth
  const router = useRouter(); // Initialize the router for navigation

  // State for managing the list of notes
  const [notes, setNotes] = useState<DBNote[]>([]); // Array to store fetched notes
  const [loadingNotes, setLoadingNotes] = useState(true); // Loading state for note fetching
  const [showNoteForm, setShowNoteForm] = useState(false); // Toggle for showing/hiding create form
  const [editingNote, setEditingNote] = useState<DBNote | null>(null); // Track note being edited
  const [noteFormData, setNoteFormData] = useState({ // State for the form inputs
    title: "", // Title input value
    content: "", // Content input value
  }); // End of noteFormData state
  
  // State for search functionality and sorting options
  const [searchTerm, setSearchTerm] = useState(""); // Current search query string
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "alphabetical">("newest"); // Current sort preference

  // Function to fetch notes from the API
  const fetchNotes = async () => { // Async function to handle data fetching
    try { // Start error handling block
      setLoadingNotes(true); // Set loading state to true before fetching
      const res = await fetch("/api/notes", { cache: 'no-store' }); // Make API request to get notes
      if (res.ok) { // Check if response is successful
        const data = await res.json(); // Parse response body as JSON
        setNotes(data); // Update notes state with fetched data
      } // End if res.ok
    } catch (error) { // Catch any network or parsing errors
      console.error("Failed to fetch notes:", error); // Log error to console
    } finally { // Finalize the process
      setLoadingNotes(false); // Set loading state to false
    } // End try-catch-finally
  }; // End fetchNotes function

  // Effect hook to load notes and check authentication on mount
  useEffect(() => { // Run side effect when component mounts or session changes
    if (!session) { // If user is not logged in
      router.push("/auth/login"); // Redirect to login page
      return; // Exit early
    } // End if !session
    fetchNotes(); // Fetch user notes if authenticated
  }, [session, router]); // Dependencies: session and router

  // Function to handle note creation or updates
  const handleNoteSubmit = async (e: React.FormEvent) => { // Handle form submission
    e.preventDefault(); // Prevent default browser form submission
    if (!noteFormData.title || !noteFormData.content) return; // Basic validation for required fields

    const url = editingNote ? `/api/notes/${editingNote.id}` : "/api/notes"; // Determine API endpoint
    const method = editingNote ? "PUT" : "POST"; // Determine HTTP method (update or create)

    try { // Start try-catch
      const res = await fetch(url, { // Send request to API
        method, // Set HTTP method
        headers: { "Content-Type": "application/json" }, // Set content type header
        body: JSON.stringify(noteFormData), // Send form data as JSON string
      }); // End fetch

      if (res.ok) { // If request was successful
        fetchNotes(); // Refresh the notes list
        setShowNoteForm(false); // Hide the form
        setEditingNote(null); // Clear editing state
        setNoteFormData({ title: "", content: "" }); // Reset form inputs
        alert(editingNote ? "Note updated successfully!" : "Note created successfully!"); // Show success message
      } else { // If request failed
        const error = await res.json(); // Get error message from response
        alert(error.error || "Something went wrong"); // Show error message to user
      } // End if res.ok
    } catch (error) { // Catch unexpected errors
      console.error("Error saving note:", error); // Log error for debugging
      alert("Failed to save note"); // Show generic error alert
    } // End try-catch
  }; // End handleNoteSubmit

  // Function to handle note deletion
  const handleDeleteNote = async (id: string) => { // Async function to delete a note
    if (!confirm("Are you sure you want to delete this note?")) return; // Ask for user confirmation

    try { // Start try-catch
      const res = await fetch(`/api/notes/${id}`, { method: "DELETE" }); // Send delete request to API
      if (res.ok) { // If deletion succeeded
        fetchNotes(); // Refresh notes list
        alert("Note deleted successfully!"); // Show success message
      } // End if res.ok
    } catch (error) { // Catch errors
      console.error("Error deleting note:", error); // Log error
    } // End try-catch
  }; // End handleDeleteNote

  // Function to populate form for editing an existing note
  const startEditNote = (note: DBNote) => { // Prepare UI for editing
    setEditingNote(note); // Set the note as currently being edited
    setNoteFormData({ // Fill form with existing note data
      title: note.title, // Existing title
      content: note.content, // Existing content
    }); // End setNoteFormData
    setShowNoteForm(true); // Display the form
  }; // End startEditNote

  // Filter and sort the notes list based on user preferences
  const filteredNotes = notes // Take the original notes array
    .filter((note) => // Filter based on search term
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) || // Match title
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) // Match content
    ) // End filter
    .sort((a, b) => { // Sort the filtered results
      if (sortBy === "newest") { // Sort by creation date descending
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Newest first
      } else if (sortBy === "oldest") { // Sort by creation date ascending
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(); // Oldest first
      } else { // Sort alphabetically by title
        return a.title.localeCompare(b.title); // A-Z sorting
      } // End sortBy checks
    }); // End sort

  return ( // Render the UI
    <main className="min-h-screen bg-background pt-20 pb-10"> {/* Main container with padding */}
      <div className="max-w-6xl mx-auto px-4"> {/* Max width wrapper */}
        {/* Header Section */}
        <div className="mb-12"> {/* Bottom margin */}
          <h1 className="text-4xl font-bold text-foreground mb-2">📋 My Notes</h1> {/* Page heading */}
          <p className="text-gray-400">Create, manage, and organize your personal notes</p> {/* Subtitle */}
        </div> {/* End header */}

        {/* Action Controls */}
        <div className="mb-8 flex gap-4"> {/* Container for main actions */}
          <button // Toggle button for note creation
            onClick={() => { // Click handler
              setEditingNote(null); // Ensure we're not in edit mode
              setNoteFormData({ title: "", content: "" }); // Clear form
              setShowNoteForm(!showNoteForm); // Toggle visibility
            }} // End onClick
            className="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition" // Styling
          >
            {showNoteForm ? "Cancel" : "+ Create New Note"} {/* Dynamic text label */}
          </button> {/* End button */}
        </div> {/* End actions wrapper */}

        {/* Dynamic Note Form */}
        {showNoteForm && ( // Only show if toggle state is true
          <form onSubmit={handleNoteSubmit} className="mb-8 bg-secondary border border-primary/20 rounded-lg p-8"> {/* Note input form */}
            <div className="mb-6"> {/* Input group */}
              <label className="block text-sm font-semibold text-gray-300 mb-2"> {/* Field label */}
                Note Title
              </label>
              <input // Title input field
                type="text" // Text input type
                value={noteFormData.title} // Bind value to state
                onChange={(e) => setNoteFormData({ ...noteFormData, title: e.target.value })} // Update state on change
                placeholder="Enter note title..." // Placeholder text
                className="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:border-primary transition text-lg" // CSS classes
                required // HTML5 validation
              />
            </div> {/* End title group */}
            <div className="mb-6"> {/* Textarea group */}
              <label className="block text-sm font-semibold text-gray-300 mb-2"> {/* Field label */}
                Note Content
              </label>
              <textarea // Content textarea
                value={noteFormData.content} // Bind value to state
                onChange={(e) => setNoteFormData({ ...noteFormData, content: e.target.value })} // Update state
                placeholder="Write your note content here..." // Hint text
                rows={12} // Height control
                className="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:border-primary transition resize-none" // Styling
                required // Validation
              />
            </div> {/* End content group */}
            <div className="flex gap-3"> {/* Form button container */}
              <button // Submit button
                type="submit" // Triggers form submission
                className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition" // Styling
              >
                {editingNote ? "Update Note" : "Save Note"} {/* Dynamic label */}
              </button>
              <button // Cancel action
                type="button" // Doesn't submit form
                onClick={() => { // Click handler
                  setShowNoteForm(false); // Hide form
                  setEditingNote(null); // Clear edit state
                  setNoteFormData({ title: "", content: "" }); // Reset data
                }} // End onClick
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition" // Styling
              >
                Cancel
              </button>
            </div> {/* End button container */}
          </form> // End form
        )} {/* End form conditional */}

        {/* Search and Sorting UI */}
        <div className="mb-8 bg-secondary border border-primary/20 rounded-lg p-6"> {/* Search box wrapper */}
          <div className="grid md:grid-cols-2 gap-4"> {/* Responsive grid layout */}
            <div> {/* Search input column */}
              <label className="block text-sm font-semibold text-gray-300 mb-2"> {/* Label */}
                Search Notes
              </label>
              <input // Search query input
                type="text" // Input type
                value={searchTerm} // Controlled value
                onChange={(e) => setSearchTerm(e.target.value)} // Update search query
                placeholder="Search by title or content..." // Hint text
                className="w-full px-4 py-2 bg-background border border-primary/20 rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:border-primary transition" // Styles
              />
            </div> {/* End search column */}
            <div> {/* Sort select column */}
              <label className="block text-sm font-semibold text-gray-300 mb-2"> {/* Label */}
                Sort By
              </label>
              <select // Sort order selector
                value={sortBy} // Selected value
                onChange={(e) => setSortBy(e.target.value as "newest" | "oldest" | "alphabetical")} // Update sorting preference
                className="w-full px-4 py-2 bg-background border border-primary/20 rounded-lg text-foreground focus:outline-none focus:border-primary transition cursor-pointer" // Styles
              >
                <option value="newest">Newest First</option> {/* Descending date option */}
                <option value="oldest">Oldest First</option> {/* Ascending date option */}
                <option value="alphabetical">Alphabetical</option> {/* A-Z option */}
              </select>
            </div> {/* End sort column */}
          </div> {/* End search grid */}
          <div className="mt-4 text-sm text-gray-400"> {/* Info text showing count */}
            Showing {filteredNotes.length} of {notes.length} notes
          </div>
        </div> {/* End filter section */}

        {/* Notes Grid Display */}
        <div className="grid md:grid-cols-2 gap-6"> {/* Responsive grid for note cards */}
          {loadingNotes ? ( // Check if still loading data
            <div className="col-span-2 text-center py-20 text-gray-400 bg-secondary rounded-lg border border-primary/20"> {/* Loading placeholder */}
              <div className="animate-spin inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div> {/* Spinner */}
              <p>Loading your notes...</p>
            </div> // End loading state
          ) : notes.length === 0 ? ( // Check if notes array is empty
            <div className="col-span-2 text-center py-20 text-gray-400 bg-secondary rounded-lg border border-primary/20"> {/* Empty state UI */}
              <p className="text-lg mb-4">No notes yet!</p>
              <p className="text-sm">Create your first note by clicking the button above</p>
            </div> // End empty state
          ) : filteredNotes.length === 0 ? ( // Check if filtered results are empty
            <div className="col-span-2 text-center py-20 text-gray-400 bg-secondary rounded-lg border border-primary/20"> {/* No results UI */}
              <p className="text-lg mb-4">No matching notes found</p>
              <p className="text-sm">Try adjusting your search terms</p>
            </div> // End no search results
          ) : ( // Render the list of notes
            filteredNotes.map((note) => ( // Iterate through the filtered notes
              <div key={note.id} className="bg-secondary border border-primary/20 rounded-lg p-6 hover:border-primary/50 transition flex flex-col shadow-lg hover:shadow-xl"> {/* Note card */}
                <div className="flex-grow"> {/* Content wrapper */}
                  <h3 className="text-xl font-bold text-foreground mb-3">{note.title}</h3> {/* Note title */}
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed whitespace-pre-wrap line-clamp-6">{note.content}</p> {/* Note excerpt */}
                </div>
                <div className="flex flex-col gap-4"> {/* Card footer action container */}
                  <div className="pt-4 border-t border-primary/10"> {/* Metadata section */}
                    <p className="text-xs text-gray-500"> {/* Timestamp label */}
                      Created: {new Date(note.createdAt).toLocaleDateString('en-US', { // Format creation date
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    {note.updatedAt !== note.createdAt && ( // Show updated date only if modified
                      <p className="text-xs text-gray-500 mt-1">
                        Updated: {new Date(note.updatedAt).toLocaleDateString('en-US', { // Format update date
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    )}
                  </div> {/* End metadata */}
                  <div className="flex gap-2 pt-2"> {/* Action buttons for each card */}
                    <button // Edit button
                      onClick={() => startEditNote(note)} // Trigger edit mode
                      className="flex-1 px-3 py-2 bg-primary/10 text-primary rounded hover:bg-primary/20 transition font-semibold text-sm" // Styles
                    >
                      ✏️ Edit
                    </button>
                    <button // Delete action
                      onClick={() => handleDeleteNote(note.id)} // Trigger deletion
                      className="flex-1 px-3 py-2 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition font-semibold text-sm" // Styles
                    >
                      🗑️ Delete
                    </button>
                  </div> {/* End action buttons */}
                </div> {/* End card footer */}
              </div> // End note card
            )) // End map
          )} {/* End conditional rendering */}
        </div> {/* End notes grid */}
      </div> {/* End max-width wrapper */}
    </main> // End main page content
  ); // End return
} // End component function
