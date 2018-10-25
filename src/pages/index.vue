<template>
    <section>
        <v-container grid-list-md fluid>
            <!-- <v-layout row wrap mt-4 v-if="!isStoriesNull">
                <v-flex md12 class="text-xs-center">
                    <v-progress-circular indeterminate color="orange"></v-progress-circular>
                </v-flex>
            </v-layout> -->

            <list-filter :platformItems="platformItems" />

            <v-layout row wrap>
                <v-flex d-flex md2 sm3 xs6 v-for="item in data.stories" :key="item.id">
                    <game-card :item="item" />
                </v-flex>
            </v-layout>
        </v-container> 

        <infinite-loading 
            v-if="isStoriesNull"
            @infinite="infiniteHandler" 
            ref="infiniteLoading"
            class="mb-3">
            
            <span slot="no-more">&nbsp;</span>
            <span slot="no-results">&nbsp;</span>

            <v-flex md12 class="text-xs-center" slot="spinner">
                <v-progress-circular indeterminate color="orange"></v-progress-circular>
            </v-flex>

        </infinite-loading>
    </section> 
</template>

<script>
import FilterMixin from '~/mixins/filter.js'
import InfiniteLoadingMixin from '~/mixins/infinite-loading.js'

export default {
    mixins: [ FilterMixin, InfiniteLoadingMixin ],

    methods: {
        getList () {
            const params = {
                'filter_query[component][all]': 'game-info',
                resolve_relations: 'platforms',
                ...this.$store.state.params,
                ...this.filter
            }
            
            return this.$axios.get('stories', { params })
        }
    },

    mounted () {
        this.$store.dispatch('RESET_PAGE_PARAMS')
        this.$store.dispatch('STORE_CACHE_VERSION')

        this.getList().then(res => {
            this.data = res 
        })
    }
}
</script>

