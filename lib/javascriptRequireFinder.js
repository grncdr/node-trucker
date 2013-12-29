var esprima = require('esprima');

module.exports = function(contents) {
  var ast = esprima.parse(contents, {loc: true});
  var requires = [];
  traverse(ast, requires);
  return requires;
};

function isLocal(requirePath) {
  return (/^[\.\/]/).exec(requirePath);
}

function isRequire(node) {
  var c = node.callee;
  return c && node.type === 'CallExpression' && c.type === 'Identifier' && c.name === 'require' && isLocal(node.arguments[0].value);
}

function traverse(node, requires) {
  if (Array.isArray(node)) {
    node.forEach(function(n) {traverse(n, requires);});
  }

  else if (node && typeof node === 'object') {
    if (isRequire(node)) {
      var path = node.arguments[0];
      var req = {
        path: path.value,
        loc: path.loc
      };
      requires.push(req);
    }
    Object.keys(node).forEach(function (key) {
      traverse(node[key], requires);
    });
  }
}