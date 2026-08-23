// ============================================================
// 图片来源开关
// "local"  = 本地图片 / 当前 Netlify 方式
// "github" = GitHub Raw
// "r2"     = Cloudflare R2（以后使用）
// ============================================================

// const IMAGE_SOURCE = "local";
const IMAGE_SOURCE = "github";

const GITHUB_RAW_BASE =
  "https://raw.githubusercontent.com/guylawvii/Bathroom/refs/heads/deploy/netlify/";

const R2_BASE = "https://R2图片域名/";

function imagePath(path) {
  if (IMAGE_SOURCE === "local") {
    return path;
  }

  if (IMAGE_SOURCE === "github") {
    return GITHUB_RAW_BASE + path.split(" ").join("%20");
  }

  if (IMAGE_SOURCE === "r2") {
    return R2_BASE + path.split(" ").join("%20");
  }

  return path;
}

const product_image_Large = {
  bathroom_sconce: Array.from({ length: 20 }, (_, i) =>
    imagePath(`Product images/bathroom_sconce(${i + 1}).png`),
  ),
  bathroom_vanity: Array.from({ length: 20 }, (_, i) =>
    imagePath(`Product images/bathroom_vanity(${i + 1}).png`),
  ),
  bathroom_vanity__faucet: Array.from({ length: 20 }, (_, i) =>
    imagePath(`Product images/bathroom_vanity__faucet(${i + 1}).png`),
  ),
  bathroom_shower__head: Array.from({ length: 20 }, (_, i) =>
    imagePath(`Product images/bathroom_shower__head(${i + 1}).png`),
  ),
  bathroom_shower__valve: Array.from({ length: 20 }, (_, i) =>
    imagePath(`Product images/bathroom_shower__valve(${i + 1}).png`),
  ),
  bathroom_shower__handshower: Array.from({ length: 20 }, (_, i) =>
    imagePath(`Product images/bathroom_shower__handshower(${i + 1}).png`),
  ),

  bathroom_tub__spout: Array.from({ length: 20 }, (_, i) =>
    imagePath(`Product images/bathroom_tub__spout(${i + 1}).png`),
  ),
  bathroom_shower__pull: Array.from({ length: 20 }, (_, i) =>
    imagePath(`Product images/bathroom_shower__pull(${i + 1}).png`),
  ),
  bathroom_toilet__paper__holder: Array.from({ length: 20 }, (_, i) =>
    imagePath(`Product images/bathroom_toilet__paper__holder(${i + 1}).png`),
  ),

  bathroom_towel__bar: Array.from({ length: 20 }, (_, i) =>
    imagePath(`Product images/bathroom_towel__bar(${i + 1}).png`),
  ),

  bathroom_mirror: Array.from({ length: 20 }, (_, i) =>
    imagePath(`Product images/bathroom_mirror(${i + 1}).png`),
  ),

  bathroom_mirror__header__light: Array.from({ length: 20 }, (_, i) =>
    imagePath(`Product images/bathroom_mirror__header__light(${i + 1}).png`),
  ),

  bathroom_base__trim: Array.from({ length: 20 }, (_, i) =>
    imagePath(`Product images/bathroom_base__trim(${i + 1}).png`),
  ),

  // 浴室墙面地面材料
  bathroom_dry__wall: Array.from({ length: 20 }, (_, i) =>
    imagePath(`Product images/bathroom_dry__wall(${i + 1}).png`),
  ),
  bathroom_dry__wall__lower: Array.from({ length: 20 }, (_, i) =>
    imagePath(`Product images/bathroom_dry__wall__lower(${i + 1}).png`),
  ),
  bathroom_wet__wall: Array.from({ length: 20 }, (_, i) =>
    imagePath(`Product images/bathroom_wet__wall(${i + 1}).png`),
  ),
  bathroom_dry__floor: Array.from({ length: 20 }, (_, i) =>
    imagePath(`Product images/dry__floor(${i + 1}).png`),
  ),
  bathroom_wet__floor: Array.from({ length: 20 }, (_, i) =>
    imagePath(`Product images/wet__floor(${i + 1}).png`),
  ),
};

