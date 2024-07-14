const validator = require("../helpers/validate");

const saveCourses = async (req, res, next) => {
  const validationRule = {
    title: "required|string",
    description: "required|string",
    isComplete: "boolean",
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

// validation for lessons
const saveLessons = async (req, res, next) => {
  const validationRule = {
    courseId: "required|string",
    title: "required|string",
    content: "required|string",
    createdAt: "required|string",
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveEnrollments = async (req, res, next) => {
  const validationRule = {
    description: "required|string",
    createdAt: "required|string",
    status: "required|string",
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveCourses,
  saveLessons,
  saveEnrollments,
};
