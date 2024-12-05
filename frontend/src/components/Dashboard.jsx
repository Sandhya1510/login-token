import PropTypes from 'prop-types';

const Dashboard = ({ onLogout }) => {
  const handleLogoutClick = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?'); 
    if (confirmLogout) {
      onLogout(); 
    }
  };

  return (
    <div>
      <h2>Welcome to the Dashboard!</h2>
      <p>You are successfully logged in.</p>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );  
};


Dashboard.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Dashboard;


