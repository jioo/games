import Vue from 'vue'
import ListFilter from '~/components/list-filter.vue'
import GalleryCard from '~/components/gallery-card.vue'
import GalleryInfoCard from '~/components/gallery-info-card.vue'
import GameCard from '~/components/game-card.vue'
import GameInfoCard from '~/components/game-info-card.vue'
import TopListItem from '~/components/top-list-item.vue'
import CurrentlyPlaying from '~/components/currently-playing.vue'
import IgnList from '~/components/ign-list.vue'
import ScrollToTop from '~/components/scroll-to-top.vue'

Vue.component('list-filter', ListFilter)
Vue.component('gallery-card', GalleryCard)
Vue.component('gallery-info-card', GalleryInfoCard)
Vue.component('game-card', GameCard)
Vue.component('game-info-card', GameInfoCard)
Vue.component('top-list-item', TopListItem)
Vue.component('currently-playing', CurrentlyPlaying)
Vue.component('ign-list', IgnList)
Vue.component('scroll-to-top', ScrollToTop)