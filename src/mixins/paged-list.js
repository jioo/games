export default {

    data () {
        return {
            data : {
                stories: {}
            },
            params: {
                page: 1,
                per_page: this.$route.path === '/' ? 12: 4,
                resolve_relations: 'platforms',
                resolve_links: 1,
                ...this.$store.state.params
            },
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
        async infiniteHandler($state) {
            let { stories } = this.data
            const per_page = this.params.per_page || 12
            
            const nextPage = parseInt(Math.ceil(this.data.stories.length / per_page) ) + 1
            
            this.params.page = nextPage
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
        },

        getNextPage () {
            const { per_page } = this.params
            
            const nextPage = parseInt(Math.ceil(this.data.stories.length / per_page)) + 1
            return nextPage
        },

        getList () {
            const params = {
                'filter_query[component][all]': this.$route.path === '/' ? 'game-info': 'gallery-info',
                ...this.params,
                ...this.filter
            }
            
            console.log(params)
            return this.$axios.get('/api/stories', { params })
        }
    },

    mounted () {
        this.getList().then(res => {
            this.data = res 
        })
    },

    created () {
        this.$nuxt.$on('APPLY_FILTER', (filterParams) => {
            
            this.params.page = 1
            this.filter = {
                'filter_query[platforms][in_array]': filterParams.platform,
                search_term: filterParams.search,
                sort_by: filterParams.sortBy
            }

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
        
        return app.$axios.get('/api/stories', { params })
            .then((result) => {
                return { platformItems: result.stories }
            })
    }
}