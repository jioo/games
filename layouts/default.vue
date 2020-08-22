<template>
    <v-app dark>
        <!-- APP HEADER -->
        <v-sheet>
            <v-toolbar fixed height="80">

                <v-app-bar-nav-icon
                    class="hidden-md-and-up"
                    @click.stop="drawer = !drawer"
                ></v-app-bar-nav-icon>

                <!-- TOP NAVBAR -->
                <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn
                        text
                        class="px-5"
                        width="140"
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
                        text
                        class="px-5"
                        width="140"
                        active-class="orange--text"
                        v-for="item in navigations.slice(2)"
                        :key="`nav-${item.name}`"
                        :to="{ path: item.path }"
                    >
                            {{ item.name }}
                    </v-btn>
                </v-toolbar-items>

            </v-toolbar>
        </v-sheet>

        <!-- SIDE NAVBAR -->
        <v-navigation-drawer v-model="drawer" fixed class="hidden-md-and-up">
            <v-list>
                <v-list-item>
                    <v-list-item-avatar>
                        <img src="~/assets/jio.png">
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>Gamehub</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item
                    v-for="item in navigations"
                    :key="`side-nav-${item.name}`"
                    :to="{ path: item.path }"
                    v-ripple active-class="orange--text"
                >
                    <v-list-item-content>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <!-- APP CONTENT -->
        <v-main>
            <v-slide-x-transition mode="out-in">
                <nuxt />
            </v-slide-x-transition>
            <scroll-to-top />
        </v-main>

        <!-- APP FOOTER -->
        <v-footer class="text-center py-3" height="auto">
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
                { name: 'IGN', path: '/ign' },
                // { name: 'RIG', path: '/ign' },
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

