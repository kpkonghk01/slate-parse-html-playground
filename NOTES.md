# Notes

<https://stackoverflow.com/questions/11398419/trying-to-use-the-domparser-with-node-js/55668667>
use jsdom for DOMParser, not best performance but apis are simple & high weekly download

Goods:

- versions of dependencies are latest

- no weird react/react-dom dependencies

- the output structure is simpler

- much less code

- still need to implement deserializer for each tag but looks simpler

Bads:

- need to transform to CMS's slate format

- need to change current component schema
