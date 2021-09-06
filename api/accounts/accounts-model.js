const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts').where({id: id}).first()
}

const create = ({name, budget}) => {
  return db('accounts').insert({name: name, budget: budget})
}

const updateById = (id, {name, budget}) => {
  return db('accounts').where({id: id}).update({name: name, budget: budget})
}

const deleteById = id => {
  return db('accounts').where({id: id}).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
