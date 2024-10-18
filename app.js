// Initialize Appwrite Client


const client = new Appwrite.Client();
client
  .setEndpoint('http://localhost:8080/v1') // Replace with your Appwrite endpoint
  .setProject('670ff1870003895776ce'); // Replace with your Project ID

const account = new Appwrite.Account(client);

// Form submission event
document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Appwrite login function
  account
    .createEmailPasswordSession(email, password)
    .then(function(response) {
      console.log('Login Successful:', response);
      // Redirect to another page on successful login (e.g., dashboard)
      window.location.href = 'dashboard.html'; // Replace with the page you want to redirect to
    })
    .catch(function(error) {
      console.error('Login Failed:', error);
      alert('Login failed. Please check your credentials and try again.');
    });
});
