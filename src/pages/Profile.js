import React from 'react';
import ReadingList from '../components/ReadingList';
import RecommendationCard from '../components/RecommendationCard';

const Profile = () => {
  // Example data
  const user = { name: 'John Doe', email: 'johndoe@example.com' };

  const toReadList = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  ];

  const readList = [
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  ];

  const recommendations = [
    { id: 4, title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
    { id: 5, title: 'Pride and Prejudice', author: 'Jane Austen' },
  ];

  const notifications = [
    { id: 1, message: 'New book released: The Midnight Library by Matt Haig' },
    { id: 2, message: 'Recommendation: Check out Brave New World by Aldous Huxley' },
  ];

  return (
    <div className="profile">
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>

      {/* Notifications Section */}
      <section>
        <h2>Notifications</h2>
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>{notification.message}</li>
          ))}
        </ul>
      </section>

      {/* Recommendations Section */}
      <section>
        <h2>Recommendations</h2>
        <div className="recommendations-grid">
          {recommendations.map((book) => (
            <RecommendationCard key={book.id} book={book} />
          ))}
        </div>
      </section>


    </div>
  );
};

export default Profile;
