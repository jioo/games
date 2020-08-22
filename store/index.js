export const state = () => ({
    params: {
        token: process.env.publicToken,
        cv: ''
    }
});

export const mutations = {
    UPDATE_CACHE_VERSION(state, payload) {
        state.params.cv = payload
    }
};

export const actions = {
    UPDATE_CACHE_VERSION({ commit, state }) {
        return this.$axios.get('spaces/me', { params: { token: state.params.token } }).then((res) => {
            console.log(res)
            commit('UPDATE_CACHE_VERSION', res.space.version)
        })
    }
};
