export default {

    data () {
        return {
            data : {
                stories: {}
            },

            // check: https://www.storyblok.com/docs/management-api/stories
            // for more info about params and filters
            params: {
                page: 1,
                per_page: this.$route.path === '/' ? 12: 6 /* change per_page param depending on current page */,
                resolve_relations: 'platforms',
                resolve_links: 1,
                ...this.$store.state.params /* get token & cached version from vuex */
            },

            // default filters
            filter: {
                'filter_query[platforms][in_array]': '',
                search_term: '',
                sort_by: 'published_at:desc'
            }
        }
    },

    computed: {
        isDataNull () {
            return this.data.stories.length
        }
    },

    methods: {
        // check: https://peachscript.github.io/vue-infinite-loading/guide/start-with-hn.html
        async infiniteHandler($state) {

            // set up variables
            let { stories } = this.data
            const per_page = this.params.per_page || 12
            
            // compute next page
            const nextPage = parseInt(Math.ceil(this.data.stories.length / per_page) ) + 1
            
            // send request to get data of next page
            this.params.page = nextPage
            const result = await this.getList()

            
            if (result.stories.length > 0) {

                // since Storyblok API doesn't return meta for grand total number of data,
                // I will determine the `next page` data if it is the last page by checking
                // if the first element already exists in current list.
                const isExists = stories.findIndex(m => m.id === result.stories[0].id)

                if (isExists === -1) {

                    // if the element does not exist in current list, append the result
                    this.data.stories = stories.concat(result.stories)
                    $state.loaded()

                } else {

                    // stops infinite loading component to load more data
                    $state.complete()

                }

            } else {

                // stops infinite loading component to load more data
                $state.complete()

            }
        },

        getList () {
            const params = {
                'filter_query[component][all]': this.$route.path === '/' ? 'game-info': 'gallery-info',
                ...this.params,
                ...this.filter
            }
            
            return this.$axios.get('stories', { params })
        }
    },

    mounted () {
        this.getList().then(res => {
            this.data = res 
        })
    },

    created () {
        // handle event bus in `components/list-filter.vue`
        this.$nuxt.$on('APPLY_FILTER', (filterParams) => {
            const infiniteLoading = this.$refs.infiniteLoading
            
            this.params.page = 1
            this.filter = {
                'filter_query[platforms][in_array]': filterParams.platform,
                search_term: filterParams.search,
                sort_by: filterParams.sortBy
            }
            
            // reset the infinite loading state when applying new filter
            if (infiniteLoading) infiniteLoading.stateChanger.reset()
            
            this.getList().then(res => {
                this.data = res
            })
        })
    },

    async asyncData ({ app, store }) {
        await store.dispatch('UPDATE_CACHE_VERSION')

        const params = {
            'filter_query[component][all]': 'platform',
            sort_by: 'name:asc',
            ...store.state.params
        }
        
        return app.$axios.get('stories', { params })
            .then((result) => {
                return { platformItems: result.stories }
            })
    }
}