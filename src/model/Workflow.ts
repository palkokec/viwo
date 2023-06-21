export default class Workflow {
  name: string;
  id: number;

  constructor(id: number = 0,name: string = "") {
    this.name = name;
    this.id = id;
  }
}
