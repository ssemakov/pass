import React from 'react';
import { shallow } from 'enzyme';
import App from '../../app/containers/App';

describe('App', () => {
  it('should render the correct snapshot', () => {
    const wrapper = shallow(<App>hello</App>);

    expect(wrapper).toMatchInlineSnapshot(`
      <ThemeProvider
        theme={Object {}}
      >
        <CssBaseline />
        hello
      </ThemeProvider>
    `);
  });
});
