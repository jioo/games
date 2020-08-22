export default ({$axios}) => {
    $axios.setBaseURL('https://api.storyblok.com/v1/cdn/')
    $axios.onResponse(response => {
        return response.data
    })


}
