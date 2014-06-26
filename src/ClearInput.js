/*
 *
 *
 *   The MIT License (MIT)
 *
 *   Copyright (c) 2014 Alessandro Filippo Annini
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *   THE SOFTWARE.
 *
 * Owner: alessandro.annini@gmail.com
 * @license MIT
 * @copyright Alessandro Filippo Annini, 2014
 *
* */

    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var InputSurface = require('famous/surfaces/InputSurface');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');
    var EventHandler = require('famous/core/EventHandler');

    function ClearInput(options) {
        View.apply(this, arguments);

        this.eventOutput = new EventHandler();
        EventHandler.setOutputHandler(this, this.eventOutput);

        this.rootModifier = new StateModifier({
            size: this.options.size
        });

        this._mainSurface = new Surface({
            size: options.size || [undefined, true],
            classes: options.classes || ['clear-input']
        });

        this._inputSurface = new InputSurface({
            size: this._mainSurface.getSize(),
            placeholder: options.placeholder,
            type: 'text'
        });

        this._imageSurface = new ImageSurface({
            size: [this._inputSurface.getSize()[1], this._inputSurface.getSize()[1]],
            content: options['clearImage'] || '<img src="' + defaultClearImg + '"/>',
            properties: {
                paddingRight: '4px'
            }
        });

        this._imageModifier = new StateModifier({
            origin: [true, 0.5],
            transform: Transform.translate(-4, 0, 0)
        });

        this._imageSurface.on('click', function () {
            this._inputSurface.setValue('');
            this.eventOutput.emit('inputCleared');
        }.bind(this));

        this.mainNode = this.add(this.rootModifier);
        this.mainNode.add(this._mainSurface);
        this.mainNode.add(this._inputSurface);
        this.mainNode.add(this._imageModifier).add(this._imageSurface);
    }

    ClearInput.prototype = Object.create(View.prototype);
    ClearInput.prototype.constructor = ClearInput;

    ClearInput.prototype.getValue = function () {
        return this._inputSurface.getValue();
    };

    ClearInput.prototype.setValue = function (data) {
        return this._inputSurface.setValue(data);
    };

    ClearInput.prototype.ev = function (ev, action) {
        this._inputSurface.on(ev, action);
    };

    ClearInput.prototype.focus = function() {
        this._inputSurface.focus();
    };

    ClearInput.prototype.setProperties = function(obj) {
        this._inputSurface.setProperties(obj);
    };

    var defaultClearImg = '';

