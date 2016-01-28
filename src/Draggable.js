(function (nx, global) {

  var document = global.document;
  var defaults = {
    dom: null,
    parent: document
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
      dragstart: function () {
        //template method:
      },
      drag: function (event) {
        var offset = this._offset;
        var dom = this.options.dom;
        nx.mix(dom.style, {
          left: event.pageX - offset.x + 'px',
          top: event.pageY - offset.y + 'px'
        })
      },
      dragend: function () {
        //template method:
      },
      _start: function (inEvent) {
        var event = this.event(inEvent);
        var options = this.options;
        this._offset = {
          x: event.pageX - options.dom.offsetLeft,
          y: event.pageY - options.dom.offsetTop
        };
        this.dragstart(event);
        this.fire('dragstart');
      },
      _move: function (inEvent) {
        var event = this.event(inEvent);
        if (this._offset) {
          this.drag(event);
          this.fire('drag');
        }
      },
      _end: function (inEvent) {
        var event = this.event(inEvent);
        if (this._offset) {
          this._offset = null;
          this.dragend(event);
          this.fire('dragend');
        }
      }
    }
  });

}(nx, nx.GLOBAL));
