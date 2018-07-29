<template>
  <q-page padding>
    <div v-if="!isEnd()" class="panel-body">
      <h1>Is this a tree?</h1>
      <p>Help us validate other users' images.</p>
      <p>Current score: {{ profile.points }}</p>
      <q-carousel ref="carousel">
        <q-carousel-slide v-for="isTree in isTreeList" :key="isTree['.key']" >
          <img class="slideImg" :src="isTree.s3url"/>
          <p style="color:white">{{ isTree['.key'] }}</p>
        </q-carousel-slide>
      </q-carousel>
      <p>Viewing {{ currentSlideIndex + 1 }} out of {{ isTreeList.length }}</p>
      <q-layout>
          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn @click="valid(true)" round color="positive" icon="thumb_up" style="cursor:pointer;" big/>
          </q-page-sticky>
          <q-page-sticky position="bottom-left" :offset="[18, 18]">
            <q-btn @click="valid(false)" round color="negative" icon="thumb_down" style="cursor:pointer;" big/>
          </q-page-sticky>
      </q-layout>
    </div>
    <div v-else class="panel-body">
      <h1>You're awesome!</h1>
      <p>You verified all of our tree photos!</p>
      <router-link class='btn' to="/tag">
        <q-btn color="secondary">
            Tag an ash tree
        </q-btn>
      </router-link>
    </div>
  </q-page>
</template>
<script>
import { db } from '../plugins/firebase'
export default {
  name: 'istree',
  firebase: {
    trees: db.ref('tree_photos'),
    verifiedSimple: db.ref('verified_simple'),
    // profiles: db.ref('user_profiles')
  },
  data: function () {
    return {
      // trees: this.$root.trees,
      // profiles: this.$root.profiles,
      // profilesRef: this.$root.$firebaseRefs.profiles,
      // verifiedSimpleRef: this.$root.$firebaseRefs.verifiedSimple,
      photo: '',
      userId: '',
      name: '',
      email: '',
      user: {},
      simplePoints: this.$store.state.simplePoints,
      currentSlideIndex: 0
    }
  },
  computed: {
    isTreeList () {
      return this.trees.filter(tree => tree.user_id !== this.userId).reverse()
    },
    profile: {
      get () {
        return this.$store.state.profile
      },
      set () {
        // something here
      }
    }
  },
  methods: {
    isEnd () {
      return this.currentSlideIndex + 1 === this.isTreeList.length
    },
    valid (bool) {
      // console.log(this.trees[this.currentSlideIndex]['.key'])
      let treeRef = this.trees[this.currentSlideIndex]['.key']
      let userId = this.userId
      let verification = {}
      verification[userId] = bool
      var p = Object.assign({}, this.profile)
      p = JSON.parse(JSON.stringify(p))
      p.points = p.points + this.simplePoints
      // add userPoints in firebase
      this.$profilesRef.child(this.userId).update({points: p.points}).then(this.$store.dispatch('setProfile', p))

      // flag or verify in firebase
      // instead of logging to console after promise completes
      // should it attempt to remove points from user? or do that next time
      // the user logs in?

      db.ref('verified_simple').orderByKey()
        .equalTo(this.trees[this.currentSlideIndex]['.key'])
        .once('value')
        .then(function (snapshot) {
          var value = snapshot.val()
          if (value) {
            // if it exists we can update a user to the list
            value[treeRef][userId] = bool
            db.ref('verified_simple').child(treeRef).set(value[treeRef]).then(console.log('verified!'))
          }
          else {
            // if it doesn't exist, we need to create the node
            db.ref('verified_simple').child(treeRef).set(verification).then(console.log('verified!'))
          }
        })

      var _this = this
      this.$refs.carousel.next(function () { _this.currentSlideIndex++ })
    },
    flagImage (img) {
      // something here
    },
    validateImage (img) {
      // something here
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
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
  font-size: 30px;
  padding-top:20px;
  padding-bottom: 0px;
}

p {
  margin-top: -20px;
}

.slideImg {
  width:100%;
  height:100%;
  object-fit: contain;
}

.q-carousel, .carousel {
  height: 70vh;
  margin-top: -30px;
}

</style>
