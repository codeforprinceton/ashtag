<template>
  <q-page padding>
    <div class="panel-body">
      <h1>Top Scores</h1>
      <div>
        <div v-for="topUser in topUsers">
          {{topUser.user_name}} : {{topUser.points}}
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { db } from '../plugins/firebase'
export default {
  name: 'leaderboard',
  firebase: {
    leaders: db.ref('user_profiles').orderByChild('points').limitToLast(10)
  },
  computed: {
     topUsers() {
      // let topUsers = this.profiles.orderByChild('points').limitToLast(10)
      // let topUsers = db.ref('user_profiles').sort(function (a, b) { return (a.points > b.points) ? 1 : ((b.points > a.points) ? -1 : 0) })
      //topUsers = topUsers.slice(-3)
      //return topUsers.reverse()
      console.log(this.leaders)
      return this.leaders.reverse()
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

h1 {
  font-size: 30px;
  padding-top:20px;
  padding-bottom: 0px;
}

</style>
