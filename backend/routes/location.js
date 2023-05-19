const router = require("express").Router();
const Location = require("../models/Location");
const Item = require("../models/Item");

//新しいロケーションを作成する
router.post("/regist", async (req, res) => {
  try {
    const location = await Location.findOne({
        "name.floor": req.body.floor,
        "name.area": req.body.area,
    });
    if (location) {
      return res.status(409).json({ message: "登録済みのロケーションです" });
    }
    const newLocation = await new Location({
      name: {
        floor: req.body.floor,
        area: req.body.area,
      },
      col: req.body.col,
      row: req.body.row,
    }).save();
    return res
      .status(200)
      .json({ message: "新しいロケーションを登録しました", newLocation });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/all", async (req, res) => {
  try {
    const location = await Location.find();
    if (!location) {
      res.status(404).json({ message: "ロケーションが登録されていません" });
    }
    return res.status(200).json(location);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports =  router;
