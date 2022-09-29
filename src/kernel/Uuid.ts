import { v4 } from "uuid";

export class Uuid {
  static generate() {
    return v4();
  }
}
