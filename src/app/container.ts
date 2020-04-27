import {Loadable} from "./loadable";

export class Container implements Loadable{
  slots: number = 0;
  contents: []; //TODO: Item array
  load(){
    return 1
  }
  constructor(){}
}
