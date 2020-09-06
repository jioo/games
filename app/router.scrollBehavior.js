// forcing the scroll position to the top for every routes
export default function (to, from, savedPosition) {
    return { x: 0, y: 0 }
}
