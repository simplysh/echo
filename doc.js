(function() {
  const singles = ['input'];

  class Node {
    set className(name) {
      this.setAttribute('class', name);
    }

    set innerHTML(data) {
      this.data = data;
    }

    get outerHTML() {
      return this.render();
    }

    constructor(type, data = '') {
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
      let result = ' style="';
      let first = true;

      for (const [attr, value] of Object.entries(this.style)) {
        let key = attr.replace(/[A-Z]/g, upper => `-${upper.toLowerCase()}`);

        if (!first) {
          result = `${result} `;
        }

        result = `${result}${key}: ${value};`;
        first = false;
      }

      result = `${result}"`;

      return result !== ' style=""' ? result : '';
    }

    render(options = {}) {
      // merge fragments into current call
      if (this.children.length === 1 && this.children[0].type === 'fragment') {
        this.children = this.children[0].children;

        return this.render(options);
      }

      // treat body as a fragment
      if (this.type === 'body') {
        const fragment = new Node('fragment');

        fragment.children = this.children;

        return fragment.render(options);
      }

      const { level = 0, pretty = false, spaces = 2, leaf = false } = options;

      const expanded = this.children.length > 1;
      const padStart = pretty && !leaf ? new Array(level * spaces).fill(' ').join('') : '';
      const padEnd = pretty && expanded ? new Array(level * spaces).fill(' ').join('') : '';
      const newline = pretty && expanded ? '\n' : '';

      const children = this.children.map(child => child.render({
        ...options,
        level: level + 1,
        leaf: !expanded,
      })).join(newline);

      if (this.type === 'text') {
        return this.data;
      }

      const close = !this.noClose ? `${padEnd}</${this.type}>` : ''

      return `${padStart}<${this.type}${this.renderAttributes()}${this.renderStyle()}>${newline}${children}${this.data}${newline}${close}`;
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

