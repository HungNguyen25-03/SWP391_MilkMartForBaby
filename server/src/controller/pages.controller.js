const { getPaged } = require("../services/pages.services");


const pagesController = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 40;

    try {
        const result = await getPaged(page, pageSize);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });

    }
};


module.exports = {
    pagesController
}