<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
      >
        <q-btn
          flat
          dense
          round
          @click="goHome"
          aria-label="Home"
        >
          <q-icon name="home" />
        </q-btn>

        <q-toolbar-title>
         Ashtag
        </q-toolbar-title>
        <q-btn v-if="user"
          flat
          dense
          round
          @click="goLeaderBoard"
        >
          <q-icon name="grade" />
        </q-btn>

        <q-btn v-if="user">
          <!-- Direct child of target -->
          <q-popover>

            <q-list separator link>
              <!-- notice `v-close-overlay` which closes popover -->
              <q-item v-close-overlay @click="profile">
                  Profile
              </q-item>
              <q-item v-close-overlay @click="help">
                Help
              </q-item>
              <q-item v-close-overlay @click="logOut">
                Logout
              </q-item>
            </q-list>
          </q-popover>
          <q-icon name="face" />
        </q-btn>
      </q-toolbar>
    </q-layout-header>



    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import firebase from 'firebase'
import { auth } from '../plugins/firebase'
export default {
  name: 'LayoutDefault',
  data() {
    return {}
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    logOut() {
        auth.logout()
       // auth.signOut().then(() => {
        // Sign-out successful.
        console.log("I logged out")
        this.$store.dispatch('resetState', this.$store.state)
       // window.location.reload()
       /* })
        .catch(function(error) {
          console.log(error)
          //window.location.reload()
        });*/
        // auth.logout()
    },
    help() {
      this.$router.push('/identification')
    },
    profile() {
      this.$router.push('/profile')
    },
    goHome() {
      this.$router.push('/hello')
    },
    goLeaderBoard() {
      this.$router.push('/leaderboard')
    }
  }
}
</script>

<style lang="stylus">
  @import '~variables'

  body
    margin: 0
    background-color: $light /*#F5F4F1*/

  main
    text-align center
    margin-top 40px

  header
    margin 0
    height 10px
    background-color $primary

  .bg-primary
    background-color $primary

  .tip {
    padding: 12px;
    font-size: 16px;
    color: #aaa;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &.overlay {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
</style>
