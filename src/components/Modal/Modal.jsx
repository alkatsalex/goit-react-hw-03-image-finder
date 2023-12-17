import { Component } from "react";

export default class Modal extends Component {



  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleImageClick = e => {
    e.stopPropagation();
  };


  render() {
    const url = this.props.url
    const onClose =this.props.onClose



      return (
        <div className="Overlay" onClick={() => {onClose()}}>
          <div className="Modal">
            <img src={url} alt="" />
          </div>
        </div>
    )
    }
}