import { hashString } from "../functions/Utils";
export default class Tree {
  constructor(key: string) {
    this.id = this.generateHash();
    this.key = key;
    this.children = [];
    this.attributes = [];
  }
  id: string;
  key: string;
  value?: any;
  children: Tree[];
  parent?: Tree;
  attributes: Tree[];

  toString(): string {
    return this.key;
  }

  generateHash(salt = 20): string {
    return hashString(String(this.key + Date.now()), salt);
  }

  addItem(parent: Tree, key: string, item: any): void {
    let t = new Tree(key);
    t.parent = parent;
    switch (typeof item) {
      case "number":
      case "string":
      case "boolean":
      case "bigint":
        t.value = item ?? "";
        break;
      default:
        if (Array.isArray(item)) {
          for (let i = 0; i < item.length; i++) {
            switch (typeof item[i]) {
              case "number":
              case "string":
              case "boolean":
              case "bigint":
                t.value = item[i] ?? "";
                break;
              default:
                t.objectToTree(item[i]);
                break;
            }
          } 
        } else {
          t.objectToTree(item);
        }
    }
    parent.children.push(t);
  }

  objectToTree(obj: any): void {
    for (let key in obj) {
      let item = obj[key];
      this.addItem(this, key, item);
    }
  }
  toJsonString(): string {
    let cache: any[] = [];
    const retVal = JSON.stringify(
      this,
      (key, value) =>
        typeof value === "object" && value !== null
          ? cache.includes(value)
            ? undefined // Duplicate reference found, discard key
            : cache.push(value) && value // Store value in our collection
          : value,
      2
    );
    return retVal;
  }

  toAsciiTree(): string {
    const lines: string[] = [];
    const traverse = (node: Tree, prefix = "", nextPrefix = "") => {
      lines.push(`${prefix} ${node.key} - ${node.value}`);
      const isLastChild = (index: number) => index === node.children.length - 1;
      node.children.forEach((childNode, index) => {
        const childPrefix = isLastChild(index) ? "└─ " : "├─ ";
        const nextChildPrefix = isLastChild(index) ? "   " : "│  ";
        traverse(
          childNode,
          nextPrefix + childPrefix,
          nextPrefix + nextChildPrefix
        );
      });
    };
    traverse(this);
    return lines.join("\n");
  }

  findBykey(key: string): Tree[] {
    let res: Tree[];
    res = [];
    if (this.key === key) {
      res.push(this);
    }
    if (this.children) {
      for (let child of this.children) {
        const found = child.findBykey(key);
        if (found) {
          res.push(...found);
        }
      }
    }
    return res;
  }
}
