<template>
    <v-card>
        <v-img
            :src="item.value"
            lazy-src="/place-holder.jpg"
            height="250"
            @click.prevent="openGallery()">
                <v-layout
                    slot="placeholder"
                    fill-height
                    align-center
                    justify-center
                    ma-0>
                    <v-progress-circular indeterminate color="orange"></v-progress-circular>
                </v-layout>
            </v-img>
    </v-card>
</template>

<script>
export default {
    props: ['item', 'index'],

    methods: {
        openGallery () {
            this.$nuxt.$emit('TRIGGER_CAROUSEL', this.index)
        }
    }
}
</script>