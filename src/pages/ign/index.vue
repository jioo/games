<template>
    <v-container grid-list-md fluid>

        <currently-playing :data="currentlyPlaying" class="mb-5" />

        <ign-list :data="ignList" />
        
    </v-container>
</template>
<script>
export default {
    async asyncData ({ app, store }) {
        await store.dispatch('UPDATE_CACHE_VERSION')

        const params = {
            'filter_query[component][in]': 'currently-playing,ign-list',
            sort_by: 'name:asc',
            resolve_links: '1',
            ...store.state.params
        }

        return app.$axios.get(`stories`, { params })
            .then((data) => {
                return { 
                    currentlyPlaying: data.stories[0],
                    ignList: data.stories[1]
                }
            })
    }
}
</script>