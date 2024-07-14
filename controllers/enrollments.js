const Enrollment = require("../modules/enrollments");
const ObjectId = require("mongodb").ObjectId;

/******************************************************************/
const getAllEnrollments = async (req, res, next) => {
  Enrollment.find()
    .then((allEnrollments) => {
      res.status(200).json(allEnrollments);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

/******************************************************************/
const getOneEnrollment = async (req, res, next) => {
  const enrollmentId = req.params.id;
  Enrollment.find({ _id: enrollmentId })
    .then((enrollment) => {
      res.status(200).json(enrollment);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

/******************************************************************/
const createEnrollment = async (req, res, next) => {
  const enrollment = new Enrollment({
    description: req.body.description,
    createdAt: req.body.createdAt,
    status: req.body.status,
  });

  enrollment
    .save()
    .then((createdEnrollment) => {
      res.status(201).json(createdEnrollment);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

/******************************************************************/
const updateEnrollment = async (req, res, next) => {
  const enrollmentId = req.params.id;

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("You must use a valid enrollment id to update.");
  }

  Enrollment.findOne({ _id: enrollmentId })
    .then((enrollment) => {
      enrollment.description = req.body.description;
      enrollment.createdAt = req.body.createdAt;
      enrollment.status = req.body.status;

      Enrollment.updateOne({ _id: enrollmentId }, enrollment)
        .then((response) => {
          res.status(204).json({ message: "enrollment Updated successfully" });
        })
        .catch((error) => {
          res.status(500).json({ error: error });
        });
    })

    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

/******************************************************************/
const deleteEnrollment = async (req, res, next) => {
  const enrollmentId = req.params.id;

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("You must use a valid Enrollment id to delete.");
  }
  Enrollment.findOne({ _id: enrollmentId })
    .then((enrollment) => {
      enrollment
        .deleteOne({ _id: enrollmentId })
        .then((response) => {
          res.status(200).json({ message: "enrollment Deleted successfully" });
        })
        .catch((error) => {
          res.status(500).json({ error: error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

module.exports = {
  getAllEnrollments,
  getOneEnrollment,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
};
