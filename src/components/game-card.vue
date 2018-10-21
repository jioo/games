<template>
    <v-hover>
        <v-card 
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 24 : 2}`">
            <v-img
                :src="item.image"
                lazy-src="/place-holder.jpg"
                height="250">
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
                    <span class="orange--text">{{ item.name }}</span> <br/>
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
            return Object.keys(this.item.platforms)
                .map(m => this.item.platforms[m].name)
                .join(', ')
        }
    }
}
</script>
