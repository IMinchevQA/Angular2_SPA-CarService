module.exports = function responseGenerator (message, payload) {
  if (payload) {
    return {
      success: true,
      message: message,
      payload
    }
  }
  return {
    success: false,
    message: message
  }
}