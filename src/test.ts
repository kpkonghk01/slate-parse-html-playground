import { jsx } from 'slate-hyperscript';
import { JSDOM } from 'jsdom';

// edit from: https://docs.slatejs.org/concepts/10-serializing#deserializing
const deserialize = (el) => {
  // what does 1,3 means?
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  }

  let children = Array.from(el.childNodes).map(deserialize);

  if (children.length === 0) {
    children = [{ text: '' }];
  }

  switch (el.nodeName) {
    case 'BODY':
      return jsx('fragment', {}, children);
    case 'BR':
      return '\n';
    case 'BLOCKQUOTE':
      return jsx('element', { type: 'quote' }, children);
    case 'P':
      return jsx('element', { type: 'paragraph' }, children);
    case 'A':
      return jsx(
        'element',
        { type: 'link', url: el.getAttribute('href') },
        children
      );
    case 'UL':
      return jsx('element', { type: 'ul' }, children);
    case 'LI':
      return jsx('element', { type: 'li' }, children);
    default:
      return el.textContent;
  }
};

const html =
  '<ul id="list"><li>Hello World</li></ul><ul id="list2"><li>Hello2 World <a href="https://google.com">some link</a></li></ul>';
const dom = new JSDOM(html);
const fragment = deserialize(dom.window.document.body);

console.log(JSON.stringify(fragment, null, 2));
