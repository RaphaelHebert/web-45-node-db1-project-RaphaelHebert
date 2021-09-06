const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const budget = req.body.budget 
  const name = req.body.name 
  if(!budget || !name ){
    res.status(400).json({ message: "name and budget are required" })
  }else if(req.body.name.trim().length > 100 || req.body.name.trim().length < 3){
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  }else if(typeof(name) !== 'string'){
    res.status(400).json({ message: "name of account must be a string" })
  }else if(typeof(parseInt(budget)) !== 'number'){
    res.status(400).json({ message: "budget of account must be a number" })
  }else if(budget > 1000000 || budget < 0){
    res.status(400).json({ message: "budget of account is too large or too small" })
  }else{
    req.body.name = name.trim()
    next()
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  Accounts.getAll()
    .then(accounts => {
      const checkName = accounts.filter(({name}) => name === req.body.name)
      console.log('checkName', checkName)
      if(checkName.length > 0){
        res.status(400).json({ message: "that name is taken" })
      }else{
        next()
      }
    })
    .catch(next)
}

exports.checkAccountId = (req, res, next) => {
  if(!req.params.id){
    res.status(400).json({ message: 'no ID provided'})
  }else{
    Accounts.getById(req.params.id)
      .then(account => {
        if(!account){
          res.status(404).json({ message: 'account not found'})
        }else{
          req.account = account
          next()
        }
      })
      .catch(next)
  }
}
