// rehype-meta-attribute.js
import { visit } from 'unist-util-visit'

var re = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g

function rehypeMetaAttribute(_options = {}) {
  return (tree) => {
    visit(tree, 'element', visitor)
  }

  function visitor(node, _index, parentNode) {
    var match

    if (node.tagName === 'code' && node.data && node.data.meta) {
      re.lastIndex = 0 // Reset regex.

      while ((match = re.exec(node.data.meta))) {
        node.properties[match[1]] = match[2] || match[3] || match[4] || ''
        parentNode.properties[match[1]] = match[2] || match[3] || match[4] || ''
      }
    }
  }
}

export default rehypeMetaAttribute
