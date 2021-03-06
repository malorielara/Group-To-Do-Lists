// Import dependencies
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ListCard from './ListCard';
import { Col, Row, Container } from "../Grid";

// Import Local dependencies
import { openSignUp, openCreateList } from '../../redux/actions/userActions';

// Create Component
class CardContainer extends Component {
  // Function outputs lists
  getLists = () => {
    // Target currentUser
    const currentUser = this.props.currentUser

    // If user has no lists, output this
    if(currentUser.lists.length === 0) {
      return <div>
        <h2>It seems that you don't have any lists. Would you like to create one?</h2><br />
        <button className="btn peach-gradient center" onClick={this.props.openCreateList}>Create List</button>
      </div>

    // Else output card for each list
    } else {
      return (
        <div>
          {currentUser.lists.map(listId => <ListCard key={listId} listId={listId} currentUser={this.props.currentUser}/>)}
        </div>
      )
    }
  };

  // Render Component
  render() {
    // If Signed Out Component
    if(!this.props.signedIn) {
      return (
        <Container fluid>
          <Row>
            <Col size="md-12">
              <Card>
                <CardContent className="text-center">
                  <h1>Your Lists</h1><br />
                  <h3>Your lists will be here! But it looks like you arent signed in at the moment.</h3>
                  <h3>Please sign in to view your lists.</h3>
                  <p>Don't have an account? No problem. Just click the button below to sign up and get started!</p>
                  <a className="btn peach-gradient center" href="#!" onClick={this.props.openSignUp}><i className="fa fa-clone left"></i>Get Started!</a>
                </CardContent>
              </Card>
            </Col>  
          </Row>
        </Container>
      );
      // If Signed In Component
    } else {
      return (
        <Container className="cardContainer" fluid>
          <Row>
            <Col size="md-12">
              <Card>
                <CardContent className="text-center">
                  <h1>Your lists:</h1>

                  {this.getLists()}
                </CardContent>
              </Card>
            </Col>  
          </Row>
        </Container>
      );
    }
  };
};

// Create PropTypes
CardContainer.propTypes = {
  openSignUp: PropTypes.func.isRequired,
  openCreateList: PropTypes.func.isRequired,
  signedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired
}

// Maps States to Component Props
const mapStateToProps = state => ({
  signedIn: state.user.signedIn,
  currentUser: state.user.currentUser
});

// Export Component
export default connect(mapStateToProps, { openSignUp, openCreateList })(CardContainer);