(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{286:function(t,e,r){"use strict";r(137),r(287),r(35);var s,a,n=r(5),i=r(21);e.a={data:function(){return{data:{stories:{}},params:Object(i.a)({page:1,per_page:"/"===this.$route.path?12:6,resolve_relations:"platforms",resolve_links:1},this.$store.state.params),filter:{"filter_query[platforms][in_array]":"",search_term:"",sort_by:"published_at:desc"}}},computed:{isDataNull:function(){return this.data.stories.length}},methods:{infiniteHandler:(a=Object(n.a)(regeneratorRuntime.mark(function t(e){var r,s,a,n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=this.data.stories,s=this.params.per_page||12,a=parseInt(Math.ceil(this.data.stories.length/s))+1,this.params.page=a,t.next=6,this.getList();case 6:(n=t.sent).stories.length>0&&-1===r.findIndex(function(t){return t.id===n.stories[0].id})?(this.data.stories=r.concat(n.stories),e.loaded()):e.complete();case 8:case"end":return t.stop()}},t,this)})),function(t){return a.apply(this,arguments)}),getList:function(){var t=Object(i.a)({"filter_query[component][all]":"/"===this.$route.path?"game-info":"gallery-info"},this.params,this.filter);return this.$axios.get("stories",{params:t})}},mounted:function(){var t=this;this.getList().then(function(e){t.data=e})},created:function(){var t=this;this.$nuxt.$on("APPLY_FILTER",function(e){var r=t.$refs.infiniteLoading;t.params.page=1,t.filter={"filter_query[platforms][in_array]":e.platform,search_term:e.search,sort_by:e.sortBy},r&&r.stateChanger.reset(),t.getList().then(function(e){t.data=e})})},asyncData:(s=Object(n.a)(regeneratorRuntime.mark(function t(e){var r,s,a;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.app,s=e.store,t.next=3,s.dispatch("UPDATE_CACHE_VERSION");case 3:return a=Object(i.a)({"filter_query[component][all]":"platform",sort_by:"name:asc"},s.state.params),t.abrupt("return",r.$axios.get("stories",{params:a}).then(function(t){return{platformItems:t.stories}}));case 5:case"end":return t.stop()}},t,this)})),function(t){return s.apply(this,arguments)})}},287:function(t,e,r){"use strict";var s=r(6),a=r(138)(6),n="findIndex",i=!0;n in[]&&Array(1)[n](function(){i=!1}),s(s.P+s.F*i,"Array",{findIndex:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),r(50)(n)},288:function(t,e,r){"use strict";r.r(e);var s={mixins:[r(286).a]},a=r(2),n=Object(a.a)(s,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",[r("v-container",{attrs:{"grid-list-md":"",fluid:""}},[r("list-filter",{attrs:{platformItems:t.platformItems}}),t._v(" "),r("v-layout",{attrs:{row:"",wrap:""}},t._l(t.data.stories,function(t){return r("v-flex",{key:t.id,attrs:{md4:"",sm6:"",xs12:""}},[r("gallery-card",{attrs:{item:t}})],1)}))],1),t._v(" "),t.isDataNull?r("infinite-loading",{ref:"infiniteLoading",staticClass:"mb-3",on:{infinite:t.infiniteHandler}},[r("span",{attrs:{slot:"no-more"},slot:"no-more"},[t._v(" ")]),t._v(" "),r("span",{attrs:{slot:"no-results"},slot:"no-results"},[t._v(" ")]),t._v(" "),r("v-flex",{staticClass:"text-xs-center",attrs:{slot:"spinner",md12:""},slot:"spinner"},[r("v-progress-circular",{attrs:{indeterminate:"",color:"orange"}})],1)],1):t._e()],1)},[],!1,null,null,null);n.options.__file="index.vue";e.default=n.exports}}]);