<template>
    <v-card class="elevation-12">
        <v-toolbar color="orange">
            <v-toolbar-title>{{ item.name }}</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
            <v-layout row wrap v-for="(listItem, index) in item.content.list" :key="index">
                <v-flex md4 sm4 xs4 v-if="index === 0">
                    <v-img
                        :src="listItem.game.story.content.image"
                        lazy-src="/place-holder.jpg"
                        height="150">
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
                <v-flex :class="{ 'md12 sm12 xs12': index !== 0, 'md8 sm8 xs8': index === 0 }">
                    <h2 class="orange--text">
                        <span v-if="index !== 0"><v-icon color="orange">fiber_manual_record</v-icon>&nbsp;</span>
                        {{ listItem.game.story.name }} 
                    </h2>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['item']
}
</script>