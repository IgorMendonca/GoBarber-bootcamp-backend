import * as Yup from 'yup';

import ScaleSchema from '../schemas/ScheduleScale';
import User from '../models/User';

class ScheduleScale {
  async store(req, res) {
    const schema = Yup.object().shape({
      scale: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const isProvider = await User.findByPk(req.userId);

    if (!isProvider.provider) {
      return res.status(401).json({ error: 'User not is provider' });
    }

    const scaleExists = await ScaleSchema.findOne({ user: req.userId });

    if (scaleExists) {
      return res
        .status(400)
        .json({ error: 'This provider already contains a scale' });
    }

    const { scale } = req.body;

    const timesValidation = scale.split(',');

    let hourValidate = false;

    await timesValidation.forEach((time) => {
      const [hour, minute] = time.split(':');

      if (hour > 23 || minute > 60) {
        hourValidate = true;
      }
    });

    if (hourValidate) {
      return res.status(401).json({ error: 'Invalid hour' });
    }

    const scaleString = String(scale);

    await ScaleSchema.create({
      user: req.userId,
      scale: scaleString,
    });

    return res.json(scale);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      scale: Yup.array().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const isProvider = await User.findByPk(req.userId);

    if (!isProvider.provider) {
      return res.status(401).json({ error: 'User not is provider' });
    }

    const { scale } = req.body;

    const scaleString = String(scale);

    const scaleExists = await ScaleSchema.findOneAndUpdate(
      { user: req.userId },
      {
        scale: scaleString,
      },
      { new: true }
    );

    if (!scaleExists) {
      return res.status(401).json({ error: 'You need create a scale first' });
    }

    return res.json(scale);
  }

  async delete(req, res) {
    const isProvider = await User.findByPk(req.userId);

    if (!isProvider.provider) {
      return res.status(401).json({ error: 'User not is provider' });
    }

    const scaleExists = await ScaleSchema.findOneAndDelete({
      user: req.userId,
    });

    if (!scaleExists) {
      return res.status(401).json({ error: "You don't have scale" });
    }

    return res.json({ message: 'Sucess' });
  }
}

export default new ScheduleScale();
