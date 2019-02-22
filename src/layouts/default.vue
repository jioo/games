<template>
    <v-app dark>
        <!-- APP HEADER -->
        <v-toolbar app fixed clipped-left height="80">
            
            <v-toolbar-side-icon 
                class="hidden-md-and-up" 
                @click.stop="drawer = !drawer"
            ></v-toolbar-side-icon>

            <!-- TOP NAVBAR -->
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn 
                    flat class="px-5"
                    active-class="orange--text"
                    v-for="item in navigations.slice(0, 2)"
                    :key="`nav-${item.name}`"
                    :to="{ path: item.path }"
                >
                        {{ item.name }}
                </v-btn>
            </v-toolbar-items>

            <v-spacer></v-spacer>
            
            <v-toolbar-title :class="{ 'pt-3': true, 'pr-5': $vuetify.breakpoint.smAndDown }">
                <img src="~/assets/jio.png" alt="jio">
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn 
                    flat class="px-5"
                    active-class="orange--text"
                    v-for="item in navigations.slice(2)"
                    :key="`nav-${item.name}`"
                    :to="{ path: item.path }"
                >
                        {{ item.name }}
                </v-btn>
            </v-toolbar-items>

        </v-toolbar>

        <!-- SIDE NAVBAR -->
        <v-navigation-drawer v-model="drawer" fixed class="hidden-md-and-up">
            <v-list class="pa-1">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img src="~/assets/jio.png">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>Gamehub</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

            <v-list>
                <v-divider></v-divider>
                <v-list-tile
                    v-for="item in navigations" 
                    :key="`side-nav-${item.name}`"
                    :to="{ path: item.path }"  
                    v-ripple active-class="orange--text"
                >
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <!-- APP CONTENT -->
        <v-content>
            <v-slide-x-transition mode="out-in">
                <nuxt />
            </v-slide-x-transition>
            <scroll-to-top />
        </v-content>
        
        <!-- APP FOOTER -->
        <v-footer class="text-xs-center py-3" height="auto">
            <v-layout>
                <v-flex xs12>
                    <v-icon small class="white--text">code</v-icon>
                    with
                    <v-icon small class="red--text">favorite</v-icon>
                    by <span class="link orange--text" @click.prevent="redirect()">Justine Joshua Quiazon</span>
                    <v-icon small class="white--text">copyright</v-icon>
                    2018 - 
                    {{ new Date().getFullYear() }}
                </v-flex>
            </v-layout>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    data () {
        return {
            drawer: false,
            navigations: [
                { name: 'Game List', path: '/' },
                { name: 'My Gallery', path: '/gallery' },
                { name: 'Top List', path: '/top-list' },
                { name: 'IGN', path: '/ign' }
            ]
        }
    },

    methods: {
        redirect () {
            window.open('https://jioo.github.io/', '_blank')
        }
    }
}
</script>

<style scoped>
    .link {
        text-decoration: underline;
        cursor: pointer;
    }
</style>

