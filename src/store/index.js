import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: {
            params: {
                token: process.env.publicToken,
                cv: '',
                page:  1,
                per_page: 12
            }
        },

        mutations: {
            SET_CACHE_VERSION(state, payload) {
                state.params.cv = payload
            },

            SET_CURRENT_PAGE(state, payload) {
                state.params.page = payload
            },

            SET_PER_PAGE(state, payload) {
                state.params.per_page = payload
            },

            RESET_PAGE_PARAMS(state) {
                state.params.page = 1
                state.params.per_page = 12
            }
        },

        actions: {
            STORE_CACHE_VERSION({ commit, state }) {
                return this.$axios.get('spaces/me', { params: { token: state.params.token } }).then((res) => {
                    commit('SET_CACHE_VERSION', res.space.version)
                })
            },

            UPDATE_CURRENT_PAGE({ commit }, payload) {
                commit('SET_CURRENT_PAGE', payload)
            },

            UPDATE_PER_PAGE({ commit }, payload) {
                commit('SET_PER_PAGE', payload)
            },

            RESET_PAGE_PARAMS({ commit }) {
                commit('RESET_PAGE_PARAMS')
            }
        }
    })
}

export default createStore