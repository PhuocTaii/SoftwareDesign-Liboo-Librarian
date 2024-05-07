export function formatDate(dateString){
    if(dateString === null) return ''
    return new Date(dateString).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}