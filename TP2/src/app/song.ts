import {Artist} from "./artist";
import {Album} from "./album";

export class Song {
  constructor(
    public name: string,
    public artist: Artist,
    public album: Album
  ) {
  }
}
