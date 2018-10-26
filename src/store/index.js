import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: {
            params: {
                token: process.env.publicToken,
                cv: ''
            }
        },

        mutations: {
            UPDATE_CACHE_VERSION(state, payload) {
                state.params.cv = payload
            }
        },

        actions: {
            UPDATE_CACHE_VERSION({ commit, state }) {
                return this.$axios.get('spaces/me', { params: { token: state.params.token } }).then((res) => {
                    commit('UPDATE_CACHE_VERSION', res.space.version)
                })
            }
        }
    })
}

export default createStore