(function() {
  const singles = ['input'];

  class Node {
    constructor(type, data) {
      this.type = type;
      this.attributes = {};
      this.style = {};
      this.children = [];
      this.data = data;
      this.noClose = singles.includes(type);
    }

    setAttribute(name, value) {
      this.attributes[name] = value;
    }

    appendChild(child) {
      this.children.push(child);
    }

    renderAttributes() {
      let result = '';

      for (const [attr, value] of Object.entries(this.attributes)) {
        result = `${result} ${attr}="${value}"`;
      }

      return result;
    }

    renderStyle() {
      // todo: convert key names to hyphen case
      let result = ' style="';
      let first = true;

      for (const [attr, value] of Object.entries(this.style)) {
        if (!first) {
          result = `${result} `;
        }

        result = `${result}${attr}: ${value};`;
        first = false;
      }

      result = `${result}"`;

      return result !== ' style=""' ? result : '';
    }

    render(skip, indent = '') {
      const children = this.children.map(child => child.render(false, indent)).join(`\n${indent}`);

      if (skip || this.type === 'fragment') {
        return children;
      }

      if (this.type === 'text') {
        return this.data;
      }

      const close = !this.noClose ? `</${this.type}>` : ''

      return `<${this.type}${this.renderAttributes()}${this.renderStyle()}>${children}${close}`;
    }
  }

  const doc = {
    Node,
    body: new Node('body'),
    createDocumentFragment() {
      return new Node('fragment');
    },
    createElement(name) {
      return new Node(name)
    },
    createTextNode(data) {
      return new Node('text', data);
    },
  }

  if (typeof window !== 'undefined') {
    window.doc = doc;
  }

  if (typeof module !== 'undefined') {
    module.exports = doc;
  }
})();

