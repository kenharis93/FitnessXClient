import React from 'react';

function About(props) {
  return <div className='App'>About Page{props.match.params.id}</div>;
}

export default About;
