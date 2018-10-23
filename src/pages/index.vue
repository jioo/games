<template>
    <div>
        <v-container grid-list-md fluid>
            <v-layout row wrap mt-4 v-if="!isStoriesNull">
                <v-flex md12 class="text-xs-center">
                    <v-progress-circular indeterminate color="orange"></v-progress-circular>
                </v-flex>
            </v-layout>

            <v-layout row wrap>
                <v-flex d-flex md2 sm3 xs6 v-for="item in data.stories" :key="item.id">
                    <game-card :item="item.content" />
                </v-flex>
            </v-layout>
        </v-container> 

        <infinite-loading 
            v-if="isStoriesNull" 
            @infinite="infiniteHandler" 
            ref="infiniteLoading"
            class="mb-3">
            
            <span slot="no-more">&nbsp;</span>

            <v-flex md12 class="text-xs-center" slot="spinner">
                <v-progress-circular indeterminate color="orange"></v-progress-circular>
            </v-flex>

        </infinite-loading>
    </div> 
</template>

<script>
export default {
    data() {
        return {
            data: {
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
            const next_page = parseInt(this.data.stories.length / per_page) + 1;

            this.$store.dispatch('UPDATE_CURRENT_PAGE', next_page)

            const result = await this.getList()
            const isExists = stories.findIndex(m => m.id === result.stories[0].id)

            if (isExists === -1) {
                this.data.stories = stories.concat(result.stories);
                $state.loaded();

            } else {
                $state.complete();
            }
        },

        getList () {
            return this.$axios.get('stories', { params: this.$store.state.params })
        }
    },

    mounted () {
        this.$store.dispatch('STORE_CACHE_VERSION')

        this.getList().then(res => {
            this.data = res 
        })
    }
}
</script>

