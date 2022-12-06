import Layout from '../components/Layout/Layout';
import {Provider} from 'react-redux';
import store from '../src/store/store'


// we need to load the users once the app starts so , use this code
//store.dispatch(fetchUsers()); //we used this code because we can access to the store; 

function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
  
}

export default MyApp
