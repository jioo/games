<template>
    <v-hover>
        <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 24 : 2}`">
            <v-img
                :src="item.content.value"
                lazy-src="/place-holder.jpg"
                height="250"
                style="cursor: pointer;"
                @click.prevent="redirectTo(item)">
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
    </v-hover>
</template>

<script>
export default {
    props: ['item'],

    methods: {
        redirectTo (item) {
            const { id } = item
            const { slug } = item.content.game.story
            this.$router.push({ path: `/gallery/${slug}/${id}` })
        }
    }
}
</script>