import React from "react";
import { Box, Center, useColorModeValue } from "@chakra-ui/react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Container from "../components/Container";
//import Meta from "../components/Meta";
import ArticlePreview from "../components/ArticlePreview";

const Home = ({ data, serverData }) => {
  const articles = data.allNodeArticle.nodes;

  return (
    <Layout>
      {/* <Meta title="My Blog Site" description="An example blog site stareter." /> */}
      <Box
        pt={30}
        width={`100%`}
        background={useColorModeValue(`gray.100`, `gray.600`)}
        borderBottomWidth="1px"
      >
        <Container mt="0">
          {articles.map((article) => (
            <ArticlePreview
              key={article.id}
              title={article.title}
              path={article.path.alias}
              image={article.relationships.field_image.gatsbyImage}
              alt={article.field_image.alt}
              summary={article.body.processed.substring(0, 300)}
            />
          ))}
        </Container>
      </Box>
      <Box
        p={30}
        width={`100%`}
        background={useColorModeValue(`gray.300`, `gray.500`)}
        borderBottomWidth="1px"
      >
        <Center>
          <img alt="Happy dog" src={serverData.message} />
        </Center>
      </Box>
    </Layout>
  );
};

export const pageQuery = graphql`
  {
    allNodeArticle(sort: { fields: created, order: DESC }, limit: 10) {
      nodes {
        id
        title
        created
        body {
          processed
        }
        path {
          alias
        }
        field_image {
          alt
        }
        relationships {
          field_image {
            gatsbyImage(width: 600)
          }
        }
      }
    }
  }
`;

export default Home;

export async function getServerData() {
  try {
    const res = await fetch(`https://dog.ceo/api/breeds/image/random`);
    if (!res.ok) {
      throw new Error(`Response failed`);
    }
    return {
      props: await res.json(),
    };
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    };
  }
}