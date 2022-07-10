// TODO: Think about unifying the models files
import { Board } from './board.model';

export interface Project {
  name: string,
  description: string,
  // TODO - Add image
  //image: string,
  color: string,
  owner?: string,
  id?: string,
  boards?: Board[]
}
