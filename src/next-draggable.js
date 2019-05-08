(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');

  var NxDraggable = nx.declare('nx.Draggable', {
    methods: {}
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxDraggable;
  }
})();
