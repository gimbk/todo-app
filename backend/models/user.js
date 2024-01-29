const db = require('../util/database');

module.exports = class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM users');
  }

  static countUser() {
    return db.execute('SELECT COUNT(*) list FROM users');
  }

  static findByUsername(username) {
    return db.execute('SELECT id,username,password FROM users WHERE username = ?', [username]); 

  }
  

  static register(username, password) {
    return db.execute('INSERT INTO users ( username,password) VALUES (?,?)', [username, password]);
  }

  static login(username, password) {
    return db.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
  }

  static update(id, name, username, email, password) {
    return db.execute('UPDATE users SET name = ?,username = ?,email = ?, password= ? WHERE id = ?', [name, username, email, password, id]);
  }

  static delete(id) {
    return db.execute('DELETE FROM users WHERE id = ?', [id]);
  }
};
