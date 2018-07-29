<template>
  <q-page padding>
    <div class="panel-body">
      <h1>{{name}} has {{tagList.length}} tags and {{profile.flagged}} flagged photos.</h1>
      <p class="total">
        <span class="points">{{profile.points}}</span>
        <br/>
        Total points
      </p>
    </div>
  </q-page>
</template>
<script>
import { Alert } from 'quasar'
import 'quasar-extras/animate/bounceInDown.css'
import 'quasar-extras/animate/bounceOutUp.css'
import { db } from '../plugins/firebase'

export default {
  name: 'profile',
  firebase: {
    trees: db.ref('tree_photos'),
    verifiedSimple: db.ref('verified_simple')
  },
  data: function () {
    return {
      photo: '',
      userId: '',
      name: '',
      email: '',
      user: {},
      flagToSpamThreshold: this.$store.state.flagToSpamThreshold,
      totalFlagged: 0,
      flagged: this.flaggedList,
      spamToll: 0
    }
  },
  computed: {
    profile: {
      get () {
        return this.$store.state.profile
      },
      set () {
        // something here
      }
    },
    tagList: {
      get () {
        return this.trees.filter(tree => tree.user_id === this.userId)
      },
      set () {
        // something here
      }
    }
  },
  methods: {
    photosFlaggedAlert () {
      // Here we should let the user know how much the flagged photos have cost them.

      // this.spamToll = this.profile.flagged * this.tagPoints
      // const alert = Alert.create({
      //   enter: 'bounceInDown',
      //   leave: 'bounceOutUp',
      //   color: 'negative',
      //   icon: 'tag_faces',
      //   html: 'Some of your photos were flagged costing you ' + this.spamToll + ' points. <br/>Please be more careful!',
      //   position: 'top-center',
      //   actions: [
      //     {
      //       label: 'Dismiss',
      //       handler () {
      //         reducePoints()
      //         alert.dismiss()
      //       }
      //     }
      //   ]
      // })
    }
  },
  beforeMount: function () {
    if (this.$store.state.user) {
      this.user = this.$store.state.user
      this.name = this.$store.state.user.displayName
      this.email = this.$store.state.user.email
      this.photo = this.$store.state.user.photoURL
      this.userId = this.$store.state.user.uid
      this.profile = this.$store.state.profile
    }
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

h1 {
  font-size: 30px;
  padding-top:20px;
  padding-bottom: 0px;
}

.points {
  font-size: 7rem;
  font-weight: 700;
}
.total {
  margin-top: 200px;
  width: 100%;
}

</style>
