const setJson = ({ code, message, data } = {}) => {
  return {
    code: code || 0,
    message: message || 'ok',
    data: data || null,
  }
}

export { setJson }
