// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('signupForm');
//     const errorElements = {
//       fullName: document.getElementById('fullNameError'),
//       email: document.getElementById('emailError'),
//       password: document.getElementById('passwordError'),
//       confirmPassword: document.getElementById('confirmPasswordError'),
//       phoneNumber: document.getElementById('phoneNumberError')
//     };
  
//     const validateForm = (formData) => {
//       const errors = {};
      
//       // Full Name validation
//       if (!formData.get('fullName').trim()) {
//         errors.fullName = 'Full name is required';
//       }
  
//       // Email validation
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(formData.get('email'))) {
//         errors.email = 'Please enter a valid email address';
//       }
  
//       // Password validation
//       const password = formData.get('password');
//       if (password.length < 8) {
//         errors.password = 'Password must be at least 8 characters long';
//       }
  
//       // Confirm password validation
//       if (password !== formData.get('confirmPassword')) {
//         errors.confirmPassword = 'Passwords do not match';
//       }
  
//       // Phone number validation
//       const phoneRegex = /^\+?[\d\s-()]+$/;
//       if (!phoneRegex.test(formData.get('phoneNumber'))) {
//         errors.phoneNumber = 'Please enter a valid phone number';
//       }
  
//       return errors;
//     };
  
//     const displayErrors = (errors) => {
//       // Clear all previous errors
//       Object.values(errorElements).forEach(element => {
//         if (element) element.textContent = '';
//       });
  
//       // Display new errors
//       Object.entries(errors).forEach(([field, message]) => {
//         const element = errorElements[field];
//         if (element) {
//           element.textContent = message;
//           element.parentElement.classList.add('error-shake');
//           setTimeout(() => {
//             element.parentElement.classList.remove('error-shake');
//           }, 500);
//         }
//       });
//     };
  
//     form.addEventListener('submit', async (e) => {
//       e.preventDefault();
      
//       const formData = new FormData(form);
//       const errors = validateForm(formData);
  
//       if (Object.keys(errors).length === 0) {
//         try {
//           const response = await fetch('/api/signup', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(Object.fromEntries(formData)),
//           });
  
//           const data = await response.json();
  
//           if (response.ok) {
//             // Successful signup
//             window.location.href = '/login';
//           } else {
//             // Server returned an error
//             displayErrors({
//               [data.field]: data.message
//             });
//           }
//         } catch (error) {
//           console.error('Signup error:', error);
//           alert('An error occurred during signup. Please try again.');
//         }
//       } else {
//         displayErrors(errors);
//       }
//     });
  
//     // Clear error message when user starts typing
//     form.querySelectorAll('input').forEach(input => {
//       input.addEventListener('input', () => {
//         const errorElement = errorElements[input.name];
//         if (errorElement) {
//           errorElement.textContent = '';
//         }
//       });
//     });
//   });

document.addEventListener('DOMContentLoaded', () => {
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

  const form = document.getElementById('signupForm');
  const errorElements = {
    fullName: document.getElementById('fullNameError'),
    email: document.getElementById('emailError'),
    password: document.getElementById('passwordError'),
    confirmPassword: document.getElementById('confirmPasswordError'),
    phoneNumber: document.getElementById('phoneNumberError'),
  };

  // Validation functions
  const validateForm = (formData) => {
    const errors = {};

    // Full Name validation
    if (!formData.get('fullName').trim()) errors.fullName = 'Full name is required';

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.get('email'))) {
      errors.email = 'Please enter a valid email';
    }

    // Password validation
    const password = formData.get('password');
    if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    // Confirm password validation
    if (password !== formData.get('confirmPassword')) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Phone number validation
    if (!/^\+?[\d\s-()]+$/.test(formData.get('phoneNumber'))) {
      errors.phoneNumber = 'Invalid phone number';
    }

    return errors;
  };

  // Display validation errors
  const displayErrors = (errors) => {
    Object.values(errorElements).forEach((el) => (el.textContent = ''));
    Object.entries(errors).forEach(([field, message]) => {
      errorElements[field].textContent = message;
    });
  };

  // Submit form data
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0) {
      const email = formData.get('email');
      const password = formData.get('password');
      const fullName = formData.get('fullName');
      const role = formData.get('role');
      const phoneNumber = formData.get('phoneNumber');

      try {
        // First create user in Firebase
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Update user profile with full name
        await user.updateProfile({
          displayName: fullName
        });

        // Store additional user data in your backend
        try {
          const response = await fetch('http://127.0.0.1:5000/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fullName: fullName,
              email: email,
              password: password, // Note: Your backend should hash this
              role: role,
              phoneNumber: phoneNumber,
              firebaseUid: user.uid
            }),
          });

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Backend registration failed');
          }
        } catch (backendError) {
          console.log('Backend registration not available, continuing with Firebase auth only:', backendError);
        }

        // Show success message and redirect to login
        alert('Signup successful! Please log in.');
        window.location.href = './login.html';

      } catch (error) {
        console.error('Signup error:', error);

        // Handle Firebase auth errors
        switch(error.code) {
          case 'auth/email-already-in-use':
            displayErrors({ email: 'Email is already in use' });
            break;
          case 'auth/invalid-email':
            displayErrors({ email: 'Invalid email format' });
            break;
          case 'auth/weak-password':
            displayErrors({ password: 'Password is too weak' });
            break;
          default:
            alert('Signup failed: ' + error.message);
        }
      }
    } else {
      displayErrors(errors);
    }
  });

  // Clear error messages on input
  form.querySelectorAll('input').forEach((input) =>
    input.addEventListener('input', () => {
      if (errorElements[input.name]) errorElements[input.name].textContent = '';
    })
  );

  // Check if user is already logged in
  auth.onAuthStateChanged(user => {
    if (user) {
      // User is already signed in, redirect to dashboard
      console.log('User already logged in:', user.email);
    }
  });
});