define(function(require, exports, module) {
    var ContainerSurface = require('famous/surfaces/ContainerSurface');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var InputSurface = require('famous/surfaces/InputSurface');
    var Modifier = require('famous/core/Modifier');

    function ClearInput(options) {
        ContainerSurface.call(this, {
            size: options.size || [undefined, true],
            classes: options.classes || ['clear-input']
        });

        this._fieldSurface = new InputSurface({
            size: [undefined, undefined],
            placeholder: options.placeholder,
            type: 'text'
        });

        this._delSurface = new ImageSurface({
            size: [(options.size[1] / 2 + 4), (options.size[1] / 2)],
            content: options['clearImage'],
            properties: {
                paddingRight: '4px'
            }
        });

        this._delModifier = new Modifier({
            origin: [1, 0.5]
        });

        this._delSurface.on('click', function () {
            this._fieldSurface.setValue('');
            this.emit('inputCleared');
        }.bind(this));

        this.add(this._fieldSurface);
        this.add(this._delModifier).add(this._delSurface);
    }

    ClearInput.prototype = Object.create(ContainerSurface.prototype);
    ClearInput.prototype.constructor = ClearInput;

    ClearInput.prototype.getValue = function () {
        return this._fieldSurface.getValue();
    };

    ClearInput.prototype.setValue = function (data) {
        return this._fieldSurface.setValue(data);
    };

    ClearInput.prototype.ev = function (ev, action) {
        this._fieldSurface.on(ev, action);
    };

    module.exports = ClearInput;
});