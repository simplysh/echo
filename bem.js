(function() {
  const bem = (_block = '', _element = '', _modifier = '') => ({
    _join(a, b, separator) {
      return b ? `${a}${separator}${b}` : a;
    },
    toString() {
      return this._join(this._join(_block, _element, '__'), _modifier, '--');
    },
    block(label) {
      return bem(label, _element, _modifier);
    },
    element(label) {
      return bem(_block, label, _modifier);
    },
    modifier(label) {
      return bem(_block, _element, label);
    },
    pop() {
      if (_modifier) {
        return bem(_block, _element);
      }
      if (_element) {
        return bem(_block);
      }

      return this;
    },
    top() {
      return bem(_block);
    },
    get() {
      return String(this);
    }
  })

  if (typeof window !== 'undefined') {
    window.bem = bem;
  }

  if (typeof module !== 'undefined') {
    module.exports = bem;
  }
})();

