(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var NxDomEvent = nx.dom ? nx.dom.Event : require('next-dom-event');
  var NxTouchEvents = nx.TouchEvents || require('next-touch-events');
  var DEFAULT_OPTIONS = { onChange: nx.noop };

  var NxDraggable = nx.declare('nx.Draggable', {
    methods: {
      init: function(inElement, inOptions) {
        this.element = inElement;
        this.options = nx.mix(DEFAULT_OPTIONS, inOptions);
        this.attachEvents();
      },
      attachEvents: function() {
        var el = this.element;
        var doc = global.document;
        console.log('TOUCH_START', NxTouchEvents.TOUCH_START);
        console.log('TOUCH_MOVE', NxTouchEvents.TOUCH_MOVE);
        console.log('TOUCH_END', NxTouchEvents.TOUCH_END);
        this._startRes = NxDomEvent.on(el, NxTouchEvents.TOUCH_START, this._onStart.bind(this));
        this._moveRes = NxDomEvent.on(doc, NxTouchEvents.TOUCH_MOVE, this._onMove.bind(this));
        this._endRes = NxDomEvent.on(doc, NxTouchEvents.TOUCH_END, this._onEnd.bind(this));
      },
      detachEvents: function() {
        this._startRes.destroy();
        this._moveRes.destroy();
        this._endRes.destroy();
      },
      event: function(inEvent) {
        if (inEvent.touches && inEvent.touches.length > 0) {
          var event = inEvent.touches[0];
          event.offsetX = event.clientX - event.target.offsetLeft;
          event.offsetY = event.clientY - event.target.offsetTop;
          return event;
        }
        return inEvent;
      },
      change: function(inType, inEvent) {
        var event = this.event(inEvent);
        this.options.onChange({
          target: {
            type: inType,
            value: {
              x: event.clientX - this._offset.x,
              y: event.clientY - this._offset.y
            }
          }
        });
      },
      _onStart: function(inEvent) {
        var event = this.event(inEvent);
        this._offset = { x: event.offsetX, y: event.offsetY };
        this.change('dragstart', inEvent);
      },
      _onMove: function(inEvent) {
        if (this._offset) {
          this.change('drag', inEvent);
        }
      },
      _onEnd: function(inEvent) {
        if (this._offset) {
          this.change('dragend', inEvent);
          this._offset = null;
        }
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxDraggable;
  }
})();
