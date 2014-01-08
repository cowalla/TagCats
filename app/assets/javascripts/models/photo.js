(function(root) {
  var PT = root.PT = root.PT || {}

  var Photo = PT.Photo = function (options) {
    this.attributes = _.extend({},options);
    this.attributes.owner_id = CURRENT_USER_ID;
  };

  Photo.all = [];

  Photo._events = {};

  Photo.on = function(eventName, callback) {
    if (Photo._events[eventName]) {
      Photo._events[eventName].push(callback);
    }
    else {
      Photo._events[eventName] = [callback];
    }
  };

  Photo.trigger = function(eventName) {
    _.each(Photo._events[eventName] || [], function(callback) {
      callback();
    })
  }

  _.extend(Photo.prototype, {

    get: function(attr_name) {
      return this.attributes[attr_name];
    },

    set: function(attr_name, value) {
      this.attributes[attr_name] = value;
    },

    create: function(callback) {
      var photo = this;
      if(!photo.attributes.id){
        $.ajax(
          {
          type: "POST",
          url: "/api/photos",
          data: {
            photo: photo.attributes
          },
          success: function(newAttr){
            Photo.all.push(photo);
            callback();
            _.extend(photo.attributes, newAttr);
            Photo.trigger("add")
            }
          }
        );
      };
    },

    save: function(callback){
      var photo = this;
      if(!photo.attributes.id){
        photo.create(callback);
      } else {
        $.ajax({
          type: "PUT",
          url: "/api/photos/" + photo.attributes.id ,
          data: photo.attributes,
          success: callback
        });
      }
    }

  });

  Photo.fetchByUserId = function(userId, callback) {
    $.ajax({
      type: "GET",
      url: "/api/users/"+ userId +"/photos",

      success: function(data) {
        var photos = _.map(data, function(photo) {
          return new Photo(photo);
        });
        Photo.all = photos.reverse().concat(Photo.all);
        callback(photos);
      }
    })
  };



})(this);