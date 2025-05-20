export const handleSanitizeDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
}