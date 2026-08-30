// ↓↓↓↓↓ ========================= main.html 全局变量 ========================= ↓↓↓↓↓
// ↓↓↓↓↓ ========================= main.html 全局变量 ========================= ↓↓↓↓↓
// LET1 平面索引图
const PLAN_INDEX_PREFIX = "Icon images/Master__Bedroom_index_";

// LET2.1 平面图上的产品
let furnitureContainers;
let currentHoverCategory = null; // 当前悬停的产品
let lastClickedCategory = null;

// LET2.2 默认给每种产品都选择第一个
const currentSelection = {};
Object.keys(product_image_Large).forEach((category) => {
  currentSelection[category] = 0;
});

// LET3.1 middle-controls-container
let thumbnailsContainer, thumbnailList;
const thumbnailCache = {};
let productInfoHideTimeout = null;
// LET3.2 缩略图按钮
let toggleThumbBtn, toggleThumbImg, toggleThumbContainer; //缩略图按钮
let isThumbActive = true;
// LET3.3 产品详情（产品型号、链接）
let productInfoElement = null; //产品详情

// LET4.1 切换Option
let optionButtonsContainer;
const savedOptions = [];
let activeOptionIndex = -1;

// LET4.2 Option操作按钮（更新、增加、删除）
let updateOptionBtn, createOptionBtn, deleteOptionBtn;
let updateNotification;

// LET4.3 判断是否有变换产品选择
let originalSelections = {}; // 存储Option初始状态
let updateBtnEnabled = false; // Update按钮状态

// LET5 隐藏显示Brand+Price
let toggleBrandBtn, toggleBrandImg;
let bool_ShowBrand = false; //默认隐藏Brand+Price

// LET6 Item List 面板
let toggleItemsBtn, toggleItemsImg, itemsPanel, itemsListContainer;
let originalItemVisibility = {};
let currentItemVisibility = {};

// LET7 导出当前Option
let exportTableViewBtn, exportGridViewBtn;

const imageStatusCache = {};

// LET8 产品显示名称
const displayNameMap = {};

// ↑↑↑↑↑ ========================= main.html 全局变量 ========================= ↑↑↑↑↑
// ↑↑↑↑↑ ========================= main.html 全局变量 ========================= ↑↑↑↑↑

// ↓↓↓↓↓ ============== export-table.js & export.grid.js 全局变量 ============== ↓↓↓↓↓
// ↓↓↓↓↓ ============== export-table.js & export.grid.js 全局变量 ============== ↓↓↓↓↓
let exportOption = null;
let exportTotalprice = null;
let exportFormattedDate = null;
// ↑↑↑↑↑ ============== export-table.js & export.grid.js 全局变量 ============== ↑↑↑↑↑
// ↑↑↑↑↑ ============== export-table.js & export.grid.js 全局变量 ============== ↑↑↑↑↑
//
//
//
//
//
//
//
//
// ↓↓↓↓↓ ========================= main.html ========================= ↓↓↓↓↓
// ↓↓↓↓↓ ========================= main.html ========================= ↓↓↓↓↓
// ↓↓↓↓↓ ========================= main.html ========================= ↓↓↓↓↓
// ↓↓↓↓↓ ========================= main.html ========================= ↓↓↓↓↓

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ A 初始化变量 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ A 初始化变量 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ A 初始化变量 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function initializeDOMReferences() {
  // A1 平面索引图
  planIndexImg = document.getElementById("plan_index");

  // A2 平面图上的产品
  furnitureContainers = document.querySelectorAll(
    ".furniture-container, .background-container",
  );

  // A3.1 middle-controls-container
  thumbnailsContainer = document.getElementById("thumbnails-section");
  thumbnailList = document.getElementById("thumbnails-wrapper");

  // A3.2 缩略图按钮
  toggleThumbContainer = document.getElementById("middle-controls-container");
  toggleThumbBtn = document.getElementById("toggle-thumbnail-btn");
  toggleThumbImg = document.getElementById("toggle-thumbnail-btn-img");

  // A3.3 产品详情（产品型号、链接）
  productInfoElement = document.createElement("div");
  productInfoElement.id = "product-info";
  productInfoElement.className = "product-info";
  document.body.appendChild(productInfoElement);

  // A4.1 切换Option
  optionButtonsContainer = document.getElementById("option-buttons-container");
  // A4.2 Option操作按钮（更新、增加、删除）
  updateOptionBtn = document.getElementById("update-btn");
  createOptionBtn = document.getElementById("create-btn");
  deleteOptionBtn = document.getElementById("delete-btn");
  updateNotification = document.getElementById("update-notification");

  // A5 隐藏显示Brand+Price
  toggleBrandBtn = document.getElementById("toggle-brand-btn");
  toggleBrandImg = document.getElementById("toggle-brand-btn-img");

  // A6 Item List 面板
  toggleItemsBtn = document.getElementById("toggle-items-btn");
  toggleItemsImg = document.getElementById("toggle-items-btn-img");
  itemsPanel = document.getElementById("items-panel");
  itemsListContainer = document.getElementById("items-list-container");

  // A7 导出当前Option
  exportTableViewBtn = document.getElementById("export-table-view");
  exportGridViewBtn = document.getElementById("export-grid-view");

  // A8 打印按钮
  const printBtn = document.getElementById("print-btn");
  // if (printBtn) {
  //   printBtn.addEventListener("click", () => {
  //     window.print();
  //   });
  // }
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      const originalTitle = document.title;

      const optionName =
        savedOptions[activeOptionIndex]?.name ||
        `Option${activeOptionIndex + 1}`;

      document.title = `161 West 86th Street Apt 2A_Bathroom_${optionName}`;

      window.addEventListener(
        "afterprint",
        () => {
          document.title = originalTitle;
        },
        { once: true },
      );

      window.print();
    });
  }
}
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ A 初始化变量 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ A 初始化变量 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ A 初始化变量 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ AddEventListner 添加按钮动作 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ AddEventListner 添加按钮动作 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ AddEventListner 添加按钮动作 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function setupEventListeners() {
  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ LOOP THROUGH平面图上的产品 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  furnitureContainers.forEach((container) => {
    // ADD 1.1 "鼠标离开"平面图上产品时，显示默认平面索引图
    container.addEventListener("mouseleave", function () {
      currentHoverCategory = null;
      if (!thumbnailsContainer.classList.contains("active")) {
        restoreDefaultPlanIndex();
      }
    });
    // ADD 1.2 "鼠标悬停"在平面图上的产品时，根据当前产品高亮平面索引图
    container.addEventListener("mouseenter", function () {
      const category = container.dataset.category;
      currentHoverCategory = category;

      // 只有产品才更新平面索引图，背景不更新
      if (container.classList.contains("furniture-container")) {
        updateIndexPlan(category);
      }
    });

    // ADD 2 "单击"平面图上的产品
    container.addEventListener("click", function (e) {
      e.stopPropagation();
      const category = this.dataset.category;
      if (
        lastClickedCategory === category &&
        thumbnailsContainer.classList.contains("active")
      ) {
        thumbnailsContainer.classList.remove("active");
      } else {
        // ADD 2.1 显示middle-controls-container
        showThumbnails(category);
        isThumbActive = true;
        toggleThumbImg.src = "Icon images/icon_hidethumb.png";
      }
      lastClickedCategory = category;
      toggleThumbContainer.style.display = "flex";

      // ADD 2.2 根据当前Hover的产品高亮平面索引图
      updateIndexPlan(category);
    });
  });
  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ LOOP THROUGH平面图上的产品 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

  // ADD 3.1 middle-controls-container
  thumbnailList.addEventListener("click", function (e) {
    const container = e.target.closest(".thumbnail-container");
    if (container) {
      e.stopPropagation();
      const thumb = container.querySelector(".thumbnail");
      const category = thumb.dataset.category;
      const index = parseInt(thumb.dataset.index);
      switchProduct(category, index);
      thumbnailList
        .querySelectorAll(".thumbnail-container")
        .forEach((container) => {
          container.classList.remove("selected");
        });
      container.classList.add("selected");

      // 手机页面：单击缩略图后，同时显示产品 INFO
      if (window.matchMedia("(max-width: 800px)").matches) {
        if (productList[category]?.[index]) {
          if (container.classList.contains("info-visible")) {
            hideProductInfo();
            container.classList.remove("info-visible");
          } else {
            // 隐藏其他缩略图的 INFO 状态
            thumbnailList
              .querySelectorAll(".thumbnail-container")
              .forEach((container) => {
                container.classList.remove("info-visible");
              });

            showProductInfo(category, index, thumb);
            container.classList.add("info-visible");
          }
        }
      }
    }
  });
  // ADD 3.2 缩略图按钮
  toggleThumbBtn.addEventListener("click", function () {
    isThumbActive = !isThumbActive;
    if (isThumbActive) {
      if (lastClickedCategory) {
        showThumbnails(lastClickedCategory);
      }
      toggleThumbImg.src = "Icon images/icon_hidethumb.png";
    } else {
      thumbnailsContainer.classList.remove("active");
      toggleThumbImg.src = "Icon images/icon_showthumb.png";
      hideThumbnails();
    }
  });

  // ADD 3.3 鼠标悬停产品详情（产品型号、链接）
  productInfoElement.addEventListener("mouseenter", function () {
    clearTimeout(productInfoHideTimeout);
  });
  // ADD 3.4 鼠标离开产品详情，隐藏产品详情（产品型号、链接）
  productInfoElement.addEventListener("mouseleave", function () {
    hideProductInfo();
  });

  // ADD 4 Option操作按钮（更新、增加、删除）
  createOptionBtn.addEventListener("click", createNewOption);
  updateOptionBtn.addEventListener("click", updateActiveOption);
  deleteOptionBtn.addEventListener("click", deleteActiveOption);

  // ADD 5.1 隐藏显示Brand+Price和category name
  toggleBrandBtn.addEventListener("click", () => {
    toggleBrandPrice();
  });
  // ADD 5.2 更新当前Option的Brand+Price
  document.querySelectorAll(".furniture-img").forEach((img) => {
    img.addEventListener("load", function () {
      if (bool_ShowBrand) {
        const container = this.closest(".furniture-container");
        if (container) _updateBrandPrice(container);
      }
    });
  });

  // ADD 6 Item List 面板
  if (toggleItemsBtn) {
    toggleItemsBtn.addEventListener("click", toggleItemsPanel);
  }

  // ADD 7 导出当前Option
  exportTableViewBtn.addEventListener("click", exportTableView);
  exportGridViewBtn.addEventListener("click", exportGridView);
}
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ AddEventListner 添加按钮动作 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ AddEventListner 添加按钮动作 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ AddEventListner 添加按钮动作 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Customized Function 用户函数 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Customized Function 用户函数 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Customized Function 用户函数 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

