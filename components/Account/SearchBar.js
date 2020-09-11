import React from "react";
import { Input,Container,Message} from 'semantic-ui-react'


const SearchBar = ({todos}) => {

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  React.useEffect(() => {
    const results = todos.filter(todo =>
      todo.category.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
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
          {todos.map(todo => {a
            const isInProgress = inProgressTodos.includes(id => id === todo._id);
            return (
              <Card>
                <Card.Content>
                  <Card.Header>{todo.title}</Card.Header>
                  <Card.Meta>{todo.user.name}</Card.Meta>
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
