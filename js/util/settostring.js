export default function setToString(prefix, object) {
  Object.keys(object).forEach(function(name) {
    const toStringName = prefix + '/' + name;
    object[name].toString = () => toStringName;
  });
}
