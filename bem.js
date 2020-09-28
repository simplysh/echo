(function() {
  const bem = (init = '') => {
    let _block = init;
    let _element;
    let _modifier;

    const join = (a, b, separator) => {
      return b ? `${a}${separator}${b}` : a;
    }

    return {
      get() {
        return join(join(_block, _element, '__'), _modifier, '--');
      },
      block(label) {
        _block = label;

        return this.get();
      },
      element(label) {
        _element = label;

        return this.get();
      },
      modifier(label) {
        _modifier = label;

        return this.get();
      },
      pop() {
        if (_modifier) {
          _modifier = null;
          return this;
        }
        if (_element) {
          _element = null;
          return this;
        }

        return this;
      },
      top() {
        _modifier = null;
        _element = null;

        return this;
      },
    }
  }

  if (typeof window !== 'undefined') {
    window.bem = bem;
  }

  if (typeof module !== 'undefined') {
    module.exports = echo;
  }
})();

