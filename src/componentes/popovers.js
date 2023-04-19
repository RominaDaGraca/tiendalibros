import { OverlayTrigger, Popover } from 'react-bootstrap';

function MyPopoverContent() {
    return (
      <Popover>
        <Popover.Header as="h3">Título del popover</Popover.Header>
        <Popover.Body>
          Contenido del popover. Aquí puedes agregar texto, imágenes, enlaces o cualquier otro elemento HTML que desees.
        </Popover.Body>
      </Popover>
    );
  }

  function MyComponent() {
    return (
      <div>
        <OverlayTrigger trigger="hover" placement="left" overlay={<MyPopoverContent />}>
          <button>Mostrar Popover</button>
        </OverlayTrigger>
      </div>
    );
  }
  export default MyComponent;
