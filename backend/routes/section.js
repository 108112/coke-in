const router = require("express").Router();
const Location = require("../models/Location");
const Section = require("../models/Section");

router.post("/:id/regist", async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if(location.sections.some(sec => sec.name === req.body.name)) {
      return res.status(409).json({message: "登録済みのセクションです"});
    }
    if(location.sections.length >= location.row ) {
      return res.status(409).json({message: "これ以上登録できません"})
    }
    const newSection = await new Section({
      location: location._id,
      name: req.body.name,
    }).save();
    location.sections.push(newSection);
    const updateLocation = await location.save();
    return res.status(200).json({message: `${updateLocation.station}-${updateLocation.name.floor}${updateLocation.name.area}-${newSection.name}を登録しました`, updateLocation});
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
