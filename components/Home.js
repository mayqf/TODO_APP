import { Container,Image,Header} from "semantic-ui-react";
import Link from "next/link";


function HomePage() {
    return (
    <Container >
        <Image
              size="huge"
              src="../static/todo.png"
        />
        <Header as='h1'  textAlign='center'>Welcome To The Todo App</Header>
        <Container textAlign='center'>Please <Link href="/login">login</Link> to make your own todo list and see your profile! </Container>
    </Container>
    );
  }
  
  export default HomePage;
  