import React from 'react';
import { Icon } from 'semantic-ui-react'

export const MaybeCheckmark = ({ isComplete }) => {
  return isComplete
    ? <Icon name="check" color="green" />
    : <Icon name="delete" color="red" />
}

export const MaybeCheckmarkWithWarning = ({ isComplete }) => {
  return isComplete
    ? <Icon name="check" color="green" />
    : <Icon name="warning circle" color="red" />
}
