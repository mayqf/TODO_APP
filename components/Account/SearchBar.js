import React from "react";
import { Input,Container,Message,Card} from 'semantic-ui-react';
import formatDate from "../../utils/formatDate";


const SearchBar = ({todos}) => {

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  React.useEffect(() => {
    const results = todos.filter(todo =>
      todo.category==searchTerm
    );
    setSearchResults(results);
    console.log(results);
  }, [searchTerm]);
  
  if (!todos || todos.length === 0) {
    return <Message info content='You have not created a todo yet. Try it out!'/>
  }
  return (
    <>
      <Container >
        <Input
          icon={{ name: 'search', circular: true, link: true }}
          placeholder='Search by category'
          value={searchTerm}
          onChange={handleChange} 
          size='big' fluid/>
      </Container>
      

      {searchTerm ? 

        <Card.Group>
          {todos.map(todo => {
            return (
              <Card>
                <Card.Content>
                  <Card.Header>{todo.title}</Card.Header>
                  <Card.Meta>{todo.category}</Card.Meta>
                  <Card.Meta>Created at {formatDate(todo.createdAt)}</Card.Meta>
                  <Card.Description>
                    {todo.description}
                  </Card.Description>
               </Card.Content>
              </Card>
            )})}
        </Card.Group>

      : null }
      
    </>
  );
};

export default SearchBar;
