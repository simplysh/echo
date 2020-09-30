suite('doc', function() {
  test('has body', function () {
    expect(doc).to.have.property('body');
  });

  test('has create element', function () {
    const native = document.createElement('div');
    const own = doc.createElement('div');

    expect(own.outerHTML).to.equal('<div></div>');
    expect(own.outerHTML).to.equal(native.outerHTML);
  });

  test('can append child', function () {
    const native = document.createElement('div');
    const own = doc.createElement('div');

    const nativeContent = document.createElement('span');
    nativeContent.innerHTML = 'Content';

    const ownContent = doc.createElement('span');
    ownContent.innerHTML = 'Content';

    native.appendChild(nativeContent);
    own.appendChild(ownContent);

    expect(own.outerHTML).to.equal('<div><span>Content</span></div>');
    expect(own.outerHTML).to.equal(native.outerHTML);
  });

  test('can set style', function () {
    const native = document.createElement('div');
    const own = doc.createElement('div');

    native.style.marginTop = '1rem';
    own.style.marginTop = '1rem';

    expect(own.outerHTML).to.equal('<div style="margin-top: 1rem;"></div>');
    expect(own.outerHTML).to.equal(native.outerHTML);
  });

  test('can set attribute', function () {
    const native = document.createElement('div');
    const own = doc.createElement('div');

    native.setAttribute('is', 'search');
    own.setAttribute('is', 'search');

    expect(own.outerHTML).to.equal('<div is="search"></div>');
    expect(own.outerHTML).to.equal(native.outerHTML);
  });

  test('does not close inputs', function () {
    const native = document.createElement('input');
    const own = doc.createElement('input');

    native.setAttribute('type', 'text');
    own.setAttribute('type', 'text');

    expect(own.outerHTML).to.equal('<input type="text">');
    expect(own.outerHTML).to.equal(native.outerHTML);
  });

  test.only('can pretty print', function () {
    const div = doc.createElement('div');
    const single = doc.createElement('div');
    const multi = doc.createElement('div');
    const only = doc.createElement('span');
    const first = doc.createElement('span');
    const second = doc.createElement('span');

    single.className = 'single';
    multi.className = 'multi';

    only.innerHTML = 'only';
    first.innerHTML = 'first';
    second.innerHTML = 'second';

    div.appendChild(single);
    single.appendChild(only);
    div.appendChild(multi);
    multi.appendChild(first);
    multi.appendChild(second);

    expect(div.render({ pretty: true })).to.equal(`<div>
  <div class="single"><span>only</span></div>
  <div class="multi">
    <span>first</span>
    <span>second</span>
  </div>
</div>`);
  });
});
