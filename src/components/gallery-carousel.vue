<template>
    <v-flex md12>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :lazy="true">
                <v-card>
                    <v-toolbar dark color="orange">
                        <v-btn icon dark @click.native="dialog = false">
                            <v-icon>close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Gallery</v-toolbar-title>
                    </v-toolbar>

                    <v-card-actions>
                        <v-btn flat @click="prev">
                            <v-icon>keyboard_arrow_left</v-icon>
                        </v-btn>
                        <v-btn flat @click="next">
                            <v-icon>keyboard_arrow_right</v-icon>
                        </v-btn>
                    </v-card-actions>
 
                    <v-window v-model="onboarding">
                        <v-window-item v-for="(item, index) in data" :key="`card-${index}`">
                            <v-layout row wrap>
                                <v-flex md12>
                                    <v-card>
                                        <v-img :src="item.value" lazy-src="/place-holder.jpg">
                                        </v-img>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-window-item>
                    </v-window>
                    
                </v-card>
            </v-dialog>
        </v-layout>
    </v-flex>
</template>

<script>
export default {
    props: ['data'],
    
    data () {
        return {
            dialog: false,
            onboarding: 0
        }
    },

    methods: {
        next () {
            const length = this.data.length

            this.onboarding = this.onboarding + 1 === length
                ? 0
                : this.onboarding + 1
        },

        prev () {
            const lenght = this.data.length

            this.onboarding = this.onboarding - 1 < 0
                ? length - 1
                : this.onboarding - 1
        }
    },

    mounted () {
        this.$nuxt.$on('TRIGGER_CAROUSEL', index => {
            index = index || 0

            this.onboarding = index
            this.dialog = true
        })
    }
}
</script>