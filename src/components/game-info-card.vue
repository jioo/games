<template>
    <v-card class="elevation-12">
        <v-toolbar color="orange">
            <v-btn icon @click.prevent="goBack()">
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
                        max-height="500">
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

    methods: {
        goBack () {
            this.$router.go(-1)
        }
    },

    computed: {
        platforms () {
            const { platforms } = this.item.story.content

            if (!platforms) return

            return Object.keys(platforms)
                .map(m => platforms[m].name)
                .join(', ')
        }
    },
}
</script>

