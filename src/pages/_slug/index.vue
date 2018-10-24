<template>
    <div>
        {{ slug }}
    </div>
</template>

<script>
export default {
    data () {
        return {
            slug: this.$route.params
        }
    }
}
</script>