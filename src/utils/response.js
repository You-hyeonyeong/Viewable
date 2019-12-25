const response = (res, status, message, data) => {
  res
    .status(status)
    .json({
      success: true,
      status: status,
      message: message,
      data: data
    })
    .end();
};

const errResponse = (res, status, message) => {
  res
    .status(status)
    .json({
      success: false,
      status: status,
      message: message
    })
    .end();
};

module.exports = { response, errResponse };