const product_image_Thumbnail = {};
Object.keys(product_image_Large).forEach((category) => {
  product_image_Thumbnail[category] = [];
  for (let i = 0; i < 20; i++) {
    // const thumbPath = `Product images/${category}_thumb(${i + 1}).png`;
    const thumbPath = imagePath(
      `Product images/${category}_thumb(${i + 1}).png`,
    );
    product_image_Thumbnail[category].push(thumbPath);
  }
});

// 将墙面和地面映射到同一个产品数据
const bathroom_wall__finish_images = Array.from(
  { length: 20 },
  (_, i) => imagePath(`Product images/bathroom_wall__finish(${i + 1}).png`) ,
);
const bathroom_wall__finish_thumb = Array.from(
  { length: 20 },
  (_, i) => imagePath(`Product images/bathroom_wall__finish_thumb(${i + 1}).png`) ,
);
const bathroom_floor__finish_images = Array.from(
  { length: 20 },
  (_, i) => imagePath(`Product images/bathroom_floor__finish(${i + 1}).png`) ,
);
const bathroom_floor__finish_thumb = Array.from(
  { length: 20 },
  (_, i) => imagePath(`Product images/bathroom_floor__finish_thumb(${i + 1}).png`) ,
);

product_image_Large.bathroom_dry__wall = bathroom_wall__finish_images;
product_image_Large.bathroom_dry__wall__lower = bathroom_wall__finish_images;
product_image_Large.bathroom_wet__wall = bathroom_wall__finish_images;
product_image_Large.bathroom_dry__floor = bathroom_floor__finish_images;
product_image_Large.bathroom_wet__floor = bathroom_floor__finish_images;

product_image_Thumbnail.bathroom_dry__wall = bathroom_wall__finish_thumb;
product_image_Thumbnail.bathroom_dry__wall__lower = bathroom_wall__finish_thumb;
product_image_Thumbnail.bathroom_wet__wall = bathroom_wall__finish_thumb;
product_image_Thumbnail.bathroom_dry__floor = bathroom_floor__finish_thumb;
product_image_Thumbnail.bathroom_wet__floor = bathroom_floor__finish_thumb;

// 映射浴室 categories 到共享数据
productList.bathroom_dry__wall = productList.bathroom_wall__finish;
productList.bathroom_dry__wall__lower = productList.bathroom_wall__finish;
productList.bathroom_wet__wall = productList.bathroom_wall__finish;
productList.bathroom_dry__floor = productList.bathroom_floor__finish;
productList.bathroom_wet__floor = productList.bathroom_floor__finish;

