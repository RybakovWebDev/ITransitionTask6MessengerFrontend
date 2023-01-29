import { Button } from "react-bootstrap";

const NewMessageFooter = (props) => {
  return (
    <article className='compose-message-parent'>
      <div className='compose-message-cont'>
        <Button
          className='compose-message-btn'
          variant='btn btn-outline-light'
          type='submit'
          onClick={props.modalHandler}
        >
          {props.modalVisibility ? "Cancel" : "New Message"}
        </Button>
      </div>
    </article>
  );
};

export default NewMessageFooter;
