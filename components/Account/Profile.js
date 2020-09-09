import { Header, Icon, Segment, Label } from "semantic-ui-react";
import formatDate from "../../utils/formatDate";

function Profile({email, name, createdAt }) {
  
  return (
    <Segment secondary inverted color="violet">
      <Header inverted textAlign="center" as="h1" icon>
        <Icon name="user" />
        {name}
        <Header.Subheader>{email}</Header.Subheader>
        <Header.Subheader>Joined {formatDate(createdAt)}</Header.Subheader>
      </Header>
    </Segment>
  );
}

export default Profile;
