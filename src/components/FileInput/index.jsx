import React from 'react';

// function handleFiles(files) {
//   for (let i = 0; i < files.length; i++) {
//     const file = files[i];
//     const reader = new FileReader();
//     // reader.onload = (function(aImg) { return function(e) { console.log(e.target.result); }; })(img);
//     reader.onload = (function (aImg) {
//       return function (e) {
//         console.log(e.target.result);
//       };
//     }());
//     reader.readAsDataURL(file);
//     console.log(reader.readAsDataURL(file));
//   }
// }

export class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {};
  }

  fileSelected = (e) => {
    console.dir(e.target);
  };

  render() {
    return (
      <div>
        <label htmlFor={this.props.name}>
          <span>Cover File</span>
          <input
            type="file"
            name={this.props.name}
            id={this.props.name}
            ref={this.fileInput}
            onChange={this.fileSelected}
          />
        </label>
      </div>
    );
  }
}
