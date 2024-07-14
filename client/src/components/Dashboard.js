import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function Dashboard() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get('/api/dishes');
      setDishes(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const togglePublishedStatus = async (id) => {
    try {
      const response = await axios.post(`/api/dishes/toggle/${id}`);
      const updatedDish = response.data;
      setDishes(dishes.map(dish => dish.dishId === updatedDish.dishId ? updatedDish : dish));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredDishes = dishes.filter(dish => 
    dish.dishName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container dashboard-container">
      <h1 className="center-align hero-title">Dishes Dashboard</h1>
      <div className="input-field col s12">
        <input 
          type="text" 
          id="search" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label htmlFor="search">Search Dishes</label>
      </div>
      {loading && <div className="progress"><div className="indeterminate"></div></div>}
      <div className="row">
        {filteredDishes.map(dish => (
          <div className="col s12 m6 l4" key={dish.dishId}>
            <div className="card equal-height-card">
              <div className="card-image">
                <img src={dish.imageUrl} alt={dish.dishName} />
                <span className="card-title title">{dish.dishName}</span>
              </div>
              <div className="card-content">
                <p>Published: {dish.isPublished.toString()}</p>
              </div>
              <div className="card-action">
                <button 
                  className={`btn ${dish.isPublished ? 'red' : 'green'}`} 
                  onClick={() => togglePublishedStatus(dish.dishId)}
                >
                  {dish.isPublished ? 'Unpublish' : 'Publish'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
