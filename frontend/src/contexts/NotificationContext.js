import React, { createContext, useCallback, useMemo, useState } from "react";
import { Alert, Toast, ToastContainer } from "react-bootstrap";
import styles from "../styles/NotificationContext.module.css";

export const NotificationContext = createContext({});

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Add a new notification to be shown
  const showNotification = useCallback(
    ({ type = "success", header = "Notification", message }) => {
      setNotifications((prevNotifications) => {
        return [...prevNotifications, { type, header, message }];
      });
    },
    []
  );

  const handleClose = (idx) => {
    // Remove notification after it expires
    setNotifications((prevNotifications) => {
      const notifications = [...prevNotifications];
      notifications.splice(idx, 1);
      return notifications;
    });
  };

  const value = useMemo(() => {
    return { showNotification };
  }, [showNotification]);

  return (
    <NotificationContext.Provider value={value}>
      {children}

      <ToastContainer
        className="me-4 mb-4"
        position="bottom-end"
        containerPosition="fixed"
      >
        {notifications.map(({ header, message, type }, idx) => (
          <Toast
            key={idx}
            onClose={() => handleClose(idx)}
            show={true}
            delay={3000}
            autohide
          >
            <Toast.Header className={styles.Header}>
              <strong className="me-auto">{header}</strong>
            </Toast.Header>

            <Toast.Body className={styles.Body}>
              <Alert className={styles.Alert} variant={type}>
                {message}
              </Alert>
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
