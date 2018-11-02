<template>
    <v-container grid-list-md fluid>
        <v-layout row wrap>
            <v-flex md12>
                <no-ssr>
                    <gallery-info-card :item="item" />
                </no-ssr>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            slug: this.$route.params.slug
        }
    },

    async asyncData ({ app, params, store, error }) {
        store.dispatch('UPDATE_CACHE_VERSION')
        const { id, slug } = params
        
        const apiParams = { 
            resolve_links: 1,
            ...store.state.params
        }

        const item = await app.$axios.get(`stories/${id}`, { params: apiParams })

        const { cached_url } = item.story.content.game
        if (!cached_url.includes(slug)) error({ statusCode: 404, message: 'Page not found' })

        return { item }
    }
}
</script>