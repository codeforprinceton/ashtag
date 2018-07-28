<template>
  <q-page padding>
    <div class="tag">
      <h3>Take a picture of an ash tree</h3>
      <p v-if="treePic">Looking good! <br/> Upload or cancel using the buttons below.</p>
      <p v-else>Stay close to the tree, but capture the full shape as shown below.
        Not sure if it's an ash? <br/><router-link to="/identification">Check out our help page</router-link>.</p>
      <img id="img" ref="treeImg" :src="src || '/statics/tree-example.jpg'" width="250px"/>
      <div v-if="isFailed">
        <h2>Upload failed. Try again?</h2>
        <p>
          <q-btn @click="reset" id="tryAgain" round color="secondary" icon="refresh" style="cursor:pointer;" size="lg"/>
        </p>
        <pre>{{ uploadError }}</pre>
      </div>
      <q-layout>
        <div v-if="!isSuccess">
          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <div v-if="treePic">
              <q-btn @click="uploadPhotos" id="upload" round color="positive" icon="backup" style="cursor:pointer;" size="lg"/>
            </div>
            <label v-else for="tree">
              <q-btn @click="triggerFileInput" round color="secondary" icon="add_a_photo" style="cursor:pointer;" size="lg"/>
            </label>
          </q-page-sticky>
          <q-page-sticky v-if="treePic" position="bottom-left" :offset="[18, 18]">
            <q-btn @click="reset" round color="negative" icon="cancel" style="cursor:pointer;" size="lg"/>
          </q-page-sticky>
        </div>
        <div v-else>
          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn @click="reset" id="success" round color="positive" icon="check" style="cursor:pointer;" size="lg"/>
          </q-page-sticky>
        </div>
      </q-layout>
      <input style="display:none" type="file" ref="fileInput" @change="fileAdded($event)" id="fileinput" accept="image/*" :name="uploadFieldName">
    </div>
  </q-page>
</template>

