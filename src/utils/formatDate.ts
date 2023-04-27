export function formatDate(dateString: any) {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    return null
  }
  return new Intl.DateTimeFormat('fr-FR').format(date)
}
