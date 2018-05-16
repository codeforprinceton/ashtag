<template lang="html">
  <q-page padding>
    <div class="panel-body">
      <h1>Ash Tree Help</h1>
      <q-tabs>
        <!-- Tabs - notice slot="title" -->
        <q-tab default slot="title" name="tab-1" icon="fingerprint">Identification</q-tab>
        <q-tab slot="title" name="tab-2" icon="warning">Look-A-Likes</q-tab>

        <!-- Targets -->
        <q-tab-pane name="tab-1">
          <h5>Opposite Branches</h5>
          <img width="349" src="statics/id/opposite_branches.jpg"/>
          <p>Branches and buds are directly across from one another on the stem.</p>

          <h5>Compound Leaves</h5>
          <img width="349" src="statics/id/compound_leaves.jpg"/>
          <p>Leaves have 5-11 leaflets. The petiole (stem of the leaf) is directly attached
            to the branch.</p>
          <p>The leaflets are directly attached to the petiole.</p>

          <h5>Samaras</h5>
          <img width="349" src="statics/id/samaras.jpg"/>
          <p>Samaras are paddle-shaped seeds occurring in clusters on the female trees only.</p>
          <p>The samaras ripen in mid-August and persist into winter, but they are present as early as May/June, but are not mature.</p>

          <h5>Bark</h5>
          <img width="349" src="statics/id/bark.jpg"/>
          <p>Dark gray diamond shaped ridges on older trees.</p>
          <p>Smoother on younger trees.</p>
        </q-tab-pane>
        <q-tab-pane name="tab-2">
          <p>Don't be fooled by these look-a-likes! These trees are not affected by the Emerald Ash Borer.</p>
          <h5>Boxelder Maple</h5>
          <img width="349" src="statics/id/boxelder.jpg"/>
          <p>Compound leaves, but only 3-5 leaflets. Opposite branches, but young
            branches are covered in a white bloom. Fruit are samaras. Older bark is <strong>NOT</strong>
            diamond shape.</p>

          <h5>Black Walnut</h5>
          <img width="349" src="statics/id/black_walnut.jpg"/>
          <p>Compound leaves, but have 13-23 leaflets. Alternate branches.
            Fruit are large nuts with green husk. Older bark is diamond shaped.</p>

          <h5>Shagbark Hickory</h5>
          <img width="349" src="statics/id/shagbark_hickory.jpg"/>
          <p>Coumpound leaves 5-11 leaflets. Alternate branches.
            Fruit are nuts with green husk. Older bark is diamond shaped.</p>

          <h5>Elm</h5>
          <img width="349" src="statics/id/elm.jpg"/>
          <p>Branching is alternate and the leaves are simple with an
            unequal leaf base. </p>

          <h5>European Mountainash</h5>
          <img width="349" src="statics/id/european_mountainash.jpg"/>
          <p>Leaves are compound with alternate (staggered) branching.  Tree bears
            clusters of creamy white flowers in May. Fruits are fleshy, red-orange berries.</p>
        </q-tab-pane>
      </q-tabs>
    </div>
    <!-- content -->
  </q-page>
</template>

<script>
export default {
  name: 'identification',
  beforeMount: function () {
    if (this.$store.state.user) {
      this.user = this.$store.state.user
      this.name = this.$store.state.user.displayName
      this.email = this.$store.state.user.email
     /* this.photo = this.$store.state.user.photoURL
      this.userId = this.$store.state.user.uid
      this.profile = this.$store.state.profile*/
    }
  }
}
</script>

<style>

  h1 {
    font-size: 30px;
    padding-top:20px;
    padding-bottom: 0px;
  }
</style>
