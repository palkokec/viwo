interface Node<T> {
  data: T;
  adjacent: Node<T>[];
  comparator: (a: T, b: T) => number;

  addAdjacent(node: Node<T>): void;
  removeAdjacent(data: T): Node<T> | null;

  getLabel(): string;
  getValueString(): string;

  toJsonString(): string;
  toAsciiString(): string;
  toHtmlString(): string;
}

class Node<T> implements Node<T> {
  data: T;

  adjacent: Node<T>[];

  comparator: (a: T, b: T) => number;

  constructor(data: T, comparator: (a: T, b: T) => number) {
    this.data = data;

    this.adjacent = [];

    this.comparator = comparator;
  }

  addAdjacent(node: Node<T>): void {
    this.adjacent.push(node);
  }

  removeAdjacent(data: T): Node<T> | null {
    const index = this.adjacent.findIndex(
      (node) => this.comparator(node.data, data) === 0
    );

    if (index > -1) {
      return this.adjacent.splice(index, 1)[0];
    }

    return null;
  }
}

export default Node;
