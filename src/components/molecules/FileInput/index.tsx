import React from 'react';
import { Label } from '../../atoms/Label';
import { InputId, InputType } from '../FormInput/types/types';
import { IconName } from '../../atoms/Icon/types/types';
import { Icon } from '../../atoms/Icon';
import { Wrapper } from '../../atoms/Wrapper';

import './fileInput.scss';

interface IFileInput {
  id: InputId;
  isDisabled?: boolean;
}

export const FileInput: React.FC<IFileInput> = ({ id, isDisabled }): React.ReactElement => {
  return (
    <Wrapper className="file-input">
      <Label htmlFor={InputId.file} className="file-input__label">
        <Icon name={IconName.addFile} className="file-input__icon" />
        <input type={InputType.file} id={id} disabled={isDisabled} />
      </Label>
    </Wrapper>
  );
};