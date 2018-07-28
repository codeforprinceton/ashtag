<template>
  <q-page padding>
    <div class="panel-body">
      <!-- <transition
        enter-active-class="animated bounceInLeft"
        leave-active-class="animated bounceOutRight"
        appear
      >
        <q-alert
          color="secondary"
          icon="tag_faces"
          message="Hoot, there it is!"
          detail="You just got points for your tag."
          appear
          :actions="[
          { label: 'Tag Another', icon: 'alarm', handler: () => { this.$router.push('/tag') } },
          { label: 'Verify Photos', icon: 'done', handler: () => { this.$router.push('/istree') } }
        ]"
          class="q-mt-md"
        >
        </q-alert>
      </transition> -->

      <h1>{{name}} has {{tagList.length}} tags and {{flaggedList.length}} flagged photos.</h1>
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
      // trees: this.$firebase.trees,
      // treesRef: this.$treesRef,
      // profiles: this.$root.profiles,
      // profilesRef: this.$root.$firebaseRefs.profiles,
      // verifiedSimple: this.$firebase.verifiedSimple,
      // verifiedSimpleRef: this.$root.$firebaseRefs.verifiedSimple,
      // taglist: this.trees.filter(tree => tree.user_id === this.userId),
      photo: '',
      userId: '',
      name: '',
      email: '',
      user: {},
      // simplePoints: this.$store.state.simplePoints,
      // tagPoints: this.$store.state.tagPoints,
      flagToSpamThreshold: this.$store.state.flagToSpamThreshold,
      totalFlagged: 0,
      flagged: [],
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
    },
    flaggedList () {
      const flagToSpamThreshold = this.flagToSpamThreshold
      let tagList = this.tagList
      function isFlagged (value) {
        let vals = Object.values(value)
        var counts = {}
        vals.forEach(function (x) { counts[x] = (counts[x] || 0) + 1 })
        if (counts.false > flagToSpamThreshold) {
          // find flagged in tagList
          let found = tagList.find(function (element) {
            return element['.key'] === value['.key']
          })
          return found
        }
      }

      var flaggedList = this.verifiedSimple.filter(isFlagged)
      this.totalFlagged = flaggedList.length
      this.flagged = flaggedList
      if (this.totalFlagged) {
        this.photosFlaggedAlert()
      }
      return flaggedList
    }
  },
  methods: {
    removeFlagged () {
      // Removes flagged photos from tree_photos and photo references on the flagged list
      let i
      for (i = 0; i < this.totalFlagged; i++) {
        this.treesRef.child(this.flagged[i]['.key']).remove()
          .then(this.verifiedSimpleRef.child(this.flagged[i]['.key']).remove())
      }
    },
    reducePoints () {
      let newProfile = Object.assign({}, this.profile)
      newProfile.points = newProfile.points - this.spamToll
      this.$store.dispatch('setProfile', newProfile)
      this.profilesRef.child(this.userId).update({points: newProfile.points})
        .then(this.removeFlagged())
    },
    photosFlaggedAlert () {
      this.spamToll = this.totalFlagged * this.tagPoints
      console.log(this.spamToll)
      // let reducePoints = this.reducePoints
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