// CF_1.1 显示默认平面索引图
function restoreDefaultPlanIndex() {
  if (planIndexImg) {
    planIndexImg.src = `${PLAN_INDEX_PREFIX}Base.png`;
  }
}
// CF_1.2 根据当前Hover的产品高亮平面索引图
function updateIndexPlan(category) {
  if (planIndexImg && category) {
    const furnitureName = category.replace("master__bedroom_", "");
    const capitalizedName = furnitureName
      .split("__")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("__");
    planIndexImg.src = `${PLAN_INDEX_PREFIX}${capitalizedName}.png`;
  }
}

// ↓↓↓↓↓↓↓↓↓↓↓↓ CF_2 缩略图 ↓↓↓↓↓↓↓↓↓↓↓↓
// ↓↓↓↓↓↓↓↓↓↓↓↓ CF_2 缩略图 ↓↓↓↓↓↓↓↓↓↓↓↓
// CF_2.1 创建middle-controls-container
async function showThumbnails(category) {
  // 显示加载中LOADING 图标(关闭缩略图)
  showLoadingSpinner();

  // CF_2.1.1 如果所选 category 的缩略图还没有缓存，就创建 20 个缩略图容器，标记当前选中的缩略图为 selected，然后加载每个缩略图的图片内容，等待全部加载完成。
  if (!thumbnailCache[category]) {
    thumbnailCache[category] = [];
    const loadPromises = [];
    for (let index = 0; index < 20; index++) {
      const thumbnailContainer = createThumbnailContainer(category, index);
      thumbnailCache[category].push(thumbnailContainer);

      if (index === currentSelection[category]) {
        thumbnailContainer.classList.add("selected");
      }
      loadPromises.push(
        updateThumbnailContent(thumbnailContainer, category, index),
      );
    }
    await Promise.all(loadPromises);
  }
  // 隐藏加载中LOADING 图标(关闭缩略图)
  hideLoadingSpinner();
  // CF_2.1.2 清空缩略图显示区域，把缓存的缩略图容器克隆一份添加到页面（避免直接修改缓存），并重新标记当前选中的缩略图为 selected。
  thumbnailList.innerHTML = "";
  thumbnailCache[category].forEach((container) => {
    const clonedContainer = container.cloneNode(true);
    thumbnailList.appendChild(clonedContainer);

    // 添加选中状态处理
    const index = parseInt(
      clonedContainer.querySelector(".thumbnail").dataset.index,
    );
    if (index === currentSelection[category]) {
      clonedContainer.classList.add("selected");
    }
  });

  thumbnailList.querySelectorAll(".thumbnail").forEach((thumb) => {
    // CF_2.1.3 鼠标悬停缩略图，显示产品详情（产品型号、链接）
    thumb.addEventListener("mouseenter", function () {
      hideProductInfo(true);
      const category = this.dataset.category;
      const index = parseInt(this.dataset.index);
      if (productList[category]?.[index]) {
        showProductInfo(category, index, this);
      }
    });
    // CF_2.1.4 鼠标离开缩略图，隐藏产品详情（产品型号、链接）
    thumb.addEventListener("mouseleave", function () {
      hideProductInfo();
    });
  });
  thumbnailsContainer.classList.add("active");
}

// CF_2.2 创建缩略图容器
function createThumbnailContainer(category, index) {
  const thumbnailContainer = document.createElement("div");
  thumbnailContainer.className = "thumbnail-container";

  const thumb = document.createElement("img");
  thumb.classList.add("thumbnail", "loading");
  thumb.dataset.category = category;
  thumb.dataset.index = index;

  const tagContainer = document.createElement("div");
  tagContainer.className = "thumbnail-tag-container";

  const brandTag = document.createElement("div");
  brandTag.className = "thumbnail-brand-tag";

  const priceTag = document.createElement("div");
  priceTag.className = "thumbnail-price-tag";

  tagContainer.appendChild(brandTag);
  tagContainer.appendChild(priceTag);

  thumbnailContainer.appendChild(thumb);
  thumbnailContainer.appendChild(tagContainer);

  return thumbnailContainer;
}

// CF_2.3 根据当前产品更新middle-controls-container
async function updateThumbnailContent(thumbnailContainer, category, index) {
  const thumb = thumbnailContainer.querySelector(".thumbnail");
  const brandTag = thumbnailContainer.querySelector(".thumbnail-brand-tag");
  const priceTag = thumbnailContainer.querySelector(".thumbnail-price-tag");

  try {
    const thumbSrc = product_image_Thumbnail[category][index];
    const originalSrc = product_image_Large[category][index];
    const thumbAvailable = await preloadImage(thumbSrc);
    const finalSrc = thumbAvailable ? thumbSrc : originalSrc;
    const finalAvailable = thumbAvailable || (await preloadImage(originalSrc));

    if (finalAvailable) {
      thumb.src = finalSrc;
      thumb.classList.remove("loading");

      const product = productList[category]?.[index];
      // 更新Brand+Price外观样式
      updateBrandPriceStyle(product, brandTag, priceTag);

      thumbnailContainer.style.display = "flex";
    } else {
      thumbnailContainer.style.display = "none";
      thumb.style.display = "none";
      brandTag.style.display = "none";
      priceTag.style.display = "none";
    }
  } catch (error) {
    console.error("Error loading thumbnail:", error);
    thumb.style.display = "none";
    brandTag.style.display = "none";
    priceTag.style.display = "none";
  }
}

// CF_2.2 隐藏middle-controls-container
function hideThumbnails() {
  thumbnailsContainer.classList.remove("active");
  if (!currentHoverCategory) {
    restoreDefaultPlanIndex();
  }
}

// CF_2.3 单击缩略图切换产品
function switchProduct(category, index) {
  const currentContainer = document.querySelector(
    `[data-category="${category}"]`,
  );
  if (currentContainer) {
    currentContainer.classList.add("selected");
  }

  const mainImg = document.querySelector(
    `[data-category="${category}"] .furniture-img, [data-category="${category}"] .background-img`,
  );
  if (mainImg) {
    // 显示加载中LOADING 图标（切换产品大图）
    showLoadingSpinner();

    mainImg.onload = function () {
      // 关闭加载中LOADING 图标（切换产品大图）
      hideLoadingSpinner();
      mainImg.onload = null;
    };

    mainImg.src = product_image_Large[category][index];
    currentSelection[category] = index;

    // CF_2.3.1 如果是显示Brand+Price模式 → 更新Brand+price
    if (bool_ShowBrand) {
      updateSelectedBrandPrice(category);
    }
  }

  hideProductInfo();

  // CF_2.3.2 判断是否有产品选择是否有变化（缩略图 + item list）
  checkSelectionChanges();

  // CF_2.3.3 实时更新总价
  updateOptionHeader();

  // CF_2.3.4 旋转背景材质图案角度
  const container = document.querySelector(`[data-category="${category}"]`);
  initRotateIcon(container, category, mainImg);
}

// CF_2.4 判断是否有产品选择是否有变化（缩略图 + item list）
function checkSelectionChanges() {
  // CF_2.4.1 检查缩略图是否有更改
  const hasSelectionChanges = !deepEqual(currentSelection, originalSelections);
  // CF_2.4.2 检查 item list 勾选是否有更改
  const hasVisibilityChanges = !deepEqual(
    currentItemVisibility,
    originalItemVisibility,
  );
  // CF_2.4.3 判断缩略图 + item list任意一个是否有更改
  const hasChanges = hasSelectionChanges || hasVisibilityChanges;
  if (hasChanges && !updateBtnEnabled) {
    // 启用Update按钮
    updateOptionBtn.disabled = false;
    updateOptionBtn.querySelector("img").style.opacity = "1";
    updateOptionBtn.style.cursor = "pointer";
    updateBtnEnabled = true;
  } else if (!hasChanges && updateBtnEnabled) {
    // 禁用Update按钮
    disableUpdateBtn();
  }
}
// CF_2.5 比较原来的option和当前的option的产品是否有区别
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  // 判断每个产品
  for (const key of keys1) {
    if (!keys2.includes(key)) return false;

    if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
      if (!deepEqual(obj1[key], obj2[key])) return false;
    } else if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}
// ↑↑↑↑↑↑↑↑↑↑↑↑ CF_2 缩略图 ↑↑↑↑↑↑↑↑↑↑↑↑
// ↑↑↑↑↑↑↑↑↑↑↑↑ CF_2 缩略图 ↑↑↑↑↑↑↑↑↑↑↑↑

