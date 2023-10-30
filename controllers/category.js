const Category = require('../models/Category');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
    //console.log(req.user._id);
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    }
    catch(e) {
        errorHandler(res, 501, e);
    }    
}

module.exports.getById = async (req, res) => {
    try{
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    }
    catch(e){
        errorHandler(res, 501, e);
    }

    //res.json({ message: 'Categories: getById'});
}


module.exports.create = async (req, res) => {
    //res.json({ message: 'Categories: create'});

    try {
    const category = await new Category({
        name: req.body.name,
        imgSrc: req.body.imgSrc,
        user: req.body.id
    })

    category.save();
    res.status(201).json(category);
    }
    catch(e){
        errorHandler(res, 501, e);
    }
}

module.exports.update = async (req, res) => {
    //res.json({ message: 'Categories: update'});
    try{
        const updateCategory = {
            name: req.body.name
        };
        const category = await Category.findByIdAndUpdate(
            {
            _id: req.params.id
            },
            {
                $set: updateCategory
            },
            {
                new: true
            }
        );
        res.status(200).json(category);
    }
    catch(e){
        errorHandler(res, 501, e);
    }
}

module.exports.remove = async (req, res) => {
    //res.json({ message: 'Categories: remove'});
    try{
        await Category.remove({
            _id: req.params.id
        });
        errorHandler(res, 200, {message: "Категория удалена"});
    }
    catch(e){
        errorHandler(res, 501, e);
    }
}