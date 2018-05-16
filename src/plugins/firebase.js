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
  storageBucket: "tree-photos.appspot.com",
  messagingSenderId: "24380484990"
};
firebase.initializeApp(app);

export const fireb = firebase
export const db = firebase.database()
export const auth = firebase.auth()
//export const fireui = firebaseui
export const treeRef = db.ref('treephoto')
export const locationRef = db.ref('locations')
export const geoFire = new GeoFire(locationRef)
// export const AUTH = db.auth()

export default ({ app, router, Vue }) => {
  // Vue.prototype.$auth = AUTH
  Vue.use(VueFire)
}
