module.exports = {

    env: {
        publicToken: 'ErHtwFUjF4vTS2WFkQUBPAtt'
    },

    srcDir: 'src/',

    head: {
        title: 'Gamehub | Justine Joshua Quiazon',
        
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'My gaming profile' }
        ],

        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    css: [
        '~/assets/css/styles.css',
        'vuetify/dist/vuetify.min.css',
        'roboto-fontface/css/roboto/roboto-fontface.css',
        'material-design-icons-iconfont/dist/material-design-icons.css'
    ],

    plugins: [
        '~/plugins/axios.js',
        '~/plugins/components.js',
        '~/plugins/vuetify.js',
        { src: '~plugins/vue-infinite-loading.js', ssr: false },
    ],

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/markdownit'
    ],
    
    axios: {
        proxy: true,
        debug: true
    },

    proxy: {
        '/api/': { target: 'https://api.storyblok.com/v1/cdn', pathRewrite: {'^/api/': '/'} }
    },

    markdownit: {
        injected: true,
        preset: 'default',
        linkify: true,
        breaks: true
    },

    loading: { 
        color: '#FF9800' 
    },
    
    build: {
        babel: {
            presets: [ "@vue/app" ]
        }
    }

}
