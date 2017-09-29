import React from 'react';
import PropTypes from 'prop-types';

class CustomCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
            || (this.props.input && (this.props.input.value || this.props.meta.initial))
            || false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.value !== nextState.value;
  }

  onChange = (e) => {
    this.setState({
      value: e.target.checked
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.value ? 1 : 0);
      }
      if (this.props.input) {
        this.props.input.onChange(this.state.value ? 1 : 0);
      }
    });
  };

  render() {
    return (
      <label className="custom-control custom-checkbox">
        <input value="1" type="checkbox" className="custom-control-input" onChange={this.onChange} checked={this.state.value} />
        <span className="custom-control-indicator" />
        <span className="custom-control-description">{this.props.children}</span>
      </label>
    );
  }
}

CustomCheckbox.defaultProps = {
  value: false,
};

CustomCheckbox.propTypes = {
  value: PropTypes.any,
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
  }),
  meta: PropTypes.shape({
    initial: PropTypes.any,
  }),
  onChange: PropTypes.func,
  children: PropTypes.node,
};

export default CustomCheckbox;
