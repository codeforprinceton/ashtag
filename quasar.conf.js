// Configuration for your app

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'axios',
      'firebase',
      'vuegooglemaps',
      'date-filter'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons'
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: false,
    vendor: {
      add: [],
      remove: []
    },
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      // useNotifier: false,
      extendWebpack (cfg) {
      }
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QPopover',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QCard',
        'QCardMain',
        'QCardMedia',
        'QCardTitle',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QTabs',
        'QTab',
        'QTabPane',
        'QRouteTab',
        'QPageSticky',
        'QAlert',
        'QCarousel',
        'QCarouselSlide',
        'QCarouselControl'
      ],
      directives: [
        'Ripple',
        'CloseOverlay'
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'Loading'
       /* 'axios',
        'firebase',
        'vuegooglemaps',
        'date-filter'*/
      ]
    },
    // animations: 'all' --- includes all animations
    animations: [
      'bounceInLeft',
      'bounceOutRight'
    ],
    pwa: {
      cacheExt: 'js,html,css,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3',
      manifest: {
        name: 'ashtag',
        short_name: 'ASHTAG',
        description: 'Crowdsourcing images and locations of ash trees for Emerald Ash Borer infestation tracking.',
        orientation: 'portrait',
        start_url: "/?utm_source=homescreen",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#4DBA87",
        icons: [
          {
            "src": "/statics/iconx/pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/statics/iconx/pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      extendWebpack (cfg) {
        // do something with cfg
      },
      packager: {
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      }
    },

    // leave this here for Quasar CLI
    starterKit: '1.0.3'
  }
}
