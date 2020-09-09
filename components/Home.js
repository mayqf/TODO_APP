import { Container,Image} from "semantic-ui-react";
import Link from "next/link";


function HomePage() {
    return (
    <Container >
        <Image
              size="large"
              src="../static/todo-header.png"
          />
        <h1>Welcome To The Todo App</h1>
       <p>Please <Link href="/login">login</Link> to make your own todo list</p>
    </Container>
    );
  }
  
  export default HomePage;
  