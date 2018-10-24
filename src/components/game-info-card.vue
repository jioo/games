<template>
    <v-card class="elevation-12">
        <v-toolbar color="orange">
            <v-btn icon :to="{ path: '/' }">
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-card-text>
            <v-layout row wrap>
                <v-flex md6 sm12 xs12> 
                    <v-img
                        :src="item.story.content.image"
                        lazy-src="/place-holder.jpg"
                        max-height="500"
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
                </v-flex>

                <v-flex md6 sm12 xs12 class="pa-2">
                    <section class="mb-2">
                        <h2 class="orange--text">{{ item.story.name }} </h2>
                        <span>{{ platforms }}</span>
                    </section>
                    <hr class="mb-2">

                    <div id="mark-down" v-html="$md.render(markdown)" ></div>
                </v-flex>
                
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['item'],

    data () {
        return {
            markdown: this.item.story.content.body,
            model: '# Hello World!'
        }
    },

    computed: {
        platforms () {
            return Object.keys(this.item.story.content.platforms)
                .map(m => this.item.story.content.platforms[m].name)
                .join(', ')
        }
    },
}
</script>

