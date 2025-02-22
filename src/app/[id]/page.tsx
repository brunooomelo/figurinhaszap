import { SEO_MULTI_PAGE } from "@/utils/SEO";
import { HomePage } from "@/components/layouts/home";

import type { Metadata } from 'next'
import { environment } from "@/utils/environment";

type HomeProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}


const getSEO = (url: string) => {
  return SEO_MULTI_PAGE.find((seo) =>
    seo.url === url
  );
}

export async function generateMetadata(
  { params }: HomeProps,
): Promise<Metadata> {
  const id = (await params).id
  const seo = getSEO(id)

  return {
    metadataBase: new URL(environment.SITEURL),
    title: seo?.title,
    description: seo?.description,
    alternates: {
      canonical: environment.SITEURL
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: environment.SITEURL,
      siteName:
        seo?.title,
      description:
        seo?.description,
      images: [
        {
          url: `${environment.SITEURL}/home/cover.webp`,
          width: 1280,
          height: 720,
          alt: "Imagem que representa a figurinhaszap",
        },
      ],
    },
    twitter: {
      site: "@figurinhas",
      creator: "@brunooomelo",
      card: "summary_large_image",
    },
  }
}


export async function generateStaticParams() {
  return SEO_MULTI_PAGE.map((seo) => ({
    id: seo.url,
  }));
}

export default async function Home({ params }: HomeProps) {
  const { id } = await params
  const SEO = getSEO(id)
  return <HomePage heading={SEO?.heading} subheading={SEO?.heading_description} />
}
