import React from 'react';

const About = () => {
  const styles = {
    container: {
      backgroundColor: '#f5f5f5',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      transition: 'box-shadow 0.3s',
    },
    heading: {
      color: '#333',
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    description: {
      color: '#777',
      fontSize: '18px',
      fontStyle: 'italic',
    },
    list: {
      marginTop: '20px',
    },
    listItem: {
      backgroundColor: '#fff',
      borderRadius: '5px',
      marginBottom: '10px',
      padding: '10px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s, box-shadow 0.3s',
    },
  };

  const handleListItemHover = (event) => {
    event.target.style.backgroundColor = '#f8f8f8';
    event.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  };

  const handleListItemLeave = (event) => {
    event.target.style.backgroundColor = '#fff';
    event.target.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
  };

  return (
    <div className="container" style={styles.container}>
    <h4 style={styles.heading}>This is about Notebook:</h4>
    <p className="mx-3 mt-5" style={styles.description}>
      Using Notebook you could-
    </p>
    <ul className="list-group list-group-flush list-group-numbered mx-5" style={styles.list}>
      <li
        className="list-group-item"
        style={styles.listItem}
        onMouseEnter={handleListItemHover}
        onMouseLeave={handleListItemLeave}
      >
        Write your personal / professional notes
      </li>
      <li
        className="list-group-item"
        style={styles.listItem}
        onMouseEnter={handleListItemHover}
        onMouseLeave={handleListItemLeave}
      >
        Secure your notes on cloud
      </li>
      <li
        className="list-group-item"
        style={styles.listItem}
        onMouseEnter={handleListItemHover}
        onMouseLeave={handleListItemLeave}
      >
        Access your notes from anywhere / from any devices
      </li>
      <li
        className="list-group-item"
        style={styles.listItem}
        onMouseEnter={handleListItemHover}
        onMouseLeave={handleListItemLeave}
      >
        Edit or Delete your notes
      </li>
      <li
        className="list-group-item"
        style={styles.listItem}
        onMouseEnter={handleListItemHover}
        onMouseLeave={handleListItemLeave}
      >
        Give your notes a particular tag
      </li>
      <li
        className="list-group-item"
        style={styles.listItem}
        onMouseEnter={handleListItemHover}
        onMouseLeave={handleListItemLeave}
      >
        Maintain privacy using credentials
      </li>
    </ul>
  </div>
  );
};

export default About;
