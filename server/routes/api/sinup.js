const User = require("../../models/User");
const UserSession = require("../../models/UserSession");
const Posts = require("../../models/Posts");

module.exports = app => {
  app.patch("/api/account/edit/firstName", (req, res, next) => {
    const { body } = req;
    const { firstName, email } = body;
    User.find(
      {
        email: body.email
      },
      (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Can't find a user"
          });
        }
        const user = users[0];
        user.firstName = firstName;
        user.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error"
            });
          }
          return res.send({
            success: true,
            message: "Saved"
          });
        });
      }
    );
  });

  app.patch("/api/account/edit/lastName", (req, res, next) => {
    const { body } = req;
    const { lastName, email } = body;
    User.find(
      {
        email: body.email
      },
      (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Can't find a user"
          });
        }
        const user = users[0];
        user.lastName = lastName;
        user.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error"
            });
          }
          return res.send({
            success: true,
            message: "Saved"
          });
        });
      }
    );
  });

  app.patch("/api/account/edit/adres", (req, res, next) => {
    const { body } = req;
    const { adres, email } = body;
    User.find(
      {
        email: body.email
      },
      (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Can't find a user"
          });
        }
        const user = users[0];
        user.adres = adres;
        user.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error"
            });
          }
          return res.send({
            success: true,
            message: "Saved"
          });
        });
      }
    );
  });

  app.patch("/api/account/edit/phone", (req, res, next) => {
    const { body } = req;
    const { phone, email } = body;
    User.find(
      {
        email: body.email
      },
      (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Can't find a user"
          });
        }
        const user = users[0];
        user.phone = phone;
        user.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error"
            });
          }
          return res.send({
            success: true,
            message: "Saved"
          });
        });
      }
    );
  });

  app.patch("/api/account/edit/description", (req, res, next) => {
    const { body } = req;
    const { description, email } = body;
    User.find(
      {
        email: body.email
      },
      (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Can't find a user"
          });
        }
        const user = users[0];
        user.description = description;
        user.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error"
            });
          }
          return res.send({
            success: true,
            message: "Saved"
          });
        });
      }
    );
  });

  app.patch("/api/account/edit/addUser", (req, res, next) => {
    const { body } = req;
    const { userEmail, email } = body;
    User.find(
      {
        email: body.email
      },
      (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Can't find a user"
          });
        }
        const user = users[0];
        var friend = user.friends.find(item => item === userEmail);
        if (!friend) {
          user.friends.push(userEmail);
          user.save((err, user) => {
            if (err) {
              return res.send({
                success: false,
                message: "Error"
              });
            }
            return res.send({
              success: true,
              message: "Saved"
            });
          });
        } else {
          return res.send({
            success: false,
            message: "Error"
          });
        }
      }
    );
  });

  app.patch("/api/account/edit/email", (req, res, next) => {
    const { body } = req;
    const { emailNew, email } = body;
    User.find(
      {
        email: body.email
      },
      (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Can't find a user"
          });
        }
        const user = users[0];
        user.email = emailNew;
        user.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error"
            });
          }
          return res.send({
            success: true,
            message: "Saved"
          });
        });
      }
    );
  });

  app.post("/api/account/signup", (req, res, next) => {
    const { body } = req;
    const { firstName, lastName, password, account } = body;
    let { email } = body;
    if (!firstName) {
      return res.send({
        success: false,
        message: "Error: Missing First Name"
      });
    }
    if (!lastName) {
      return res.send({
        success: false,
        message: "Error: Missing Last Name"
      });
    }
    if (!email) {
      return res.send({
        success: false,
        message: "Error: Missing email"
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Error: Missing password"
      });
    }
    email = email.toLowerCase();

    User.find(
      {
        email: email
      },
      (err, previousUsers) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Can't find a user"
          });
        } else if (previousUsers.length > 0) {
          return res.send({
            success: false,
            message: "Error: Account already exists"
          });
        }
        const newUser = new User();

        User.find(
          {
            isDeleted: false
          },
          (err, users) => {
            if (err) {
              return res.send({
                success: false,
                message: "Error: server error1"
              });
            }
            newUser.avatar = users.length;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            newUser.account = account;
            newUser.save((err, user) => {
              if (err) {
                return res.send({
                  success: false,
                  message: "Error: Account already exists"
                });
              }
              return res.send({
                success: true,
                message: "Signed up"
              });
            });
          }
        );
      }
    );
  });

  app.post("/api/account/login", (req, res, next) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;
    if (!email) {
      return res.send({
        success: false,
        message: "Error: Missing email"
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Error: Missing password"
      });
    }
    email = email.toLowerCase();
    User.find(
      {
        isDeleted: false
      },
      (err, users) => {}
    );
    User.find(
      {
        email: email
      },
      (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: server error1"
          });
        }
        if (users.length != 1) {
          return res.send({
            success: false,
            message: "Error: Invalid email"
          });
        }
        const user = users[0];
        if (!user.validPassword(password)) {
          return res.send({
            success: false,
            message: "Error: Invalid password"
          });
        }

        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error: server error2"
            });
          }
          return res.send({
            success: true,
            message: "Logged in",
            token: doc._id
          });
        });
      }
    );
  });

  app.post("/api/account/posts", (req, res, next) => {
    const { body } = req;
    let { title, topic, content, author, account } = body;
    if (!content) {
      return res.send({
        success: false,
        message: "Error: Missing email"
      });
    }
    const post = new Posts();
    post.title = title;
    post.topic = topic;
    post.content = content;
    post.author = author;
    post.account = account;
    post.save((err, user) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Can't save post"
        });
      }
      return res.send({
        success: true,
        message: "Posted!"
      });
    });
  });

  app.get("/api/account/posts", (req, res, next) => {
    Posts.find({}, (err, posts) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error"
        });
      }
      var objToJson = {};
      objToJson.response = posts;
      return res.send(JSON.stringify(objToJson));
    });
  });

  app.get("/api/account/speakers", (req, res, next) => {
    User.find(
      {
        isDeleted: false,
        account: "Speaker"
      },
      (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }

        var objToJson = {};
        objToJson.response = users;
        return res.send(JSON.stringify(objToJson));
      }
    );
  });

  app.get("/api/account/families", (req, res, next) => {
    User.find(
      {
        isDeleted: false,
        account: "Host family"
      },
      (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }

        var objToJson = {};
        objToJson.response = users;
        return res.send(JSON.stringify(objToJson));
      }
    );
  });

  app.get("/api/account/families", (req, res, next) => {
    User.find(
      {
        isDeleted: false,
        account: "Host family"
      },
      (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }
        return res.send({
          success: true,
          users: users
        });
      }
    );
  });

  app.get("/api/account/verify", (req, res, next) => {
    const { query } = req;
    const { token } = query;
    UserSession.find(
      {
        _id: token,
        isDeleted: false
      },
      (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }
        if (sessions.length != 1) {
          return res.send({
            success: false,
            message: "Error: Invalid"
          });
        } else {
          return res.send({
            success: true,
            message: "Verified"
          });
        }
      }
    );
  });

  app.get("/api/account/profile", (req, res, next) => {
    const { query } = req;
    const { token } = query;
    UserSession.find(
      {
        _id: token,
        isDeleted: false
      },
      (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }
        if (sessions.length != 1) {
          return res.send({
            success: false,
            message: "Error: Invalid"
          });
        } else {
          const session = sessions[0];
          const id = session.userId;
          User.find(
            {
              _id: id
            },
            (err, users) => {
              if (err) {
                return res.send({
                  success: false,
                  message: "Error"
                });
              } else {
                const user = users[0];
                return res.send({
                  success: true,
                  first: user.firstName,
                  last: user.lastName,
                  email: user.email,
                  adres: user.adres,
                  description: user.description,
                  phone: user.phone,
                  avatar: user.avatar,
                  friends: user.friends,
                  account: user.account
                });
              }
            }
          );
        }
      }
    );
  });
  app.get("/api/account/logout", (req, res, next) => {
    const { query } = req;
    const { token } = query;
    UserSession.findOneAndUpdate(
      {
        _id: token,
        isDeleted: false
      },
      {
        $set: { isDeleted: true }
      },
      null,
      (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }
        return res.send({
          success: true,
          message: "Good"
        });
      }
    );
  });
};
