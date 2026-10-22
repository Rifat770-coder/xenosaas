import Image from "next/image";
import type { Blog } from "@/types";
import DetailDialog from "@/components/ui/DetailDialog";
import styles from "@/components/sections/blogs/InteractiveBlogCards.module.css";

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <article className={`blog-card ${styles.card}`}>
      <div className={styles.imageFrame}>
      <div className={`blog-image ${styles.image}`}>
        <Image src={blog.image} alt={`${blog.category.toLowerCase()} editorial illustration`} width={700} height={440} sizes="(max-width: 767px) 90vw, 48vw" draggable={false} />
        <span className={styles.preview}>EDITORIAL PREVIEW</span>
      </div>
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{blog.category}</span>
        <h3>{blog.title}</h3>
        <p>{blog.excerpt}</p>
        <DetailDialog title={blog.title} label="Read preview"><p>{blog.body}</p></DetailDialog>
      </div>
    </article>
  );
}


