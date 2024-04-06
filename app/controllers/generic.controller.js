const { StatusCodes } = require("http-status-codes");

const getAllItems = async (req, res, Model) => {
  try {
    const { page = 1, limit = 10, searchTerm = "" } = req.query;
    const searchQuery = {};

    if (searchTerm) {
      const keywords = searchTerm
        .split("%")
        .map((keyword) => new RegExp(keyword, "i"));
      searchQuery.name = { $all: keywords };
    }

    const totalItems = await Model.countDocuments(searchQuery);
    const items = await Model.find(searchQuery)
      .skip((page - 1) * limit)
      .limit(limit);

    const totalPages = Math.ceil(totalItems / limit);

    res.status(StatusCodes.OK).json({
      currentPage: parseInt(page),
      totalPages,
      totalItems,
      items,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const updateItem = async (req, res, Model, identifier) => {
  try {
    const itemExists = await Model.findOne({ _id: identifier });

    if (!itemExists) {
      return res.status(404).send({
        status: 404,
        message: `No item with id ${req.authData.id} found`,
      });
    }

    const updatedItem = await Model.findOneAndUpdate(
      { _id: identifier },
      req.body,
      { new: true }
    );

    res.status(StatusCodes.OK).json({
      item: updatedItem,
      message: "Item updated successfully",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: 500, message: error.message });
  }
};

const deleteItem = async (req, res, Model, identifier) => {
  try {
    const item = await Model.findOneAndDelete({ _id: identifier });

    if (!item) {
      return res.status(404).json({
        status: 404,
        message: `No item with id ${identifier} found`,
      });
    }

    res.status(StatusCodes.OK).json({
      message: "Item deleted successfully",
      item,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: 500, message: error.message });
  }
};

module.exports = { getAllItems, updateItem, deleteItem };
