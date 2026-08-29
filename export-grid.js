// 来自主页导出Thumbnail view按钮
function exportGridView() {
  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 从main.js获取全局变量 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  checkOption();
  const option = savedOptions[activeOptionIndex];
  if (!option) return;

  const totalprice = calculateTotal(option, true);
  const formattedDate = exportFormattedDate;
  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 从main.js获取全局变量 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

  const win = window.open("", "_blank");
  win.document.write(`
<!DOCTYPE html>
<html>
    <head>
        <title>Option ${option.name}_Grid View</title>
        <link rel="stylesheet" href="variable.css" />
        <link rel="stylesheet" href="main.css" />
        <link rel="stylesheet" href="export-grid.css" />
        <script src="product-list.js"></script>
        <script src="material-qty.js"></script>
        <script src="furniture-data.js"></script>
        <script src="main.js"></script>
        <script>
            // 确保在DOM解析完成后绑定事件
            document.addEventListener("DOMContentLoaded", function () {
                exportPageIntial();
            });
        </script>
    </head>

    <body class="page-container-grid">
        <!-- 项目标题 -->
        <div class="project-title-grid">
            161 West 86th Street Apt 2A_Bathroom
        </div>

        <!-- ↓↓↓↓↓ 主体 ↓↓↓↓↓ -->
        <!-- ↓↓↓↓↓ 主体 ↓↓↓↓↓ -->
        <div class="body-container-grid">

            <!-- ↓↓↓↓↓ 1 Option标题栏 ↓↓↓↓↓ -->
            <div class="header-container-grid">
                <div class="option-title-grid">
                    <strong>${option.name.toUpperCase()}</strong>
                </div>
                <div class="estimated-cost-header-grid">
                    Estimated <strong>${totalprice}</strong>
                </div>
            </div>
            <!-- ↑↑↑↑↑ 1 Option标题栏 ↑↑↑↑↑ -->
            <!-- -->
            <!-- -->
            <!-- -->    
            <div id="content-container-grid">        
            `);
  Object.entries(categoriesByArea).forEach(([areaName, categories]) => {
    win.document.write(`      
            <!-- ↓↓↓↓↓ 2 内容 ↓↓↓↓↓ -->  
            
            
                <div class="location-wrapper-grid">
                    <div class="location-wrapper-name-grid">${areaName}</div>
                    <div class="furniture-section-grid">
                        `);

    categories.forEach((category) => {
      // 如果 item list 中没有勾选，跳过
      if (currentItemVisibility[category] === false) return;

      const imgIndex = option.selections[category];
      const product = productList[category]?.[imgIndex];
      if (
        product &&
        product.delivery &&
        product.delivery.toLowerCase() === "existing"
      ) {
        return;
      }

      // 获取单价和总价
      let displayPrice = product?.price || "N/A";
      let unitPrice = 0;

      if (product) {
        if (product.totalprice) {
          unitPrice = parseFloat(product.totalprice.replace(/[^\d.]/g, ""));
        } else if (product.price) {
          unitPrice = parseFloat(product.price.replace(/[^\d.]/g, ""));
        }

        // 如果是面积类材质，重新计算总价并格式化显示
        if (
          window.isAreaBasedCategory &&
          window.isAreaBasedCategory(category)
        ) {
          const qty = window.getMaterialQty(category);
          if (!isNaN(unitPrice) && qty) {
            const newTotal = unitPrice * qty;
            displayPrice = newTotal.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            });
          }
        }
      }

      const simpleName = category.split("_").pop();
      const capitalName = getDisplayName(category);

      win.document.write(`
    <div class="furniture-container-grid">
      <div class="category-name-grid">
        ${capitalName.replace(/_/g, " ")}
      </div>
      <img class="furniture-img-grid"
           data-category="${category}"
           data-index="${imgIndex}"
      />
  `);

      if (product) {
        const brandInfo = getBrandInfo(product.brand);
        const brand_Color = brandInfo.color;
        const fontColor = brandInfo.fontColor;
        const brandAbbr = brandInfo.abbreviation;
        win.document.write(`
      <div class="brand-price-tag-container-grid">
        <div class="brand-tag-grid" style="background: ${brand_Color}; color: ${fontColor}">
          ${brandAbbr}
        </div>
        <div class="price-tag-grid">
          ${product.price}
        </div>
      </div>
    `);
      }

      win.document.write(`</div>`);
    });

    win.document.write("</div></div>");
  });

  win.document.write(`	
            </div> 
        </div> 
        <!-- ↑↑↑↑↑ 2 内容 ↑↑↑↑↑ -->	
        <!-- -->
        <!-- -->
        <!-- -->    
        <!-- ↓↓↓↓↓ 3 日期 ↓↓↓↓↓ -->
        <div class="date-footer-container-grid">${formattedDate}</div>
        <!-- ↑↑↑↑↑ 3 日期 ↑↑↑↑↑ -->

        <!-- ↑↑↑↑↑ 主体 ↑↑↑↑↑ -->
        <!-- ↑↑↑↑↑ 主体 ↑↑↑↑↑ -->

    </body>
    </html>
    `);

  win.document.close();
}
