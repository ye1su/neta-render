const contextMenu = {
  name: "contextMenu",

  render: {
    getEvents() {
      return {
        "graphics:contextmenu": "onGraphicsContextMenu",
        pointerdown: "onCanvasPointerDown",
      };
    },
    onGraphicsContextMenu(event) {
      const el = this.instance.el;

      const existingMenu = document.querySelector(".custom-menu");
      if (existingMenu) {
        existingMenu.remove();
      }

      // 创建自定义菜单元素
      const customMenu = document.createElement("div");
      customMenu.classList.add("custom-menu");

      const menuList = [
        {
          label: "自定义菜单1",
          key: "1",
        },
        {
          label: "自定义菜单244tttttt",
          key: "2",
        },
      ];

      const menuHtml = menuList.reduce((pre, cur) => {
        const itemHtml = `<div class="custom-menu-item" >${cur.label}</div>`;
        return pre + itemHtml;
      }, "");

      customMenu.innerHTML = menuHtml;

      // 获取鼠标点击位置相对于div的位置
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // 设置自定义菜单位置
      customMenu.style.left = `${x}px`;
      customMenu.style.top = `${y}px`;
      customMenu.style.position = "absolute";
      customMenu.style.backgroundColor = "#fff";
      customMenu.style.border = "1px solid black";
      customMenu.style.padding = "8px";
      customMenu.style.zIndex = "1000";

      // 将菜单添加到目标元素中
      el.appendChild(customMenu);

      const menuItems: HTMLDivElement[] =
        document.querySelectorAll(".custom-menu-item");
      menuItems.forEach((item) => {
        item.style.padding = "4px 8px";
        item.style.borderRadius = '6px'
        item.addEventListener("mouseenter", function () {
          // 改变背景颜色
          item.style.backgroundColor = "lightblue";
        });
        item.addEventListener("mouseleave", function () {
          // 恢复原始背景颜色
          item.style.backgroundColor = "#fff";
        });
      });
      console.log("menuItems: ", menuItems);
    },
    onCanvasPointerDown() {
      const existingMenu = document.querySelector(".custom-menu");
      if (existingMenu) {
        existingMenu.remove();
      }
    },
  },
};

export default contextMenu;
