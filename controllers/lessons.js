const Lesson = require("../modules/lessons");
const ObjectId = require("mongodb").ObjectId;

/******************************************************************/
const getAllLessons = async (req, res, next) => {
  Lesson.find()
    .then((allLessons) => {
      res.status(200).json(allLessons);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

/******************************************************************/
const getOneLesson = async (req, res, next) => {
  const lessonId = req.params.id;
  Lesson.find({ _id: lessonId })
    .then((lesson) => {
      res.status(200).json(lesson);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

/******************************************************************/
const createLesson = async (req, res, next) => {
  const lesson = new Lesson({
    courseId: req.body.courseId,
    title: req.body.title,
    content: req.body.content,
    createdAt: req.body.createdAt,
  });

  lesson
    .save()
    .then((createdLesson) => {
      res.status(201).json(createdLesson);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

/******************************************************************/
const updateLesson = async (req, res, next) => {
  const lessonId = req.params.id;

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("You must use a valid lesson id to update.");
  }

  Lesson.findOne({ _id: lessonId })
    .then((lesson) => {
      lesson.courseId = req.body.courseId;
      lesson.title = req.body.title;
      lesson.content = req.body.content;
      lesson.createdAt = req.body.createdAt;

      Lesson.updateOne({ _id: lessonId }, lesson)
        .then((response) => {
          res.status(204).json({ message: "Lesson Updated successfully" });
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
const deleteLesson = async (req, res, next) => {
  const lessonId = req.params.id;

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("You must use a valid lesson id to delete.");
  }
  Lesson.findOne({ _id: lessonId })
    .then((lesson) => {
      lesson
        .deleteOne({ _id: lessonId })
        .then((response) => {
          res.status(200).json({ message: "lesson Deleted successfully" });
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
  getAllLessons,
  getOneLesson,
  createLesson,
  updateLesson,
  deleteLesson,
};
