<template>
  <div class="hello">
    <img src="~assets/ashtag-logo-full.svg" alt="Ashtag" style="padding:20px;width:150px">
    <h5>Ash trees are in danger!</h5>
    <p>Can you help us find them all so we can stop the spread of a
      deadly beetle infestation?</p>
    <p>Please login using one of your existing online identities to get started:</p>
    <div id="firebaseui-auth-container"></div>
  </div>

</template>

<script>
  //import { fireb, auth, fireui } from '../plugins/firebase'
  //import firebase from 'firebase'
  import firebaseui from 'firebaseui'
  export default {
      name: "login",
      mounted () {
        var uiConfig = {
          callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
              var user = authResult.user;
              var credential = authResult.credential;
              console.log("user: " + user);
              this.sendToStore(user);
              alert("Login successful");
              return true;
            }.bind(this)
           // uiShown: function() {
           //   //alert("Trying sign in");
           // }
          },
          signInSuccessUrl: 'http://localhost:8080/hello',
          signInOptions: [
            this.$firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            this.$firebase.auth.EmailAuthProvider.PROVIDER_ID
          ]
        }
        var ui = new firebaseui.auth.AuthUI(this.$auth)
        ui.start('#firebaseui-auth-container', uiConfig)
      },
      methods : {
          sendToStore(user)  {
            this.$store.commit('setUser', user);
          }
      }
  }
</script>

<style scoped>
  .firebaseui-idp-list {
    text-align: center;
  }
  #firebaseui-auth-container {
    alignment: center;
  }
</style>
