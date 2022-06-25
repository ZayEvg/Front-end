const express = require('express')
const router = express.Router()
const pokemon = require('../models/pokemon')

//Getting all
router.get('/', async (req, res) => {
	try {
		const pokemons = await pokemon.find()
		res.json(pokemons)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})
//Getting one
router.get('/:id', getPokemon, (req, res) => {
	res.json(res.pokemon)
})
//Creating one
router.post('/', async (req, res) => {
	const pokemon = new pokemon({
		name: req.body.name,
		color: req.body.color,
	})
	
	try {
		const newPokemon = await pokemon.save()
		res.status(201).json(newPokemon)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})
//Updating one
router.patch('/:id', async (req, res) => {
	if (req.body.name != null) {
		res.pokemon.name = req.body.name
	}
	if (req.body.color != null) {
		res.pokemon.color = req.body.color
	}
	try {
		const updatedPokemon = await res.pokemon.save()
		res.json(updatedPokemon)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})
//Deleting one
router.delete('/:id', getPokemon, async (req, res) => {
	try {
		await res.pokemon.remove()
	res.json({ message: 'Deleted pokemon' })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

async function getPokemon(req, res, next) {
	try {
		pokemon = await pokemon.findById(req.params.id)
		if (pokemon === null) {
			return res.statud(404).json({ message: 'Can not find pokemon' })
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
	
	res.pokemon = pokemon
	next()
}

module.exports = router