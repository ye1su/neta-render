import { rollup } from "rollup";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import pluginResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log('resolve(__dirname, "../tsconfig.json"):++++++++ ', resolve(__dirname, "../tsconfig.json"));

// 模块化打包任务函数
const buildModules = async () => {
  const bundle = await rollup({
    // input: resolve(__dirname, '../src/core/index.ts'),
    input: "src/core/index.ts",
    plugins: [
      typescript({
        tsconfig: resolve(__dirname, "../tsconfig.json"), // 指定你的 tsconfig.json 路径
      }),
      pluginResolve({
        extensions: [".ts", ".js"], // Add any extensions you're using
      }),
    ],
  });
  bundle.write({
    format: "esm", // 配置输出格式
    dir: resolve(__dirname, "../es"), // 配置输出目录
    preserveModules: true, // 该选项将使用原始模块名作为文件名，为所有模块创建单独的 chunk，也就是打包后保留目录结构
    preserveModulesRoot: "src",
    entryFileNames: `[name].mjs`, // [name] 表示入口文件的文件名（不包含扩展名），也就是生产 .mjs 结尾的文件
  });
};

buildModules();
