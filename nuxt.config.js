const axios = require('axios')

module.exports = {
    env: {
        publicToken: 'sGQamtNrNnpeyp0ac7AuGAtt'
    },

    srcDir: 'src/',

    /*
    ** Headers of the page
    */
    head: {
        title: 'Gamehub | Justine Joshua Quiazon',

        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'My gaming profile using Nuxt.js & Storyblok' }
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
        { src: '~plugins/youtube.js', ssr: false },
        { src: '~plugins/vue-infinite-loading.js', ssr: false },
    ],

    router: {
        // only add `router.base = '/<repository-name>/'` if `NODE_ENV` is `production`
        base: process.env.NODE_ENV === 'production' ? '/games/' : '/',

        // forcing the scroll position to the top for every routes
        scrollBehavior: function (to, from, savedPosition) {
            return { x: 0, y: 0 }
        }
    },

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/markdownit',
        '@nuxtjs/google-analytics'
    ],

    axios: {
        baseURL: 'https://api.storyblok.com/v1/cdn/'
    },

    markdownit: {
        injected: true,
        preset: 'default',
        linkify: true,
        breaks: true
    },

    'google-analytics': {
        id: 'UA-113519778-3',
        autoTracking: {
            page: process.env.NODE_ENV === 'production' ? true : false
        }
    },

    /*
    ** Customize the progress bar
    */
    loading: {
        color: '#FF9800',
        height: '3px'
    },

    /*
    ** Build configuration
    */
    build: {
        babel: {
            presets: ["@vue/app"]
        }
    },
    
    generate: {
        routes: function (callback) {
            const token = `sGQamtNrNnpeyp0ac7AuGAtt`
            const per_page = 500
            const version = `published`

            let page = 1
            let routes = []

            // Call first Page of the Links API: https://www.storyblok.com/docs/Delivery-Api/Links
            axios.get(`https://api.storyblok.com/v1/cdn/links?token=${token}&version=${version}&per_page=${per_page}&page=${page}`).then((res) => {
                Object.keys(res.data.links).forEach((key) => {

                    let { slug, id } = res.data.links[key]

                    if (slug.includes("games/")) {
                        // remove the `games/` in slug
                        slug = slug.replace('games/', '')
                        
                        routes.push(`/${slug}`)
                    }

                    if (slug.includes("gallery/")) {
                        // sample slug: gallery/monster-hunter-world-gallery-1
                        // output: gallery/monster-hunter-world/369271
                        
                        // get the index of -gallery-
                        const index = slug.indexOf('-gallery-')
                        
                        // slice the string from index 0 to index of `-gallery-`
                        slug = slug.slice(0, index)

                        routes.push(`/${slug}/${id}`)
                    }
                })

                callback(null, routes)
            })
        }
    }
}