// ↓↓↓↓↓↓↓↓↓↓↓↓ CF_3 产品详情（产品型号、链接）↓↓↓↓↓↓↓↓↓↓↓↓
// ↓↓↓↓↓↓↓↓↓↓↓↓ CF_3 产品详情（产品型号、链接）↓↓↓↓↓↓↓↓↓↓↓↓
// CF_3.1 显示产品详情
function showProductInfo(category, index, targetElement) {
  clearTimeout(productInfoHideTimeout);
  const product = productList[category]?.[index];
  if (!product) return;
  let titleHtml;
  if (product.link) {
    titleHtml = `<a href="${
      product.link
    }" target="_blank" class="product-title-link"><h3>${
      product.product || "N/A"
    }</h3></a>`;
  } else {
    titleHtml = `<h3>${product.product || "N/A"}</h3>`;
  }
  productInfoElement.innerHTML = `
        <div class="product-header">
            ${titleHtml}             
        </div>
            <div class="product-data">
            <div class="product-data-row">
                <span class="product-data-property-name">Brand:</span>
                <span class="product-data-property-value">${
                  product.brand || "N/A"
                }</span>
            </div>
            <div class="product-data-row">
                <span class="product-data-property-name">Size:</span>
                <span class="product-data-property-value">${
                  product.size || "N/A"
                }</span>
            </div>
            <div class="product-data-row">
                <span class="product-data-property-name">Price:</span>
                <span class="product-data-property-value">${
                  product.price || "N/A"
                }</span>
            </div>
            <div class="product-data-row">
                <span class="product-data-property-name">Delivery:</span>
                <span class="product-data-property-value">${
                  product.delivery || "N/A"
                }</span>
            </div>
        </div>
    `;

  productInfoElement.classList.add("visible");

  const infoRect = productInfoElement.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const targetRect = targetElement.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  let top = targetRect.top + scrollTop - infoRect.height - 10;
  let left =
    targetRect.left + scrollLeft + targetRect.width / 2 - infoRect.width / 2;

  if (top < 10) top = targetRect.bottom + scrollTop + 10;
  if (left < 10) left = 10;
  if (left + infoRect.width > viewportWidth - 10)
    left = viewportWidth - infoRect.width - 10;

  productInfoElement.style.position = "fixed";
  productInfoElement.style.left = `${left}px`;
  productInfoElement.style.top = `${top}px`;
}

// CF_3.2 隐藏产品详情
function hideProductInfo(immediate = false) {
  if (immediate) {
    clearTimeout(productInfoHideTimeout);
    productInfoElement.classList.remove("visible");
  } else {
    productInfoHideTimeout = setTimeout(() => {
      productInfoElement.classList.remove("visible");
    }, 50);
  }
}
// ↑↑↑↑↑↑↑↑↑↑↑↑ CF_3 产品详情（产品型号、链接）↑↑↑↑↑↑↑↑↑↑↑↑
// ↑↑↑↑↑↑↑↑↑↑↑↑ CF_3 产品详情（产品型号、链接）↑↑↑↑↑↑↑↑↑↑↑↑

// ↓↓↓↓↓↓↓↓↓↓↓↓ CF_4 Update, create, delete option按钮操作 ↓↓↓↓↓↓↓↓↓↓↓↓
// ↓↓↓↓↓↓↓↓↓↓↓↓ CF_4 Update, create, delete option按钮操作 ↓↓↓↓↓↓↓↓↓↓↓↓

// CF_4.1 创建Option按钮的HTML
function writeOptionBtnHTML() {
  optionButtonsContainer.innerHTML = "";
  // CF_4.1.1 为每一个Option创建div
  savedOptions.forEach((option, index) => {
    const btn = document.createElement("div");
    btn.textContent = option.name.toUpperCase();
    btn.className = "options-btn";
    // CF_4.1.2 标记当前Option
    if (index === activeOptionIndex) {
      btn.classList.add("active");
    }
    // CF_4.1.3 鼠标悬停显示Cost
    btn.addEventListener("mouseenter", function () {
      const currentOption = savedOptions.find(
        (opt) => opt.name === option.name,
      );
      if (!currentOption) return;

      const total = calculateTotal(currentOption, false);
      const tooltip = document.createElement("div");
      tooltip.className = "option-cost-hint";
      tooltip.textContent = `${total}`;
      this.appendChild(tooltip);
    });

    // CF_4.1.4 鼠标离开隐藏Cost
    btn.addEventListener("mouseleave", function () {
      const tooltip = this.querySelector(".option-cost-hint");
      if (tooltip) {
        this.removeChild(tooltip);
      }
    });
    // CF_4.1.5 单击切换Option
    // btn.addEventListener("click", () => {
    //   activeOptionIndex = index;
    //   applyOptionChange(option);
    // });
    btn.addEventListener("click", async () => {
      activeOptionIndex = index;

      showPreLoadSpinner();

      try {
        await applyOptionChange(option);
      } finally {
        hidePreLoadSpinner();
      }
    });

    // CF_4.1.6 双击重命名Option
    btn.addEventListener("dblclick", () => {
      const newName = prompt("Edit option name:", option.name);
      if (newName && newName.trim() !== "") {
        option.name = newName;
        btn.textContent = newName.toUpperCase();
      }
      applyOptionChange(option);
    });
    optionButtonsContainer.appendChild(btn);
  });
}

// CF_4.2 Update Option按钮
// function updateActiveOption() {
//   // 没有改变时禁用单击动作
//   if (updateBtnEnabled === false) {
//     return;
//   }

//   if (activeOptionIndex === -1) {
//     alert("Please select an option!");
//     return;
//   }
//   savedOptions[activeOptionIndex].selections = JSON.parse(
//     JSON.stringify(currentSelection),
//   );

//   savedOptions[activeOptionIndex].itemVisibility = { ...currentItemVisibility };

//   // 保存旋转角度
//   const rotations = {};
//   for (const [key, value] of currentAngleIndexMap.entries()) {
//     // key 格式: "bathroom_dry__wall_0"
//     // 提取真正的 category（去掉最后的 _数字）
//     const lastUnderscoreIndex = key.lastIndexOf("_");
//     const category = key.substring(0, lastUnderscoreIndex);
//     rotations[category] = value;
//   }
//   savedOptions[activeOptionIndex].rotations = rotations;

//   updateNotification.classList.add("show");
//   updateNotification.innerHTML = `Option "${savedOptions[activeOptionIndex].name}" has been updated!`;

//   setTimeout(() => {
//     updateNotification.classList.remove("show");
//   }, 1000);

//   // 【唯一修改】传入深拷贝，避免 loadOption 修改 savedOptions 中的原对象
//   const optionCopy = JSON.parse(
//     JSON.stringify(savedOptions[activeOptionIndex]),
//   );

//   applyOptionChange(savedOptions[activeOptionIndex]);

//   // 禁用Update按钮
//   disableUpdateBtn();
// }
// CF_4.2 Update Option按钮
function updateActiveOption() {
  // 没有改变时禁用单击动作
  if (updateBtnEnabled === false) {
    return;
  }

  if (activeOptionIndex === -1) {
    alert("Please select an option!");
    return;
  }

  // 保存当前选择
  savedOptions[activeOptionIndex].selections = JSON.parse(
    JSON.stringify(currentSelection),
  );

  // 保存当前物品显示/隐藏状态
  savedOptions[activeOptionIndex].itemVisibility = {
    ...currentItemVisibility,
  };

  // ========== 保存当前 Option 的旋转角度 ==========
  // 只保存当前 Option 中每个 category 对应的 currentIndex，
  // 避免不同图片 index 的旋转状态互相覆盖。
  const rotations = {};

  for (const category in currentSelection) {
    const currentIndex = currentSelection[category];
    const key = `${category}_${currentIndex}`;

    if (currentAngleIndexMap.has(key)) {
      rotations[category] = currentAngleIndexMap.get(key);
    }
  }

  savedOptions[activeOptionIndex].rotations = rotations;
  // ========== 保存旋转角度结束 ==========

  updateNotification.classList.add("show");
  updateNotification.innerHTML = `"${savedOptions[activeOptionIndex].name}" updated!`;

  setTimeout(() => {
    updateNotification.classList.remove("show");
  }, 1000);

  // 传入深拷贝，避免 loadOption 修改 savedOptions 中的原对象
  const optionCopy = JSON.parse(
    JSON.stringify(savedOptions[activeOptionIndex]),
  );

  applyOptionChange(savedOptions[activeOptionIndex]);

  // 禁用 Update 按钮
  disableUpdateBtn();
}

// CF_4.3 Create Option按钮
function createNewOption() {
  const optionName = prompt("Option Name", `Option${savedOptions.length + 1}`);
  if (!optionName) return;
  const currentSelections = JSON.parse(JSON.stringify(currentSelection));
  const existingIndex = savedOptions.findIndex(
    (opt) => opt.name === optionName,
  );

  if (existingIndex !== -1) {
    if (!confirm(`Option "${optionName}" already exists. Replace?`)) return;
    savedOptions[existingIndex].selections = currentSelections;
    activeOptionIndex = existingIndex;
  } else {
    savedOptions.push({
      name: optionName,
      selections: currentSelections,
      itemVisibility: { ...currentItemVisibility },
    });
    activeOptionIndex = savedOptions.length - 1;
  }
  writeOptionBtnHTML();
  updateOptionHeader();
  saveOptionsToLocalStorage();
}

// CF_4.4 Delete Option按钮
function deleteActiveOption() {
  if (activeOptionIndex === -1) {
    alert("Please select an option to delete!");
    return;
  }
  if (savedOptions.length === 1) {
    alert("At least one option is required.");
    return;
  }
  if (confirm(`Delete option "${savedOptions[activeOptionIndex].name}"?`)) {
    // 保存被删除Option的索引
    const deletedIndex = activeOptionIndex;

    // 删除Option
    savedOptions.splice(deletedIndex, 1);

    // 确定新激活Option的索引
    let newActiveIndex;
    if (deletedIndex >= savedOptions.length) {
      // 删除的是最后一个Option，激活新的最后一个
      newActiveIndex = savedOptions.length - 1;
    } else {
      // 删除中间Option，激活原位置的新Option
      newActiveIndex = deletedIndex;
    }

    // 更新激活索引并应用变更
    activeOptionIndex = newActiveIndex;
    applyOptionChange(savedOptions[newActiveIndex]);
  }
}

