import { Collection } from "@/components/shared/Collection"
import { navLinks } from "@/constants"
import { getAllImages } from "@/lib/actions/image.actions"
import Image from "next/image"
import Link from "next/link"

// THIS IS OUR Home Page, WE BROUGHT IT FROM app/page.tsx TO HERE BECAUSE WE WANT THIS PAGE TO BE THE Home Page OF OUR APP
const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery})

  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          Unleash Your Creative Vision With lostcanvas & Artificial Intelligence
        </h1>

        <p className="p-22-medium text-justify max-sm:mt-4 text-white w-11/12">
          Welcome to our cutting-edge SaaS application, where state-of-the-art AI transforms your images with ease. Effortlessly <b>remove objects</b> and <b>backgrounds</b>, <b>recolor</b> specific elements, and intelligently <b>fill gaps</b> for a flawless finish. Enhance <b>image quality</b> and detail with our <b>refine feature</b>. You can <b>download</b> your images too. Experience the future of image editing with our comprehensive AI-powered tools, designed for all your creative needs. <br/><br/>

          Sign up to start using our application <b>for free!</b> <br/><br/>
        </p>

        <ul className="w-full gap-20 hidden md:flex-center">
          {navLinks.slice(1, 6).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex-center flex-col gap-2"
            >
              <li className="flex-center w-fit rounded-full bg-white p-4">
                <Image src={link.icon} alt="image" width={18} height={18} />
              </li>
              <p className="p-14-medium text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12 max-sm:mt-4">
        <Collection 
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  )
}

export default Home