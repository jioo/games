export default {
    data () {
        return {
            filter: {
                'filter_query[platforms][in_array]': '',
                search_term: '',
                sort_by: 'published_at:desc'
            }
        }
    },

    created () {
        this.$nuxt.$on('APPLY_FILTER', (filterParams) => {
            this.data = { stories: {} }
            this.filter = {
                'filter_query[platforms][in_array]': filterParams.platform,
                search_term: filterParams.search,
                sort_by: filterParams.sortBy
            }

            this.$store.dispatch('RESET_PAGE_PARAMS')
            this.getList().then(res => {
                this.data = res
            })
        })
    },
}