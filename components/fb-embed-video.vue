<template>
    <div class="container">
        <iframe 
            :src="src" 
            scrolling="no" 
            frameborder="0" 
            allowTransparency="true" 
            allow="encrypted-media" 
            allowFullScreen="true"
        ></iframe>
    </div>
</template>

<script>
export default {
    props: ['videoID'],

    computed: {
        src () {
            return `https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fjio.quiazon%2Fvideos%2F${this.videoID}%2F&show_text=false&appId=1211353125687418`
        }
    },
}
</script>

<style scoped>
.container {
    position: relative;
    overflow: hidden;
    padding-top: 56.25%;
}

iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
}
</style>