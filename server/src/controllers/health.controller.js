const alive = async (req, res) => {
  try {
    const jsonPackageFile = require('../../package.json');
    const jsonPackageObject = Object.assign(jsonPackageFile);

    res
      .status(200)
      .send(`Server is alive. Version: ${jsonPackageObject['version']}`);
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = { alive };
