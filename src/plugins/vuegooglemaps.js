import * as VueGoogleMaps from 'vue2-google-maps'
import {gmConfig} from '../helpers/googleMapsConfig'

export default ({ Vue }) => {
  Vue.use(VueGoogleMaps, {
    load: {
      key: gmConfig.apiKey,
      libraries: 'places' // necessary for places input
    }
  })
}
