import { EVENT_TYPE } from "../../events";

const contextMenu = {
  name: "contextMenu",
  menus: [],
  render: {
    init(options){
      const originThis = options.originThis;
      originThis.menus = options.menus
    },
    getEvents() {
      return {
        "graphics:contextmenu": "onGraphicsContextMenu",
        pointerdown: "onCanvasPointerDown",
      };
    },
    onGraphicsContextMenu(event) {
      const el = this.instance.el;
      const originThis = event.originThis

      const existingMenu = document.querySelector(".custom-menu");
      if (existingMenu) {
        existingMenu.remove();
      }

      // 创建自定义菜单元素
      const customMenu = document.createElement("div");
      customMenu.classList.add("custom-menu");

      const menuList = originThis.menus;

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
      customMenu.style.backgroundColor = "#e1e4e4";
      customMenu.style.border = "1px solid #b5b4b3";
      customMenu.style.borderRadius = "6px";
      customMenu.style.padding = "8px";
      customMenu.style.zIndex = "1000";
      customMenu.style.cursor = "default";
      // 将菜单添加到目标元素中
      el.appendChild(customMenu);

      const menuItems: HTMLDivElement[] =
        document.querySelectorAll(".custom-menu-item");
      menuItems.forEach((item, index) => {
        item.style.padding = "4px 8px";
        item.style.borderRadius = "6px";
        item.addEventListener("mouseenter", function () {
          // 改变背景颜色
          item.style.backgroundColor = "#6c67af";
          item.style.color = "#fff";
        });
        item.addEventListener("mouseleave", function () {
          // 恢复原始背景颜色
          item.style.backgroundColor = "transparent";
          item.style.color = "#000";
        });

        item.addEventListener("click",  () => {
          el.removeChild(customMenu)
          this.instance.emit(EVENT_TYPE.CONTEXTMENU, menuList[index])
        });
      });
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
