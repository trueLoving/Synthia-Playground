import React from 'react';
import './FeatureCard.css';

export function FeatureCard({ icon, title, description, features = [] }) {
  return (
    <div className='feature-card'>
      <div className='feature-icon'>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {features.length > 0 && (
        <div className='feature-list'>
          {features.map((feature, index) => (
            <span key={index} className='feature-tag'>
              {feature}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
