<template>
  <q-page padding>
    <div class="simple-map demo">
      <transition
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
          { label: 'Tag Another', icon: 'alarm', handler: () => { window.history.go(-1) } },
          { label: 'Verify Photos', icon: 'done', handler: () => {  window.location.replace('/#/istree') } }
        ]"
          class="q-mt-md"
        >
        </q-alert>
      </transition>
      <!-- Map -->
      <gmap-map
        ref="map"
        class="map"
        :center.sync="userPosition"
        :zoom.sync="zoom"
      >

        <!-- Marker -->
        <gmap-marker
          title="Paris"
          :position="userPosition" />
      </gmap-map>
    </div>
   </q-page>
</template>

<script>
export default {
  name: 'success',
  data () {
    return {
      tagPoints: this.$store.state.tagPoints,
      center: {
        lat: 48.853,
        lng: 2.298
      },
      // userPosition: null,
      zoom: 12
    }
  },
  computed: {
    userPosition: {
      get () {
        return this.$store.state.lastPOI
      },
      set () {
        // need to have something here
      }
    }
  },
  methods: {
    centerOnUser () {
      if (this.userPosition) {
        this.center = this.userPosition
      }
    },
    setUserPosition (position) {
      this.userPosition = position
    }
  }
  /*mounted () {
    const alert = Alert.create({
      enter: 'bounceInDown',
      leave: 'bounceOutUp',
      color: 'positive',
      icon: 'tag_faces',
      html: 'Hoot, there it is!<br/>You just got ' + this.tagPoints + ' points for your tag.',
      position: 'top-center',
      actions: [
        {
          label: 'Tag Another',
          handler () {
            alert.dismiss()
            window.history.go(-1)
          }
        },
        {
          label: 'Verify Photos',
          handler () {
            alert.dismiss()
            window.location.replace('/#/istree')
          }
        },
        {
          label: 'Dismiss',
          handler () {
            alert.dismiss()
          }
        }
      ]
    })
  }*/
}
</script>

<style lang="stylus" scoped>
  .demo {
    height:95vh;
    display: flex;
    flex-direction: column;
  }
  .map {
    flex: 100% 1 1;
  }
</style>
