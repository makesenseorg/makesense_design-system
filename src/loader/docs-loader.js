module.exports = function(source, map) {
  console.log('docs-loader', source)
  this.callback(
    null,
    `export default function (Component) {
      Component.options.__docs = ${JSON.stringify(source)}
    }`,
    map
  )
}
