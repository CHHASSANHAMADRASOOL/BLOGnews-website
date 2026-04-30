import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { id: params.id }
  });

  if (!post) return notFound();

  return (
    // Dynamic background image database se aa rahi hai
    <main 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${post.bgImage}')` }}
    >
      {/* Overlay taake text saaf dikhe */}
      <div className="min-h-screen bg-black/60 backdrop-blur-sm p-10 flex flex-col items-center justify-center text-white">
        <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
        <p className="text-xl max-w-2xl text-center">{post.content}</p>
        
        <div className="mt-8 p-4 bg-white/10 rounded-lg border border-white/20">
          <p className="italic">Category: {post.category}</p>
        </div>
      </div>
    </main>
  );
}