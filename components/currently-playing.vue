<template>
    <section>
        <v-layout row wrap>
            <v-flex md12 mb-2>
                <h2 class="orange--text">Currently Playing</h2>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex 
                md3 mb-2 
                v-for="item in data.content.list"
                :key="item._uid"
            >
                <game-card :item="item.game.story"></game-card>
            </v-flex>
        </v-layout>
    </section>
</template>

<script>
export default {
    props: ['data']
}
</script>