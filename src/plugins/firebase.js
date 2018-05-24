//import { initializeApp } from 'firebase'
import * as firebase from 'firebase';
//import * as firebaseui from 'firebaseui';
import * as GeoFire from 'geofire';
import VueFire from 'vuefire';

const app = {
  apiKey: "AIzaSyCZTIICdE_LL7xA7nHJ_81uUHYv7g6DjkA",
  authDomain: "tree-photos.firebaseapp.com",
  databaseURL: "https://tree-photos.firebaseio.com",
  projectId: "tree-photos",
  storageBucket: "gs://tree-photos.appspot.com",
  messagingSenderId: "24380484990"
};
firebase.initializeApp(app);

export const fireb = firebase
//export const fireui = firebaseui
export const db = firebase.database()
export const auth = firebase.auth()
export const storefb = firebase.storage()
export const profilesRef = db.ref('user_profiles')
export const verifiedSimpleRef = db.ref('verified_simple')
export const treesRef = db.ref('tree_photos')
export const locationRef = db.ref('locations')
export const geoFire = new GeoFire(locationRef)
// export const AUTH = db.auth()

export default ({ app, router, Vue }) => {
   Vue.use(VueFire)
   Vue.prototype.$firebase = fireb
   Vue.prototype.$auth = auth
   Vue.prototype.$treesRef = treesRef
   Vue.prototype.$storefb = storefb.ref()
   Vue.prototype.$db = db
  // Vue.use(VueFire)
}
