suite('bem', function() {
  test('has all methods', function () {
    const result = bem();

    expect(result).to.have.property('get');
    expect(result).to.have.property('block');
    expect(result).to.have.property('element');
    expect(result).to.have.property('modifier');
    expect(result).to.have.property('pop');
    expect(result).to.have.property('top');
  });

  test('empty by default', function () {
    const result = bem();

    expect(result.get()).to.equal('');
  });

  test('default initialiser is block', function () {
    const result = bem('bar');

    expect(result.get()).to.equal('bar');
  });

  test('can add block', function () {
    const instance = bem();
    const result = instance.block('foo');

    expect(result).to.equal('foo');
    expect(instance.get()).to.equal('foo');
  });

  test('cannot pop block', function () {
    const result = bem('foo').pop();

    expect(result.get()).to.equal('foo');
  });

  test('can add element', function () {
    const instance = bem('foo');

    const result = instance.element('bar');

    expect(result).to.equal('foo__bar');
    expect(instance.get()).to.equal('foo__bar');
  });

  test('can pop element', function () {
    const result = bem('foo');

    result.element('bar')
    result.pop();

    expect(result.get()).to.equal('foo');
  });

  test('can add modifier', function () {
    const instance = bem('foo');

    const result = instance.modifier('baz');

    expect(result).to.equal('foo--baz');
    expect(instance.get()).to.equal('foo--baz');
  });

  test('can pop modifier', function () {
    const result = bem('foo');

    result.modifier('baz')
    result.pop();

    expect(result.get()).to.equal('foo');
  });

  test('can add element, modifier', function () {
    const result = bem('foo');

    result.element('bar');
    result.modifier('baz');

    expect(result.get()).to.equal('foo__bar--baz');
  });

  test('can pop element, modifier', function () {
    const result = bem('foo');

    result.element('bar');
    result.modifier('baz');
    result.pop().pop();

    expect(result.get()).to.equal('foo');
  });

  test('top removes element, modifier', function () {
    const result = bem('foo');

    result.element('bar');
    result.modifier('baz');
    result.top();

    expect(result.get()).to.equal('foo');
  });
});
