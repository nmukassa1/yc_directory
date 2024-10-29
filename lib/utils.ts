export function formatDate(date: string){
    return new Date(date).toLocaleDateString('en-UK', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
}