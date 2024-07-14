const Course = require("../modules/courses");
const ObjectId = require("mongodb").ObjectId;

/******************************************************************/
const getAllCourses = async (req, res, next) => {
  Course.find()
    .then((allCourses) => {
      res.status(200).json(allCourses);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

/******************************************************************/
const getOneCourse = async (req, res, next) => {
  const courseId = req.params.id;
  Course.find({ _id: courseId })
    .then((course) => {
      res.status(200).json(course);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

/******************************************************************/
const createCourse = async (req, res, next) => {
  const course = new Course({
    title: req.body.title,
    description: req.body.description,
    isComplete: req.body.isComplete,
  });

  course
    .save()
    .then((createdCourse) => {
      res.status(201).json(createdCourse);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

/******************************************************************/
const updateCourse = async (req, res, next) => {
  const courseId = req.params.id;

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("You must use a valid course id to update.");
  }

  Course.findOne({ _id: courseId })
    .then((course) => {
      course.title = req.body.title;
      course.description = req.body.description;
      course.isComplete = req.body.isComplete;

      Course.updateOne({ _id: courseId }, course)
        .then((response) => {
          res.status(204).json({ message: "Course Updated successfully" });
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
const deleteCourse = async (req, res, next) => {
  const courseId = req.params.id;

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("You must use a valid course id to delete.");
  }
  Course.findOne({ _id: courseId })
    .then((course) => {
      course
        .deleteOne({ _id: courseId })
        .then((response) => {
          res.status(200).json({ message: "course Deleted successfully" });
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
  getAllCourses,
  getOneCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
