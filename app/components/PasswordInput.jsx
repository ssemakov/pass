// @flow
import React, { type Ref } from 'react';

type Props = {|
  onChange: (SyntheticInputEvent<HTMLInputElement>) => mixed,
  value?: string,
  placeholder?: string,
  ref?: Ref<*>
|};

export default React.forwardRef<Props, HTMLInputElement>((props, ref) => {
  const { onChange, value, placeholder } = props;

  return (
    <input type="password" ref={ref} {...{ onChange, value, placeholder }} />
  );
});
