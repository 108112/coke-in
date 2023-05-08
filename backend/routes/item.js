const router = require("express").Router();
const Item = require("../models/Item");

router.post("/:id/receipt", async (req, res) => {
  try {
    const filter = {
      product: req.params.id,
      bestBefore: req.body.bestBefore,
      location: { $in: [req.body.location] },
    };
    const update = {
      $inc: { quantity: req.body.quantity },
    };
    const options = {
      new: true,
      upsert: true,
    };
    const item = await Item.findOne(filter);
    if (item) {
      const updatedItem = await Item.findOneAndUpdate(filter, update, options);
      return res
        .status(200)
        .json({ message: "製品を前足ししました", updatedItem });
    }
    const newItem = await new Item({
      product: req.params.id,
      quantity: req.body.quantity,
      bestBefore: req.body.bestBefore,
      location: req.body.location,
      receipt: true,
    }).save();
    return res.status(200).json({ message: "製品を入庫しました", newItem });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.put("/:id/shipment", async (req, res) => {
  try {
    const update = {
      $inc: { quantity: -req.body.quantity },
    };
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, update);
    if(updatedItem.quantity <= req.body.quantity) {
      await Item.findByIdAndRemove(req.params.id);
      return res.status(200).json({message: "製品をロケーションから出し切りました。"});
    }
    return res.status(200).json({ message: "製品を出庫しました", updatedItem });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/:id/select", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("product");
    if (!item) {
      return res.status(404).json({ message: "製品が存在しません" });
    }
    return res.status(200).json(item);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const items = await Item.find().populate("product");
    if (!items) {
      return res.status(404).json({ message: "製品が存在しません" });
    }
    return res.status(200).json(items);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    let items;
    if (query.trim()) {
      items = await Item.find().populate({
        path: "product",
        match: { name: { $regex: query, $options: "i" } },
      });
      if (!items || !items.length || !items.some((item) => item.product)) {
        return res.status(404).json({ message: "製品が見つかりませんでした" });
      }
      return res.status(200).json(items);
    } else {
      items = await Item.find().populate("product");
      return res.status(200).json(items);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
