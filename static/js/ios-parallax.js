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
  this.x_center_ = 0;
  /** @private */
  this.y_center_ = 0;
  /** @private */
  this.x_target_ = this.x_center_;
  /** @private */
  this.y_target_ = this.y_center_;
  /** @private */
  this.x_dampen_ = this.x_center_;
  /** @private */
  this.y_dampen_ = this.y_center_;

}

iosParallax.prototype.bindEvents = function(){
  var self = this;
  
  $(self.options.backgroundElement).mousemove(function(e){
    var height = self.options.movementFactor / $(window).height();
    var width = self.options.movementFactor / $(window).width();
    var pageX = e.pageX - ($(window).width() / 2);
    var pageY = e.pageY - ($(window).height() / 2);
    self.x_target_ = width * pageX * -1 + self.x_center_;
    self.y_target_ = height * pageY * -1 + self.y_center_;
  });

  var loop = setInterval(function(){
    self.x_dampen_ += ((self.x_target_ - self.x_dampen_)/self.options.dampenFactor);
    self.y_dampen_ += ((self.y_target_ - self.y_dampen_)/self.options.dampenFactor);
    $(self.options.backgroundElement).css("background-position", self.x_dampen_+"px "+self.y_dampen_+"px");
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
  console.log('Background image size', bgImgSize.width, bgImgSize.height);
  self.x_center_ = -1 * (bgImgSize.width - $(window).width()) / 2;
  self.y_center_ = -1 *(bgImgSize.height - $(window).height()) / 2;
  self.x_target_ = self.x_center_;
  self.y_target_ = self.y_center_;
  self.x_dampen_ = self.x_center_;
  self.y_dampen_ = self.y_dampen_;
}

iosParallax.prototype.getBackgroundImageSize_ = function(){
  var self = this;
  var img = new Image;
  var imgUrl = $(self.options.backgroundElement).css('background-image').replace(/url\(|'|"|'|"|\)$/ig, "");
  img.src = imgUrl;
  return {width: img.width, height: img.height};
}

iosParallax.prototype.log = function(){
  console.log('Window width and height', $(window).width(), $(window).height());
}