let isApplying = false;
// CF_4.5 更新当前的Option
async function applyOptionChange(option) {
  if (isApplying) {
    console.log("applyOptionChange 跳过重复调用");
    return;
  }
  isApplying = true;

  try {
    // 你的原有代码保持不变，从下面这一行开始全部原样保留
    if (option) {
      await loadOption(option);
    }

    // 【关键修复】先从 option 中恢复 itemVisibility
    if (option.itemVisibility) {
      // 直接恢复，但不要触发 checkSelectionChanges
      currentItemVisibility = JSON.parse(JSON.stringify(option.itemVisibility));
      applyItemVisibility(currentItemVisibility);
    } else {
      currentItemVisibility = {};
      applyItemVisibility({});
    }

    updateOptionHeader();
    writeOptionBtnHTML();
    saveOptionsToLocalStorage();

    // CF_4.5.1 保存当前产品选择的原始状态
    originalSelections = JSON.parse(JSON.stringify(currentSelection));
    originalItemVisibility = JSON.parse(JSON.stringify(currentItemVisibility));

    // CF_4.5.2 应用 Item List 的显示/隐藏状态
    // 保证切换option时，刷新item list
    if (itemsPanel) {
      renderItemsList();
    }

    // ========== 新增：恢复旋转角度 ==========
    // document
    //   .querySelectorAll(".background-container, .furniture-container")
    //   .forEach((container) => {
    //     const category = container.dataset.category;
    //     const img = container.querySelector(".background-img, .furniture-img");
    //     if (category && img) {
    //       initRotateIcon(container, category, img);
    //     }
    //   });

    const rotateInitPromises = [];

    document
      .querySelectorAll(".background-container, .furniture-container")
      .forEach((container) => {
        const category = container.dataset.category;
        const img = container.querySelector(".background-img, .furniture-img");

        if (category && img) {
          rotateInitPromises.push(initRotateIcon(container, category, img));
        }
      });

    await Promise.all(rotateInitPromises);

    // ========== 新增结束 ==========

    // 应用完后禁用Apply按钮
    disableUpdateBtn();
  } finally {
    isApplying = false;
  }
}

// CF_4.6 加载当前的Option
async function loadOption(option) {
  // CF_4.6.1 加载当前Option的所有类别产品的索引
  for (const category of Object.keys(option.selections)) {
    const index = option.selections[category];
    const imgUrl = product_image_Large[category][index];
    const available = await preloadImage(imgUrl);
    // CF_4.6.检查是否存在对应索引的图片，如没有，默认为索引0
    if (!available) {
      option.selections[category] = 0;
    }
  }

  // // CF_4.6.2 返回对应索引的产品图片
  // Object.keys(option.selections).forEach((category) => {
  //   currentSelection[category] = option.selections[category];

  //   const img = document.querySelector(
  //     `[data-category="${category}"] .furniture-img, [data-category="${category}"] .background-img`,
  //   );
  //   // 返回对应索引的图片
  //   if (img) {
  //     img.src = product_image_Large[category][option.selections[category]];
  //   }

  //   // 特殊产品
  //   // 更新当前Option的Brand+Price
  //   if (bool_ShowBrand) {
  //     updateAllBrandPrice();
  //   }
  // });
  // CF_4.6.2 返回对应索引的产品图片
  Object.keys(option.selections).forEach((category) => {
    currentSelection[category] = option.selections[category];

    const img = document.querySelector(
      `[data-category="${category}"] .furniture-img, [data-category="${category}"] .background-img`,
    );
    // 返回对应索引的图片
    if (img) {
      img.src = product_image_Large[category][option.selections[category]];
    }

    // 特殊产品
    // 更新当前Option的Brand+Price
    if (bool_ShowBrand) {
      updateAllBrandPrice();
    }
  });

  // 等待当前页面所有背景图和产品图加载完成
  const imageLoadPromises = [];

  const imgs = [
    ...document.querySelectorAll(".background-img, .furniture-img"),
  ];

  imgs.forEach((img) => {
    if (!img.complete) {
      imageLoadPromises.push(
        new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        }),
      );
    }
  });

  await Promise.all(imageLoadPromises);

  // CF_4.6.3 如果平面图上某个产品类别被选中
  if (lastClickedCategory) {
    // 平面图产品选中状态
    if (thumbnailCache[lastClickedCategory]) {
      // CF_4.6.取消选择平面图上被选中的产品
      thumbnailCache[lastClickedCategory].forEach((container) => {
        container.classList.remove("selected");
      });
      // 切换Option后，重新选择上次平面图上选中的产品
      const selectedIndex = currentSelection[lastClickedCategory];
      if (thumbnailCache[lastClickedCategory][selectedIndex]) {
        thumbnailCache[lastClickedCategory][selectedIndex].classList.add(
          "selected",
        );
      }
    }

    // CF_4.6.4 显示平面图上被选中的产品的middle-controls-container
    if (isThumbActive) {
      showThumbnails(lastClickedCategory);
    }
    const currentContainer = document.querySelector(
      `[data-category="${lastClickedCategory}"]`,
    );
    if (currentContainer) {
      currentContainer.classList.add("selected");
    }
  }

  // CF_4.6.5 旋转背景材质图案角度
  // const container = document.querySelector(`[data-category="${category}"]`);
  // initRotateIcon(container, category, img);

  return Promise.resolve();
}

// 4.7 禁用Update按钮
function disableUpdateBtn() {
  // 禁用按钮
  updateOptionBtn.disabled = true;
  // 改变按钮外观为灰色
  updateOptionBtn.querySelector("img").style.opacity = "0.2";
  // updateOptionBtn.querySelector("data-tooltip").style.opacity = "";
  // 禁用鼠标悬停加深
  updateOptionBtn.classList.add("btn-hover");
  // 鼠标手势恢复默认
  updateOptionBtn.style.cursor = "default";
  // 修改布尔值
  updateBtnEnabled = false;
}

// CF_4.8 显示当前Option标题
function updateOptionHeader() {
  if (activeOptionIndex !== -1) {
    const option = savedOptions[activeOptionIndex];
    const totalprice = calculateTotal(option, true);

    document.getElementById("current-option-name").textContent =
      option.name.toUpperCase();
    document.getElementById("current-option-cost-header").textContent =
      totalprice;

    // 共享给export-table.js和export-grid.js
    exportOption = JSON.parse(JSON.stringify(option));
    exportTotalprice = totalprice;

    // 先移除旧的警告
    const oldWarning = document.getElementById("price-warning-absolute");
    if (oldWarning) oldWarning.remove();

    // 复用 getMissingPricesWarning 函数
    const missingWarning = getMissingPricesWarning(option);

    // 如果有缺失，添加新警告
    const costElement = document.getElementById("current-option-cost-header");
    if (missingWarning) {
      const warning = document.createElement("span");
      warning.id = "price-warning-absolute";
      warning.className = "price-warning-absolute";
      warning.textContent = missingWarning;
      costElement.parentNode.appendChild(warning);
    }
  }
}

// CF_4.9 更新当前Option的总价
function calculateTotal(option, useGlobalVisibility = true) {
  let total = 0;
  const visibility = useGlobalVisibility
    ? currentItemVisibility
    : option.itemVisibility || {};

  Object.keys(option.selections).forEach((category) => {
    if (visibility[category] === false) return;

    const index = useGlobalVisibility
      ? currentSelection[category]
      : option.selections[category];
    const product = productList[category]?.[index];
    if (!product) return;
    if (product.delivery && product.delivery.toLowerCase() === "existing")
      return;

    if (window.isAreaBasedCategory && window.isAreaBasedCategory(category)) {
      const unitPrice = parseFloat(product.price?.replace(/[^\d.]/g, "") || 0);
      // let area = window.getMaterialQty?.(category) || 1;

      let area = window.getMaterialQty?.(category);
      if (area === undefined || area === null) area = 1;

      // 处理面积包含关系：如果勾选了子区域，需要从父区域中扣除
      if (category === "bathroom_dry__wall") {
        if (visibility["bathroom_dry__wall__lower"] !== false) {
          area -= window.getMaterialQty?.("bathroom_dry__wall__lower") || 0;
        }
        if (visibility["bathroom_wet__wall"] !== false) {
          area -= window.getMaterialQty?.("bathroom_wet__wall") || 0;
        }
      }

      if (category === "bathroom_dry__floor") {
        if (visibility["bathroom_wet__floor"] !== false) {
          area -= window.getMaterialQty?.("bathroom_wet__floor") || 0;
        }
      }

      // 确保面积不为负数
      if (area < 0) area = 0;

      total += unitPrice * area;
    } else {
      const priceValue = parseFloat(
        product.totalprice?.replace(/[^\d.]/g, "") || 0,
      );
      total += priceValue;
    }
  });

  return total.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

// CF_4.10 将当前的option存入本地
const LOCAL_STORAGE_KEY = "furnitureOptions";
function saveOptionsToLocalStorage() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedOptions));
}

// CF_4.11 从本地获取上次保存的option
function loadOptionsFromLocalStorage() {
  const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      if (Array.isArray(parsedData)) {
        return parsedData;
      }
    } catch (error) {
      console.error("Error parsing saved options:", error);
    }
  }
  return null;
}
// ↑↑↑↑↑↑↑↑↑↑↑↑ CF_4 Update, create, delete option按钮操作 ↑↑↑↑↑↑↑↑↑↑↑↑
// ↑↑↑↑↑↑↑↑↑↑↑↑ CF_4 Update, create, delete option按钮操作 ↑↑↑↑↑↑↑↑↑↑↑↑

