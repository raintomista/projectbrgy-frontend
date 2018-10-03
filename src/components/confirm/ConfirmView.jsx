import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { auth } from 'services/SignupService';

export default class ConfirmView extends Component {
  async componentWillMount() {
    const searchQuery = this.props.location.search;
    const parsedQuery = queryString.parse(searchQuery);
    try {
      await auth(parsedQuery.token);
      alert('You have successfully confirmed your account.')
    } catch (e) {
      alert('The token provided is invalid or has already expired.')
    }
  }

  render() {
    return (
      <Redirect to='/login' />
    );
  }
}