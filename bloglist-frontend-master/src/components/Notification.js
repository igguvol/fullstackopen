import React from 'react';

const Notification = ({ message, style }) => {
  if (message === null || message === '') {
    return null
  }
  return (
    <div className={style}>
      {message}
    </div>
  )
}

export default Notification;