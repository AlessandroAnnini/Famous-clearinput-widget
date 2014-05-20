/*
 *
 *   The MIT License (MIT)
 *
 *   Copyright (c) 2014 Motley Agency
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
 * Owner: alessandro@annini.net
 * @license MIT
 * @copyright Alessandro Annini, 2014
 *
* */

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