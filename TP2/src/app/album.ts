import {Song} from "./song";
import {Artist} from "./artist";

export class Album {
  constructor(
    public name: string,
    public img: string,
    public songs: Song[],
    public artist:Artist) {
  }
}
