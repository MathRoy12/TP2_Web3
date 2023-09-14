import {Album} from "./album";

export class Artist {
  constructor(
    public name: string,
    public img:string,
    public albums:Album[]
  ) {
  }
}
