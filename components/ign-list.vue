<template>
    <section>
        <v-layout row wrap>
            <v-flex md12>
                
            </v-flex>

            <v-flex md12>
                <v-card class="elevation-12">
                    <v-card-title>
                        <h2 class="orange--text">In Game Name (IGN)</h2>
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Search"
                            color="orange"
                            single-line
                            hide-details
                        ></v-text-field>
                    </v-card-title>

                    <v-data-table
                        :headers="headers"
                        :items="data.content.list"
                        :search="search"
                        disable-initial-sort
                        hide-actions
                    >
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.game.story.name }}</td>
                            <td>{{ props.item.ign }}</td>
                            <td>{{ props.item.description }}</td>
                        </template>
                    </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>
    </section>
</template>

<script>
export default {
    props: ['data'],

    data () {
        return {
            search: '',
            headers: [
                { text: 'Game', value: 'game.story.name' },
                { text: 'IGN', value: 'ign' },
                { text: '', value: 'description', sortable: false }
            ]
        }
    }
}
</script>