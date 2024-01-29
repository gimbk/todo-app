function isAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
      // L'utilisateur est connecté
      return next();
    } else {
      // Rediriger vers la page de connexion ou renvoyer une erreur
      res.status(401).send('Non autorisé');
    }
  }

  module.exports = isAuthenticated;