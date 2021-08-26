//Zona Exclusiva para adminstracion
//Tener cuidado con el acceso
const { response } = require("express");
const Category = require("../models/category");

const postCategory = async (req, res = response) => {
  const category = new Category(req.body);
  const { name } = req.body;
  try {
    const existsCategory = await Category.findOne({ name });
    if (existsCategory) {
      return res.status(505).json({
        msg: "Ya existe una categoria con ese nombre",
      });
    }

    await category.save();
    res.json({
      category,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

const getCategories = async (req, res = response) => {
  const categories = await Category.find();

  res.json({
    categories,
  });
};

const deleteCategory = async (req, res = response) => {
  const { id } = req.body;
  try {
    const categoryDB = await Category.findById(id);
    if (!categoryDB) {
      return res.json({
        msg: "No existe la categoria",
      });
    }
    await Category.findByIdAndDelete(id);
    res.json({
      ok: true,
      msg: "Ha sido eliminado",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

const putCategory = async (req, res = response) => {
  const { id, name } = req.body;

  try {
    const categoryDB = await Category.findById(id);
    if (!categoryDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe esa categoria",
      });
    }
    //Actualizar
    //esto es de un error que no me salio a mi, lo pongo por si las moscass
    if (categoryDB.name != name) {
      const existsCategory = await Category.findOne({
        name,
      });
      if (existsCategory) {
        return res.status(404).json({
          ok: false,
          msg: "Ya existe esa categoria",
        });
      }
    }

    const newCategory = await Category.findByIdAndUpdate(
      id,
      {  name,  },
      {  new: true, }
    );

    res.json({
      ok: true,
      newCategory,
    });
  } catch (error) {}
};

module.exports = {
  postCategory,
  getCategories,
  deleteCategory,
  putCategory,
};
