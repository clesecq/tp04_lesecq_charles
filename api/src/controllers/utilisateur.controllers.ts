import { Request, Response } from "express";
import db from "../models/index.js";
import { v4 as uuidv4 } from "uuid";

const Utilisateur = db.utilisateurs;

// Create a new user
export function create(req: Request, res: Response): void {
  const utilisateur = {
    id: uuidv4(),
    nom: req.body.nom,
    prenom: req.body.prenom,
    login: req.body.login,
    pass: req.body.pass
  };

  Utilisateur.create(utilisateur)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(400).send({
        message: err.message || "Error creating user"
      });
    });
}

// Get all users
export function findAll(req: Request, res: Response): void {
  Utilisateur.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(400).send({
        message: err.message || "Error retrieving users"
      });
    });
}

// Find a single Utilisateur with a login
export function login(req: Request, res: Response): void {
  const utilisateur = {
    login: req.body.login,
    password: req.body.password
  };

  // Test
  const pattern = /^[A-Za-z0-9]{1,20}$/;
  if (pattern.test(utilisateur.login) && pattern.test(utilisateur.password)) {
    Utilisateur.findOne({ where: { login: utilisateur.login } })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Utilisateur with login=${utilisateur.login}.`
          });
        }
      })
      .catch(err => {
        res.status(400).send({
          message: "Error retrieving Utilisateur with login=" + utilisateur.login
        });
      });
  } else {
    res.status(400).send({
      message: "Login ou password incorrect"
    });
  }
}
