import React from "react";
import { Input,Container,Icon,Card} from 'semantic-ui-react';
import formatDate from "../../utils/formatDate";


const SearchBar = ({todos}) => {

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  React.useEffect(() => {
    const results = todos.filter(todo =>
      todo.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);
  
  return (
    
    <Container>
        <Input
          
          icon={<Icon name='delete' circular= 'true' link= 'true'  onClick={() => {
            setSearchTerm("");
          }}/>}
          placeholder='Search by category'
          value={searchTerm}
          onChange={handleChange} 
          size='big' fluid/>
        <Container style={{ paddingTop: "1em" }}>
         {searchTerm ? 
          <Card.Group stackable
                      itemsPerRow="2"
                      fluid>
          { searchResults.map(todo => {
              return (
               <Card key={todo._id} fluid color='violet'>
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

        </Container>
      
    </Container>
  );
};

export default SearchBar;
