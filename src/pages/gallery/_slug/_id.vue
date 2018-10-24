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
        const { id, slug } = params
        
        const apiParams = { ...store.state.params }

        const data = await app.$axios.get(`stories/${id}`, { params: apiParams })

        const { cached_url } = data.story.content.game
        if (!cached_url.includes(slug)) error({ statusCode: 404, message: 'Page not found' })

        return { data }
    }
}
</script>