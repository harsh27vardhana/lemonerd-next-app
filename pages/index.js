import Head from "next/head";
import { CardColumns } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ArticleCard from "../components/articleCard";

export default function Home() {
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
