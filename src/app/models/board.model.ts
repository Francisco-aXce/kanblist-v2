export interface Board {
  name: string,
  id?: string,
  projectId?: string,
  order: number,
  color: string,
  tasks: Task[]
}

export interface Task {
  name: string,
  description: string,
  order: number,
  color: string,
  id?: string,
  boardId?: string,
  projectId?: string
}
