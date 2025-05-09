import express from "express"
import Internship from "../models/internship.model.js"


const router = express.Router()

// GET all insternships
router.get('/', async (req, res) => {
    const internships = await Internship.find({}).sort({createdAt: -1})
    res.status(200).json(internships)
})
// POST a new workout
router.post('/', async (req, res) => {
    const {company, role, duration, isFavorite} = req.body
    try {
        const internship = await Internship.create({company, role, duration, isFavorite})
        res.status(200).json(internship)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
// PUT to update isFavorite to true
router.put('/:id/favorite', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Missing ID parameter" });
    }
    try {
        const current_favorite = await Internship.findById(id);
        if (!current_favorite) {
            return res.status(404).json({ error: "Internship not found" });
        }

        const internship = await Internship.findByIdAndUpdate(
            id,
            { isFavorite: current_favorite.isFavorite === "false" ? "true" : "false" },
            { new: true }
        );
        res.status(200).json(internship);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// GET favorite internships
router.get('/favorites', async (req, res) => {
    try {
        const favoriteInternships = await Internship.find({ isFavorite: "true" }).sort({ createdAt: -1 })
        res.status(200).json(favoriteInternships)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// DELETE all internships
router.delete('/', async (req, res) => {
    try {
        await Internship.deleteMany({})
        res.status(200).json({ message: "All internships have been deleted" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

export default router