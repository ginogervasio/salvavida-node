var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var path = require('path');

var DealSchema = new mongoose.Schema({
  title: String,
  description: String,
  filePath: String,
  heroImagePath: String,
  price: { type: Number, default: 0 },
  downloadCount: { type: Number, default: 0 },
  creator: mongoose.Schema.Types.ObjectId,
});
DealSchema.plugin(timestamps);

DealSchema.methods.heroImageUrl = function () {
  return "/deals/" + this.id + "/hero_image";
}

DealSchema.methods.downloadUrl = function () {
  return "/deals/" + this.id + "/download";
}

var Deal = mongoose.model('Deal', DealSchema);

exports.DealSchema = DealSchema;
exports.Deal = Deal;