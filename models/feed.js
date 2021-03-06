var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var STATE_OPEN = 'open';
var STATE_CLOSED = 'closed';
var FeedSchema = new mongoose.Schema({
  name: String,
  description: String,
  state: { type: String, default: STATE_OPEN },
  address: String,
  source: String,
  loc: { type: [Number], index: { type: '2dsphere', sparse: true } }
});
FeedSchema.plugin(timestamps);

FeedSchema.methods.apiData = function () {
  var data = {
    id: this._id,
    name: this.name,
    description: this.description,
    state: this.state,
    address: this.address,
    createdAt: this.createdAt
  };
  if (this.loc) {
    data.lat = this.loc[0];
    data.lng = this.loc[1];
  }
  return data;
}

var Feed = mongoose.model('Feed', FeedSchema);
Feed.STATE_OPEN = STATE_OPEN;
Feed.STATE_CLOSED = STATE_CLOSED;
module.exports = Feed;