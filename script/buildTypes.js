import { Project } from "ts-morph";
import path, { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";
import glob from "fast-glob";

const __filenameNew = dirname(fileURLToPath(import.meta.url));
const __dirnameNew = dirname(__filenameNew);
console.log("__dirnameNew: ", __dirnameNew);

const projRoot = resolve(__dirnameNew);
// dist 目录地址
// const buildOutput = resolve(projRoot, "dist");
// `tsconfig.json` 文件绝对路径
const TSCONFIG_PATH = resolve(projRoot, "tsconfig.json");
// 声明文件输出目录
const outDir = resolve(projRoot, "types");
console.log('outDir: ', outDir);

const excludeFiles = (files) => {
  const excludes = ["node_modules"];
  return files.filter(
    (path) => !excludes.some((exclude) => path.includes(exclude))
  );
};

const generateTypesDefinitions = async () => {
  const project = new Project({
    compilerOptions: {
      allowImportingTsExtensions: true,
      emitDeclarationOnly: true, // 是否只输出类型文件 .d.ts
      outDir, // 输出目录
      declaration: true,
      baseUrl: projRoot, // 用于解析非相对模块名称的目录
      preserveSymlinks: true, // 它对应了 Node.js 中 --preserve-symlinks 选项的行为，Node.js 有这样一个选项：–preserve-symlinks，可以设置成按照软链所在的位置查找依赖
      skipLibCheck: true, // 跳过.d.ts类型声明文件的类型检查。这样可以加快编译速度
      noImplicitAny: false, // 是否允许隐式声明 any 类型了
    },
    tsConfigFilePath: TSCONFIG_PATH, // 手动指定 tsconfig.json 文件作为 ts-morph 项目的 TypeScript 配置
    skipAddingFilesFromTsConfig: true, // 取消从 tsconfig.json 文件中添加 TypeScript 源文件
  });
  // 手动添加 TypeScript 源文件
  await addSourceFiles(project);
  // 进行类型检查
  // typeCheck(project);


  // 进行代码生成
  project.emit({
    emitOnlyDtsFiles: true
  });

};

async function addSourceFiles(project) {
  const epPaths = excludeFiles(
    await glob(["src/core/**/*"], {
      // cwd: epRoot, // 读取 ./packages/cobyte-ui 目录下的文件
      onlyFiles: true, // 只读取文件
    })
  );

  await Promise.all([
    ...epPaths.map(async (file) => {
      const content = await readFile(path.resolve(__dirnameNew , file), "utf-8");
      project.createSourceFile(path.resolve(outDir, file), content);
    }),
  ]);
}
// 进行类型检查
function typeCheck(project) {
  const diagnostics = project.getPreEmitDiagnostics();
  if (diagnostics.length > 0) {
    console.error(project.formatDiagnosticsWithColorAndContext(diagnostics));
    const err = new Error("Failed to generate dts.");
    console.error(err);
    throw err;
  }
}

generateTypesDefinitions();
