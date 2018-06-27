//import { initializeApp } from 'firebase'
import * as firebase from 'firebase';
//import * as firebaseui from 'firebaseui';
import * as GeoFire from 'geofire';
import VueFire from 'vuefire';
import store from '../store/index'
import {config} from '../helpers/firebaseConfig'

firebase.initializeApp(config)

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
