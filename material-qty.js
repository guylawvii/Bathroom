// 材质面积/用量配置（覆盖 product-list.js 中的 qty）
const materialQty = {
  // 墙面（单位：平方英尺）
  // 墙面（包含干区墙面下部和湿区墙面）：29'6"长 × 8'高 = 18.75 × 8.5 = 159.375 ≈ 160
  bathroom_dry__wall: 236,

  // 干区墙面下部：24'长 × 高度（比台面高，含防溅板），假设高度 4' = 24 × 4 = 75
  bathroom_dry__wall__lower: 96,

  // 湿区墙面：5'9'长 × 8'高 = 46
  bathroom_wet__wall: 46,

  // 地面（包含湿区地面）
  bathroom_dry__floor: 35,
  // 湿区地面（Tub不算地面面积）
  bathroom_wet__floor:0,

  // 踢脚（单位：英尺）
  bathroom_base__trim: 19, // 18'9" ≈ 19 英尺
};

// 判断某个 category 是否使用材质面积（而不是 product-list 中的 qty）
const isAreaBasedCategory = (category) => {
  return materialQty.hasOwnProperty(category);
};

// 获取某个 category 的用量
const getMaterialQty = (category) => {
  // return materialQty[category] || null;
  return materialQty.hasOwnProperty(category) ? materialQty[category] : null;
};

// 挂载到 window，供其他 JS 文件调用
window.materialQty = materialQty;
window.isAreaBasedCategory = isAreaBasedCategory;
window.getMaterialQty = getMaterialQty;
