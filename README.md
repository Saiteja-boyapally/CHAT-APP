Sigma Chat 💬
A real-time chat application built with React.js and Firebase that supports Google authentication and real-time messaging.

Tech Stack
Frontend:
🖥️ React.js – UI framework for building the chat app.

🎨 CSS – Custom styles for chat interface.

⏳ Date-fns – Formatting timestamps in messages.

Backend (Serverless with Firebase):
1. Firebase Authentication 🔐
Google Sign-In using signInWithPopup and GoogleAuthProvider.

Auth state management using useAuthState(auth).

signOut(auth) function for logging out.

2. Firebase Firestore (Database) 📄
Messages are stored in Cloud Firestore.

Uses collection(), query(), and orderBy() for real-time updates.

Messages are added using addDoc() and serverTimestamp().

Real-time syncing using useCollectionData().

3. Firebase Hosting 🚀
Hosted on Firebase Hosting with GitHub Actions for automatic deployments.


Features
✅ Google Sign-In Authentication
✅ Real-time Chat with Firestore
✅ Automatic Scroll to Latest Message
✅ Mobile-Responsive UI

Contributors
👤 BOYAPALLY SAI TEJA
