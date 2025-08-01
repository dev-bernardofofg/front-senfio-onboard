import { format } from 'date-fns'

export const FN_UTILS_DATE = {
  formatDate: (dateString: string | null | undefined): string => {
    if (!dateString) return 'Data não disponível'

    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return 'Data inválida'
      }
      return format(date, 'dd/MM/yyyy')
    } catch (error) {
      return 'Data inválida'
    }
  },
}
