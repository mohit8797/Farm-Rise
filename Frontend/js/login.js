// // Initialize Lucide icons
// lucide.createIcons();

// // DOM Elements
// const authForm = document.getElementById('authForm');
// const authTitle = document.getElementById('authTitle');
// const authSubtitle = document.getElementById('authSubtitle');
// const emailInput = document.getElementById('email');
// const passwordInput = document.getElementById('password');
// const togglePasswordBtn = document.getElementById('togglePassword');
// const emailError = document.getElementById('emailError');
// const passwordError = document.getElementById('passwordError');
// const submitBtn = document.getElementById('submitBtn');
// const toggleModeBtn = document.getElementById('toggleMode');
// const toggleText = document.getElementById('toggleText');
// const loginOptions = document.getElementById('loginOptions');
// const farmerBtn = document.getElementById('farmerBtn');
// const buyerBtn = document.getElementById('buyerBtn');

// // State
// let isLogin = true;
// let showPassword = false;
// let selectedRole = 'buyer';

// // Validation Functions
// const isValidEmail = (email) => {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// };

// const isValidPassword = (password) => {
//   const minLength = 8;
//   const hasUpperCase = /[A-Z]/.test(password);
//   const hasLowerCase = /[a-z]/.test(password);
//   const hasNumbers = /\d/.test(password);
//   const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

//   return (
//     password.length >= minLength &&
//     hasUpperCase &&
//     hasLowerCase &&
//     hasNumbers &&
//     hasSpecialChar
//   );
// };

// // Event Handlers
// const toggleAuthMode = () => {
//   isLogin = !isLogin;
//   authTitle.textContent = isLogin ? 'Welcome Back' : 'Join FarmRise';
//   authSubtitle.textContent = isLogin
//     ? 'Sign in to your account'
//     : 'Create your account';
//   submitBtn.textContent = isLogin ? 'Sign In' : 'Create Account';
//   toggleText.textContent = isLogin
//     ? "Don't have an account?"
//     : 'Already have an account?';
//   toggleModeBtn.textContent = isLogin ? 'Sign Up' : 'Sign In';
//   loginOptions.style.display = isLogin ? 'flex' : 'none';
  
//   // Clear form and errors
//   authForm.reset();
//   emailError.textContent = '';
//   passwordError.textContent = '';
// };

// const togglePasswordVisibility = () => {
//   showPassword = !showPassword;
//   passwordInput.type = showPassword ? 'text' : 'password';
//   const icon = togglePasswordBtn.querySelector('i');
//   icon.setAttribute('data-lucide', showPassword ? 'eye-off' : 'eye');
//   lucide.createIcons();
// };

// const handleRoleSelection = (role) => {
//   selectedRole = role;
//   farmerBtn.classList.toggle('active', role === 'farmer');
//   buyerBtn.classList.toggle('active', role === 'buyer');
// };

// const validateForm = () => {
//   let isValid = true;
  
//   // Email validation
//   if (!isValidEmail(emailInput.value)) {
//     emailError.textContent = 'Please enter a valid email address';
//     isValid = false;
//   } else {
//     emailError.textContent = '';
//   }

//   // Password validation (only check strength for signup)
//   if (!isLogin && !isValidPassword(passwordInput.value)) {
//     passwordError.textContent =
//       'Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters';
//     isValid = false;
//   } else {
//     passwordError.textContent = '';
//   }

//   return isValid;
// };

// // Event Listeners
// toggleModeBtn.addEventListener('click', toggleAuthMode);
// togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
// farmerBtn.addEventListener('click', () => handleRoleSelection('farmer'));
// buyerBtn.addEventListener('click', () => handleRoleSelection('buyer'));

// authForm.addEventListener('submit', (e) => {
//   e.preventDefault();
  
//   if (validateForm()) {
//     // Form data for submission
//     const formData = {
//       email: emailInput.value,
//       password: passwordInput.value,
//       role: selectedRole,
//       mode: isLogin ? 'login' : 'signup',
//       rememberMe: document.getElementById('rememberMe')?.checked || false
//     };
    
//     // Log form data (replace with your authentication logic)
//     console.log('Form submitted:', formData);
//   }
// });
// Initialize Lucide icons
lucide.createIcons();

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCyPrddrhiTH81tA4pugP9j_oWHoEjt0Xo",
  authDomain: "farmrise-86e54.firebaseapp.com",
  projectId: "farmrise-86e54",
  storageBucket: "farmrise-86e54.firebasestorage.app",
  messagingSenderId: "470415929415",
  appId: "1:470415929415:web:c01c8a423fce6a63348162",
  measurementId: "G-QF7253N0PQ"
};

// Initialize Firebase with compat version
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const analytics = firebase.analytics();

// DOM Elements
const authForm = document.getElementById('authForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const submitBtn = document.getElementById('submitBtn');
const roleButtons = document.querySelectorAll('.role-btn');
let selectedRole = 'buyer'; // Default role

// Role selection
roleButtons.forEach(button => {
  button.addEventListener('click', () => {
    roleButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    selectedRole = button.getAttribute('data-role');
  });
});

// Show/hide password toggle
togglePasswordBtn.addEventListener('click', () => {
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  togglePasswordBtn.querySelector('i').setAttribute(
    'data-lucide',
    passwordInput.type === 'password' ? 'eye' : 'eye-off'
  );
  lucide.createIcons();
});

// Validate email format
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Login form submit event
authForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Clear previous errors
  emailError.textContent = '';
  passwordError.textContent = '';

  // Validate email
  if (!isValidEmail(emailInput.value)) {
    emailError.textContent = 'Invalid email format';
    return;
  }

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    // First, authenticate with Firebase
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Store user info in localStorage
    localStorage.setItem('user', JSON.stringify({
      uid: user.uid,
      email: user.email,
      role: selectedRole
    }));

    // Then, also authenticate with your backend for additional user data
    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password,
          firebaseUid: user.uid
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store JWT token from your backend
        localStorage.setItem('token', data.token);
      }
    } catch (backendError) {
      console.log('Backend login not available, continuing with Firebase auth only');
    }

    // Redirect to dashboard
    window.location.href = '/Frontend/dashboard.html';

  } catch (error) {
    console.error('Login error:', error);

    // Handle Firebase auth errors
    switch(error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        passwordError.textContent = 'Invalid email or password';
        break;
      case 'auth/too-many-requests':
        passwordError.textContent = 'Too many failed login attempts. Please try again later';
        break;
      case 'auth/user-disabled':
        passwordError.textContent = 'This account has been disabled';
        break;
      default:
        passwordError.textContent = 'Login failed. Please try again';
    }
  }
});

// Check if user is already logged in
auth.onAuthStateChanged(user => {
  if (user) {
    // User is already signed in, redirect to dashboard
    console.log('User already logged in:', user.email);
  }
});