importScripts('/games/_nuxt/workbox.4c4f5ca6.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/games/_nuxt/0c6f781fff7591ba5595.js",
    "revision": "bfb547b029fa9fb2f69efe141f573110"
  },
  {
    "url": "/games/_nuxt/2085b83a9bbdde9b8773.js",
    "revision": "471af2b272b5bdbc0b7dc39504afc951"
  },
  {
    "url": "/games/_nuxt/49a4c21e39f34f3af496.js",
    "revision": "42cef8453282836aa07a18462d608d25"
  },
  {
    "url": "/games/_nuxt/4df1ef4e059569fd6016.js",
    "revision": "012be45fe88eee3aaacfa28d78d2fc0d"
  },
  {
    "url": "/games/_nuxt/5f5f14ab3718e34aabf6.js",
    "revision": "6a8475e4e35f75f895507f04aa31b83f"
  },
  {
    "url": "/games/_nuxt/7512ed923d69c27ce18b.js",
    "revision": "77e57b93ceecba69ae691a175290a92a"
  },
  {
    "url": "/games/_nuxt/ae8ad6d019ccc45b3e89.js",
    "revision": "6359f61bbc1663f2f7f0601fbf9beb46"
  },
  {
    "url": "/games/_nuxt/d72b9c755bc3ccaab6d5.js",
    "revision": "99948562404e7e505fc8b18444590291"
  },
  {
    "url": "/games/_nuxt/dbd58c65233c79750cea.js",
    "revision": "f1243ee1ceea0fa4bd665215835d4322"
  },
  {
    "url": "/games/_nuxt/f37694e42b13d53962e3.js",
    "revision": "eccb285b371e4168979b509dd58c0e6e"
  }
], {
  "cacheId": "game-hub",
  "directoryIndex": "/",
  "cleanUrls": false
})



workbox.clientsClaim()
workbox.skipWaiting()


workbox.routing.registerRoute(new RegExp('/games/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/games/.*'), workbox.strategies.networkFirst({}), 'GET')





