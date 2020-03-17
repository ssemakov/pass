import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';

configure({ adapter: new Adapter() });

const map = json => {
  if (json.type === 'ThemeProvider') {
    return {
      ...json,
      props: {
        ...json.props,
        theme: {}
      }
    };
  }

  return json;
};

expect.addSnapshotSerializer(createSerializer({ map }));
