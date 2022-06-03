const db = require("../models");

const Image = db.images;

const createInvite = async (req, res) => {
  let data = {
    workspace_id: req.body.workspace_id,
    user_email: req.body.user_email,
  };
  try {
    const invite = await Invite.create(data);
    res.status(201).send(invite);
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).json({ error: e.errors[0].message });
    }
  }
};

module.exports = {
  createInvite,
};
