//part 1
const express = require('express')
const app = express()

app.use(express.json())

const isers = []

app.get('/users', (req, res) => {
	res.json(users)
})

app.post('/users', (req, res) => {
	try {
		const user = { name: req.body.name, password: req.body.password }
		users.push(user)
		res.status(201).send()
	} catch {
		res.status(500).send()
	}
})

app.post('/users/login', (req, res) => {
	const user = users.find(user => user.name = req.body.name)
	if (user === null) {
		return set.status(400).send('Can not find user')
	}
	try {
		if (compare(req.body.password, user.password)) {
			res.send('Success')
		} else {
			res.send('Not allowed')
		}
	} catch {
		res.status(500).send()
	}
})

app.listen(3000)

//part 2
//Here I did wrong task, but I realized it too late
const express = require('express')
const app = express()
const { ROLE, users } = require('./data')
const { authUser, authRole } = require('./basicAuth')
const projectRouter = require('./routes/projects')

app.use(express.json())
app.use(setUser)
app.use('/projects', projectRouter)

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/dashboard', authUser, (req, res) => {
  res.send('Dashboard Page')
})

app.get('/admin', authUser, authRole(ROLE.ADMIN), (req, res) => {
  res.send('Admin Page')
})

function setUser(req, res, next) {
  const userId = req.body.userId
  if (userId) {
    req.user = users.find(user => user.id === userId)
  }
  next()
}

app.listen(3000)