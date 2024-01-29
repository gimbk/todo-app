const db = require('../util/database');

module.exports = class Task {
  constructor(id, title,description,priority,percent,created_at,updated_at) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.percent = percent;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fetchAll(id) {
    return db.execute('SELECT * FROM tasks WHERE user_id = ?', [id]);
  }

  static fetchOne(id) {
    return db.execute('SELECT * FROM tasks WHERE id = ?', [id]);
  }

  static countTask() {
    return db.execute('SELECT COUNT(*) list FROM tasks');
  }

  static post(title,description,user_id,percent,created_at,updated_at) {
    return db.execute('INSERT INTO tasks (title,description,user_id,created_at,updated_at) VALUES (?,?,?,NOW(),NOW())', [title,description,user_id]);
  }

  static update(id, title,description) {
    return db.execute('UPDATE tasks SET title = ?,description = ?,updated_at = NOW() WHERE id = ?', [title,description, id]);
  }

  static delete(id) {
    return db.execute('DELETE FROM tasks WHERE id = ?', [id]);
  }
};
