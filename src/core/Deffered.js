export default function Deffered() {
  var self = this;
  self.promise = new Promise(function (resolve, reject) {
    self.reject = reject
    self.resolve = resolve
  });
}
