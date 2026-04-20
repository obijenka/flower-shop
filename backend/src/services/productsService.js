const pool = require('../db/index')

function mapProductRow(row) {
  if (!row) return null

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    price: row.price,
    old_price: row.old_price,
    discount: row.discount,
    rating: row.rating,
    reviews_count: row.reviews_count,
    image: row.image,
    images: row.images,
    category: row.category,
    subcategory: row.subcategory,
    in_stock: row.in_stock,
    is_sale: row.is_sale,
    is_popular: row.is_popular,
    is_new: row.is_new,
    created_at: row.created_at,
    updated_at: row.updated_at
  }
}

function buildListWhere({ category, subcategory, sale, popular, isNew, inStock, q }) {
  const where = []
  const params = []

  if (category) {
    params.push(String(category))
    where.push(`category = $${params.length}`)
  }

  if (subcategory) {
    params.push(String(subcategory))
    where.push(`subcategory = $${params.length}`)
  }

  if (sale === true) {
    where.push('(discount > 0 OR is_sale = true)')
  }

  if (popular === true) {
    where.push('is_popular = true')
  }

  if (isNew === true) {
    where.push('is_new = true')
  }

  if (inStock === true) {
    where.push('in_stock = true')
  }

  if (q) {
    params.push(`%${String(q).trim()}%`)
    where.push(`(name ILIKE $${params.length} OR description ILIKE $${params.length})`)
  }

  return {
    whereSql: where.length ? `WHERE ${where.join(' AND ')}` : '',
    params
  }
}

async function listProducts({
  category,
  subcategory,
  sale,
  popular,
  isNew,
  inStock,
  q,
  limit = 24,
  offset = 0
}) {
  const safeLimit = Math.min(Math.max(Number(limit) || 24, 1), 100)
  const safeOffset = Math.max(Number(offset) || 0, 0)

  const { whereSql, params } = buildListWhere({ category, subcategory, sale, popular, isNew, inStock, q })

  const listParams = [...params, safeLimit, safeOffset]
  const limitPos = listParams.length - 1
  const offsetPos = listParams.length

  const result = await pool.query(
    `SELECT *
     FROM products
     ${whereSql}
     ORDER BY created_at DESC
     LIMIT $${limitPos} OFFSET $${offsetPos}`,
    listParams
  )

  return result.rows.map(mapProductRow)
}

async function getProductBySlug(slug) {
  const result = await pool.query('SELECT * FROM products WHERE slug = $1', [String(slug)])
  return mapProductRow(result.rows[0])
}

async function listSaleProducts({ limit = 24, offset = 0 }) {
  return listProducts({ sale: true, limit, offset })
}

module.exports = {
  listProducts,
  getProductBySlug,
  listSaleProducts
}
