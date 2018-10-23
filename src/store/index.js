import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: {
            params: {
                'filter_query[component][all]': 'game-info',
                resolve_relations: 'platforms',
                token: process.env.publicToken,
                cv: '',
                page:  1,
                per_page: 200
            }
        },

        mutations: {
            SET_CACHE_VERSION(state, payload) {
                state.params.cv = payload
            },

            SET_CURRENT_PAGE(state, payload) {
                state.params.page = payload
            }
        },

        actions: {
            STORE_CACHE_VERSION({ commit, state }) {
                return this.$axios.get('spaces/me', { params: { token: state.params.token } }).then((res) => {
                    commit('SET_CACHE_VERSION', res.space.version)
                    commit('SET_CURRENT_PAGE', 1)
                })
            },

            UPDATE_CURRENT_PAGE({ commit }, payload) {
                commit('SET_CURRENT_PAGE', payload)
            }
        }
    })
}

export default createStore