import { api } from '@/api/api'
import useApiQuery from '@/api/custom-hooks/use-api-query'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import FormErrorHandler from '../Error/FormErrorHandler'
import Input from '../Input/Input'
import Label from '../Label/Label'
import MessageBox from './../MessageBox'

interface IProps {
  valorInicial: string
}

const PasoCodigoEquipo = ({ valorInicial }: IProps) => {
  const [codigoEquipo, setCodigoEquipo] = useState<string>(valorInicial)

  const {
    register,
    formState: { errors }
  } = useFormContext()

  const onCodigoEquipoChange = (id: string) => {
    setCodigoEquipo(id)
  }

  const { data, isLoading, refetch } = useApiQuery({
    key: ['nombre-equipo', codigoEquipo],
    fn: async () => await api.obtenerNombreEquipo(codigoEquipo),
    activado: false
  })

  const onValidarClick = async () => {
    await refetch()
  }

  return (
    <div className='bg-blue-700 py-6 px-3'>
      <div className='flex flex-col'>
        <div className='w-[100%]'>
          <Label
            texto={'Código de tu equipo'}
            subtitulo='Pedíselo a tu delegado'
          />
        </div>
        <div className='flex'>
          <Input
            onChange={onCodigoEquipoChange}
            type='string'
            register={register('codigoAlfanumerico', { required: true })}
            valorInicial={valorInicial}
            name='codigoAlfanumerico'
            className='w-1/2'
          />
          <div className='w-1/2'>
            <button
              type='button'
              className='py-auto rounded-lg bg-green-700 text-center text-white'
              style={{ width: '100%' }}
              onClick={onValidarClick}
              disabled={isLoading}
            >
              {isLoading ? 'Validando...' : 'Validar'}
            </button>
          </div>
        </div>
        {data?.respuesta && (
          <MessageBox type='success'>
            Tu equipo es: <strong>{data?.respuesta}</strong>
          </MessageBox>
        )}
        {data?.hayError && (
          <MessageBox type='error'>El código es incorrecto</MessageBox>
        )}
        <FormErrorHandler
          errors={errors}
          name='codigoAlfanumerico'
          nombre='código de equipo'
        />
      </div>
    </div>
  )
}

export default PasoCodigoEquipo
