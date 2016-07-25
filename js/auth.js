$(document).ready(function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      window.location = 'todo.html';
      console.log(user.email + ' is signed in and ID is ' + user.uid);
    } else {
      $('#loginDetails').fadeOut();
      $('#signout').fadeOut();
    }
  });
})
