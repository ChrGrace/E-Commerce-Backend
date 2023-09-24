const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  Category.findAll({
    include: {
      model: Product
    }
  }).then((categories) => {
    res.json(categories);
  });
});

router.get('/:id', (req, res) => {
  Product.findAll({
    where: {
      category_id: req.params.id
    }
  }).then((products) => {
    res.json(products);
  });
});

router.post('/', (req, res) => {

  const create = Object.keys(req.body).length > 0 ? req.body : req.query;

  if (!create.category_name) {
    res.json({ status: "error", message: "Category is expected" });
    return;
  }

  if (create.id) {
    Category.findOne({
      where: {
        id: create.id
      }
    }).then((cat) => {
      if (cat) {
        res.json({ status: "error", message: "Category already exists" });
        return;
      }
    });
  }
  else {
    Category.create(create);
    res.json({ status: "success" });
  }
});

router.put('/:id', (req, res) => {
  const update = Object.keys(req.body).length > 0 ? req.body : req.query;

  if (update.id) {
    res.json({ status: "error", message: "id is not updated" });
    return;
  }

  Category.update(update, {
    where: {
      id: req.params.id
    }
  });
  res.status(200).json({ status: 'success' });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  });
  res.status(200).json({ status: 'success' });
});

module.exports = router;