<script>
  import shortid from 'shortid'
  import { fireb, geoFire } from '../plugins/firebase'
 // import { upload } from '../helpers/uploadService'
  import { Loading } from 'quasar'
  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3
  export default {
    name: 'tag',
    data () {
      return {
       // treesRef: treesRef,
       // profilesRef: this.$root.$firebaseRefs.profiles,
        file: null,
        src: '',
        uploadFieldName: 'file',
        treePic: '',
        formData: new FormData(),
        tree: {
          loc: {
            lat: null,
            lng: null
          },
          s3url: '',
          datetime: '',
          user_id: '',
          user_email: ''
        },
        uploadError: null,
        currentStatus: null,
        img_name: '',
        blobFile: null,
        blob: null
      }
    },
    computed: {
      isSafari () {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
      },
      isInitial () {
        return this.currentStatus === STATUS_INITIAL
      },
      isSaving () {
        return this.currentStatus === STATUS_SAVING
      },
      isSuccess () {
        return this.currentStatus === STATUS_SUCCESS
      },
      isFailed () {
        return this.currentStatus === STATUS_FAILED
      },
      user_id () {
        return this.$store.state.user.uid || 8976
      },
      user_email () {
        return this.$store.state.user.email
      },
      profile () {
        return this.$store.state.profile
      },
      tagPoints () {
        return this.$store.state.tagPoints
      }
    },
    mounted () {
      this.reset()
    },
    methods: {
      reset () {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL
        this.uploadError = null
        this.treePic = null
        this.formData = new FormData()
      },
      fileAdded (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this.img_name = shortid.generate() // files[0].name
        this.file = files[0]
        this.loadPicture(this.file)
      },
      loadPicture (file) {
        let self = this
        var reader = new FileReader()
        reader.onload = function (e) {
          self.src = e.target.result
          var img = new Image()
          img.onload = function () {
            var cvs = document.createElement('canvas')
            var ctx = cvs.getContext('2d')
            cvs.width = this.width
            cvs.height = this.height
            ctx.drawImage(img, 0, 0)
            // /!* eslint-disable no-unused-vars *!/
            let newImageData = cvs.toDataURL('image/jpeg', 0.5)
            window.img = newImageData
            if (newImageData.indexOf('image/jpeg') < 0) {
              console.log('image type not supported')
            }
            if (self.isSafari) {
              self.treePic = file
            }
            else {
              self.treePic = newImageData
            }
          }
          img.src = e.target.result
        }
        reader.readAsDataURL(file)
      },
      uploadPhotos () {
        Loading.show({
          message: 'Uploading your ash tree ...',
          spinnerSize: 250, // in pixels
          spinnerColor: 'white'
        })

        //var blobFile
        if (this.isSafari) {
          this.blob = this.treePic
          this.blobFile = this.treePic
        }
        else {
          var base64ImageContent = this.treePic.replace(/^data:image\/(png|jpeg);base64,/, '')
          this.blob = this.base64ToBlob(base64ImageContent, 'image/jpeg')
          this.blobFile = new File([this.blob], this.img_name)
        }
        this.formData.append('key', this.blobFile.name)
        this.formData.append('file', this.blobFile)
        this.getPreciseLocation()
          .then(this.setTreeData)
          .catch((err) => {
            this.uploadError = err.message
            Loading.hide()
            console.error(err.message)
          })
      },
      save (formData) {
        // upload data to the server
        let key
        let imageUrl
        this.currentStatus = STATUS_SAVING

        this.$treesRef.push(this.tree)
          .then((data) => {
            console.log("Pushed to firebase")
            key = data.key
            console.log(key)
            geoFire.set(key, [this.tree.loc.lat, this.tree.loc.lng])
          })
          .then(() => {
              console.log('key: ' + key + ' location has been added to geofire')
          })
          .catch((error) => {
            console.log(error)
            this.currentStatus = STATUS_FAILED
            // this.uploadError = err.response
          })

        const storageRef = fireb.storage().ref('tree_photos/'+ this.img_name)
        const uploadTask = storageRef.put(this.blob)
       /* uploadTask.on('state_changed', function progress(snapshot) {
          console.log(snapshot.totalBytesTransferred); // progress of upload
          })*/
        uploadTask.then((snapshot) => {
            return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
          })
          .then(downloadURL => {
            console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
            return this.$treesRef.child(key).update({imageUrl: downloadURL})
          })
          .then(() => {
            //this.updateProfilePoints
            console.log("downloadURL added to tree_photo in database")
            this.currentStatus = STATUS_SUCCESS
            this.updateProfilePoints()
          })
          .catch(err => {
            console.log(error)
            this.currentStatus = STATUS_FAILED
           // this.uploadError = err.response
          })
      },
      // uploadaws(formData) {
      //   const url = 'https://s3.amazonaws.com/ash-tree-photos'
      //   return this.$axios.post(url, formData)
      //     .then(function (response) {
      //       console.log("Loaded AWS")  //response.data
      //     })
      //     .catch(function (error) {
      //       console.log(error + Date.now())
      //     })
      // },

      triggerFileInput () {
        this.$refs.fileInput.click()
      },
      updateProfilePoints () {
        console.log("about to go to success page")
        const p = Object.assign({}, this.profile)
        p.points = p.points + this.tagPoints
        // add userPoints in firebase then update our local store
       this.$profilesRef.child(this.tree.user_id).update({points: p.points})
         .then(() => {
           this.$store.dispatch('setProfile', p)
         })
         .catch(err => {
           console.log(error)
           this.currentStatus = STATUS_FAILED
           Loading.hide()
         })
        Loading.hide()
        console.log("going to success page")
        this.$router.push('/success')
      },
      getPreciseLocation () {
        return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(function (position) {
            resolve([position.coords.latitude, position.coords.longitude])
          }, reject)
        })
      },
      setTreeData (data) {
        let d = new Date()
        let n = d.toISOString()
        this.tree.loc.lat = data[0]
        this.tree.loc.lng = data[1]
        this.tree.s3url = 'https://s3.amazonaws.com/ash-tree-photos/' + this.img_name
        this.tree.datetime = n
        this.tree.user_id = this.user_id
        this.tree.user_email = this.user_email
        this.$store.dispatch('setLastPOI', this.tree.loc)
        this.save(this.formData)
      },
      base64ToBlob (base64, mime) {
        mime = mime || ''
        var binary = atob(base64)
        var len = binary.length
        var buffer = new ArrayBuffer(len)
        var view = new Uint8Array(buffer)
        for (var i = 0; i < len; i++) {
          view[i] = binary.charCodeAt(i)
        }

        var blob = new Blob([ view.buffer ], {type: mime})

        return blob
      }
    }
  }
</script>

<style>
</style>
