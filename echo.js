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

const div = el.bind(void 0, 'div');
const span = el.bind(void 0, 'span');
const option = el.bind(void 0, 'option');
const img = el.bind(void 0, 'img');
const button = el.bind(void 0, 'button');
const canvas = el.bind(void 0, 'canvas');
const legend = el.bind(void 0, 'legend');
const label = el.bind(void 0, 'label');
const input = el.bind(void 0, 'input');
const svg = el.bind(void 0, 'svg');
const circle = el.bind(void 0, 'circle');
const polygon = el.bind(void 0, 'polygon');
const rect = el.bind(void 0, 'rect');
const select = el.bind(void 0, 'select');
const line = el.bind(void 0, 'line');
const clipPath = el.bind(void 0, 'clipPath');
const use = el.bind(void 0, 'use');
const mask = el.bind(void 0, 'mask');
const defs = el.bind(void 0, 'defs');
const path = el.bind(void 0, 'path');

// todo: nicer export
if (typeof window === 'object') {
  window.echo = {
    text,
    clear,
    remove,
    fragment,
    div,
    span,
    option,
    img,
    button,
    canvas,
    legend,
    label,
    input,
    svg,
    circle,
    polygon,
    rect,
    select,
    line,
    clipPath,
    use,
    mask,
    defs,
    path,
  };
}

export {
  text,
  clear,
  remove,
  fragment,
  div,
  span,
  option,
  img,
  button,
  canvas,
  legend,
  label,
  input,
  svg,
  circle,
  polygon,
  rect,
  select,
  line,
  clipPath,
  use,
  mask,
  defs,
  path,
}
