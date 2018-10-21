export default ({$axios}) => {
    $axios.onResponse(response => {
        return response.data
    })
}