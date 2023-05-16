const mongoose = require('mongoose');
const SuperAdmin = require('../models/super-admins');

const applyResponse = (res, status, msg, data, error) => {
  res.status(status).json({
    msg,
    data,
    error,
  });
};

const updateSuperAdmin = (req, res) => {
  const { id } = req.params;
  const { firstName, email, password } = req.body;
  if (!mongoose.isValidObjectId(id)) {
    return applyResponse(res, 404, 'Id is invalid', undefined, true);
  }
  return SuperAdmin.findById(id)
    .then((superA) => {
      if (!superA) {
        return applyResponse(res, 404, `Super Admin with id: ${id} was not found`, undefined, true);
      }
      const superAObj = superA.toObject();
      const bodyObj = req.body;
      const isEqual = Object.entries(bodyObj).every(([key]) => {
        if (key !== '_id' && key !== '__v') {
          return (bodyObj[key] === superAObj[key]);
        }
        return true;
      });
      if (isEqual) {
        return applyResponse(res, 404, 'Update rejected. ReqBody is identical for that id instance', undefined, true);
      }
      return SuperAdmin.findOne({ email })
        .then((repeatedMail) => {
          if ((repeatedMail)
          && (Object.values(repeatedMail.toObject())[0].toString() !== id)) {
            return applyResponse(res, 404, 'Email already exists', undefined, true);
          }
          return SuperAdmin.findByIdAndUpdate(
            id,
            {
              firstName,
              email,
              password,
            },
            { new: true },
          )
            .then((result) => applyResponse(
              res,
              200,
              `Super Admin ${result.firstName} was updated successfully`,
              result,
              false,
            ));
        });
    })
    .catch((error) => applyResponse(res, 500, error.message, undefined, true));
};

const deleteSuperAdmin = (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return applyResponse(res, 404, 'Id is invalid', undefined, true);
  }
  return SuperAdmin.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return applyResponse(res, 404, `Super Admin with id: ${id} was not found`, undefined, true);
      }
      return applyResponse(res, 200, `Super Admin ${result.firstName} was deleted`, result, false);
    })
    .catch((error) => applyResponse(res, 500, error.message, undefined, true));
};

module.exports = { updateSuperAdmin, deleteSuperAdmin };
