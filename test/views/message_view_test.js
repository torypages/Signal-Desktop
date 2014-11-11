describe('MessageView', function() {
  var thread = Whisper.Threads.add({id: 'foo'});
  var message = thread.messages().add({
    threadId: thread.id,
    body: 'hello world',
    type: 'outgoing',
    timestamp: new Date().getTime()
  });

  it('should display the message text', function() {
    var view = new Whisper.MessageView({model: message});
    assert.match(view.render().$el.html(), /hello world/);
  });

  it('should auto-update the message text', function() {
    var view = new Whisper.MessageView({model: message});
    message.set('body', 'goodbye world');
    assert.match(view.$el.html(), /goodbye world/);
  });

  it('should have a nice timestamp', function() {
    var view = new Whisper.MessageView({model: message});
    message.set({'timestamp': new Date().getTime() - 5000});
    assert.match(view.$el.html(), /seconds ago/);

    message.set({'timestamp': new Date().getTime() - 60000});
    assert.match(view.$el.html(), /minute ago/);

    message.set({'timestamp': new Date().getTime() - 3600000});
    assert.match(view.$el.html(), /hour ago/);
  });

  it('should go away when the model is destroyed', function() {
    var view = new Whisper.MessageView({model: message});
    var div = $('<div>').append(view.$el);
    message.destroy();
    assert.strictEqual(div.find(view.$el).length, 0);
  });
});
