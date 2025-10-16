import path from "path";
import fs from "fs";
import { Locales } from "./dictionaries";

const blogs = [
  async (lang: Locales) => await getStaticProps(`public/blogs/blog1-${lang}.md`),
  async (lang: Locales) => await getStaticProps(`public/blogs/blog2-${lang}.md`),
];

async function getStaticProps(filePath: string) {
  const currentFilePath = path.join(process.cwd(), filePath);
  const content = fs.readFileSync(currentFilePath, "utf-8");

  return { props: { content } };
}

export { blogs, getStaticProps };
