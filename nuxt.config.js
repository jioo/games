import colors from 'vuetify/es5/util/colors'
const axios = require('axios')

export default {
    env: {
        publicToken: 'sGQamtNrNnpeyp0ac7AuGAtt'
    },

    /*
    ** Nuxt rendering mode
    ** See https://nuxtjs.org/api/configuration-mode
    */
    mode: 'universal',

    /*
    ** Nuxt target
    ** See https://nuxtjs.org/api/configuration-target
    */
    target: 'static',

    /*
    ** Headers of the page
    ** See https://nuxtjs.org/api/configuration-head
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

    /*
    ** Global CSS
    */
    css: [
        '~/assets/css/styles.css',
        'vuetify/dist/vuetify.min.css',
        'roboto-fontface/css/roboto/roboto-fontface.css',
        // '@mdi/font/css/materialdesignicons.css',
        'material-design-icons-iconfont/dist/material-design-icons.css'
    ],

    /*
    ** Plugins to load before mounting the App
    ** https://nuxtjs.org/guide/plugins
    */
    plugins: [
        '~/plugins/axios',
        '~/plugins/components.js',
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

    /*
    ** Auto import components
    ** See https://nuxtjs.org/api/configuration-components
    */
    components: true,

    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxtjs/vuetify',
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/markdownit',
        '@nuxtjs/google-analytics'
    ],

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
    ** vuetify module configuration
    ** https://github.com/nuxt-community/vuetify-module
    */
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: true,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },

    /*
    ** Build configuration
    ** See https://nuxtjs.org/api/configuration-build/
    */
    build: {
    },

    generate: {
        routes: function (callback) {
            const token = `sGQamtNrNnpeyp0ac7AuGAtt`
            const per_page = 30
            const version = `published`

            let page = 1
            let routes = []
            let all_links = []

            // Code snippet: https://www.storyblok.com/tp/how-to-generate-sitemap-headless-cms
            // Call first Page of the Links API: https://www.storyblok.com/docs/Delivery-Api/Links
            axios.get(`https://api.storyblok.com/v1/cdn/links?token=${token}&version=${version}&per_page=${per_page}&page=${page}`).then((res) => {
                // push all links into our all_links variable
                Object.keys(res.data.links).forEach((key) => {
                    all_links.push(res.data.links[key])
                })

                // Check if there are more pages available otherwise thats all to do.
                const total = res.headers.total
                const maxPage = Math.ceil(total / per_page)
                if (maxPage <= 1) {
                    return
                }

                // Since we know the total we now can pregenerate all requests we need to get all Links
                let contentRequests = []

                // we will start with page two since the first one is already done.
                for (let page = 2; page <= maxPage; page++) {
                    contentRequests.push(axios.get(`https://api.storyblok.com/v1/cdn/links?token=${token}&version=${version}&per_page=${per_page}&page=${page}`))
                }

                // Axios allows us to exectue all requests using axios.spread. We will then push our links into our all_links variable.
                axios.all(contentRequests).then(axios.spread((...responses) => {
                    responses.forEach((response) => {
                        Object.keys(response.data.links).forEach((key) => {
                            all_links.push(response.data.links[key])
                        })
                    })


                    // transform each link to generate pages
                    all_links.forEach((link) => {
                        let { slug, id } = link

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

                }))
            })
        }
    }
}
