// 源自 https://github.com/zent-contrib/sku/blob/master/src/utils/index.js

// 计算每个sku后面有多少项
export function getLevels(tree) {
  let level = []
  for (let i = tree.length - 1; i >= 0; i--) {
    if (tree[i + 1] && tree[i + 1].leaf) {
      level[i] = tree[i + 1].leaf.length * level[i + 1] || 1
    } else {
      level[i] = 1
    }
  }
  return level
}

/**
 * 笛卡尔积运算
 * @param  {[type]} tree   [description]
 * @param  {Array}  stocks [description]
 * @return {[type]}        [description]
 */
export function flatten(tree, stocks = [], options) {
  let { optionValue = 'id', optionText = 'value' } = options || {}
  let result = []
  let skuLen = 0
  let stockMap = {} // 记录已存在的stock的数据
  const level = getLevels(tree)
  if (tree.length === 0) return result
  tree.forEach(sku => {
    const { leaf } = sku
    if (!leaf || leaf.length === 0) return true
    skuLen = (skuLen || 1) * leaf.length
  })
  // 根据已有的stocks生成一个map
  stocks.forEach(stock => {
    let { specs, ...attr } = stock
    stockMap[specs.map(item => `${item.specId}_${item.specValueId}`).join('|')] = attr
  })
  for (let i = 0; i < skuLen; i++) {
    let specs = []
    let mapKey = []
    tree.forEach((sku, column) => {
      const { leaf } = sku
      let item = {}
      if (!leaf || leaf.length === 0) return true
      if (leaf.length > 1) {
        let row = parseInt(i / level[column], 10) % leaf.length
        item = tree[column].leaf[row]
      } else {
        item = tree[column].leaf[0]
      }
      if (!sku[optionValue] || !item[optionValue]) return
      mapKey.push(`${sku[optionValue]}_${item[optionValue]}`)
      specs.push({
        specId: sku[optionValue],
        specName: sku[optionText],
        specValueId: item[optionValue],
        specValueName: item[optionText]
      })
    })
    let { ...data } = stockMap[mapKey.join('|')] || {}
    // 从map中找出存在的sku并保留其值
    result.push({ ...data, specs })
  }
  return result
}

/**
 * 判断两个sku是否相同
 * @param  {[type]}  prevSKU [description]
 * @param  {[type]}  nextSKU [description]
 * @return {Boolean}         [description]
 */
export function isEqual(prevSKU, nextSKU, options) {
  let { optionValue = 'id' } = options || {}
  return (
    nextSKU.length === prevSKU.length &&
    nextSKU.every(({ leaf = [] }, index) => {
      let prevLeaf = prevSKU[index].leaf || []
      return (
        prevSKU[index][optionValue] === nextSKU[index][optionValue] &&
        leaf.length === prevLeaf.length &&
        leaf.map(item => item[optionValue]).join(',') ===
          prevLeaf.map(item => item[optionValue]).join(',')
      )
    })
  )
}
