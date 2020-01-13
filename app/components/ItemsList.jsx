// @flow
import React from 'react';
import ShowField from './ShowField';

type ItemProps = {|
  id: number,
  name: string,
  login: string,
  password: string,
  url: string,
  created_at: number,
  updated_at: number
|};

function Item(props: ItemProps) {
  const { name, login, password, url } = props;

  return (
    <div>
      <ul>
        <li>
          name:&nbsp;
          <ShowField value={name} />
        </li>
        <li>
          login:&nbsp;
          <ShowField value={login} />
        </li>
        <li>
          password:&nbsp;
          <ShowField hidden value={password} />
        </li>
        <li>
          url:&nbsp;
          <ShowField value={url} />
        </li>
      </ul>
    </div>
  );
}

type Props = {
  items: Array<ItemProps>
};

export default function({ items }: Props) {
  return (
    <>
      {items.map(item => (
        <Item key={item.id} {...item} />
      ))}
    </>
  );
}
