<template>
    <v-hover>
        <v-card 
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 24 : 2}`">
            <v-img
                :src="item.content.image"
                lazy-src="/place-holder.jpg"
                height="250"
                style="cursor: pointer;"
                @click="redirectTo(item)">
                <v-layout
                    slot="placeholder"
                    fill-height
                    align-center
                    justify-center
                    ma-0>
                    <v-progress-circular indeterminate color="orange"></v-progress-circular>
                </v-layout>
            </v-img>

                <v-card-text>
                    <span class="orange--text">{{ item.content.name }}</span> <br/>
                    {{ platforms }}
                </v-card-text>
        </v-card>
    </v-hover>
</template>

<script>
export default {
    props: ['item'],

    computed: {
        platforms () {
            const { platforms } = this.item.content

            if (!platforms) return

            return Object.keys(platforms)
                .map(m => platforms[m].name)
                .join(', ')
        }
    },

    methods: {
        redirectTo (item) {
            const { slug } = item
            this.$router.push({ path: `/${slug}` })
        }
    }
}
</script>
