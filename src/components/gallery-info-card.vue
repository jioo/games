<template>
    <v-card md6>
        <v-toolbar color="orange">
            <v-btn icon @click.prevent="goBack()">
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-card-text>
            <v-layout row wrap>
                <v-flex md8 sm12 xs12 offset-md2 class="pa-2">
                    <section class="mb-2">
                        <h2 class="orange--text">{{ item.story.content.game.story.name }} </h2>
                        <span>{{ item.story.content.description }}</span>
                    </section>
                </v-flex>

                <v-flex md8 sm12 xs12 offset-md2>
                    <v-img
                        v-if="item.story.content.type === 'image'"
                        :src="item.story.content.value"
                        lazy-src="/place-holder.jpg"
                        max-height="500"
                    >
                        <v-layout
                            slot="placeholder"
                            fill-height
                            align-center
                            justify-center
                            ma-0
                        >
                            <v-progress-circular indeterminate color="orange"></v-progress-circular>
                        </v-layout>
                    </v-img>
                    
                    <youtube
                        v-else
                        :video-id="item.story.content.value"
                        class="youtube-container"
                    ></youtube>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['item'],

    methods: {
        goBack () {
            this.$router.go(-1)
        }
    }
}
</script>