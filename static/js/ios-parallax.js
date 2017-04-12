/**
 * Created by hustleman on 3/26/17.
 */
function iosParallax(options){
  this.options = {
    // How fast the background moves
    movementFactor: 50,
    // How much to dampen the movement (higher is slower)
    dampenFactor: 36,
    backgroundElement: null
  };
  $.extend(this.options, options);

  /** @private */
  this.centerCoordinates_ = {x: 0, y: 0};
  /** @private */
  this.targetCoordinates_ = {x: 0, y: 0};
  /** @private */
  this.transitionCoordinates_ = {x: 0, y: 0};
}

iosParallax.prototype.bindEvents = function(){
  var self = this;
  
  $(self.options.backgroundElement).mousemove(function(e){
    var height = self.options.movementFactor / $(window).height();
    var width = self.options.movementFactor / $(window).width();
    var cursorX = e.pageX - ($(window).width() / 2);
    var cursorY = e.pageY - ($(window).height() / 2);
    self.targetCoordinates_.x = width * cursorX * -1 + self.centerCoordinates_.x;
    self.targetCoordinates_.y = height * cursorY * -1 + self.centerCoordinates_.y;
  });

  var loop = setInterval(function(){
    self.transitionCoordinates_.x += ((self.targetCoordinates_.x - self.transitionCoordinates_.x)/self.options.dampenFactor);
    self.transitionCoordinates_.y += ((self.targetCoordinates_.y - self.transitionCoordinates_.y)/self.options.dampenFactor);
    $(self.options.backgroundElement).css("background-position", self.transitionCoordinates_.x+"px "+self.transitionCoordinates_.y+"px");
  }, 16);

  $(window).resize(function(){
    self.setCenteredImageCoordinates_();
  });

  var img = new Image;
  var imgUrl = $(self.options.backgroundElement).css('background-image').replace(/url\(|'|"|'|"|\)$/ig, "");
  img.src= imgUrl;
  $(img).load(function(){
    self.setCenteredImageCoordinates_();
  });
};

iosParallax.prototype.setCenteredImageCoordinates_ = function(){
  var self = this;
  var bgImgSize = self.getBackgroundImageSize_();
  self.centerCoordinates_.x = -1 * (bgImgSize.width - $(window).width()) / 2;
  self.centerCoordinates_.y = -1 * (bgImgSize.height - $(window).height()) / 2;
  self.targetCoordinates_.x = self.centerCoordinates_.x;
  self.targetCoordinates_.y = self.centerCoordinates_.y;
  self.transitionCoordinates_.x = self.centerCoordinates_.x;
  self.transitionCoordinates_.y = self.centerCoordinates_.y;
};

iosParallax.prototype.getBackgroundImageSize_ = function(){
  var self = this;
  var img = new Image;
  var imgUrl = $(self.options.backgroundElement).css('background-image').replace(/url\(|'|"|'|"|\)$/ig, "");
  img.src = imgUrl;
  return {width: img.width, height: img.height};
};



