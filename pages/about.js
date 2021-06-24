import { Container, Card } from "react-bootstrap";

function about() {
  return (
    <div>
      <h1 className="text-center py-5 mt-5 monotone display-1">ABOUT US</h1>
      <Container>
        <Card className="p-5 mx-5 mb-5">
          <p>
            Lemonerd is an honest and ambitious effort to share the collective
            interest and enthusiasm for technology, science and the millennial
            culture. The website and contents have been created from scratch by
            us. The blogs and editorials shared on this platform are a
            reflection of what inspires and excites a young inquisitive mind.
            The idea of the blogging site is to provide insightful content that
            is interesting, light, informative and satiates the interests of any
            info-enthusiast.
          </p>
          <br />
          <blockquote className="blockquote text-center">
            <p className="mb-0 italic">
              “ To err is human….to really foul up requires the root password”
            </p>
            <footer className="blockquote-footer">
              {" "}
              <cite title="Source Title">Someone</cite>
            </footer>
          </blockquote>
          <br />
          <p>
            The idea of the platform came across when we were too bored keeping
            our views to ourselves which we believe can be entertaining for more
            like-minded people out there. It consists of the essence of all the
            meaningful debates which we have with our friends that lead to
            nowhere but actually help us become more aware about the rapidly
            transforming world.
          </p>
          <br />
          <blockquote className="blockquote text-center">
            <p className="mb-0 italic">
              “I have no special talents. I am only passionately curious”
            </p>
            <footer className="blockquote-footer">
              {" "}
              <cite title="Source Title">Einstein</cite>
            </footer>
          </blockquote>
          <br />
          <p>
            And we are no experts in any of this (none of us graduated at 14
            like Dr. Sheldon), neither are we going to solve for Schrodinger’s
            cat, or discuss the Boron fillings of a nuclear setup or give out
            spoilers of great shows; nor are we going to suggest ways to bring
            about world peace. This forum is aimed at infotainment and
            collective knowledge sharing.
          </p>
          <br />
          <blockquote className="blockquote text-center">
            <p className="mb-0 italic">
              “Because it’s better to be a nerd than an idiot.”
            </p>
            <footer className="blockquote-footer">
              {" "}
              <cite title="Source Title">Everyone</cite>
            </footer>
          </blockquote>
          <br />
          <p>
            And so, the definition of the word- Lemonerd for us the zest of any
            person who believes that the human thought process, modern societal
            constructs, technology and philosophy are interesting. The Nerd in
            Lemonerd stands for someone who enjoys learning and does not adhere
            to social norms i.e. one who is obsessed with great attention to
            technical details.
          </p>
          <br />
          <p>
            Today the internet is about availability of information, blogging
            can help make information creation available to everyone. Also, with
            this platform we get to show off about our thoughts, writing and
            technical skills;) We hope this turns out well.
          </p>
          <br />
          <p>So happy reading to anyone and everyone here!</p>
          <br />
          <p>
            Regards,
            <br />
            From the self-proclaimed Grammar Nazis: Harshavardhana and Tejaswini
          </p>
          <br />
          <br />
          <p className="mb-0"></p>
          <footer className="blockquote-footer">
            {" "}
            <cite title="Source Title">
              Disclaimer: Views expressed in the blogs are personal and original
              with proper references. If you have authentic ideas and opinions
              to share, subscribe and get your articles featured here.
            </cite>
          </footer>
        </Card>
      </Container>
    </div>
  );
}

export default about;