// ↓↓↓↓↓↓↓↓↓↓↓↓ CF_5 获取Brand+Price的颜色和缩写 ↓↓↓↓↓↓↓↓↓↓↓↓
// ↓↓↓↓↓↓↓↓↓↓↓↓ CF_5 获取Brand+Price的颜色和缩写 ↓↓↓↓↓↓↓↓↓↓↓↓
// CF_5.1 Brand+Price按钮状态
function toggleBrandPrice() {
  bool_ShowBrand = !bool_ShowBrand;
  if (bool_ShowBrand) {
    toggleBrandBtn.classList.add("active");
    updateAllBrandPrice();
    toggleBrandBtn.dataset.tooltip = "Hide brand";
  } else {
    toggleBrandBtn.classList.remove("active");
    hideAllBrandPriceTags();
    toggleBrandBtn.dataset.tooltip = "Show Brand";
  }

  document.querySelectorAll(".category-name").forEach((el) => {
    el.style.display = bool_ShowBrand ? "" : "none";
  });
}

// CF_5.2.1 切换单个产品时，更新Brand+Price
function updateSelectedBrandPrice(category) {
  const container = document.querySelector(`[data-category="${category}"]`);
  if (container) _updateBrandPrice(container);
}

// CF_5.2.2 LOOP THROUGH所有产品，更新Brand+Price
function updateAllBrandPrice() {
  document
    .querySelectorAll(".furniture-container, .background-container")
    .forEach((container) => {
      _updateBrandPrice(container);
    });
}

// CF_5.2.3 更新Brand+Price
function _updateBrandPrice(container) {
  const category = container.dataset.category;
  const index = currentSelection[category];
  const product = productList[category]?.[index];

  let wrapper = container.querySelector(".brand-price-wrapper");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.className = "brand-price-wrapper";
    container.appendChild(wrapper);
  }

  let brandTag = wrapper.querySelector(".brand-tag");
  if (!brandTag) {
    brandTag = document.createElement("div");
    brandTag.className = "brand-tag";
    wrapper.appendChild(brandTag); // ← 加到 wrapper 里
  }

  let priceTag = wrapper.querySelector(".price-tag");
  if (!priceTag) {
    priceTag = document.createElement("div");
    priceTag.className = "price-tag";
    wrapper.appendChild(priceTag); // ← 加到 wrapper 里
  }

  // 更新Brand+Price外观样式
  updateBrandPriceStyle(product, brandTag, priceTag);
}

// CF_5.3 更新Brand+Price外观样式
function updateBrandPriceStyle(product, brandTag, priceTag) {
  // 处理空产品情况
  if (!product) {
    brandTag.style.display = "none";
    priceTag.style.display = "none";
    return;
  }
  // 获取Brand的颜色和缩写
  const brandInfo = getBrandInfo(product.brand);
  const { color, fontColor, abbreviation } = brandInfo;
  brandTag.style.backgroundColor = color;
  brandTag.style.color = fontColor;
  brandTag.textContent = abbreviation;
  // 特殊情况：针对Existing物品的价格显示
  priceTag.classList.remove("price-tag-existing");
  if (product.delivery.toLowerCase() === "existing") {
    priceTag.textContent = "EXISTING";
    priceTag.classList.add("price-tag-existing");
  } else {
    priceTag.textContent = product.price;
  }
  // 标签布局
  brandTag.style.display = product.brand ? "flex" : "none";
  priceTag.style.display = "flex";
}

// CF_5.4 获取Brand的颜色和缩写
function getBrandInfo(brand) {
  // CF_5.4.1 无品牌的情况
  if (!brand) {
    return {
      color: "",
      fontColor: "#000",
      abbreviation: "",
    };
  }
  // CF_5.4.2 有品牌的情况
  const brandData = brandColorAbbrList[brand];
  return {
    color: brandData?.color || "yellow",
    fontColor: brandData?.fontColor || "red",
    abbreviation: brandData?.abbreviation || brand,
  };
}

// CF_5.5 隐藏Brand+Price
function hideAllBrandPriceTags() {
  document.querySelectorAll(".brand-tag, .price-tag").forEach((tag) => {
    tag.style.display = "none";
  });
}
// ↑↑↑↑↑↑↑↑↑↑↑↑ CF_5 获取Brand+Price的颜色和缩写 ↑↑↑↑↑↑↑↑↑↑↑↑
// ↑↑↑↑↑↑↑↑↑↑↑↑ CF_5 获取Brand+Price的颜色和缩写 ↑↑↑↑↑↑↑↑↑↑↑↑

// ↓↓↓↓↓↓↓↓↓↓↓↓ CF_6 显示隐藏Item List ↓↓↓↓↓↓↓↓↓↓↓↓
// ↓↓↓↓↓↓↓↓↓↓↓↓ CF_6 显示隐藏Item List ↓↓↓↓↓↓↓↓↓↓↓↓
// CF_6.1 Item List 按钮状态
function toggleItemsPanel() {
  const isVisible = itemsPanel.style.display === "flex";
  if (isVisible) {
    itemsPanel.style.display = "none";
    toggleItemsBtn.classList.remove("active");
  } else {
    itemsPanel.style.display = "flex";
    renderItemsList();
    toggleItemsBtn.classList.add("active");
  }
}
// ↑↑↑↑↑↑↑↑↑↑↑↑ CF_6 显示隐藏Item List ↑↑↑↑↑↑↑↑↑↑↑↑
// ↑↑↑↑↑↑↑↑↑↑↑↑ CF_6 显示隐藏Item List ↑↑↑↑↑↑↑↑↑↑↑↑

// ↓↓↓↓↓↓↓↓↓↓↓↓ CF_7 勾选Item List ↓↓↓↓↓↓↓↓↓↓↓↓
// ↓↓↓↓↓↓↓↓↓↓↓↓ CF_7 勾选Item List ↓↓↓↓↓↓↓↓↓↓↓↓
// 从 DOM 中获取 category 到友好名称的映射
function getDisplayNameFromDOM(category) {
  // 不管 DOM 里有什么，一律从 category 自动生成
  // 去掉 bathroom_ 前缀
  let name = category.replace(/^bathroom_/, "");

  // 将 __ 和 _ 替换为空格
  name = name.replace(/__/g, " ").replace(/_/g, " ");

  // 每个单词首字母大写
  const formatted = name
    .split(" ")
    .filter((word) => word.length > 0) // 过滤空字符串
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formatted;
}
// 渲染 Item List
function renderItemsList() {
  if (!itemsListContainer) return;

  // 定义分组
  const groups = [
    {
      name: "FINISHES",
      categories: [
        "bathroom_dry__wall__lower",
        "bathroom_wet__wall",
        "bathroom_wet__floor",
        "bathroom_base__trim",
      ],
    },
    {
      name: "PLUMBING FIXTURES",
      categories: [
        "bathroom_vanity__faucet",
        "bathroom_shower__handshower",
        "bathroom_tub__spout",
      ],
    },
    {
      name: "HARDWARES",
      categories: [
        "bathroom_shower__pull",
        "bathroom_toilet__paper__holder",
        "bathroom_towel__bar",
      ],
    },
    {
      name: "LIGHT FIXTURES",
      categories: ["bathroom_mirror__header__light", "bathroom_sconce"],
    },
  ];

  itemsListContainer.innerHTML = "";

  groups.forEach((group) => {
    // 添加分组标题
    const groupTitle = document.createElement("div");
    groupTitle.className = "group-title";
    groupTitle.textContent = group.name;
    itemsListContainer.appendChild(groupTitle);

    // 添加分组下的 category 行
    group.categories.forEach((category) => {
      const isVisible = currentItemVisibility[category] !== false;
      const displayName = getDisplayName(category);

      const row = document.createElement("div");
      row.className = "item-row";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = isVisible;
      checkbox.dataset.category = category;

      const label = document.createElement("label");
      label.textContent = displayName;

      row.appendChild(checkbox);
      row.appendChild(label);

      row.addEventListener("click", function (e) {
        if (e.target.type !== "checkbox") {
          checkbox.checked = !checkbox.checked;
        }
        toggleItemVisibility(category, checkbox.checked);
      });

      checkbox.addEventListener("change", function (e) {
        e.stopPropagation();
        toggleItemVisibility(category, checkbox.checked);
      });

      itemsListContainer.appendChild(row);
    });
  });
}

// 切换单个 item 的显示/隐藏
function toggleItemVisibility(category, isVisible) {
  console.log("toggleItemVisibility 执行了", category, isVisible);
  currentItemVisibility[category] = isVisible;
  console.log("currentItemVisibility 现在是:", currentItemVisibility);

  // 找到对应的容器并添加/移除隐藏类
  const containers = document.querySelectorAll(`[data-category="${category}"]`);
  containers.forEach((container) => {
    if (isVisible) {
      container.classList.remove("hidden-category");
    } else {
      container.classList.add("hidden-category");
    }
  });

  // 更新选中状态
  checkSelectionChanges();

  // 添加这一行：实时更新总价
  updateOptionHeader();
}

// 根据保存的状态更新所有 item 的显示/隐藏
function applyItemVisibility(visibility) {
  if (Object.keys(visibility).length === 0) {
    currentItemVisibility = {};
  } else {
    currentItemVisibility = { ...visibility };
  }

  Object.keys(currentItemVisibility).forEach((category) => {
    const isVisible = currentItemVisibility[category];
    const containers = document.querySelectorAll(
      `[data-category="${category}"]`,
    );
    containers.forEach((container) => {
      if (isVisible) {
        container.classList.remove("hidden-category");
      } else {
        container.classList.add("hidden-category");
      }
    });
  });
}
// ↑↑↑↑↑↑↑↑↑↑↑↑ CF_7 勾选Item List ↑↑↑↑↑↑↑↑↑↑↑↑
// ↑↑↑↑↑↑↑↑↑↑↑↑ CF_7 勾选Item List ↑↑↑↑↑↑↑↑↑↑↑↑

// ↓↓↓↓↓↓↓↓↓↓↓↓ CF_8 旋转背景材质图片角度 ↓↓↓↓↓↓↓↓↓↓↓↓
// ↓↓↓↓↓↓↓↓↓↓↓↓ CF_8 旋转背景材质图片角度 ↓↓↓↓↓↓↓↓↓↓↓↓
// 存储每个容器的当前角度索引（用于当前会话）
// 存储每个容器的当前角度索引（用于当前会话）
const currentAngleIndexMap = new Map();

