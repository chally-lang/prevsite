"use client"; // Marks this as a client-side component

import { useState, useEffect } from "react"; // Import React hooks for state and lifecycle
import { useParams, useRouter } from "next/navigation"; // Import Next.js navigation hooks
import Image from "next/image"; // Import Next.js Image component for optimized images

// ==========================================
// USER DETAIL PAGE COMPONENT
// ==========================================
export default function UserDetailPage() { // Main component function
  const { id } = useParams(); // Get the user ID from the URL parameters
  const router = useRouter(); // Initialize the router for navigation
  
  // State management for user data and UI status
  const [user, setUser] = useState<any>(null); // Store the fetched user object
  const [loading, setLoading] = useState(true); // Track loading state for initial fetch
  const [saving, setSaving] = useState(false); // Track saving state for updates
  const [role, setRole] = useState(""); // Track the selected role in the form
  const [status, setStatus] = useState(""); // Track the selected status in the form

  // Fetch user data from the API on component mount or when ID changes
  useEffect(() => { // Effect hook
    const fetchUser = async () => { // Async function to fetch data
      try { // Start of try block
        const res = await fetch(`/api/users/${id}`); // Call GET user API
        if (res.ok) { // Check if response is successful
          const data = await res.json(); // Parse JSON response
          setUser(data); // Update user state
          setRole(data.role); // Set initial role in form
          setStatus(data.status); // Set initial status in form
        } else { // Handle errors
          alert("User not found"); // Show alert
          router.push("/dashboard/admin"); // Redirect back to dashboard
        } // End of response check
      } catch (error) { // Catch execution errors
        console.error("Failed to fetch user:", error); // Log error
      } finally { // Finalize
        setLoading(false); // Reset loading state
      } // End of try-catch-finally
    }; // End of fetchUser function

    fetchUser(); // Invoke fetch
  }, [id, router]); // Dependencies for the effect

  // Handle the form submission to update user details
  const handleUpdate = async (e: React.FormEvent) => { // Update handler
    e.preventDefault(); // Prevent page reload
    setSaving(true); // Set saving state to true

    try { // Start of try block
      const res = await fetch(`/api/users/${id}`, { // Call PUT update API
        method: "PUT", // Set method to PUT
        headers: { "Content-Type": "application/json" }, // Set JSON headers
        body: JSON.stringify({ role, status }), // Send updated role and status
      });

      if (res.ok) { // Check if update was successful
        alert("User updated successfully"); // Show success message
        router.refresh(); // Refresh the page data
      } else { // Handle update failure
        alert("Failed to update user"); // Show error message
      } // End of response check
    } catch (error) { // Catch execution errors
      console.error("Error updating user:", error); // Log error
    } finally { // Finalize
      setSaving(false); // Reset saving state
    } // End of try-catch-finally
  }; // End of handleUpdate function

  if (loading) return <div className="min-h-screen pt-20 text-center text-foreground">Loading user info...</div>; // Show loading screen
  if (!user) return null; // Return null if user data is missing

  return ( // Render the UI
    <main className="min-h-screen bg-background pt-20 pb-10"> {/* Main container with background */}
      <div className="max-w-4xl mx-auto px-4"> {/* Centered content area */}
        {/* Navigation back to dashboard */}
        <button 
          onClick={() => router.back()} // Go back to previous page
          className="text-primary hover:text-blue-400 mb-8 flex items-center gap-2 font-semibold transition" // Styled back button
        >
          ← Back to Dashboard {/* Label */}
        </button> {/* End of back button */}

        {/* User Profile Header */}
        <div className="bg-secondary border border-primary/20 rounded-xl p-8 mb-8"> {/* Profile card container */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start"> {/* Responsive layout */}
            {/* User Passport/Photo */}
            <div className="w-48 h-48 relative rounded-lg overflow-hidden border-2 border-primary/30 bg-primary/10 flex items-center justify-center"> {/* Photo container */}
              {user.passport ? ( // Check if user has a passport photo URL
                <Image 
                  src={user.passport} // Image source
                  alt={user.name} // Alt text
                  fill // Fill container
                  className="object-cover" // Cover styling
                />
              ) : ( // Fallback if no photo exists
                <span className="text-4xl">👤</span> // Default icon
              )} {/* End of photo check */}
            </div> {/* End of photo container */}

            {/* User Basic Info */}
            <div className="flex-1 text-center md:text-left"> {/* Info container */}
              <h1 className="text-4xl font-bold text-foreground mb-2">{user.name}</h1> {/* Display name */}
              <p className="text-gray-400 text-lg mb-4">{user.email}</p> {/* Display email */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start"> {/* Badge container */}
                <span className="px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-bold uppercase tracking-wider"> {/* Role badge */}
                  {user.role} {/* Display role */}
                </span> {/* End of badge */}
                <span className={`px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${user.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}> {/* Status badge */}
                  {user.status} {/* Display status */}
                </span> {/* End of badge */}
              </div> {/* End of badges */}
            </div> {/* End of info container */}
          </div> {/* End of header layout */}
        </div> {/* End of profile header */}

        {/* Edit User Form */}
        <div className="bg-secondary border border-primary/20 rounded-xl p-8"> {/* Form container */}
          <h2 className="text-2xl font-bold text-foreground mb-6">Manage User Permissions</h2> {/* Section heading */}
          
          <form onSubmit={handleUpdate} className="space-y-6"> {/* Update form */}
            <div className="grid md:grid-cols-2 gap-6"> {/* Two column grid */}
              {/* Role Selection */}
              <div> {/* Role field container */}
                <label className="block text-sm font-bold text-gray-300 mb-3 uppercase">User Role</label> {/* Label */}
                <select 
                  value={role} // Bind to role state
                  onChange={(e) => setRole(e.target.value)} // Update state on change
                  className="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg text-foreground focus:outline-none focus:border-primary transition cursor-pointer font-semibold" // Styled select
                >
                  <option value="STUDENT">STUDENT</option> {/* Student option */}
                  <option value="STAFF">STAFF</option> {/* Staff option */}
                  <option value="ADMIN">ADMIN</option> {/* Admin option */}
                </select> {/* End of select */}
              </div> {/* End of role field */}

              {/* Status Selection */}
              <div> {/* Status field container */}
                <label className="block text-sm font-bold text-gray-300 mb-3 uppercase">Account Status</label> {/* Label */}
                <select 
                  value={status} // Bind to status state
                  onChange={(e) => setStatus(e.target.value)} // Update state on change
                  className="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg text-foreground focus:outline-none focus:border-primary transition cursor-pointer font-semibold" // Styled select
                >
                  <option value="ACTIVE">ACTIVE</option> {/* Active option */}
                  <option value="INACTIVE">INACTIVE</option> {/* Inactive option */}
                  <option value="SUSPENDED">SUSPENDED</option> {/* Suspended option */}
                </select> {/* End of select */}
              </div> {/* End of status field */}
            </div> {/* End of grid */}

            {/* Save Button */}
            <div className="pt-4"> {/* Button container */}
              <button 
                type="submit" // Form submit type
                disabled={saving} // Disable while saving
                className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-blue-700 text-white rounded-lg font-bold transition disabled:opacity-50 uppercase tracking-widest" // Styled submit button
              >
                {saving ? "Saving Changes..." : "Update User Profile"} {/* Conditional label */}
              </button> {/* End of button */}
            </div> {/* End of button container */}
          </form> {/* End of form */}
        </div> {/* End of form container */}
      </div> {/* End of centered content */}
    </main> // End of main page container
  ); // End of return
} // End of component function
