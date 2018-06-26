<template>
  <q-page padding>
      <div class="hello">
        <img src="~assets/ashtag-logo-full.svg" alt="Ashtag" style="padding:20px;width:150px">
        <h3>Ash trees are in danger!</h3>
        <p>Can you help us find them all so we can stop the spread of a
          deadly beetle infestation?</p>
        <p>Please login using one of your existing online identities to get started:</p>
        <div id="firebaseui-auth-container"></div>
      </div>
  </q-page>
</template>

<script>
  import firebaseui from 'firebaseui'
  import firebaseUiAuthCss from 'firebaseui/dist/firebaseui.css' /* eslint no-unused-vars: 0 */
  export default {
      name: "login",
      mounted () {
        var uiConfig = {
          callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
              var user = authResult.user;
              var credential = authResult.credential;
              console.log("user: " + user.displayName);
              this.sendToStore(user);
              alert("Signing in");
              return true;
            }.bind(this)
           // uiShown: function() {
           //   //alert("Trying to sign in");
           // }
          },
          //signInSuccessUrl: '/hello',
          signInOptions: [
            this.$firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            this.$firebase.auth.EmailAuthProvider.PROVIDER_ID
          ]
        }
        var ui = new firebaseui.auth.AuthUI(this.$auth)
        ui.start('#firebaseui-auth-container', uiConfig)
      },
      methods: {
          sendToStore(user) {
            console.log(user)
            this.$store.dispatch('setUser', user); //|| false)
            this.$router.push('/hello')
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
