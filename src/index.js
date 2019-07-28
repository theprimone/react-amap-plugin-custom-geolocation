import React from 'react';

class Geolocation extends React.Component {
  constructor(props) {
    super(props);
    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        throw new Error('Geolocation has to be a child of Map component');
      } else {
        this.map = props.__map__;
        this.element = props.__ele__;
        const { autoLocation } = props;

        this.resolveGeolocation(props).then(() => {
          this.triggerCreated(props);
          this.map.addControl(this.geolocation);
          if (autoLocation) {
            this.geolocation.getCurrentPosition();
          }
        });
      }
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  resolveGeolocation(props) {
    if (this.geolocation) {
      return new Promise((resolve) => {
        resolve(this.geolocation);
      });
    }
    return new Promise((resolve) => {
      this.map.plugin(['AMap.Geolocation'], () => {
        this.geolocation = new window.AMap.Geolocation(props);
        resolve(this.geolocation);
      });
    });
  }

  triggerCreated(props) {
    const events = props.events || {};
    if (('created' in events) && (typeof events.created === 'function')) {
      events.created(this.geolocation);
    }
  }

  render() {
    return null;
  }
}

module.exports = Geolocation;
