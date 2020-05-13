import _ from 'lodash'

export const URL_WITH_PERMISSONS = {
    BOOK_MANAGEMENT: ['ADD_BOOK'],
    MEMBER_MANAGEMENT: ['UPDATE_MEMBER', 'DELETE_MEMBER', 'ADD_MEMBER'],
    CHECK_OUT: ['CHECKOUT_BOOK'],
    LOGOUT: ['UPDATE_MEMBER', 'ADD_BOOK', 'CHECKOUT_BOOK']
}

export const URLS = {
    BOOK_MANAGEMENT: 'BOOK_MANAGEMENT',
    MEMBER_MANAGEMENT: 'MEMBER_MANAGEMENT',
    CHECK_OUT: 'CHECK_OUT',
    LOGOUT: 'LOGOUT'
}

const availableItems = [
    { id: 1, link: '/', label: '🏠 Home' },
    { id: 2, link: '/member-management', label: '🧔 Member Management', type: URLS.MEMBER_MANAGEMENT },
    { id: 3, link: '/book-management', label: '📚 Book Management', type: URLS.BOOK_MANAGEMENT },
    { id: 4, link: '/checkout', label: '🔖 Checkout', type: URLS.CHECK_OUT },
    { link: 'logout', label: '🚪 Logout', type: URLS.LOGOUT }
]

export function isAllowToAccessPath(pathname, userPermissions) {
    const items = extractItemFromPathname(pathname)
    return items.filter(item => isAllow({type: item.type, userPermissions})).length > 0
}

export function getAvailableURLs(userPermissions) {
    return availableItems.filter(item => isAllow({type: item.type, userPermissions}))
}

function extractItemFromPathname(pathname) {
    return availableItems.filter(item => item.link === pathname)
}

function isAllow({ type, userPermissions}) {
    if (_.isEmpty(type))
        return true

    if (_.isEmpty(userPermissions))
        return false

    const requiredPermissions = URL_WITH_PERMISSONS[type]

    const results = userPermissions.filter(up => _.findIndex(requiredPermissions, rp => rp === up) > -1)

    return !_.isEmpty(results)
}