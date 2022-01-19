import { jsx } from 'slate-hyperscript';
import { JSDOM } from 'jsdom';

const standardAttributeNamesMap = {
  accept: 1,
  'accept-charset': 1,
  accesskey: 1,
  action: 1,
  align: 1,
  alt: 1,
  async: 1,
  autocomplete: 1,
  autofocus: 1,
  autoplay: 1,
  bgcolor: 1,
  border: 1,
  charset: 1,
  checked: 1,
  cite: 1,
  class: 1,
  color: 1,
  cols: 1,
  colspan: 1,
  content: 1,
  contenteditable: 1,
  controls: 1,
  coords: 1,
  data: 1,
  'data-*': 1,
  datetime: 1,
  default: 1,
  defer: 1,
  dir: 1,
  dirname: 1,
  disabled: 1,
  download: 1,
  draggable: 1,
  enctype: 1,
  for: 1,
  form: 1,
  formaction: 1,
  headers: 1,
  height: 1,
  hidden: 1,
  high: 1,
  href: 1,
  hreflang: 1,
  'http-equiv': 1,
  id: 1,
  ismap: 1,
  kind: 1,
  label: 1,
  lang: 1,
  list: 1,
  loop: 1,
  low: 1,
  max: 1,
  maxlength: 1,
  media: 1,
  method: 1,
  min: 1,
  multiple: 1,
  muted: 1,
  name: 1,
  novalidate: 1,
  onabort: 1,
  onafterprint: 1,
  onbeforeprint: 1,
  onbeforeunload: 1,
  onblur: 1,
  oncanplay: 1,
  oncanplaythrough: 1,
  onchange: 1,
  onclick: 1,
  oncontextmenu: 1,
  oncopy: 1,
  oncuechange: 1,
  oncut: 1,
  ondblclick: 1,
  ondrag: 1,
  ondragend: 1,
  ondragenter: 1,
  ondragleave: 1,
  ondragover: 1,
  ondragstart: 1,
  ondrop: 1,
  ondurationchange: 1,
  onemptied: 1,
  onended: 1,
  onerror: 1,
  onfocus: 1,
  onhashchange: 1,
  oninput: 1,
  oninvalid: 1,
  onkeydown: 1,
  onkeypress: 1,
  onkeyup: 1,
  onload: 1,
  onloadeddata: 1,
  onloadedmetadata: 1,
  onloadstart: 1,
  onmousedown: 1,
  onmousemove: 1,
  onmouseout: 1,
  onmouseover: 1,
  onmouseup: 1,
  onmousewheel: 1,
  onoffline: 1,
  ononline: 1,
  onpagehide: 1,
  onpageshow: 1,
  onpaste: 1,
  onpause: 1,
  onplay: 1,
  onplaying: 1,
  onpopstate: 1,
  onprogress: 1,
  onratechange: 1,
  onreset: 1,
  onresize: 1,
  onscroll: 1,
  onsearch: 1,
  onseeked: 1,
  onseeking: 1,
  onselect: 1,
  onstalled: 1,
  onstorage: 1,
  onsubmit: 1,
  onsuspend: 1,
  ontimeupdate: 1,
  ontoggle: 1,
  onunload: 1,
  onvolumechange: 1,
  onwaiting: 1,
  onwheel: 1,
  open: 1,
  optimum: 1,
  pattern: 1,
  placeholder: 1,
  poster: 1,
  preload: 1,
  readonly: 1,
  rel: 1,
  required: 1,
  reversed: 1,
  rows: 1,
  rowspan: 1,
  sandbox: 1,
  scope: 1,
  selected: 1,
  shape: 1,
  size: 1,
  sizes: 1,
  span: 1,
  spellcheck: 1,
  src: 1,
  srcdoc: 1,
  srclang: 1,
  srcset: 1,
  start: 1,
  step: 1,
  style: 1,
  tabindex: 1,
  target: 1,
  title: 1,
  translate: 1,
  type: 1,
  usemap: 1,
  value: 1,
  width: 1,
  wrap: 1,
};

// edit from: https://docs.slatejs.org/concepts/10-serializing#deserializing
const deserialize = (el) => {
  // console.log(el.nodeName);
  // console.log('========');
  // console.log(el.nodeName);
  // console.log(el.tagName);

  if (el.nodeType === 3) {
    // 3 is TEXT_NODE
    return el.textContent;
  }

  if (el.nodeType !== 1) {
    // 1 is ELEMENT_NODE

    return null;
  }

  // console.log(el.getAttributeNames());
  // console.log(el.getAttribute('my'))
  // console.log((el.getAttributeNode('my') || {}).value);

  let children = Array.from(el.childNodes).map(deserialize);

  if (children.length === 0) {
    children = [{ text: '' }];
  }

  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children);
  }

  if (el.nodeName === 'BR') {
    return '\n';
  }

  const element = { type: el.tagName.toLowerCase() };

  for (const attr of el.getAttributeNames()) {
    if (standardAttributeNamesMap[attr] && el.getAttribute(attr) !== '') {
      element[attr] = el.getAttribute(attr);
    }
  }

  return jsx('element', element, children);
};

const html = `<div my="wut">3344<strong>ddsff</strong>asdas</div><br><div my="wut">3344</div>`;
const dom = new JSDOM(html);
const fragment = deserialize(dom.window.document.body);

console.log(JSON.stringify(fragment, null, 2));
/**
[
  {
    "type": "ul",
    "children": [
      {
        "type": "li",
        "children": [
          {
            "text": "Hello World"
          }
        ]
      }
    ]
  },
  {
    "type": "ul",
    "children": [
      {
        "type": "li",
        "children": [
          {
            "text": "Hello2 World "
          },
          {
            "type": "link",
            "url": "https://google.com",
            "children": [
              {
                "text": "some link"
              }
            ]
          }
        ]
      }
    ]
  }
]
*/
