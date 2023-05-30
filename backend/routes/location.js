const router = require("express").Router();
const { Location, Section } = require("../models/Location");

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
      sections: [],
    });
    for (let i = 0; newLocation.row > i; i++) {
      let sectionName = "";
      if(i <= 9 ) {
        sectionName = `0${i + 1}`;
      } else {
        sectionName = `${i + 1}`;
      }
      const section = await new Section({
        name: sectionName,
      });
      newLocation.sections.push(section);
    }
    const updateLocation = await newLocation.save();
    return res
      .status(200)
      .json({ message: "新しいロケーションを登録しました", updateLocation });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/:id/select", async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    return res.status(200).json(section);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const location = await Location.find();
    if (!location) {
      return res
        .status(404)
        .json({ message: "ロケーションが登録されていません" });
    }
    return res.status(200).json(location);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
