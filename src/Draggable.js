(function (nx, global) {

  var document = global.document;
  var defaults = {
    dom: null
  };

  nx.declare('nx.ui.Draggable', {
    methods: {
      init: function (inOptions) {
        this.initOptions(inOptions);
        this.attachEvents();
      },
      destroy: function () {
        this.options = null;
        this.detachEvents();
      },
      initOptions: function (inOptions) {
        this.options = nx.mix(defaults, inOptions);
      },
      attachEvents: function () {
        var options = this.options;
        options.dom.addEventListener('touchstart', this._start.bind(this));
        document.addEventListener('touchmove', this._move.bind(this));
        document.addEventListener('touchend', this._end.bind(this));
      },
      detachEvents: function () {
        var options = this.options;
        options.dom.removeEventListener('touchstart', this._start.bind(this));
        document.removeEventListener('touchmove', this._move.bind(this));
        document.removeEventListener('touchend', this._end.bind(this));
      },
      event: function (inEvent) {
        var evt = inEvent.changedTouches;
        return evt[0];
      },
      _start: function (inEvent) {
        var event = this.event(inEvent);
        var options = this.options;
        this._offset = {
          x: event.pageX - options.dom.offsetLeft,
          y: event.pageY - options.dom.offsetTop
        };
        this.fire('dragstart');
      },
      _move: function () {
        if (this._offset) {
          this.fire('drag');
        }
      },
      _end: function () {
        this._offset = null;
        this.fire('dragend');
      }
    }
  });

}(nx, nx.GLOBAL));
