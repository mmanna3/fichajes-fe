import { Badge } from '@/components/ui/badge'

export enum EstadoJugadorEnum {
  FichajePendienteDeAprobacion = 1,
  FichajeRechazado = 2,
  Activo = 3,
  Suspendido = 4,
  Inhabilitado = 5
}

const estadoConfig = {
  [EstadoJugadorEnum.FichajePendienteDeAprobacion]: {
    texto: 'Pendiente de aprobación',
    color: 'bg-blue-500 text-slate-200'
  },
  [EstadoJugadorEnum.FichajeRechazado]: {
    texto: 'Fichaje rechazado',
    color: 'bg-red-500 text-slate-200'
  },
  [EstadoJugadorEnum.Activo]: {
    texto: 'Activo',
    color: 'bg-green-500 text-slate-200'
  },
  [EstadoJugadorEnum.Suspendido]: {
    texto: 'Suspendido',
    color: 'bg-orange-500 text-slate-200'
  },
  [EstadoJugadorEnum.Inhabilitado]: {
    texto: 'Inhabilitado',
    color: 'bg-gray-500 text-slate-200'
  }
}

export default function JugadorEstadoBadge({
  estado
}: {
  estado: EstadoJugadorEnum
}) {
  const config = estadoConfig[estado] || {
    texto: 'Desconocido',
    color: 'bg-gray-300 text-black'
  }

  return (
    <Badge className={`${config.color} px-3 py-1 rounded-md`}>
      {config.texto}
    </Badge>
  )
}
