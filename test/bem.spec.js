suite('bem', function() {
  test('has all methods', function () {
    const result = bem();

    expect(result).to.have.property('get');
    expect(result).to.have.property('block');
    expect(result).to.have.property('element');
    expect(result).to.have.property('modifier');
    expect(result).to.have.property('pop');
    expect(result).to.have.property('top');
    expect(result).to.have.property('toString');
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
    const result = bem().block('foo');

    expect(result.get()).to.equal('foo');
  });

  test('cannot pop block', function () {
    const result = bem('foo').pop();

    expect(result.get()).to.equal('foo');
  });

  test('can add element', function () {
    const result = bem('foo').element('bar');

    expect(result.get()).to.equal('foo__bar');
  });

  test('can pop element', function () {
    const result = bem('foo').element('bar').pop();

    expect(result.get()).to.equal('foo');
  });

  test('can add modifier', function () {
    const result = bem('foo').modifier('baz');

    expect(result.get()).to.equal('foo--baz');
  });

  test('can pop modifier', function () {
    const result = bem('foo').modifier('baz').pop();

    expect(result.get()).to.equal('foo');
  });

  test('can add element, modifier', function () {
    const result = bem('foo').element('bar').modifier('baz');

    expect(result.get()).to.equal('foo__bar--baz');
  });

  test('can pop element, modifier', function () {
    const result = bem('foo')
      .element('bar')
      .modifier('baz')
      .pop()
      .pop();

    expect(result.get()).to.equal('foo');
  });

  test('top removes element, modifier', function () {
    const result = bem('foo')
      .element('bar')
      .modifier('baz')
      .top();

    expect(result.get()).to.equal('foo');
  });
});
