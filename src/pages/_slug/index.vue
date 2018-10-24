<template>
    <div>
        <pre>{{ data }}</pre>
    </div>
</template>

<script>
export default {
    scrollToTop: true,
    
    data () {
        return {
            slug: this.$route.params.slug
        }
    },

    async asyncData ({ app, params, store, error }) {
        store.dispatch('STORE_CACHE_VERSION')
        const { slug } = params
        
        const apiParams = {
            resolve_relations: 'platforms',
            ...store.state.params
        }

        const data = await app.$axios.get(`stories/games/${slug}`, { params: apiParams })
        return { data }
    }
}
</script>