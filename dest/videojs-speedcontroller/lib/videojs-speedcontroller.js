/*! videojs-speedcontroller - v0.0.0 - 2015-6-17
 * Copyright (c) 2015 burakbostancioglu
 * Licensed under the Apache-2.0 license. */
(function(window, videojs) {
  'use strict';



    videojs.SpeedContainer = videojs.Component.extend({
        init: function( player, options ) {
            var el = this._createEl(options, player);
            var elDefaults = {'el':el}
            var newOptions = videojs.util.mergeOptions(elDefaults, options);
            videojs.Component.call(this, player, newOptions);
        }
    });

    videojs.currentSpeed = 1

    videojs.SpeedContainer.prototype.options_ = {
        children: {}
    };

    videojs.SpeedContainer.prototype._createEl = function (tagName, player) {
        var createElement  = videojs.Component.prototype.createEl;
        var createIcon = function createIcon(iconClass) {
            var icon = createElement('a', {className: iconClass});
            icon.appendChild(createElement('div', {'innerHTML': '10'}));
            return icon;
        };

        var playbackControls = createElement('div',{
            className: 'playback-controls'
        });

        var rewind = createIcon('icon-rewind');
        rewind.onclick = function() {
            player.currentTime(player.currentTime()-10);
        };

        playbackControls.appendChild(rewind);

        var speedControl = createElement('div',{
            className: 'speed-control'
        });

        var speedNumber = createElement('span',{
            className: 'speed-no'
        });

        speedControl.appendChild(speedNumber);
        this.speedNumber = speedNumber;

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
        speedDown.onclick = function() {
            var rates = player.options()['playbackRates'];
            var index = rates.lastIndexOf(player.playbackRate());
            if (index-1 >= 0) {
                player.playbackRate(rates[index-1]);
            }
        };

        var speedUp = createElement('a',{
            className: 'speed-adjust speed-up'

        });

        speedUp.onclick = function() {
            var rates = player.options()['playbackRates'];
            var index = rates.lastIndexOf(player.playbackRate());
            if (index+1 < rates.length) {
                player.playbackRate(rates[index+1]);
            }
        };

        var speedUpIcon = createElement('span',{
            className: 'icon-plus'
        });

        speedUp.appendChild(speedUpIcon);
        speedAdjust.appendChild(speedUp);

        speedControl.appendChild(speedAdjust);
        playbackControls.appendChild(speedControl);
        var forward = createIcon('icon-forward');
        forward.onclick = function() {
            player.currentTime(player.currentTime()+10);
        };

        playbackControls.appendChild(forward);

        return playbackControls;

    };

    videojs.SpeedContainer.prototype.buildCSSClass = function() {
        return 'vjs-speed-container-overlay ' + videojs.Component.prototype.buildCSSClass.call(this);
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
    var settings = videojs.util.mergeOptions(defaults, options);
    var speedController = new videojs.SpeedContainer( this, settings );
    speedController.currentSpeed  = 1;
    this.controlBar.addChild(speedController);
    this.on('playbackRateChange', function() {
        speedController.speedNumber.innerHTML = this.playbackRate()+'x';
    });
    speedController.speedNumber.innerHTML = this.playbackRate()+'x';
  };

  // register the plugin
  videojs.plugin('speedcontroller', speedcontroller);
})(window, window.videojs);
