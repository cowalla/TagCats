(function(root){
  var PT = root.PT = root.PT || {};

  var PhotoFormView = PT.PhotoFormView = function(){
    this.$el = $("<div></div>");
  };

  PhotoFormView.prototype.render = function() {
    this.$el.html(JST["photo_form"]());
    var that = this;
    this.$el.children().children(".newPhoto").on("click", function(){
      var options = {
        title: $(this.parentElement).children("#photo-title").val(),
        url: $(this.parentElement).children("#photo-url").val()
      };
      var photo = new PT.Photo(options);
      photo.save(function() {});
    });
    return this;
  };


})(this)