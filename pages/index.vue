<template>
    <section>
        <v-container grid-list-md fluid>
            <div class="body-2 pb-3">Accumulated list of all the games I used to play and am currently playing with. :)</div>

            <list-filter :platformItems="platformItems" />

            <v-layout row wrap>
                <v-flex
                    md2 sm3 xs6 
                    d-flex  
                    v-for="item in data.stories" 
                    :key="item.id"
                >
                    <game-card :item="item" />
                </v-flex>
            </v-layout>
        </v-container> 

        <infinite-loading 
            v-if="isDataNull"
            @infinite="infiniteHandler" 
            ref="infiniteLoading"
            class="mb-3"
        >
            
            <span slot="no-more">&nbsp;</span>
            <span slot="no-results">&nbsp;</span>

            <v-flex md12 class="text-xs-center" slot="spinner">
                <v-progress-circular indeterminate color="orange"></v-progress-circular>
            </v-flex>

        </infinite-loading>
    </section> 
</template>

<script>
import PagedList from '~/mixins/paged-list.js'

export default {
    mixins: [ PagedList ],
}
</script>