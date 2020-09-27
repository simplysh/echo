(function() {
  const text = document.createTextNode.bind(document);

  const clear = node => {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }

    return node;
  }

  const remove = nodeList => {
    Array.from(nodeList).forEach(node => {
      node.parentNode.removeChild(node);
    });
  }

  const fragment = nodeList => Array.from(nodeList).reduce(
    (frag, child) => {
      frag.appendChild(child);
      return frag;
    },
    document.createDocumentFragment()
  );

  const el = (nodeName, ...args) => {
    const unitless = ['zIndex', 'opacity'];
    const svg = ['svg', 'circle', 'polygon', 'rect', 'line', 'clipPath', 'use', 'mask', 'defs', 'path'];

    let element;
    let attributes = {};
    let children = [];

    if (svg.includes(nodeName)) {
      element = document.createElementNS('http://www.w3.org/2000/svg', nodeName);

      if (nodeName === 'svg') {
        attributes = { ...attributes, xmlns: 'http://www.w3.org/2000/svg' };
      }
    } else {
      element = document.createElement(nodeName);
    }

    switch (args.length) {
      case 2:
        attributes = { ...attributes, ...args[0] };
        children = [].concat(args[1])
        break;
      case 1:
        const [singleArgument] = args;

        if (
          typeof singleArgument === 'string'
          || typeof singleArgument === 'number'
          || singleArgument instanceof Element
          || Array.isArray(singleArgument)
        ) {
          children = [].concat(singleArgument);
          break;
        }

        if (typeof singleArgument === 'object') {
          attributes = { ...attributes, ...singleArgument };
          break;
        }

        break;
      default:
        break;
    }

    if (nodeName === 'input') {
      attributes = { type: 'text', ...attributes };
    }

    for (const [attr, value] of Object.entries(attributes)) {
      if (value === undefined) { continue; }

      if (attr === 'class' && typeof value === 'object') {
        for (const [name, toggle] of Object.entries(value)) {
          element.classList.toggle(name, toggle);
        }

        continue;
      }

      if (attr === 'style' && typeof value === 'object') {
        for (const [name, styleValue] of Object.entries(value)) {
          if (typeof styleValue === 'number' && !unitless.includes(name)) {
            element.style[name] = `${styleValue}px`;

            continue;
          }
          if (name === 'display' && typeof styleValue === 'boolean') {
            element.style.display = styleValue ? 'block' : 'none';

            continue;
          }

          element.style[name] = styleValue;
        }

        continue;
      }

      element.setAttribute(attr, value);
    }

    element.appendChild(fragment(
      children.map(child => (
        (typeof child === 'string' || typeof child === 'number') ? text(child) : child
      ))
    ));

    return element;
  }

  const echo = {
    text,
    clear,
    remove,
    fragment,
    el,
    div: el.bind(void 0, 'div'),
    span: el.bind(void 0, 'span'),
    option: el.bind(void 0, 'option'),
    img: el.bind(void 0, 'img'),
    button: el.bind(void 0, 'button'),
    canvas: el.bind(void 0, 'canvas'),
    legend: el.bind(void 0, 'legend'),
    label: el.bind(void 0, 'label'),
    input: el.bind(void 0, 'input'),
    svg: el.bind(void 0, 'svg'),
    circle: el.bind(void 0, 'circle'),
    polygon: el.bind(void 0, 'polygon'),
    rect: el.bind(void 0, 'rect'),
    select: el.bind(void 0, 'select'),
    line: el.bind(void 0, 'line'),
    clipPath: el.bind(void 0, 'clipPath'),
    use: el.bind(void 0, 'use'),
    mask: el.bind(void 0, 'mask'),
    defs: el.bind(void 0, 'defs'),
    path: el.bind(void 0, 'path'),
  }

  if (typeof window === 'object') {
    window.echo = echo;
  }

  if (typeof module === 'function') {
    module.exports = echo;
  }
})();

