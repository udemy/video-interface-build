/*! videojs-tracking - v0.0.0 - 2015-5-7
 * Copyright (c) 2015 burakostancioglu, rustylarner
 * Licensed under the Apache-2.0 license. */
(function(window, videojs) {
  'use strict';

  var defaults = {
        option: true
      },
      tracking;

  /**
   * Initialize the plugin.
   * @param options (optional) {object} configuration for the plugin
   */
  tracking = function(options) {
    var settings = videojs.util.mergeOptions(defaults, options);
    var callback_function = options.callback_function;

    //register events
    this.on("ended", ended);
    this.on("error", error);
    this.on("firstplay", first_play);
    this.on("play", play);
    this.on("fullscreenchange", full_screen_change);
    this.on("pause", pause)
    this.on("volumechange", volume_change);


    function ended(ended_event){
        var data = {};
        data.duration = this.duration();
        data.type = "end";
        callback_function(data);
    }

    function error(error_event){
        var data = {};
        data.type = 'error';
        data.code = this.error().code;
        data.message = this.error().message;
        callback_function(data);
    }

    function first_play(first_play_event){
        var data = {};
        data.type = "first_play";
        callback_function(data);
    }

    function full_screen_change(full_screen_change_event){
        var data = {};
        data.type = 'full_screen_change';
        data.isFullScreen = this.isFullscreen();
        callback_function(data);
    }

    function pause(pause_event){
        var data = {};
        data.type = 'pause';
        callback_function(data);
    }

    function volume_change(volume_change_event){
        var data = {};
        data.type = 'volume_change';
        data.volume = this.volume();
        callback_function(data);
    }

    function play(){
        var data = {}
        data.type = 'play';
        callback_function(data);
    }
  };

  // register the plugin
  videojs.plugin('tracking', tracking);
})(window, window.videojs);
