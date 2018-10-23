<template>
    <v-container grid-list-lg>
        <v-layout row wrap>
            <v-flex md6 xs12 v-for="(item, index) in data" :key="item._uid">
                <gallery-card :item="item" :index="index" />
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <gallery-carousel :data="data" />
        </v-layout> 
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            data: {}
        }
    },

    methods: {
        // async infiniteHandler($state) {
        //     const { per_page } = this.$store.state.params
        //     const next_page = parseInt(this.data.length / per_page) + 1;

        //     this.$store.dispatch('UPDATE_CURRENT_PAGE', next_page)

        //     this.getList().then(list => {
        //         const array = this.getGalleryOnList(list)

        //         const result = this.flattenArrayToObjects(array)
        //     })

        //     const isExists = this.data.findIndex(m => m.id === result[0]._uid)

        //     if (isExists === -1) {
        //         this.data.stories = this.data.concat(result.stories);
        //         $state.loaded();

        //     } else {
        //         $state.complete();
        //     }
        // },

        getList () {
            return this.$axios.get('stories', { params: this.$store.state.params })
        },

        getGalleryOnList (list) {
            let gallery = list.stories
                .filter(m => m.content.gallery.length > 0)
                .map(m => m.content.gallery)

            return gallery
        },

        flattenArrayToObjects (array) {
            return [].concat.apply([], array)
        }
    },

    mounted () {
        this.$store.dispatch('STORE_CACHE_VERSION')

        this.getList().then(list => {

            const array = this.getGalleryOnList(list)

            this.data = this.flattenArrayToObjects(array)
            
        })
    }
}
</script>