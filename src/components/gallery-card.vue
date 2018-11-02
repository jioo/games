<template>
    <v-hover>
        <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 24 : 2}`"
        >
            <v-img
                :src="showImageBaseOnType()"
                lazy-src="/place-holder.jpg"
                height="250"
                style="cursor: pointer;"
                @click.prevent="redirectTo(item)"
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

                    <v-layout
                        v-if="item.content.type === 'youtube'" 
                        column 
                        align-center 
                        justify-center 
                        fill-height
                    >
                        <v-icon x-large>play_circle_filled</v-icon>
                    </v-layout>

                    <v-slide-x-transition mode="out-in">
                        <div
                            v-if="hover"
                            class="d-flex description-reveal orange darken-2 white--text pa-2"
                        >
                            {{ item.content.description}}
                        </div>
                    </v-slide-x-transition>
            </v-img>
        </v-card>
    </v-hover>
</template>

<script>
export default {
    props: ['item'],

    methods: {
        getPreviewImage (youtubeId) {
            return `https://img.youtube.com/vi/${youtubeId}/0.jpg`
        },

        showImageBaseOnType () {
            const { type, value } = this.item.content
            let result = ""

            switch (type) {
                case 'image':
                    result = value
                    break

                case 'youtube':
                    result = this.getPreviewImage(value)
                    break

                default:
                    break
            }

            
            return result
        },

        redirectTo (item) {
            const { id } = item
            const { slug } = item.content.game.story
            this.$router.push({ path: `/gallery/${slug}/${id}` })
        }
    }
}
</script>

<style scoped>
    .description-reveal {
        align-items: center;
        bottom: 0;
        justify-content: center;
        position: absolute;
        width: 100%;
        height: 15%;
    }
</style>