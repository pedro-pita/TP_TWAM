import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';

export default class Loading extends Component {
  render() {
    return (
          <div className="container" style={{height: "85vh"}}>
              <div class="d-flex align-items-center justify-content-center h-100">
                  <p class="align-middle"><Spinner animation="border" role="status"/></p>
              </div>
          </div>
      );
    }
}