async function initRotateIcon(container, category, imgElement) {
  // 先移除已有的图标
  const oldIcon = container.querySelector(".rotate-icon");
  if (oldIcon) oldIcon.remove();

  const basePath = product_image_Large[category][0];
  const baseName = basePath.replace(/\(\d+\)\.png$/, "");
  const currentIndex = currentSelection[category];

  const angles = [0];
  if (await imageExists(`${baseName}_45deg(${currentIndex + 1}).png`))
    angles.push(45);
  if (await imageExists(`${baseName}_90deg(${currentIndex + 1}).png`))
    angles.push(90);

  if (angles.length === 1) return;

  // ========== 预加载所有旋转图片 ==========
  for (let i = 1; i < angles.length; i++) {
    const img = new Image();
    img.src = `${baseName}_${angles[i]}deg(${currentIndex + 1}).png`;
  }
  // ========== 预加载结束 ==========
  // 创建新图标
  const icon = document.createElement("img");
  icon.className = "rotate-icon";
  icon.src = "Icon images/icon_rotatePattern.png";
  container.appendChild(icon);

  // 从当前 Option 中读取保存的旋转角度
  const option = savedOptions[activeOptionIndex];
  const savedRotation = option?.rotations?.[category];
  let currentAngleIndex = savedRotation !== undefined ? savedRotation : 0;
  currentAngleIndexMap.set(`${category}_${currentIndex}`, currentAngleIndex);

  // 恢复角度
  // const currentAngle = angles[currentAngleIndex];
  // if (currentAngle !== 0) {
  //   const newSrc = `${baseName}_${currentAngle}deg(${currentIndex + 1}).png`;
  //   imgElement.src = newSrc;
  // } else {
  //   // 没有保存的旋转角度，设置为默认图片
  //   imgElement.src = product_image_Large[category][currentIndex];
  // }

  const currentAngle = angles[currentAngleIndex];

  const newSrc =
    currentAngle !== 0
      ? `${baseName}_${currentAngle}deg(${currentIndex + 1}).png`
      : product_image_Large[category][currentIndex];

  imgElement.src = newSrc;

  if (!imgElement.complete) {
    await new Promise((resolve) => {
      imgElement.addEventListener("load", resolve, { once: true });
      imgElement.addEventListener("error", resolve, { once: true });
    });
  }

  icon.onclick = (e) => {
    e.stopPropagation();
    currentAngleIndex = (currentAngleIndex + 1) % angles.length;
    currentAngleIndexMap.set(`${category}_${currentIndex}`, currentAngleIndex);
    const angle = angles[currentAngleIndex];

    // 删除这段自动保存的代码
    // if (savedOptions[activeOptionIndex]) {
    //   savedOptions[activeOptionIndex].rotations[category] = currentAngleIndex;
    // }

    if (angle === 0) {
      imgElement.src = product_image_Large[category][currentIndex];
    } else {
      imgElement.src = `${baseName}_${angle}deg(${currentIndex + 1}).png`;
    }

    // 启用 Update 按钮（让用户知道需要保存）
    if (updateBtnEnabled === false) {
      updateOptionBtn.disabled = false;
      updateOptionBtn.querySelector("img").style.opacity = "1";
      updateOptionBtn.style.cursor = "pointer";
      updateBtnEnabled = true;
    }
  };
}

// 检查图片是否存在
// function imageExists(url) {
//   const img = new Image();
//   img.src = url;
//   return img.complete && img.naturalHeight !== 0;
// }

// function imageExists(url) {
//   return new Promise((resolve) => {
//     const img = new Image();
//     img.onload = () => resolve(true);
//     img.onerror = () => resolve(false);
//     img.src = url;
//   });
// }

function imageExists(url) {
  // 缓存每个 URL 的检查结果
  if (!imageExists.cache) {
    imageExists.cache = new Map();
  }

  // 如果之前检查过，直接返回缓存结果
  if (imageExists.cache.has(url)) {
    return Promise.resolve(imageExists.cache.get(url));
  }

  // 第一次检查图片是否存在
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      imageExists.cache.set(url, true);
      resolve(true);
    };

    img.onerror = () => {
      imageExists.cache.set(url, false);
      resolve(false);
    };

    img.src = url;
  });
}

// ↑↑↑↑↑↑↑↑↑↑↑↑ CF_8 旋转背景材质图片角度 ↑↑↑↑↑↑↑↑↑↑↑↑
// ↑↑↑↑↑↑↑↑↑↑↑↑ CF_8 旋转背景材质图片角度 ↑↑↑↑↑↑↑↑↑↑↑↑

// ↓↓↓↓↓↓↓↓↓↓↓↓ CF_9 获取确实价格的产品 ↓↓↓↓↓↓↓↓↓↓↓↓
// ↓↓↓↓↓↓↓↓↓↓↓↓ CF_9 获取确实价格的产品 ↓↓↓↓↓↓↓↓↓↓↓↓
// 获取指定 Option 的缺失价格产品列表（返回数组）
function getMissingPricesForOption(option) {
  const missing = [];
  const visibility = option.itemVisibility || {};

  Object.keys(option.selections).forEach((category) => {
    if (visibility[category] === false) return;
    const index = option.selections[category];
    const product = productList[category]?.[index];
    if (product && (!product.price || product.price === "N/A")) {
      missing.push(getDisplayName(category));
    }
  });
  return missing;
}

// 获取缺失价格的提示文本
function getMissingPricesWarning(option) {
  const missing = getMissingPricesForOption(option);
  if (missing.length === 0) return null;
  return `*${missing.join(", ")} not included`;
}
// ↑↑↑↑↑↑↑↑↑↑↑↑ CF_9 获取确实价格的产品 ↑↑↑↑↑↑↑↑↑↑↑↑
// ↑↑↑↑↑↑↑↑↑↑↑↑ CF_9 获取确实价格的产品 ↑↑↑↑↑↑↑↑↑↑↑↑

// ↓↓↓↓↓↓↓↓↓↓↓↓ CF_10 从HTML获取产品显示名称 ↓↓↓↓↓↓↓↓↓↓↓↓
// ↓↓↓↓↓↓↓↓↓↓↓↓ CF_10 从HTML获取产品显示名称 ↓↓↓↓↓↓↓↓↓↓↓↓
// 全局映射表
window.displayNameMap = {};

