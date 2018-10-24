<template>
    <v-app dark>
        <!-- APP HEADER -->
        <v-toolbar app fixed clipped-left height="80">
            <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>

            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat class="px-5" :to="{ path: '/' }" active-class="orange--text">Game List</v-btn>
                <v-btn flat class="px-5" :to="{ path: '/gallery' }" active-class="orange--text">My Gallery</v-btn>
            </v-toolbar-items>

            <v-spacer></v-spacer>
            
            <v-toolbar-title :class="{ 'pt-3': true, 'pr-5': $vuetify.breakpoint.smAndDown }">
                <img src="~/assets/jio.png" alt="jio">
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat class="px-5">Currently Playing</v-btn>
                <v-btn flat class="px-5">IGN</v-btn>
            </v-toolbar-items>

        </v-toolbar>

        <!-- APP CONTENT -->
        <v-content>
            <v-slide-x-transition mode="out-in">
                <nuxt />
            </v-slide-x-transition>
        </v-content>
        
        <!-- APP FOOTER -->
        <v-footer class="py-3 text-xs-center" height="auto">
            <v-layout>
                <v-flex xs12>
                    <v-icon small class="white--text">code</v-icon>
                    with
                    <v-icon small class="red--text">favorite</v-icon>
                    by Justine Joshua Quiazon
                    <v-icon small class="white--text">copyright</v-icon>
                    {{ new Date().getFullYear() }}
                </v-flex>
            </v-layout>
        </v-footer>
    </v-app>
</template>