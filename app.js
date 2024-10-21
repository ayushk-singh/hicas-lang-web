// Initialize Appwrite Client
const client = new Appwrite.Client();
client
  .setEndpoint('http://localhost:8080/v1') // Replace with your Appwrite endpoint
  .setProject('670ff1870003895776ce'); // Replace with your Project ID

const account = new Appwrite.Account(client);

// Handle Login
document.getElementById('login-form')?.addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Appwrite login function
  account
    .createEmailPasswordSession(email, password)
    .then(function(response) {
      console.log('Login Successful:', response);
      // Redirect to the dashboard page after successful login
      window.location.href = 'dashboard.html';
    })
    .catch(function(error) {
      console.error('Login Failed:', error);
      alert('Login failed. Please check your credentials and try again.');
    });
});

// Handle Logout
function logout(event) {
  if (event) {
    event.preventDefault(); // Prevent the default form submission behavior
  }

  account
    .deleteSession('current')  // 'current' refers to the current session
    .then(function(response) {
      console.log('Logged out successfully:', response);
      // Redirect to the login page after successful logout
      window.location.href = 'index.html';  
    })
    .catch(function(error) {
      console.error('Error logging out:', error);
      alert('Logout failed. Please try again.');
    });
}

// Add event listener for the logout button
document.getElementById('logout-button')?.addEventListener('click', logout);

// Check if the user is logged in and show/hide logout button accordingly
window.onload = function() {
  account.get()
    .then(function(response) {
      console.log('User is logged in:', response);
      // Display logout button if the user is logged in
      document.getElementById('logout-button').style.display = 'block'; 
    })
    .catch(function(error) {
      console.log('User not authenticated:', error);
      // Hide logout button if the user is not logged in
      document.getElementById('logout-button').style.display = 'none'; 
      // Redirect to login if not logged in
      if (window.location.pathname !== '/index.html') {
        window.location.href = 'index.html';
      }
    });
};
