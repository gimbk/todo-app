
const Task = require('../models/task');

exports.getAllTasks = async (req, res, next) => {
  try {
    const [allTasks] = await Task.fetchAll();
    res.status(200).json(allTasks);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllUserTasks = async (req, res, next) => {
  try {
    const [allTasks] = await Task.fetchAllUser(req.params.id);
    res.status(200).json(allTasks);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getOneTasks = async (req, res, next) => {
  try {
    const [allTasks] = await Task.fetchOne(req.params.id);
    res.status(200).json(allTasks);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.countTask = async (req, res, next) => {
  try {
    const [allTasks] = await User.countTask();
    res.status(200).json(allTasks);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postTask = async (req, res, next) => {
  try {
    // L'utilisateur est connecté, vous pouvez accéder à req.session.userId ici
    //const userId = req.session.userId;

    const postResponse = await Task.post(req.body.title, req.body.description, req.body.user_id, req.body.percent,new Date().getDate().toString(), new Date().getDate());
    res.status(201).json(postResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.putTask = async (req, res, next) => {
  try {
    const putResponse = await Task.update(req.body.id, req.body.title, req.body.description, req.body.priority, req.body.percent);
    res.status(200).json(putResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const deleteResponse = await Task.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
