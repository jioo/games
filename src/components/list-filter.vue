<template>
    <section>
        <v-layout row wrap class="mb-3">
            <v-flex md6 sm12 xs12>
                <v-text-field
                    box
                    v-model="filter.search"
                    color="orange"
                    hide-details
                    placeholder="Search by game title"
                    @keyup.enter.prevent.native="applyFilter()"
                ></v-text-field>
            </v-flex>
            <v-flex md6 sm12 xs12 :class="{ 'pt-2 mt-1': $vuetify.breakpoint.mdAndUp }">
                <v-btn class="ml-0" @click.prevent="filterForm = !filterForm" >
                    <v-icon>filter_list</v-icon>
                    &nbsp; Filter
                </v-btn>
            </v-flex>
        </v-layout>

        <v-slide-y-transition mode="out-in">
            <section v-show="filterForm">
                <v-layout row wrap>
                    <v-flex md3>
                        <v-combobox
                            box
                            label="Platform"
                            clearable
                            v-model="filter.platform"
                            item-text="name"
                            multiple
                            :items="platformItems">
                        </v-combobox>
                    </v-flex>
                    <v-flex md3>
                        <v-select
                            box
                            label="Sort by"
                            v-model="filter.sortBy"
                            :items="sortItems">
                        </v-select>
                    </v-flex>
                </v-layout>
                <v-layout row wrap  mb-3>
                    <v-flex md6>
                        <v-btn color="orange" class="ml-0" @click.prevent="applyFilter()">Apply</v-btn>
                        <v-btn @click.prevent="resetFilter()">Reset</v-btn>
                    </v-flex>
                </v-layout>
            </section>
        </v-slide-y-transition>
    </section>
</template>

<script>
export default {
    props: ['platformItems'],

    data () {
        return {
            filter: {
                search: '',
                platform: '',
                sortBy: 'name:asc'
            },
            filterForm: false,
            sortItems: [
                { text: 'Name (asc)', value: 'name:asc' },
                { text: 'Name (desc)', value: 'name:desc' },
                { text: 'Creation date (asc)', value: 'created_at:asc' },
                { text: 'Creation date (desc)', value: 'created_at:desc' },
                { text: 'Last updated date (asc)', value: 'published_at:asc' },
                { text: 'Last updated date (desc)', value: 'published_at:desc' },
            ]
        }
    },

    methods: {
        resetFilter () {
            this.filter = {
                search: '',
                platform: '',
                sortBy: 'name:asc'
            }
            
            this.applyFilter()
        },

        applyFilter () {
            let filterParams = Object.assign({}, this.filter)
            
            // map platforms array into string
            const { platform } = filterParams
            if(platform.length > 0) {
                filterParams.platform = platform.map(m => m.uuid).join(",")
            }

            this.$nuxt.$emit('APPLY_FILTER', filterParams) 
            this.filterForm = false
        }
    }
}
</script>