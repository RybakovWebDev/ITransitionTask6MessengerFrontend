import { Accordion } from "react-bootstrap";

const Messages = (props) => {
  const renderMessages = () => {
    if (props.messages)
      return props.messages.map((m, i) => {
        let messageTitle = m.title;
        if (m.title.length > 100) messageTitle = m.title.slice(0, 95) + " ...";

        return (
          <Accordion.Item key={m._id} eventKey={i}>
            <Accordion.Header>
              <h2 className='messages-list-item-sender'>From: {m.sender}</h2>
              <div className='messages-list-item-vertical-separator'></div>
              <h3 className='messages-list-item-title'>{messageTitle}</h3>
            </Accordion.Header>
            <Accordion.Body>{m.body}</Accordion.Body>
          </Accordion.Item>
        );
      });
  };

  return (
    <article className='messages-parent'>
      <div className='messages-list-cont'>
        <div className='messages-accordion-parent'>
          <Accordion className='messages-accordion' flush>
            {renderMessages()}
          </Accordion>
        </div>
      </div>
    </article>
  );
};

export default Messages;
