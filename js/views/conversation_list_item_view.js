var Whisper = Whisper || {};

(function () {
  'use strict';

  Whisper.ConversationListItemView = Backbone.View.extend({
    tagName: 'div',
    className: 'contact',

    events: {
      'click': 'open',
    },
    initialize: function() {
      this.template = $('#contact').html();
      Mustache.parse(this.template);

      this.listenTo(this.model, 'change', this.render); // auto update
      this.listenTo(this.model, 'destroy', this.remove); // auto update
      this.listenTo(this.model, 'render', this.open);
    },

    open: function(e) {
      $('.conversation').trigger('close'); // detach any existing conversation views
      if (!this.view) {
        this.view = new Whisper.ConversationView({ model: this.model });
      } else {
        this.view.delegateEvents();
      }
      this.view.render();
      this.$el.addClass('selected');
    },

    render: function() {
      this.$el.html(
        Mustache.render(this.template, {
          contact_name: this.model.get('name'),
          contact_avatar: this.model.get('image'),
          last_message: this.model.get('lastMessage'),
          last_message_timestamp: moment(this.model.get('timestamp')).format('MMM M')
        })
      );

      return this;
    }

  });
})();
