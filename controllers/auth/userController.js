exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

exports.userBoard = (req, res) => {

  res.status(200).send({
    message: 'Đã đăng nhập với tài khoản là User',
    user: req.user,
  });
};

exports.adminBoard = (req, res) => {
  res.status(200).send('Đã đăng nhập với tài khoản là Admin');
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send('Đã đăng nhập với tài khoản là moderatorBoard');
};
