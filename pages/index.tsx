import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { GraphQLClient, gql } from 'graphql-request'

export default function Home({
  projects,
}: {
  projects: {
    slug: string
    title: string
  }[]
}): JSX.Element {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        {projects.map((project) => (
          <li key={project.slug}>
            <Link href={`/projects/${project.slug}`}>
              <a>{project.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_URL)
  const query = gql`
    query Projects {
      projects {
        slug
        title
      }
    }
  `
  const data = await client.request(query)

  return {
    props: { projects: data.projects },
  }
}
