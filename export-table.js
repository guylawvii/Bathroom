// ↓↓↓↓↓ ===================  A 全局变量 =================== ↓↓↓↓↓
let sortStates = {
  id: 0,
  location: 0,
  name: 0,
  brand: 0,
  price: 0,
  totalprice: 0,
};
let currentSortColumn = null;
// ↑↑↑↑↑ ===================  A 全局变量 =================== ↑↑↑↑↑
//
//
//
//
//
//
// ↓↓↓↓↓ ===================  B export-table.js函数 =================== ↓↓↓↓↓
// B 添加动作
function addEventListenerExportTable() {
  // 1 单击表头给列排序
  document.querySelectorAll("th[data-column]").forEach((th) => {
    const column = th.dataset.column;
    const type = th.dataset.type;
    th.addEventListener("click", () => {
      sortTable(column, type);
    });
  });

  // 2 Excel按钮动作
  const excelBtn = document.getElementById("export-excel-btn");
  excelBtn.addEventListener("click", exportToExcel);
}

// B1 单击表头给列排序
function sortTable(column, type) {
  // B1.1 特殊处理ID列 - 永远正序排序
  if (column === "id") {
    sortDirection = "asc";
  } else {
    // 对于非'id'列：
    // 检查当前点击的列是否与上次排序列相同
    if (currentSortColumn === column) {
      // 如果相同，则切换排序方向
      // 1表示升序，2表示降序
      sortStates[column] = sortStates[column] === 1 ? 2 : 1;
    } else {
      // 如果点击了新列，初始化该列的排序状态为升序
      sortStates[column] = 1;
      // 更新当前排序列为新列
      currentSortColumn = column;
    }
    // 根据排序状态设置排序方向（1=升序，2=降序）
    sortDirection = sortStates[column] === 1 ? "asc" : "desc";
  }

  const table = document.querySelector("#chart");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));
  // 移除所有表头上的排序激活状态
  document.querySelectorAll("th[data-column]").forEach((th) => {
    th.classList.remove("sorting-active");
  });

  // B1.2 如果不是'id'列，为当前排序列的表头添加激活状态
  if (column !== "id") {
    document
      .querySelector(`th[data-column="${column}"]`)
      .classList.add("sorting-active");
  }

  // B1.3 对行数组进行排序
  rows.sort((a, b) => {
    // 获取a行当前列的内容
    const aValue = a.cells[getColumnIndex(column)].textContent.trim();
    // 获取b行当前列的内容
    const bValue = b.cells[getColumnIndex(column)].textContent.trim();
    // 如果是数字类型列
    if (type === "number") {
      const numA = parseFloat(aValue.replace(/[^0-9.]/g, "")) || 0;
      const numB = parseFloat(bValue.replace(/[^0-9.]/g, "")) || 0;
      return sortDirection === "asc" ? numA - numB : numB - numA;
    } else {
      // 对于文本类型列，使用localeCompare进行字符串比较
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
  });
  // 将排序后的行重新添加到tbody中
  rows.forEach((row) => tbody.appendChild(row));
  // 更新当前排序列
  currentSortColumn = column;
}

// B1.4 获取当前列
function getColumnIndex(column) {
  const columns = {
    id: 0,
    location: 1,
    name: 2,
    brand: 3,
    price: 8,
    totalprice: 9,
  };
  return columns[column];
}

