import React from 'react';

// export class Modal extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   handleModalClose = () => {
//     this.props.onClose();
//   }

//   render() {
//     return (
//       <div className="modal-wrap">
//         <div className="modal">
//           <button className="x-btn" onClick={this.handleModalClose}>x</button>
//         </div>
//       </div>
//     );
//   }
// }

export const Modal = ({ component: Component, ...rest }) => (
  <Component {...rest} />
);
