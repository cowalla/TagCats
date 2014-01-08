(function(root){
  var PT = root.PT = root.PT || {};

  var PhotoDetailView = PT.PhotoDetailView = function(photo) {
    this.$el = $("<div></div>");
    this.photo = photo;
  };
  //
  // PhotoDetailView.prototype.handleImageClick = function(event){
  //   console.log(event.offsetX +" "+event.offsetY);
  //   this.$el.append("<div>LOL</div>");
  // }

  PhotoDetailView.prototype.render = function() {
    this.$el.html(JST["photo_detail"]({photo: this.photo}));
    this.$el.children().children(".back").on('click', function(event) {
      event.preventDefault();
      PT.showPhotosIndex();
    });
    var that = this;
    this.$el.children().children(".image").on('click',
          // this.handleImageClick.bind(this, event));
          function(){
            console.log(event.offsetX +" "+event.offsetY);
            console.log(event);
            var $div = $("<div class=\"photoTag\">LOL</div>");
            $div.css({position: "absolute",
                      left: event.clientX-50,
                      top: event.clientY-50});
            that.$el.append($div);
    });

    return this;
  };



})(this)