function buildDisplayNameMap() {
  const containers = document.querySelectorAll(".furniture-container");
  containers.forEach((container) => {
    const category = container.dataset.category;
    const nameElement = container.querySelector(".category-name");
    if (category && nameElement && nameElement.textContent) {
      window.displayNameMap[category] = nameElement.textContent.trim();
    }
  });
}
// category全局名称
function getDisplayName(category) {
  const container = document.querySelector(
    `[data-category="${category}"] .category-name`,
  );
  if (
    container &&
    container.textContent &&
    container.textContent.trim() !== ""
  ) {
    let text = container.textContent.trim();
    // 首字母大写
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  let name = category.replace(/^bathroom_/, "");
  name = name.replace(/__/g, " ").replace(/_/g, " ");
  return name
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
// ↑↑↑↑↑↑↑↑↑↑↑↑ CF_10 从HTML获取产品显示名称 ↑↑↑↑↑↑↑↑↑↑↑↑
// ↑↑↑↑↑↑↑↑↑↑↑↑ CF_10 从HTML获取产品显示名称 ↑↑↑↑↑↑↑↑↑↑↑↑

// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Customized Function 用户函数 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Customized Function 用户函数 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Customized Function 用户函数 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ System Function 系统函数 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ System Function 系统函数 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ System Function 系统函数 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// SF- 预先加载图片
function preloadImage(url) {
  return new Promise((resolve) => {
    if (imageStatusCache[url] !== undefined) {
      return resolve(imageStatusCache[url]);
    }
    const img = new Image();
    img.onload = () => {
      imageStatusCache[url] = true;
      resolve(true);
    };
    img.onerror = () => {
      imageStatusCache[url] = false;
      resolve(false);
    };
    img.src = url;
  });
}

// 显示加载中LOADING 旋转图标(刷新网页时)
function showPreLoadSpinner() {
  document.getElementById("preLoad-spinner").style.display = "flex";
}
// 关闭加载中LOADING 旋转图标(刷新网页时)
function hidePreLoadSpinner() {
  document.getElementById("preLoad-spinner").style.display = "none";
}

// 显示加载中LOADING 图标(打开缩略图，切换产品和切换option时)
function showLoadingSpinner() {
  document.getElementById("Loading-spinner").style.display = "flex";
}
// 关闭加载中LOADING 图标(打开缩略图，切换产品和切换option时)
function hideLoadingSpinner() {
  document.getElementById("Loading-spinner").style.display = "none";
}

async function validateAllOptions() {
  for (const option of savedOptions) {
    for (const category of Object.keys(option.selections)) {
      const index = option.selections[category];
      const imgUrl = product_image_Large[category][index];
      const available = await preloadImage(imgUrl);
      if (!available) {
        option.selections[category] = 0;
      }
    }
  }
}

//更新当前日期
function updateCurrentDate() {
  const now = new Date();
  const todayDate = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = now.toLocaleDateString("en-US", todayDate);
  document.querySelector(".date-footer-container-main").textContent =
    formattedDate;

  // 共享给export-table.js和export-grid.js
  exportFormattedDate = formattedDate;
}

// 打印前设置
function handleBeforePrint(view) {
  if (activeOptionIndex !== -1) {
    const option = savedOptions[activeOptionIndex];
    const originalTitle = document.title;
    document.title = "Option " + option.name + "_" + view;

    window.addEventListener(
      "afterprint",
      function restoreTitle() {
        document.title = originalTitle;
      },
      { once: true },
    );
  }
}

// 避免Export Grid Table 闪烁
function preloadExportImages() {
  Object.keys(product_image_Large).forEach((category) => {
    product_image_Large[category].forEach((src) => {
      new Image().src = src;
    });
  });
}

// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ System Function 系统函数 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ System Function 系统函数 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ System Function 系统函数 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 初始化HTML, 文档完全加载和解析完成时执行 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 初始化HTML, 文档完全加载和解析完成时执行 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 初始化HTML, 文档完全加载和解析完成时执行 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
document.addEventListener("DOMContentLoaded", async function () {
  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 初始化主页 Main.html ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 初始化主页 Main.html ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

  // HTML 静态图片统一根据 FURNITURE.JS里的IMAGE_SOURCE 设置实际路径（用于切换本地/GH RAW/CLOUDFLARE，避免通过NETLIFY加载）
  document.querySelectorAll("img[data-image-path]").forEach((img) => {
    img.src = imagePath(img.dataset.imagePath);
  });
  // document
  //   .querySelectorAll(
  //     "img[data-image-path]:not(.background-img):not(.furniture-img)",
  //   )
  //   .forEach((img) => {
  //     img.src = imagePath(img.dataset.imagePath);
  //   });

  // A 初始化变量
  initializeDOMReferences();
  // AddEventListner 添加按钮动作
  setupEventListeners();

  //从本地获取上次保存的option
  const storedOptions = loadOptionsFromLocalStorage();
  if (storedOptions) {
    savedOptions.push(...storedOptions);
  } else {
    savedOptions.push(...defaultOptions);
    saveOptionsToLocalStorage();
  }

  await validateAllOptions();
  // 显示加载中LOADING 旋转图标(刷新网页时)
  showPreLoadSpinner();
  if (savedOptions.length > 0) {
    activeOptionIndex = 0;
    await applyOptionChange(savedOptions[0]);
  }
  // 关闭加载中LOADING 旋转图标(刷新网页时)
  hidePreLoadSpinner();

  document.addEventListener("click", function (e) {
    if (
      !productInfoElement.contains(e.target) &&
      !e.target.closest(".furniture-container") &&
      !productInfoElement.classList.contains("hidden")
    ) {
      hideProductInfo();
    }
  });

  //隐藏Brand+Price和category name
  if (!bool_ShowBrand) {
    hideAllBrandPriceTags();

    document.querySelectorAll(".category-name").forEach((el) => {
      el.style.display = "none";
    });
  }
  updateCurrentDate();
  // 初始禁用Update按钮
  disableUpdateBtn();

  // 避免Export Grid Table 闪烁
  preloadExportImages();

  // 从HTML获取产品显示名称
  buildDisplayNameMap();

  // 初始化 Item List 面板内容
  if (itemsPanel) {
    renderItemsList();
  }

  // 初始化所有旋转图标
  setTimeout(() => {
    document
      .querySelectorAll(".background-container, .furniture-container")
      .forEach((container) => {
        const category = container.dataset.category;
        const img = container.querySelector(".background-img, .furniture-img");
        if (category && img) {
          initRotateIcon(container, category, img);
        }
      });
  }, 500);

  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Option排序弹窗 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  // 排序弹窗逻辑
  // 排序弹窗逻辑
  const sortBtn = document.getElementById("sort-option-btn");
  const sortModal = document.getElementById("sort-options-modal");
  const sortList = document.getElementById("sort-options-list");
  const sortSaveBtn = document.getElementById("sort-save-btn");
  const modalClose = document.querySelector(".modal-close");
  const sortUpBtn = document.getElementById("sort-up-btn");
  const sortDownBtn = document.getElementById("sort-down-btn");

  let selectedIndices = new Set();
  let tempOptions = []; // 临时存储排序中的 Option 副本

  // 打开排序弹窗
  if (sortBtn) {
    sortBtn.addEventListener("click", () => {
      // 复制当前 Option 到临时数组
      tempOptions = savedOptions.map((opt) => ({ ...opt }));
      selectedIndices.clear();
      renderSortList();
      updateArrowButtons();
      sortModal.style.display = "flex";
    });
  }

  // 关闭弹窗（不保存）
  function closeSortModal() {
    sortModal.style.display = "none";
    tempOptions = [];
    selectedIndices.clear();
  }

  if (modalClose) modalClose.addEventListener("click", closeSortModal);

  // 点击弹窗外部关闭
  window.addEventListener("click", (e) => {
    if (e.target === sortModal) closeSortModal();
  });

  // 更新箭头按钮状态
  function updateArrowButtons() {
    const selectedCount = selectedIndices.size;
    const hasSelection =
      selectedCount > 0 && selectedCount < tempOptions.length;

    if (sortUpBtn) {
      // 检查选中的是否有第一个（索引0）
      const hasFirstSelected = Array.from(selectedIndices).includes(0);
      sortUpBtn.disabled = !hasSelection || hasFirstSelected;
    }

    if (sortDownBtn) {
      // 检查选中的是否有最后一个
      const lastIndex = tempOptions.length - 1;
      const hasLastSelected = Array.from(selectedIndices).includes(lastIndex);
      sortDownBtn.disabled = !hasSelection || hasLastSelected;
    }
  }

  // 渲染排序列表
  function renderSortList() {
    sortList.innerHTML = "";
    tempOptions.forEach((option, index) => {
      const total = calculateTotal(option, false);
      const missingWarning = getMissingPricesWarning(option);
      const itemId = `sort-item-${index}`;

      const item = document.createElement("div");
      item.className = `sort-item ${selectedIndices.has(index) ? "selected" : ""}`;
      item.innerHTML = `
      <div class="sort-item-checkbox-wrapper">
        <input type="checkbox" id="${itemId}" class="sort-item-checkbox" data-index="${index}" ${selectedIndices.has(index) ? "checked" : ""}>
        <span class="sort-item-custom-checkbox"></span>
      </div>
      <label for="${itemId}" class="sort-item-name">${option.name.toUpperCase()}</label>
      <div class="sort-item-price-wrapper">
        ${missingWarning ? '<span class="sort-item-warning" title="' + missingWarning + '">❗</span>' : ""}
      <span class="sort-item-price" data-warning="${missingWarning || ""}">${total}</span>
      </div>
    `;
      sortList.appendChild(item);
    });

    // 绑定复选框事件
    document.querySelectorAll(".sort-item-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        e.stopPropagation();
        const index = parseInt(checkbox.dataset.index);
        if (checkbox.checked) {
          selectedIndices.add(index);
        } else {
          selectedIndices.delete(index);
        }
        // 更新高亮
        const item = checkbox.closest(".sort-item");
        if (checkbox.checked) {
          item.classList.add("selected");
        } else {
          item.classList.remove("selected");
        }
        updateArrowButtons();
      });
    });

    // 点击整行也可以勾选
    // 点击整行勾选（排除 checkbox 和 label 区域）
    document.querySelectorAll(".sort-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        // 如果点击的是 checkbox 或 label，不处理（让原生事件处理）
        if (e.target.type === "checkbox" || e.target.tagName === "LABEL") {
          return;
        }
        const checkbox = item.querySelector(".sort-item-checkbox");
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
          const index = parseInt(checkbox.dataset.index);
          if (checkbox.checked) {
            selectedIndices.add(index);
            item.classList.add("selected");
          } else {
            selectedIndices.delete(index);
            item.classList.remove("selected");
          }
          updateArrowButtons();
        }
      });
    });

    // 绑定事件到价格元素
    document.querySelectorAll(".sort-item-price").forEach((priceEl) => {
      const warningText = priceEl.dataset.warning;
      if (!warningText) return;

      priceEl.addEventListener("mouseenter", (e) => {
        if (tooltipTimeout) clearTimeout(tooltipTimeout);
        showTooltip(priceEl, warningText);
      });

      priceEl.addEventListener("mouseleave", () => {
        tooltipTimeout = setTimeout(hideTooltip, 100);
      });
    });
  }

  // 自定义 tooltip
  let tooltipTimeout;
  let currentTooltip = null;

  function showTooltip(element, text) {
    if (currentTooltip) {
      currentTooltip.remove();
      currentTooltip = null;
    }

    const tooltip = document.createElement("div");
    tooltip.className = "custom-tooltip";
    tooltip.textContent = text;
    document.body.appendChild(tooltip);
    currentTooltip = tooltip;

    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.right + "px";
    const tooltipHeight = tooltip.offsetHeight;
    // 垂直居中：元素顶部 + 元素高度的一半 - tooltip高度的一半
    tooltip.style.top = rect.top + rect.height / 2 - tooltipHeight / 2 + "px";
  }

  function hideTooltip() {
    if (currentTooltip) {
      currentTooltip.remove();
      currentTooltip = null;
    }
  }

  // 上移选中的 Option
  function moveUpSelected() {
    if (selectedIndices.size === 0) return;
    if (selectedIndices.size >= tempOptions.length) return;

    const sortedIndices = Array.from(selectedIndices).sort((a, b) => a - b);
    if (sortedIndices[0] === 0) return;

    const newSelected = new Set();
    const newTemp = [...tempOptions];

    for (const idx of sortedIndices) {
      const newIdx = idx - 1;
      [newTemp[idx], newTemp[newIdx]] = [newTemp[newIdx], newTemp[idx]];
      newSelected.add(newIdx);
    }

    tempOptions = newTemp;
    selectedIndices = newSelected;
    renderSortList();
    updateArrowButtons();
  }

  // 下移选中的 Option
  function moveDownSelected() {
    if (selectedIndices.size === 0) return;
    if (selectedIndices.size >= tempOptions.length) return;

    const sortedIndices = Array.from(selectedIndices).sort((a, b) => b - a);
    if (sortedIndices[0] === tempOptions.length - 1) return;

    const newSelected = new Set();
    const newTemp = [...tempOptions];

    for (const idx of sortedIndices) {
      const newIdx = idx + 1;
      [newTemp[idx], newTemp[newIdx]] = [newTemp[newIdx], newTemp[idx]];
      newSelected.add(newIdx);
    }

    tempOptions = newTemp;
    selectedIndices = newSelected;
    renderSortList();
    updateArrowButtons();
  }

  if (sortUpBtn) sortUpBtn.addEventListener("click", moveUpSelected);
  if (sortDownBtn) sortDownBtn.addEventListener("click", moveDownSelected);

  // 保存排序
  if (sortSaveBtn) {
    sortSaveBtn.addEventListener("click", () => {
      // 将排序后的临时数组复制回 savedOptions
      savedOptions.length = 0;
      tempOptions.forEach((opt) => savedOptions.push(opt));

      saveOptionsToLocalStorage();
      writeOptionBtnHTML();

      // 更新当前激活的 Option（确保索引有效）
      if (activeOptionIndex >= savedOptions.length) {
        activeOptionIndex = 0;
      }

      // 重新加载当前 Option
      applyOptionChange(savedOptions[activeOptionIndex]);

      closeSortModal();
    });
  }

  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Option排序弹窗 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 初始化主页 Main.html ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 初始化主页 Main.html ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
});
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 初始化HTML, 文档完全加载和解析完成时执行 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 初始化HTML, 文档完全加载和解析完成时执行 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 初始化HTML, 文档完全加载和解析完成时执行 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
// ↑↑↑↑↑ ========================= main.html ========================= ↑↑↑↑↑
// ↑↑↑↑↑ ========================= main.html ========================= ↑↑↑↑↑
// ↑↑↑↑↑ ========================= main.html ========================= ↑↑↑↑↑
// ↑↑↑↑↑ ========================= main.html ========================= ↑↑↑↑↑
//
//
//
//
//
//
//
//
// ↓↓↓↓↓ ============== export-table.js & export.grid.js ============== ↓↓↓↓↓
// ↓↓↓↓↓ ============== export-table.js & export.grid.js ============== ↓↓↓↓↓
// ↓↓↓↓↓ ============== export-table.js & export.grid.js ============== ↓↓↓↓↓
// ↓↓↓↓↓ ============== export-table.js & export.grid.js ============== ↓↓↓↓↓
function checkOption() {
  if (activeOptionIndex === -1) {
    // 默认选择第一个方案
    if (savedOptions && savedOptions.length > 0) {
      activeOptionIndex = 0;
      applyOptionChange(savedOptions[0]);
    }
  }
}
// 导出时分类
const categoriesByArea = {
  "Finish Materials": [
    "bathroom_dry__wall", // 1. 干区墙面
    "bathroom_dry__wall__lower", // 2. 干区墙面下部
    "bathroom_wet__wall", // 3. 湿区墙面
    "bathroom_dry__floor", // 4. 干区地面
    "bathroom_wet__floor", // 5. 湿区地面
    "bathroom_base__trim", // 6. 踢脚
  ],
  "Plumbing Fixtures": [
    "bathroom_vanity", // 1. 洗手台
    "bathroom_vanity__faucet", // 2. 洗手台水龙头
    "bathroom_shower__head", // 3. 花洒头
    "bathroom_shower__valve", // 4. 阀门
    "bathroom_shower__handshower", // 5. 手持花洒
    "bathroom_tub__spout",
  ],
  Hardwares: [
    "bathroom_shower__pull", // 1. 淋浴间门把手
    "bathroom_toilet__paper__holder", // 2. 卷纸架
    "bathroom_towel__bar", // 3. 毛巾架
    "bathroom_mirror", // 4. 镜子
  ],
  "Light Fixtures": [
    "bathroom_mirror__header__light", //1. 镜顶灯
    "bathroom_sconce", //2. 壁灯
  ],
};

