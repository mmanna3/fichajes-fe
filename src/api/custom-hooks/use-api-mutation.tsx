import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

interface IProps<T> {
  fn: (args: T) => Promise<unknown>
  mensajeDeExito?: string
  antesDeMensajeExito?: () => void
}

const useApiMutation = <T,>({
  fn,
  mensajeDeExito = 'Operación exitosa',
  antesDeMensajeExito = () => {}
}: IProps<T>) => {
  const mutation = useMutation({
    throwOnError: true,
    mutationFn: async (args: T) => {
      try {
        await fn(args)
      } catch (error) {
        console.log('Error en Request', error)
        throw new Error('Error en el servidor')
      }
    },
    onError: (error) => console.log('Error mutation:', error.message),
    onSuccess: () => {
      antesDeMensajeExito()
      toast.success(mensajeDeExito)
    }
  })

  return mutation
}

export default useApiMutation
