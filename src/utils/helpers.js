export const formatPrice = (number) => {
    const newNumber = Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'USD',
    }).format(number / 100)
    return newNumber
}

export const getUniqueValues = (data, type) => {
    let uniqe = data.map((item) => {
        return item[type]
    })
    if (type === 'colors') {
        uniqe = uniqe.flat()
    }
    return ['all', ...new Set(uniqe)]

}