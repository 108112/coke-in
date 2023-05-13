const router = require("express").Router();
const Product = require("../models/Product");

router.post("/regist", async (req, res) => {
  try {
    const product = await Product.findOne({
      code: { JS: req.body.code, branch: req.body.branch },
    });
    if (product) {
      return res.status(400).json({ message: "すでに存在しています" });
    }
    const newProduct = await new Product({
      code: {
        JS: req.body.code,
        branch: req.body.branch,
      },
      name: req.body.name,
      volume: req.body.volume,
      maxLoad: req.body.maxLoad,
    }).save();
    return res
      .status(200)
      .json({ message: "新商品を登録しました", newProduct });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({ message: "製品が存在しません" });
    }
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/:id/select", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "製品が存在しません" });
    }
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.delete("/:id/delete", async (req, res) => {
  try {
    const Products = await Product.findByIdAndDelete(req.params.id);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/:id/edit", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      volume: req.body.volume,
      code: req.body.code,
      maxLoad: req.body.maxLoad,
      bestBefore: req.body.bestBefore,
    });
    if (!product) {
      return res.status(404).json({ message: "製品が存在しません" });
    }
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const product = await Product.find({
      name: { $regex: req.query.q, $options: "i" },
    });
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
