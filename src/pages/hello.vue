<template>
  <q-page padding>
    <div class="hello">
      <img src="~assets/ashtag-logo-full.svg" alt="Ashtag" style="padding:20px;width:150px">
      <h3>Ash trees are in danger!</h3>
      <p>Can you help us find them all so we can stop the spread of a
        deadly beetle infestation?</p>
      <p>Welcome, {{ user.displayName }}!</p>
      <router-link class='btn' to="/tag">
        <q-btn color="secondary">
          Tag an ash tree
        </q-btn>
      </router-link>
      <router-link class='btn' to="/istree">
        <q-btn color="secondary" align="center">
          Verify others' photos
        </q-btn>
      </router-link>
    </div>
  </q-page>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        photo: '',
        userId: '',
        name: '',
        email: ''
        //user: {}
      }
    },
    computed: {
      user() {
        return this.$store.getters.getUser
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  @import '~variables'

  .hello
    margin-top 50px
    margin-left auto
    margin-right auto

    a
      color #35495E
  p
    display flex
    align-content center
    justify-content center
  ul
    list-style-type none
    padding 0

  li
    display inline-block
    margin 0 10px

  .btn
    display block
    margin-bottom 10px
    margin-left auto
    margin-right auto
</style>
