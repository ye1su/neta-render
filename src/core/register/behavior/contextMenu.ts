const contextMenu = {
  name: "contextMenu",

  render: {
    getEvents() {
      return {
        "graphics:contextmenu": "onGraphicsContextMenu",
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
      customMenu.textContent = "自定义菜单内容";

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
      customMenu.style.padding = "10px";
      customMenu.style.zIndex = "1000";

      // 将菜单添加到目标元素中
      el.appendChild(customMenu);
    },
  },
};

export default contextMenu;
