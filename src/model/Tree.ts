import * as bcrypt from 'bcrypt'

export default class Tree {
  constructor(name: string, children?: Tree[], parent?: Tree) {
    this.id = this.generateHash();
    this.name = name;
    this.children = children;
    this.parent = parent;
  }
  id: string;
  name: string;
  children?: Tree[];
  parent?: Tree;

  toString(): string {
    return this.name;
  }

  generateHash(salt = 20): string {
    return bcrypt.hashSync(String(this.name + Date.now()), salt);
  }

  findByName(name: string): Tree[] {
    let res: Tree[];
    res = [];
    if (this.name === name) {
      res.push(this);
    }
    if (this.children) {
      for (let child of this.children) {
        const found = child.findByName(name);
        if (found) {
          res.push(...found);
        }
      }
    }
    return res;
  }
}