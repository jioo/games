export default {
    data () {
        return {
            data : {
                stories: {}
            }
        }
    },

    computed: {
        isStoriesNull () {
            return this.data.stories.length
        }
    },

    methods: {
        async infiniteHandler($state) {
            let { stories } = this.data
            const { per_page } = this.$store.state.params
            const next_page = parseInt(Math.ceil(this.data.stories.length / per_page)) + 1;

            this.$store.dispatch('UPDATE_CURRENT_PAGE', next_page)
            const result = await this.getList()

            if (result.stories.length > 0) {
                const isExists = stories.findIndex(m => m.id === result.stories[0].id)
                if (isExists === -1) {
                    this.data.stories = stories.concat(result.stories)
                    $state.loaded()
                } else {
                    $state.complete()
                }
            } else {
                 $state.complete()
            }
        }
    },

    async asyncData ({ app, store }) {
        await store.dispatch('STORE_CACHE_VERSION')

        const params = {
            'filter_query[component][all]': 'platform',
            sort_by: 'name:asc',
            ...store.state.params
        }

        const result = await app.$axios.get('stories', { params })
        return { platformItems: result.stories }
    }
}