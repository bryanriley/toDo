$(document).ready(function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      window.location = '/todo.html';
      console.log(user.email + ' is signed in and ID is ' + user.uid);
    } else {
      alert('not signed in');
      $('#loginDetails').fadeOut();
      $('#signout').fadeOut();
      // No user is signed in.
    }
  });
})
