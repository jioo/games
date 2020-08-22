<template>
    <v-container grid-list-md fluid>
        <v-layout row wrap>
            <v-flex 
                md6 sm12 xs12 
                v-for="item in data.stories" 
                :key="item.id"
            >
                <no-ssr>
                    <top-list-item :item="item" />
                </no-ssr>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    async asyncData ({ app, store }) {
        await store.dispatch('UPDATE_CACHE_VERSION')

        const params = {
            'filter_query[component][all]': 'top-info',
            sort_by: 'published_at:desc',
            resolve_links: 1,
            ...store.state.params
        }

        return app.$axios.get(`stories`, { params })
            .then((data) => {
                return { data }
            })
    }
}
</script>