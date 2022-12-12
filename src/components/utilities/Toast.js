import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';
import './Toast.css';

const ToastDemo = ({ isToastOpen, handleOpen, message }) => {
  const [open, setOpen] = React.useState(false);
  const eventDateRef = React.useRef(new Date());
  const timerRef = React.useRef(0);

  console.log(1,open);

  
  React.useEffect(() => {
    if (isToastOpen) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isToastOpen]);

  
  const handleToastOpen = (value) => {
    setOpen(value);
    handleOpen(value);
  };

  

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <Toast.Provider swipeDirection="right">
      {/* <button
        className="Button large violet hidden"
        onClick={() => {
          setOpen(false);
          window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            eventDateRef.current = oneWeekAway();
            setOpen(true);
          }, 100);  
        }}
      >
        Add to calendar
      </button> */}

      <Toast.Root className="ToastRoot" open={open} onOpenChange={(value) => handleToastOpen (value)} duration={1000}>
        <Toast.Title className="ToastTitle">Scheduled: Catch up</Toast.Title>
        <Toast.Description asChild>
          <time className="ToastDescription" dateTime={eventDateRef.current.toISOString()}>
            {prettyDate(eventDateRef.current)}
            <p>{message}</p>
          </time>
        </Toast.Description>
        <Toast.Action className="ToastAction" asChild altText="Goto schedule to undo">
          <button className="Button small green">Undo</button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};

function oneWeekAway(date) {
  const now = new Date();
  const inOneWeek = now.setDate(now.getDate() + 7);
  return new Date(inOneWeek);
}

function prettyDate(date) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(date);
}

export default ToastDemo;