export default function Deffered() {
  this.promise = new Promise(function (resolve, reject) {
    this.reject = reject
    this.resolve = resolve
  }.bind(this));
  Object.freeze(this);
}
