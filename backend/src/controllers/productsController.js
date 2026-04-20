const productsService = require('../services/productsService')

function parseBool(value) {
  if (value === undefined) return undefined
  const v = String(value).toLowerCase()
  if (v === '1' || v === 'true' || v === 'yes') return true
  if (v === '0' || v === 'false' || v === 'no') return false
  return undefined
}

function sendError(res, err) {
  const status = err.status || 500
  return res.status(status).json({
    message: err.message || 'Ошибка сервера'
  })
}

async function list(req, res) {
  try {
    const {
      category,
      subcategory,
      q,
      limit,
      offset,
      sale,
      popular,
      isNew,
      inStock
    } = req.query

    const products = await productsService.listProducts({
      category,
      subcategory,
      q,
      limit,
      offset,
      sale: parseBool(sale),
      popular: parseBool(popular),
      isNew: parseBool(isNew),
      inStock: parseBool(inStock)
    })

    return res.json({ products })
  } catch (err) {
    return sendError(res, err)
  }
}

async function getBySlug(req, res) {
  try {
    const { slug } = req.params
    const product = await productsService.getProductBySlug(slug)

    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' })
    }

    return res.json({ product })
  } catch (err) {
    return sendError(res, err)
  }
}

async function listSales(req, res) {
  try {
    const { limit, offset } = req.query

    const products = await productsService.listSaleProducts({ limit, offset })

    return res.json({ products })
  } catch (err) {
    return sendError(res, err)
  }
}

module.exports = {
  list,
  getBySlug,
  listSales
}
