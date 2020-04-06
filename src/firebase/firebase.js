import * as firebase from 'firebase';
import { firebaseConfig } from './config';

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, database, googleAuthProvider };
/*
See firebase docs
Example:

database.ref('expenses').on('child_remove', (snap) => {});
database.ref('expenses').on('child_changed', (snap) => {});
database.ref('expenses').on('child_added', (snap) => {});
database.ref().on('value', (snap) => {});

database.ref().set({
  expenses: null
});
database.ref('expenses').push({
  description: 'des1',
  note: '',
  amount: 456,
  createdAt: 789456
});
database.ref('expenses').push({
  description: 'des2',
  note: '',
  amount: 100,
  createdAt: 465123
});

database.ref().on('value',(snap)=>{
  var expenses = [];
  snap.forEach((childsnap) => {
    expenses.push({
      id:childsnap.key,
      ...childsnap.val()
    });
  });
  console.log('expenses :',expenses);
});
*/
