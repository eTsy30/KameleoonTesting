import { Task } from 'Types/ownType'

export const columns = [
  {
    title: 'NAME',
    dataKey: 'name' as keyof Task,
  },
  {
    title: 'TYPE',
    dataKey: 'type' as keyof Task,
  },
  {
    title: 'STATUS',
    dataKey: 'status' as keyof Task,
  },
  {
    title: 'SITE',
    dataKey: 'site' as keyof Task,
  },
]
