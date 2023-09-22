import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Icons = ({name}) => {
  switch (name) {
    case 'circle':
      return <Icon name="circle-thin" size={45} color="#fcba03" />;
    case 'cross':
      return <Icon name="times" size={45} color="#10A881" />;
    default:
      return <Icon name="pencil" size={45} color="#274DCC" />;
  }
};

export default Icons;
