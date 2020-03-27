import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCNefMvi4wCLbjkMZpoOY1Xu3Vo2d2fnUQ",
    authDomain: "react-learning-app-8e117.firebaseapp.com",
    databaseURL: "https://react-learning-app-8e117.firebaseio.com",
    projectId: "react-learning-app-8e117",
    storageBucket: "react-learning-app-8e117.appspot.com",
    messagingSenderId: "280575938676",
    appId: "1:280575938676:web:5dea92049cd876d78bc121",
    measurementId: "G-PTE1MSCG5N"
};

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();

export { firebase, database };
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
