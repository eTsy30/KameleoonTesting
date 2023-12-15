/* eslint-disable @typescript-eslint/no-explicit-any */
enum Type {
  CLASSIC = 'CLASSIC',
  SERVER_SIDE = 'SERVER_SIDE',
  MVT = 'MVT',
}

enum Status {
  DRAFT = 'DRAFT',
  ONLINE = 'ONLINE',
  PAUSED = 'PAUSED',
  STOPPED = 'STOPPED',
}

export interface Site {
  id: number
  url: string
}

export interface Test {
  id: number
  name: string
  type: Type
  status: Status
  siteId: number
}
export type Task = {
  id: number
  name: string
  type: string
  status: string
  site: string
  siteInfo: Site
}
export interface TableProps {
  task: Task[]
  setTasks: (tasks: Task[]) => void
  sortByField: any
}
