import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://your-project.supabase.co";
const supabaseAnonKey = "your-anon-key";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Store the Turnstile token when the CAPTCHA is solved
window.turnstileToken = null;
window.turnstileCallback = (token) => {
  window.turnstileToken = token;
  console.log("Turnstile validated successfully");
};

// Handle form submission
document.getElementById("auth-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Check if Turnstile has been completed
  if (!window.turnstileToken) {
    alert("Please complete the CAPTCHA verification");
    return;
  }

  try {
    // Step 1: Validate the Turnstile token
    const validation = await fetch("/api/validate-turnstile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: window.turnstileToken }),
    });

    const { success, error } = await validation.json();

    if (!success) {
      alert(`CAPTCHA validation failed: ${error || "Unknown error"}`);
      return;
    }

    // Step 2: Proceed with Supabase authentication
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // Handle successful sign-up
    console.log("Signed up successfully:", data);
    alert("Signup successful! Please check your email for verification.");
  } catch (error) {
    console.error("Error:", error);
    alert(`Error: ${error.message}`);
  }
});