// AddEventListner 添加按钮动作
function exportPageIntial() {
  // 创建加载指示器
  const loader = document.createElement("div");
  loader.id = "loading-indicator";
  loader.innerHTML = "Loading...";
  document.body.appendChild(loader);

  // 等待所有资源加载完成
  window.addEventListener("load", function () {
    document.body.style.visibility = "visible";
    document.getElementById("loading-indicator").remove();
  });

  // 5秒超时保底显示
  setTimeout(function () {
    document.body.style.visibility = "visible";
    const loaderElement = document.getElementById("loading-indicator");
    if (loaderElement) {
      loaderElement.remove();
    }
  }, 5000);

  const thumbnails = document.querySelectorAll(
    ".furniture-img-table, .furniture-img-grid",
  );
  thumbnails.forEach((img) => {
    const category = img.dataset.category;
    const index = parseInt(img.dataset.index);
    exportLoadImage(img, category, index);
  });
}

// 加载产品图片
async function exportLoadImage(imgElement, category, index) {
  try {
    const imageArray = product_image_Large[category];
    if (!imageArray || !imageArray[index]) {
      imgElement.style.display = "none";
      return;
    }
    const originalSrc = imageArray[index];
    // const thumbSrc = originalSrc.replace(/\.png$/, "_thumb.png");
    const thumbSrc = product_image_Thumbnail[category]?.[index];

    const thumbAvailable = await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = thumbSrc;
    });

    const originalAvailable = await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = originalSrc;
    });

    if (thumbAvailable) {
      imgElement.src = thumbSrc;
    } else if (originalAvailable) {
      imgElement.src = originalSrc;
    } else {
      imgElement.style.display = "none";
    }

    imgElement.classList.add("loaded");
  } catch (error) {
    imgElement.style.display = "none";
  }
}

// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 初始化导出页面 export.js ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 初始化导出页面 export.js ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

// ↓↓↓↓↓↓↓↓↓↓↓↓ 瓷砖尺寸辅助线（调试完成后删除）↓↓↓↓↓↓↓↓↓↓↓↓
// ↓↓↓↓↓↓↓↓↓↓↓↓ 瓷砖尺寸辅助线（调试完成后删除）↓↓↓↓↓↓↓↓↓↓↓↓
(function () {
  const canvas = document.getElementById("grid-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let active = false;
  let currentTileSize = null;

  // 获取墙面实际像素高度
  function getWallPixelHeight() {
    const dryWallContainer = document.getElementById("dry__wall_container");
    if (dryWallContainer) {
      return dryWallContainer.offsetHeight;
    }
    return window.innerHeight * 0.8;
  }

  // 获取背景总宽度
  function getBackgroundWidth() {
    const root = document.documentElement;
    const bgWidth = getComputedStyle(root)
      .getPropertyValue("--background-width")
      .trim();
    if (bgWidth) {
      return parseFloat(bgWidth);
    }
    const bgWrapper = document.getElementById("background_wrapper");
    return bgWrapper ? bgWrapper.offsetWidth : window.innerWidth;
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
  }

  // 绘制基于瓷砖尺寸的网格
  function drawTileGrid(tileHeightInch, tileWidthInch = null) {
    resizeCanvas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#0044ffcc";
    ctx.lineWidth = 0.5;

    const wallHeightPx = getWallPixelHeight();
    const wallWidthPx = getBackgroundWidth();
    const wallHeightInch = 100;

    const pixelsPerInch = wallHeightPx / wallHeightInch;

    const tileHeightPx = tileHeightInch * pixelsPerInch;
    const tileWidthPx = tileWidthInch
      ? tileWidthInch * pixelsPerInch
      : tileHeightPx;

    // 计算墙面区域在屏幕上的起始 X（split-container 居中后的偏移）
    const container = document.querySelector(".split-container");
    const containerRect = container
      ? container.getBoundingClientRect()
      : { left: 0 };
    // const startX = containerRect.left + (wallWidthPx - tileWidthPx * Math.ceil(wallWidthPx / tileWidthPx)) / 2;
    const startX = containerRect.left;

    // 绘制竖线（只画墙面区域内）
    let x = startX;
    while (x <= startX + wallWidthPx) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
      x += tileWidthPx;
    }

    // 绘制横线（只画墙面高度内）
    // const wallTop = 10;
    const wallTop = containerRect.top;
    let y = wallTop;
    while (y <= wallTop + wallHeightPx) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
      y += tileHeightPx;
    }
  }

  function showGrid(tileHeightInch, tileWidthInch = null) {
    active = true;
    currentTileSize = { h: tileHeightInch, w: tileWidthInch };
    canvas.style.display = "block";
    drawTileGrid(tileHeightInch, tileWidthInch);
  }

  function hideGrid() {
    active = false;
    currentTileSize = null;
    canvas.style.display = "none";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // 按钮事件
  // 4"x4" 瓷砖按钮
  const btn4 = document.getElementById("grid-btn-4");
  if (btn4) {
    btn4.addEventListener("click", () => {
      if (active && currentTileSize && currentTileSize.h === 4) {
        hideGrid();
      } else {
        showGrid(4, 4);
      }
    });
  }

  // 8"x16" 瓷砖按钮
  const btn8 = document.getElementById("grid-btn-8");
  if (btn8) {
    btn8.addEventListener("click", () => {
      if (
        active &&
        currentMode === "tile" &&
        currentTileSize &&
        currentTileSize.h === 8
      ) {
        hideGrid();
      } else {
        active = true;
        currentMode = "tile";
        currentTileSize = { h: 8, w: 16 };
        canvas.style.display = "block";
        drawTileGrid(8, 16);
      }
    });
  }
  // 12"x14" 瓷砖按钮
  const btn12 = document.getElementById("grid-btn-12");
  if (btn12) {
    btn12.addEventListener("click", () => {
      if (active && currentTileSize && currentTileSize.h === 12) {
        hideGrid();
      } else {
        showGrid(12, 24);
      }
    });
  }

  // 窗口缩放重绘
  window.addEventListener("resize", () => {
    if (active && currentTileSize) {
      drawTileGrid(currentTileSize.h, currentTileSize.w);
    }
  });
})();
// ↑↑↑↑↑↑↑↑↑↑↑↑ 瓷砖尺寸辅助线（调试完成后删除）↑↑↑↑↑↑↑↑↑↑↑↑
// ↑↑↑↑↑↑↑↑↑↑↑↑ 瓷砖尺寸辅助线（调试完成后删除）↑↑↑↑↑↑↑↑↑↑↑↑
