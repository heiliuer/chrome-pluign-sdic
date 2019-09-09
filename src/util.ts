export function getValidSearchKey(key: string) {
    return key.replace(/[-_]/g, ' ').replace(/([a-z])([A-Z])/g, (str, x, y) => {
        return x + ' ' + y
    })
}
