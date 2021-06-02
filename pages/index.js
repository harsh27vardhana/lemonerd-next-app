import Head from "next/head";
import { CardColumns } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {server} from '../config/config'
import ArticleCard from "../components/articleCard";

export default function Home({posts}) {

  // Use this data array for all the posts fetched
  const data=posts.data;
 
  return (
    <div>
      <Head>
        <title>Welcome To Lemonerd</title>
      </Head>
      <Button className="btn-danger">Button</Button>
      <CardColumns>
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </CardColumns>
    </div>
  );
}


export const getStaticProps= async () => {
  const url = server+'/api/posts'
  const res = await fetch(url);
  const posts = await res.json();
  return {
    props: {posts},
  }
}