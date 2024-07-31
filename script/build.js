import { rollup } from "rollup";
import process from "process";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import pluginResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(
  'resolve(__dirname, "../tsconfig.json"): ++++++',
  resolve(__dirname, "../tsconfig.json")
);

// 模块化打包任务函数
const buildModules = async () => {
  let bundle;
  let buildFailed = false;
  try {
    // 启动一次打包
    bundle = await rollup({
      // input: resolve(__dirname, '../src/core/index.ts'),
      input: "src/core/index.ts",
      plugins: [
        pluginResolve({
          extensions: [".ts", ".js"], // Add any extensions you're using
        }),
        commonjs({
          include: "node_modules/**", // 包含哪些文件（一般是 node_modules）
          exclude: [], // 可选：排除某些文件或模块
          requireReturnsDefault: "auto", // 处理默认导出的方式
        }),
        image(),
        typescript({
          tsconfig: "tsconfig.json", // 指定你的 tsconfig.json 路径
        }),
      ],
    });
    // 一个文件名数组，表示此产物所依赖的文件
    // console.log(bundle.watchFiles);
    await bundle.write({
      format: "esm", // 配置输出格式
      dir: resolve(__dirname, "../es"), // 配置输出目录
      preserveModules: true, // 该选项将使用原始模块名作为文件名，为所有模块创建单独的 chunk，也就是打包后保留目录结构
      preserveModulesRoot: "src/core",
      entryFileNames: `[name].mjs`, // [name] 表示入口文件的文件名（不包含扩展名），也就是生产 .mjs 结尾的文件
    });



    console.log('打包成功！');
  } catch (error) {
    buildFailed = true;
    // 进行一些错误报告
    console.error('打包失败:');
    console.error(error);
  }
  if (bundle) {
    // 关闭打包过程
    await bundle.close();
  }
  process.exit(buildFailed ? 1 : 0);
};

buildModules();
