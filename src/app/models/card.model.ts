export interface Card {
  name: string,
  id: number,
  payloadId: string,
  color: string,
  tasks: Task[]
}

export interface Task {
  name: string,
  description: string,
  id: number,
  color: string
}
