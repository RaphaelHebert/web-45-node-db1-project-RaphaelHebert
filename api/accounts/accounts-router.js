const router = require('express').Router()
const Accounts = require('./accounts-model')
const {checkAccountId, checkAccountNameUnique, checkAccountPayload } = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(accounts => {
      res.status(200).json(accounts)
    })
    .catch(next)
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.status(200).json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.create({name: req.body.name, budget: req.body.budget})
    .then(value => {
      return Accounts.getById(value[0])
    })
    .then(account =>{
      res.status(201).json(account)
    })
    .catch(next)
})

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  Accounts.updateById(req.params.id, {name: req.body.name, budget: req.body.budget})
    .then(newAccount => {
      return  Accounts.getById(newAccount)
    })
    .then(updatedAccount => {
        res.status(200).json(updatedAccount)
    })
    .catch(next)
});

router.delete('/:id',checkAccountId , (req, res, next) => {
  Accounts.deleteById(req.params.id)
    .then(account => {
      res.status(200).json(account)
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})


module.exports = router;
