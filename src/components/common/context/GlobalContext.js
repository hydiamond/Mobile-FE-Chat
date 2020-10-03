import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const GlobalContext = React.createContext();
const GlobalConsumer = GlobalContext.Consumer;

const defaultMeta = {
  title: 'Chat App'
};

const renderHelmet = meta => (
  <Helmet
    htmlAttributes={{ lang: 'en' }}
    title={meta.title}
    meta={[
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      },
      {
        name: 'format-detection',
        content: 'yes'
      }
    ]}
    link={[
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: meta.image
      },
      // GOOGLE FONT
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://fonts.googleapis.com/css?family=Hind:400,300,500,600%7cMontserrat:400,700'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Hind:300,400,500,600,700'
      }
    ]}
    script={[
      {
        src: 'https://kit.fontawesome.com/4cc95513a0.js'
      }
    ]}
  />
);

const GlobalProvider = props => {
  const [meta, setMeta] = useState(defaultMeta);
  return (
    <GlobalContext.Provider
      value={{
        meta,
        setMeta
      }}
    >
      {meta && renderHelmet(meta)}
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

export { GlobalContext, GlobalConsumer, GlobalProvider };

GlobalProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
GlobalProvider.defaultProps = {
  children: {}
};
