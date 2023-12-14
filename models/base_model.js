const basePlugin = schema => {
  // schema.set('toJSON', { getters: true, virtuals: false })
  // schema.set('toObject', { getters: true })
  // schema.post('find', function (docs) {
  //   if (this.op === 'find') {
  //     docs.forEach(doc => {
  //       doc.id = doc._id.toString()
  //       doc._id = doc.id
  //     })
  //   }
  // })
}

export default basePlugin
