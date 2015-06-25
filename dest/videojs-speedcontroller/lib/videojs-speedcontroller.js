/*! videojs-speedcontroller - v0.0.0 - 2015-6-17
 * Copyright (c) 2015 burakbostancioglu
 * Licensed under the Apache-2.0 license. */
(function(window, videojs) {
  'use strict';



    videojs.SpeedContainer = videojs.Component.extend({
        init: function( player, options ) {
            var el = this._createEl(options);
            var elDefaults = {'el':el}
            var newOptions = videojs.util.mergeOptions(elDefaults, options);
            videojs.Component.call(this, player, newOptions);
        }
    });

    videojs.currentSpeed = 1

    videojs.SpeedContainer.prototype.options_ = {
        children: {}
    };

    videojs.SpeedContainer.prototype._createEl = function (tagName, props) {
        var createElement  = videojs.Component.prototype.createEl;
        var playbackControls = createElement('div',{
            className: 'playback-controls'
        });

        var rewind = createElement('a',{
            className: 'icon-rewind'
        });

        playbackControls.appendChild(rewind);

        var speedControl = createElement('div',{
            className: 'speed-control'
        });

        var speedNumber = createElement('span',{
            className: 'speed-no'
        });

        speedControl.appendChild(speedNumber);

        var speedAdjust = createElement('div',{
            className: 'speed-adjust-wrap'
        });

        var speedDown = createElement('a',{
            className: 'speed-adjust speed-down'
        });

        var speedDownIcon = createElement('span',{
            className: 'icon-minus'
        });

        speedDown.appendChild(speedDownIcon);
        speedAdjust.appendChild(speedDown);

        var speedUp = createElement('a',{
            className: 'speed-adjust speed-up'
        });

        var speedUpIcon = createElement('span',{
            className: 'icon-plus'
        });

        speedUp.appendChild(speedUpIcon);
        speedAdjust.appendChild(speedUp);

        speedControl.appendChild(speedAdjust);
        playbackControls.appendChild(speedControl);
        var forward = createElement('a',{
            className: 'icon-forward'
        });

        playbackControls.appendChild(forward);

        return playbackControls;

    };

    videojs.SpeedContainer.prototype.buildCSSClass = function() {
        return 'vjs-speed-container-overlay' + videojs.Component.prototype.buildCSSClass.call(this);
    };


    var defaults = {
            option: true
    },
        speedcontroller;

    /**
   * Initialize the plugin.
   * @param options (optional) {object} configuration for the plugin
   */
  speedcontroller = function(options) {
    debugger;
    var settings = videojs.util.mergeOptions(defaults, options);
    var speedController = new videojs.SpeedContainer( this, settings );
    speedController.currentSpeed  = 1;
    this.controlBar.addChild(speedController);
  };

  // register the plugin
  videojs.plugin('speedcontroller', speedcontroller);
})(window, window.videojs);