// B2 导出到Excel
function exportToExcel() {
  try {
    // B2.1 Excel内容
    const table = document.querySelector("#chart");
    const wb = XLSX.utils.table_to_book(table, {
      sheet: "Bathroom",
    });

    const optionName = document.getElementById(
      "option-name-excel-table",
    ).textContent;
    // B2.2 Excel文件名
    const fileName = "Bathroom_" + optionName + ".xlsx";
    XLSX.writeFile(wb, fileName);
  } catch (error) {
    console.error("Excel Error:", error);
    alert("Fail to export Excel, please retry.");
  }
}
// ↑↑↑↑↑ ===================  B export-table.js函数 =================== ↑↑↑↑↑
//
//
//
//
//
//
// ↓↓↓↓↓ ===================  C 来自主页导出Table view按钮 =================== ↓↓↓↓↓
function exportTableView() {
  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 从main.js获取全局变量 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  checkOption();
  // const option = exportOption;
  const option = savedOptions[activeOptionIndex];
  if (!option) return;

  const totalprice = calculateTotal(option, true);
  const formattedDate = exportFormattedDate;
  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 从main.js获取全局变量 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

  const win = window.open("", "_blank");
  const allFurniture = [];
  let itemId = 1;

  Object.entries(categoriesByArea).forEach(([areaName, categories]) => {
    categories.forEach((category) => {
      // 如果 item list 中没有勾选，跳过
      if (currentItemVisibility[category] === false) return;

      const imgIndex = option.selections[category];
      const product = productList[category]?.[imgIndex];

      if (product && !product.delivery.toLowerCase().includes("existing")) {
        // 获取单价
        let unitPrice = 0;
        if (product.totalprice) {
          unitPrice = parseFloat(product.totalprice.replace(/[^\d.]/g, ""));
        } else if (product.price) {
          unitPrice = parseFloat(product.price.replace(/[^\d.]/g, ""));
        }

        // 获取数量：优先使用 materialQty，否则使用 product.qty
        let qty = 1;
        let totalprice = product.totalprice;

        if (
          window.isAreaBasedCategory &&
          window.isAreaBasedCategory(category)
        ) {
          let area = window.getMaterialQty(category) || 1;

          // 扣除逻辑
          if (category === "bathroom_dry__wall") {
            if (currentItemVisibility["bathroom_dry__wall__lower"] !== false) {
              area -= window.getMaterialQty?.("bathroom_dry__wall__lower") || 0;
            }
            if (currentItemVisibility["bathroom_wet__wall"] !== false) {
              area -= window.getMaterialQty?.("bathroom_wet__wall") || 0;
            }
          }
          if (category === "bathroom_dry__floor") {
            if (currentItemVisibility["bathroom_wet__floor"] !== false) {
              area -= window.getMaterialQty?.("bathroom_wet__floor") || 0;
            }
          }
          if (area < 0) area = 0;

          qty = area;

          const unitPrice = parseFloat(product.price?.replace(/[^\d.]/g, "") || 0,);

          // 重新计算 totalprice
          if (!isNaN(unitPrice) && qty) {
            const newTotal = unitPrice * qty;
            totalprice = newTotal.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            });
          }
        } else if (product.qty) {
          qty = parseFloat(product.qty);
        }

        const simpleName = category.split("_").pop();
        const capitalName = getDisplayName(category);

        allFurniture.push({
          id: itemId++,
          location: areaName,
          name: capitalName,
          brand: product.brand || "N/A",
          product: product.product || "N/A",
          size: product.size || "N/A",
          qty: qty,
          price: product.price || "N/A",
          totalprice: totalprice,
          delivery: product.delivery || "N/A",
          link: product.link || "",
          category: category,
          imgIndex: imgIndex,
        });
      }
    });
  });

  win.document.write(`
    <!DOCTYPE html>
    <html>
        <head>
            <title>Option ${option.name}_Table View</title>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="variable.css" />
            <link rel="stylesheet" href="main.css" />
            <link rel="stylesheet" href="export-table.css" />
            <script src="https://cdn.sheetjs.com/xlsx-0.20.0/package/dist/xlsx.full.min.js"></script>
            <script src="product-list.js"></script>
            <script src="material-qty.js"></script>
            <script src="furniture-data.js"></script>
            <script src="main.js"></script>
            <script src="export-table.js"></script>
            <script>
                // 确保在DOM解析完成后绑定事件
                document.addEventListener("DOMContentLoaded", function () {
                    exportPageIntial();
                    addEventListenerExportTable(); 
                });
            </script>
        </head>

        <body class="page-container-table">
            <!-- 隐藏元素存储Excel下载Option名称 -->
            <div id="option-name-excel-table" style="display: none">${
              option.name
            }</div>
            <!-- 项目标题 -->
            <div class="project-title-table">
                161 West 86th Street Apt 2A_Bathroom
            </div>

            <!-- ↓↓↓↓↓ 主体 ↓↓↓↓↓ -->
            <!-- ↓↓↓↓↓ 主体 ↓↓↓↓↓ -->
            <div class="body-container-table">
                <!-- ↓↓↓↓↓ 1 Option标题 ↓↓↓↓↓ -->
                <div class="option-header-table">
                    <div class="option-title-table">
                        <strong>${option.name.toUpperCase()}</strong>
                    </div>
                    <div
                        class="command-btn"
                        id="export-excel-btn"
                        data-tooltip="Download EXCEL"
                    >
                        <img
                            src="Icon images/icon_export_toExcel.png"
                            alt="Save as EXCEL"
                        />
                    </div>
                </div>
                <!-- ↑↑↑↑↑ 1 Option标题 ↑↑↑↑↑ -->
                <!-- -->
                <!-- -->
                <!-- -->
                <!-- ↓↓↓↓↓ 2 表格 ↓↓↓↓↓ -->
                <div class="content-container-table">                    
                    <table id="chart">
                        <!-- ↓↓↓↓↓ 2.1 表头 ↓↓↓↓↓ -->
                        <thead>
                            <tr>
                                <th data-column="id" data-type="number"></th>
                                <!-- ID列不显示文字 -->
                                <th data-column="location" data-type="text">
                                    TYPE
                                </th>
                                <th data-column="name" data-type="text">
                                    NAME
                                </th>
                                <th data-column="brand" data-type="text">
                                    BRAND
                                </th>
                                <th>PRODUCT</th>
                                <th>SIZE</th>
                                <th>DELIVERY</th>
                                <th>QTY</th>
                                <th data-column="price" data-type="number">
                                    PRICE
                                </th>
                                <th data-column="totalprice" data-type="number">
                                    TOTAL PRICE
                                </th>
                                <th class="image-cell"></th>
                            </tr>
                        </thead>
                        <!-- ↑↑↑↑↑ 2.1 表头 ↑↑↑↑↑ -->

                        <!-- ↓↓↓↓↓ 2.2 表身 ↓↓↓↓↓ -->
                        <tbody>
                            ${allFurniture
                              .map(
                                (item) => `
                            <tr>
                                <td>${item.id}</td>
                                <td>${item.location}</td>
                                <td>${item.name}</td>
                                <td>${item.brand}</td>
                                <td>
                                    ${
                                      item.link
                                        ? `<a
                                        href="${item.link}"
                                        target="_blank"
                                        >${item.product}</a
                                    >`
                                        : item.product
                                    }
                                </td>
                                <td>${item.size}</td>
                                <td>${item.delivery}</td>
                                <td>${item.qty}</td>
                                <td>${item.price}</td>
                                <td>${item.totalprice}</td>
                                <td class="image-cell">
                                    <img
                                        class="furniture-img-table"
                                        data-category="${item.category}"
                                        data-index="${item.imgIndex}"
                                        height="50"
                                    />
                                </td>
                            </tr>
                            `,
                              )
                              .join("")}
                        </tbody>
                        <!-- ↑↑↑↑↑ 2.2 表身 ↑↑↑↑↑ -->


                        <!-- ↓↓↓↓↓ 2.3 表尾 ↓↓↓↓↓ -->
                        <tfoot>
                            <tr>
                                <td></td>
                                <td colspan="8">Estimated</td>
                                <td><strong>${totalprice}</strong></td>
                                <td colspan="2"></td>
                            </tr>
                        </tfoot>
                        <!-- ↑↑↑↑↑ 2.3 表尾 ↑↑↑↑↑ -->
                    </table>                                   
                </div>                   
            </div>       
            <!-- ↑↑↑↑↑ 2 表格 ↑↑↑↑↑ -->     
            <!-- -->
            <!-- -->
            <!-- -->
            <!-- ↓↓↓↓↓ 3 日期 ↓↓↓↓↓ -->
            <div class="date-footer-container-table">${formattedDate}</div>
            <!-- ↑↑↑↑↑ 3 日期 ↑↑↑↑↑ -->            
        </body>
        <!-- ↑↑↑↑↑ 主体 ↑↑↑↑↑ -->
        <!-- ↑↑↑↑↑ 主体 ↑↑↑↑↑ -->
    </html>

    `);

  win.document.close();
}
