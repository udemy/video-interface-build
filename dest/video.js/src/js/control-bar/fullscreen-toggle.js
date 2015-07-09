/**
 * Toggle fullscreen video
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @class
 * @extends vjs.Button
 */
vjs.FullscreenToggle = vjs.MenuButton.extend({
  /**
   * @constructor
   * @memberof vjs.FullscreenToggle
   * @instance
   */
  init: function(player, options){
    vjs.MenuButton.call(this, player, options);
  }
});

vjs.FullscreenToggle.prototype.buttonText = 'Fullscreen';
vjs.FullscreenToggle.prototype.className = 'vjs-fullscreen-control';

vjs.FullscreenToggle.prototype.createMenu = function(){
  this.options_.title = this.options_.title || this.localize('Fullscreen');
  return vjs.MenuButton.prototype.createMenu.call(this);
};

vjs.FullscreenToggle.prototype.onClick = function(){
  if (!this.player_.isFullscreen()) {
    this.player_.requestFullscreen();
    this.controlText_.innerHTML = this.localize('Non-Fullscreen');
  } else {
    this.player_.exitFullscreen();
    this.controlText_.innerHTML = this.localize('Fullscreen');
  }
};
