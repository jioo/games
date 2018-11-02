<template>
    <v-container grid-list-md fluid>
        <v-layout row wrap>
            <v-flex md12>
                <no-ssr>
                    <game-info-card :item="item" />
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
        await store.dispatch('UPDATE_CACHE_VERSION')
        const { slug } = params
        
        const apiParams = {
            resolve_relations: 'platforms',
            ...store.state.params
        }

        const item = await app.$axios.get(`stories/games/${slug}`, { params: apiParams })
        return { item }
    }
}
</script>