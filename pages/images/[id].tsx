import { createClient } from "@supabase/supabase-js";
import Layout from "../layout";
import { useState } from 'react'
import Image from "next/image";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || ""
);

type Image = {
  id: number;
  href: string;
  imageSrc: string;
  name: string;
  username: string;
  description: string;
};

export default function Page({ images }: { images: Image[] }) {
  images.map((image) => (
    <Image key={image.id} src={image.imageSrc} alt={image.name} />
  ))
}

export async function getStaticPaths() {
  /* const ids = await supabaseAdmin.from("images").select('id').order('id') */

  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
      { params: { id: '4' } },
      { params: { id: '5' } },
      { params: { id: '6' } },
      { params: { id: '7' } },
      { params: { id: '8' } },
      { params: { id: '9' } },
      { params: { id: '10' } },
    ],
    fallback: false,
  }
}

export const getStaticProps = async () => {
  const { data } = await supabaseAdmin.from("images").select("*").order("id");

  return {
    props: {
      images: data,
    },
  };
};
