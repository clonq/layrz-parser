(function() {
	var EventEmitter, LayrzParser;
	var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
		for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
			function ctor() { this.constructor = child; }
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child;
	};
	EventEmitter = require("events").EventEmitter;
	LayrzParser = (function() {
		__extends(LayrzParser, EventEmitter);
		function LayrzParser() {
		}
		LayrzParser.prototype.parse = function(data) {
			if(!data) {
				this.emit('no-data');
				return;
			}
			if(data.metadata) this.emit('metadata', data.metadata);
			if(data.layers) this.emit('layers', data.layers);
			for(var i=0; i<data.layers.length; i++) {
				var layer = data.layers[i];
				this.emit('layer', {_index:i, _code:'LAY'+((i<10)?'0'+(i+1):(i+1)), layer:layer});
				if(layer.objects) {
					this.emit('objects', {_count:layer.objects.length, objects:layer.objects});
					for(var j=0; j<layer.objects.length; j++) {
						var object = layer.objects[j];
						this.emit('object', {_index:j, code:'OBJ'+((j<10)?'0'+(j+1):(j+1)), object:object});
					}
					this.emit('objects-done');
				} 
				this.emit('layer-done');
			}
			this.emit('done');
			return;
		};
		return LayrzParser;
	})();
	module.exports = function() {
  		return new LayrzParser();
	};
}).call(this);
