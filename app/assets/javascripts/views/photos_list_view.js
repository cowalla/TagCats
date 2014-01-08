(function(root){
  var PT = root.PT = root.PT || {};

  var PhotoListView = PT.PhotoListView = function(){
    this.$el = $("<div></div>");
    PT.Photo.on("add", this.render.bind(this));
  };

  PhotoListView.showDetail = function(event, id) {
    event.preventDefault();
    console.log(id);
    var detailView = new PT.PhotoDetailView(PT.Photo.all[id]);
    $("#content").html(detailView.render().$el)
  }

  PhotoListView.prototype.render = function() {
    this.$el.html("");
    var $ul = $("<ul></ul>");
    _.each(PT.Photo.all, function(item) {
      var $li = $("<li></li>");
      $li.append("<a href=\"#\" data-id="+item.get("id")+ ">"
                                + item.get("title") + "</a>")
      $ul.append($li);
    });
    this.$el.html($ul);

    $ul.on("click.a", function(event) {
      var id = $(event.target).data("id");
      if(id){
        PhotoListView.showDetail(event, id-1);
      };
    })



    return this;
  };
})(this)