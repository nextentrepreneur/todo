import firebase from 'firebase';
export const DB_CONFIG = {
    apiKey: "AIzaSyCWSjcV0OBjJKRQU5BWTJ-ARvyCh4Sj6e8",
    authDomain: "electron-todo-b9d67.firebaseapp.com",
    databaseURL: "https://electron-todo-b9d67.firebaseio.com",
    projectId: "electron-todo-b9d67",
    storageBucket: "electron-todo-b9d67.appspot.com",
    messagingSenderId: "648932146774"
};

firebase.initializeApp(DB_CONFIG);
const db = firebase.database().ref().child('lists');

export default db;

export const addListToFirebase = (list) => {
    db.push().set({ listContent: list });
}

export const removeListFromFirebase = (id) => {
    db.child(id).remove();
}