// Brand的颜色
const brandColorAbbrList = {
  "Ann Sacks": {
    abbreviation: "AS",
    color: "rgb(155, 23, 56)",
    fontColor: "white",
  },
  "Restoration Hardware": {
    abbreviation: "RH",
    color: "rgba(255,239,210,1)",
    fontColor: "black",
  },
  "Newport Brass": {
    abbreviation: "NB",
    color: "rgb(117, 92, 38)",
    fontColor: "white",
  },
  Kohler: {
    abbreviation: "Kohler",
    color: "rgb(0, 48, 81)",
    fontColor: "white",
  },
  Portola: {
    abbreviation: "PORTOLA",
    color: "rgb(236, 229, 210)",
    fontColor: "black",
  },
  Sobu: {
    abbreviation: "SOBU",
    color: "rgba(46,132,170,1)",
    fontColor: "white",
  },
  "Artistic Tile": {
    abbreviation: "AT",
    color: "rgba(242,184,184,1)",
    fontColor: "WHITE",
  },
  Cb2: {
    abbreviation: "CB2",
    color: "rgba(173,164,0,1)",
    fontColor: "black",
  },
  Lostine: {
    abbreviation: "LOSTINE",
    color: "rgba(203,220,213,1)",
    fontColor: "black",
  },
  Hinkley: {
    abbreviation: "HINKLEY",
    color: "rgba(189,237,238,1)",
    fontColor: "black",
  },
  Kuzco: {
    abbreviation: "KUZCO",
    color: "rgba(223,192,238,1)",
    fontColor: "black",
  },
  Maxim: {
    abbreviation: "MAXIM",
    color: "rgb(142, 145, 117)",
    fontColor: "white",
  },
  "West Elm": {
    abbreviation: "WEST ELM",
    color: "rgba(192,122,0,1)",
    fontColor: "white",
  },
  Wayfair: {
    abbreviation: "WAYFAIR",
    color: "rgba(69,49,83,1)",
    fontColor: "white",
  },
  Ricll: {
    abbreviation: "RICLL",
    color: "rgba(246,223,215,1)",
    fontColor: "BLACK",
  },
  "Phillip Jeffries": {
    abbreviation: "PJ",
    color: "rgba(143,162,150,1)",
    fontColor: "white",
  },
  Snyn: {
    abbreviation: "SNYN",
    color: "rgba(197,36,0,1)",
    fontColor: "white",
  },
  Lumens: {
    abbreviation: "LUMENS",
    color: "rgba(103,142,180,1)",
    fontColor: "white",
  },
  Abc: {
    abbreviation: "ABC",
    color: "rgba(211,224,168,1)",
    fontColor: "black",
  },
  Lacava: {
    abbreviation: "LACAVA",
    color: "rgba(0,78,124,1)",
    fontColor: "WHITE",
  },
  Rejuvenation: {
    abbreviation: "RE",
    color: "rgb(208, 210, 196)",
    fontColor: "BLACK",
  },
  "Edward Martin": {
    abbreviation: "EM",
    color: "rgb(243, 237, 223)",
    fontColor: "BLACK",
  },
  "Signature Hardware": {
    abbreviation: "SH",
    color: "rgb(73, 54, 39)",
    fontColor: "white",
  },
  Fresca: {
    color: "rgb(65, 8, 109)",
    fontColor: "white",
  },
  "James Martin": {
    abbreviation: "JM",
    color: "rgb(84, 112, 139)",
    fontColor: "white",
  },
  "Ws Bath": {
    abbreviation: "WS",
    color: "rgb(26, 157, 216)",
    fontColor: "white",
  },
};

const defaultOptions = [
  {
    name: "Option1",
    selections: {
      bathroom_dry__wall: 0,
      bathroom_dry__wall__lower: 0,
      bathroom_wet__wall: 0,
      bathroom_dry__floor: 0,
      bathroom_wet__floor: 0,
      bathroom_base__trim: 0,
      bathroom_vanity: 0,
      bathroom_vanity__faucet: 0,
      bathroom_shower__head: 0,
      bathroom_shower__handshower: 0,
      bathroom_shower__valve: 0,
      bathroom_tub__spout: 0,
      bathroom_toilet__paper__holder: 0,
      bathroom_towel__bar: 0,
      bathroom_shower__pull: 0,
      bathroom_mirror: 0,
      bathroom_mirror__header__light: 0,
      bathroom_sconce: 0,
    },
    itemVisibility: {
      // 设置为 false 表示隐藏，设置为 true 或省略表示显示
      bathroom_sconce: false,
      bathroom_base__trim: false,
      bathroom_shower__pull: false,
      bathroom_wet__floor: false,
      bathroom_dry__wall__lower: false,
      bathroom_wet__wall: false,
    },
    rotations: {}, // 存储每个 category 的旋转角度
  },
  {
    name: "Option2",
    selections: {
      bathroom_dry__wall: 1,
      bathroom_dry__wall__lower: 1,
      bathroom_wet__wall: 1,
      bathroom_dry__floor: 1,
      bathroom_wet__floor: 1,
      bathroom_base__trim: 1,
      bathroom_vanity: 1,
      bathroom_vanity__faucet: 1,
      bathroom_shower__head: 1,
      bathroom_shower__handshower: 1,
      bathroom_shower__valve: 1,
      bathroom_tub__spout: 1,
      bathroom_toilet__paper__holder: 1,
      bathroom_towel__bar: 1,
      bathroom_shower__pull: 1,
      bathroom_mirror: 1,
      bathroom_mirror__header__light: 1,
      bathroom_sconce: 1,
    },
    itemVisibility: {
      // 设置为 false 表示隐藏，设置为 true 或省略表示显示
      bathroom_sconce: false,
      bathroom_base__trim: false,
      bathroom_shower__pull: false,
      bathroom_wet__floor: false,
      bathroom_dry__wall__lower: false,
      bathroom_wet__wall: false,
    },
    rotations: {}, // 存储每个 category 的旋转角度
  },
];
