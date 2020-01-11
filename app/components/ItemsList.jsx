// @flow
import React from 'react';

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
  const { name, login, url } = props;

  return (
    <div>
      <ul>
        <li>name: {name}</li>
        <li>login: {login}</li>
        <li>password: ***</li>
        <li>url: {url}</li>
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
