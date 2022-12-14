import Image from "next/legacy/image";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

export const getStaticProps = async () => {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || ""
  );

  const { data } = await supabaseAdmin.from("images").select("*").order("id");

  return {
    props: {
      images: data,
    },
  };
};

type Image = {
  id: number;
  href: string;
  imageSrc: string;
  name: string;
  username: string;
  description: string;
};

export default function Gallery({ images }: { images: Image[] }) {
  return (
    <div className="bg-[url(https://grainy-gradients.vercel.app/noise.svg)] w-[100vw] max-w-2xl my-10 mx-auto py-16 px-4 sm:py-24 sm:px-6 md:max-w-3xl lg:max-w-6xl lg:px-9 xl:max-w-[90rem]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8 wrapper">
        <h1 className="self-center text-center">The Karaethon Cycle</h1>
        {images.map((image) => (
          <BlurImage key={image.id} image={image} />
        ))}
      </div>
    </div >
  );
}

const BlurImage = ({ image }: { image: Image }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Link href={`images/${image.id}`} className="group">
      <div className="aspect-w-5 aspect-h-4 md:aspect-w-4 md:aspect-h-5 lg:aspect-w-1 lg:aspect-h-1 xl:aspect-w-5 xl:aspect-h-4 overflow-hidden rounded-lg bg-gray-200 hover:scale-[0.95] duration-1000 ease-out">
        <Image
          alt={image.name}
          src={image.imageSrc}
          layout="fill"
          objectFit="cover"
          className={`grid group-hover:scale-150 duration-1000 ease-out 
            ${isLoading
              ? "grayscale blur-2xl scale-110"
              : "grayscale-0 blur-0 scale-100"
            }`}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-lg text-gray-700">{image.name}</h3>
      <p className="mt-1 text-md font-medium text-gray-900">{'@' + image.username}</p>
    </Link>
  );
};
