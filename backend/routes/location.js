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
      sections: [],
    });
    for (let i = 0; newLocation.row > i; i++) {
      let sectionName = (i + 1).toString().padStart(2, "0");
      newLocation.sections.push({
        name: sectionName,
      });
    }
    await newLocation.save();
    return res
      .status(200)
      .json({ message: "新しいロケーションを登録しました", newLocation });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/section/:id/select", async (req, res) => {
  try {
    const location = await Location.findOne(
      { "sections._id": req.params.id },
      { sections: { $elemMatch: { _id: req.params.id } } }
    );
    const section = location.sections[0];

    return res.status(200).json(section);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/section/:id/storing", async (req, res) => {
  try {
    const item = await Item.findById(req.query.id);
    const location = await Location.findOne({ "sections._id": req.params.id });
    const section = location.sections.find((section) =>
      section._id.equals(req.params.id)
    );
    section.item = item._id;
    item.storage = section._id;
    await location.save();
    return res.status(200).json({
      message: `${item.product.name}を${location.station}-${location.name.floor}${location.name.area}-${section.name}に格納しました`,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/all", async (req, res) => {
  try {
    const locations = await Location.find().populate({
      path: "sections.item",
      model: "Item",
      populate: {
        path: "product",
        model: "Product",
      },
    });
    if (!locations) {
      return res
        .status(404)
        .json({ message: "ロケーションが登録されていません" });
    }
    return res.status(200).json(locations);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
